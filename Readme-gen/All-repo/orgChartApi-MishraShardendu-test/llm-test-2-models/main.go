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

var (
	apiKey = ""
	model  = "openrouter/cypher-alpha:free"
	srcDir = "../controllers"
	outDir = "../test"
)

const (
	systemMsg = `You are a strict C++ unit test generator. Output only raw, valid C++ code using the GoogleTest framework. Absolutely no markdown, comments, formatting, or explanation. Output must be compilable C++ only.`
	userTemplate = `Generate GoogleTest unit tests for the following C++ Org Chart API REST routes:
- GET    /persons?limit=&offset=&sort_field=&sort_order=
- GET    /persons/{id}
- GET    /persons/{id}/reports
- POST   /persons
- PUT    /persons/{id}
- DELETE /persons/{id}

- GET    /departments?limit=&offset=&sort_field=&sort_order=
- GET    /departments/{id}
- GET    /departments/{id}/persons
- POST   /departments
- PUT    /departments/{id}
- DELETE /departments/{id}

- GET    /jobs?limit=&offset=&sort_fields=&sort_order=
- GET    /jobs/{id}
- GET    /jobs/{id}/persons
- POST   /jobs
- PUT    /jobs/{id}
- DELETE /jobs/{id}

- POST   /auth/register
- POST   /auth/login

Cover one basic test per route. Use only GoogleTest (TEST/TEST_F), include necessary headers, no external libraries, no duplicates. Output only valid, compilable C++ code.`
)

func patchCMake() {
	root := "../CMakeLists.txt"
	data, err := os.ReadFile(root)
	if err != nil {
		return
	}
	text := string(data)
	if !strings.Contains(text, "add_subdirectory(test)") {
		text += "\nadd_subdirectory(test)\n"
	}
	if !strings.Contains(text, "--coverage") {
		text = strings.Replace(text, "project(", "set(CMAKE_CXX_FLAGS \"${CMAKE_CXX_FLAGS} --coverage\")\nset(CMAKE_EXE_LINKER_FLAGS \"${CMAKE_EXE_LINKER_FLAGS} --coverage\")\nproject(", 1)
	}
	_ = os.WriteFile(root, []byte(text), 0644)
}

func runBuildAndCaptureLog() string {
	cmd := exec.Command("bash", "-c", "mkdir -p ../build && cd ../build && cmake .. && make -j$(nproc)")
	out, err := cmd.CombinedOutput()
	if err != nil {
		log.Printf("build error: %v", err)
	}
	return string(out)
}

func refineTestsWithBuildLog(logText string) {
	files, _ := filepath.Glob(filepath.Join(outDir, "*_test.cc"))
	systemMsg := `You are a strict C++ test fixer. Fix only the build errors using valid GoogleTest-compatible C++ code. No markdown. No comments. No extra text. Only valid compilable C++ code as output.`
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
		m := strings.ReplaceAll(userTemplate, "<<CODE>>", string(b))
		m = strings.ReplaceAll(m, "<<LOG>>", logText)
		body := map[string]interface{}{
			"model": model,
			"messages": []map[string]string{
				{"role": "system", "content": systemMsg},
				{"role": "user", "content": m},
			},
		}
		j, _ := json.Marshal(body)
		req, _ := http.NewRequest("POST", "https://openrouter.ai/api/v1/chat/completions", bytes.NewBuffer(j))
		req.Header.Set("Content-Type", "application/json")
		req.Header.Set("Authorization", "Bearer "+apiKey)
		resp, err := http.DefaultClient.Do(req)
		if err != nil {
			log.Printf("fix failed %s: %v", f, err)
			continue
		}
		defer resp.Body.Close()
		raw, _ := io.ReadAll(resp.Body)
		var res struct {
			Choices []struct{ Message struct{ Content string } }
		}
		json.Unmarshal(raw, &res)
		if len(res.Choices) == 0 {
			continue
		}
		fixed := strings.TrimSpace(strings.TrimPrefix(res.Choices[0].Message.Content, "```"))
		_ = os.WriteFile(f, []byte(fixed), 0644)
		log.Printf("fixed %s", f)
	}
}

func processFile(ccFile string) {
	base := filepath.Base(ccFile)
	name := strings.TrimSuffix(base, ".cc")
	h := filepath.Join(srcDir, name+".h")

	cc, e1 := os.ReadFile(ccFile)
	hh, e2 := os.ReadFile(h)
	if e1 != nil || e2 != nil {
		log.Printf("read error %s: %v %v", base, e1, e2)
		return
	}

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
	req, _ := http.NewRequest("POST", "https://openrouter.ai/api/v1/chat/completions", bytes.NewBuffer(j))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+apiKey)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Printf("request failed %s: %v", base, err)
		return
	}
	defer resp.Body.Close()
	raw, _ := io.ReadAll(resp.Body)

	var res struct {
		Choices []struct{ Message struct{ Content string } }
	}
	json.Unmarshal(raw, &res)
	if len(res.Choices) == 0 {
		log.Printf("empty response %s", base)
		return
	}
	c := res.Choices[0].Message.Content
	if strings.HasPrefix(c, "```") {
		if i := strings.Index(c, "\n"); i != -1 {
			c = c[i+1:]
		}
	}
	c = strings.TrimSuffix(c, "```")
	c = strings.TrimSpace(c)
	_ = os.WriteFile(filepath.Join(outDir, name+"_test.cc"), []byte(c), 0644)

	patchCMake()

	buildLog := runBuildAndCaptureLog()
	if strings.Contains(buildLog, "error:") {
		log.Printf("build failed for %s, refining", name)
		refineTestsWithBuildLog(buildLog)
	}
}

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