## Documentation of Learnings and Detailed Code Walkthrough

---

### 1. What You’ve Learned

1. **LLM‑driven Test Generation**

   * How to craft strict system/user prompts for GoogleTest code.
   * How to iterate prompts to generate one test file per source file.
2. **Build‑Log Feedback Loop**

   * How to capture CMake/Make output programmatically.
   * How to detect “error:” in build logs and trigger automated fixes.
3. **Per‑File Isolation**

   * Why generating and validating tests one file at a time avoids cascading failures.
   * How to reorder the workflow: generate → patch CMake → build → refine → repeat.
4. **CMake Patching for Coverage**

   * How to insert `--coverage` flags and `add_subdirectory(test)` automatically.
5. **Go Concurrency Patterns**

   * Using `sync.WaitGroup` to parallelize LLM requests per file.
   * Switching to a sequential loop (`processFile`) to isolate errors.
6. **Error Handling & Logging**

   * Logging raw LLM responses for debugging.
   * Logging build outputs to diagnose failures.
7. **Environment & Configuration**

   * Loading `.env` for API key management.
   * Respecting `RUN_ENV` to skip `.env` in production.

---

### 2. Detailed Go Code Breakdown

```go
package main

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"

	"github.com/joho/godotenv"
)
```

* **Imports**:

  * `bytes`, `encoding/json`, `io`: build and parse HTTP payloads.
  * `log`: simple logging.
  * `net/http`: REST calls to the LLM endpoint.
  * `os`, `os/exec`: file I/O and shell commands.
  * `path/filepath`: file path manipulation.
  * `runtime`, `sync`: manage concurrency.
  * `github.com/joho/godotenv`: load environment variables from `.env`.

---

#### Global Configuration

```go
var (
	apiKey = ""
	model  = "openrouter/cypher-alpha:free"
	srcDir = "../controllers"
	outDir = "../test"
)
```

* `apiKey`: populated from `API` env var.
* `model`: the LLM model identifier.
* `srcDir`: directory containing C++ `.cc` files.
* `outDir`: where generated/refined test files go.

---

#### Prompt Templates

```go
const (
	systemMsg = `You are a strict C++ unit test generator. Output only raw, valid C++ code using the GoogleTest framework. Absolutely no markdown, comments, formatting, or explanation. Output must be compilable C++ only.`
	userTemplate = `Generate GoogleTest unit tests for the following C++ Org Chart API REST routes:
...
Cover one basic test per route. Use only GoogleTest (TEST/TEST_F), include necessary headers, no external libraries, no duplicates. Output only valid, compilable C++ code.`
)
```

* `systemMsg`: enforces LLM role and output format.
* `userTemplate`: lists all routes and test‐generation requirements.

---

#### patchCMake

```go
func patchCMake() {
	root := "../CMakeLists.txt"
	data, err := os.ReadFile(root)
	if err != nil {
		return // exit if CMakeLists.txt not found
	}
	text := string(data)
	// ensure test subdirectory is included
	if !strings.Contains(text, "add_subdirectory(test)") {
		text += "\nadd_subdirectory(test)\n"
	}
	// ensure coverage flags
	if !strings.Contains(text, "--coverage") {
		text = strings.Replace(text,
			"project(",
			"set(CMAKE_CXX_FLAGS \"${CMAKE_CXX_FLAGS} --coverage\")\n"+
				"set(CMAKE_EXE_LINKER_FLAGS \"${CMAKE_EXE_LINKER_FLAGS} --coverage\")\n"+
				"project(",
			1,
		)
	}
	_ = os.WriteFile(root, []byte(text), 0644)
}
```

* Reads root `CMakeLists.txt`.
* Appends `add_subdirectory(test)` if missing.
* Injects `--coverage` flags before the `project(` line.

---

#### runBuildAndCaptureLog

```go
func runBuildAndCaptureLog() string {
	cmd := exec.Command("bash", "-c",
		"mkdir -p ../build && cd ../build && cmake .. && make -j$(nproc)",
	)
	out, err := cmd.CombinedOutput() // captures both stdout and stderr
	if err != nil {
		log.Printf("build error: %v", err)
	}
	return string(out) // return full log for parsing
}
```

* Creates or reuses `build` directory.
* Runs `cmake` and `make` in one shell command.
* Returns the combined output for later inspection.

---

#### refineTestsWithBuildLog

````go
func refineTestsWithBuildLog(logText string) {
	files, _ := filepath.Glob(filepath.Join(outDir, "*_test.cc"))
	systemPrompt := `You are a strict C++ test fixer. Fix only the build errors using valid GoogleTest-compatible C++ code. No markdown. No comments. No extra text. Only valid compilable C++ code as output.`
	userTemplate := `C++ test file:
<<CODE>>

Build log:
<<LOG>>

Fix the test file.`

	for _, f := range files {
		b, err := os.ReadFile(f)
		if err != nil {
			log.Printf("read error %s", f)
			continue
		}
		// prepare LLM payload
		m := strings.ReplaceAll(userTemplate, "<<CODE>>", string(b))
		m = strings.ReplaceAll(m, "<<LOG>>", logText)
		body := map[string]interface{}{
			"model": model,
			"messages": []map[string]string{
				{"role": "system", "content": systemPrompt},
				{"role": "user", "content": m},
			},
		}
		j, _ := json.Marshal(body)
		req, _ := http.NewRequest("POST", "`+ "`https://openrouter.ai/api/v1/chat/completions`" +`", bytes.NewBuffer(j))
		req.Header.Set("Content-Type", "application/json")
		req.Header.Set("Authorization", "Bearer "+apiKey)
		resp, err := http.DefaultClient.Do(req)
		if err != nil {
			log.Printf("fix failed %s: %v", f, err)
			continue
		}
		defer resp.Body.Close()
		raw, _ := io.ReadAll(resp.Body)
		var res struct{ Choices []struct{ Message struct{ Content string } } }
		json.Unmarshal(raw, &res)
		if len(res.Choices) == 0 {
			continue
		}
		fixed := strings.TrimSpace(strings.TrimPrefix(res.Choices[0].Message.Content, "```"))
		_ = os.WriteFile(f, []byte(fixed), 0644)
		log.Printf("fixed %s", f)
	}
}
````

* Iterates all `_test.cc` files.
* Sends each file + build log to the LLM.
* Replaces file content with the LLM’s fixed code.

---

#### processFile

````go
func processFile(ccFile string) {
	base := filepath.Base(ccFile)
	name := strings.TrimSuffix(base, ".cc")
	header := filepath.Join(srcDir, name+".h")

	// read source + header
	cc, e1 := os.ReadFile(ccFile)
	hh, e2 := os.ReadFile(header)
	if e1 != nil || e2 != nil {
		log.Printf("read error %s: %v %v", base, e1, e2)
		return
	}

	// generate test via LLM
	msg := strings.ReplaceAll(userTemplate, "<<INCLUDE_HEADER>>", string(hh))
	msg = strings.ReplaceAll(msg, "<<INCLUDE_SOURCE>>", string(cc))
	body := map[string]interface{}{
		"model": model,
		"messages": []map[string]string{
			{"role": "system", "content": systemMsg},
			{"role": "user", "content": msg},
		},
	}
	j, _ := json.Marshal(body)
	req, _ := http.NewRequest("POST", "`+ "`https://openrouter.ai/api/v1/chat/completions`" +`", bytes.NewBuffer(j))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+apiKey)
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Printf("request failed %s: %v", base, err)
		return
	}
	defer resp.Body.Close()
	raw, _ := io.ReadAll(resp.Body)
	var res struct{ Choices []struct{ Message struct{ Content string } } }
	json.Unmarshal(raw, &res)
	if len(res.Choices) == 0 {
		log.Printf("empty response %s", base)
		return
	}

	// write test file
	c := res.Choices[0].Message.Content
	if strings.HasPrefix(c, "```") {
		if i := strings.Index(c, "\n"); i != -1 {
			c = c[i+1:]
		}
	}
	c = strings.TrimSuffix(c, "```")
	c = strings.TrimSpace(c)
	outPath := filepath.Join(outDir, name+"_test.cc")
	_ = os.WriteFile(outPath, []byte(c), 0644)

	// patch and build
	patchCMake()
	buildLog := runBuildAndCaptureLog()
	if strings.Contains(buildLog, "error:") {
		log.Printf("build failed for %s, refining", name)
		refineTestsWithBuildLog(buildLog)
	}
}
````

* Generates and writes one test file.
* Immediately patches CMake and attempts to build.
* If errors occur, refines that single file only.

---

#### main

```go
func main() {
	if os.Getenv("RUN_ENV") != "production" {
		_ = godotenv.Load(".env")
	}
	apiKey = os.Getenv("API")
	runtime.GOMAXPROCS(runtime.NumCPU())
	_ = os.MkdirAll(outDir, 0755)

	files, _ := filepath.Glob(filepath.Join(srcDir, "*.cc"))
	for _, file := range files {
		processFile(file)
	}
}
```

* Loads `.env` in non‑production.
* Sets `apiKey` and `GOMAXPROCS`.
* Ensures `test` directory exists.
* Iterates all controller files and processes them one by one.

---

## Summary

You now have:

* A **repeatable**, **isolated** per‑file test generation pipeline.
* Automated CMake patching for tests and coverage.
* A **build‑log feedback loop** that refines only failing tests.
* Clear separation of responsibilities in code: generation, patching, building, refining.

This architecture maximizes correctness and minimizes cascading errors when using LLMs for automated unit test generation.
