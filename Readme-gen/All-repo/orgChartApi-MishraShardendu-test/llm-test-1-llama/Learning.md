# 🧠 Unit Test Generator Using LLaMA (Ollama) for C++ Projects

## 📦 Prerequisites

* Fedora Linux or similar
* C++ compiler (GCC/G++)
* [GoogleTest](https://github.com/google/googletest) installed
* [Ollama](https://ollama.com/) installed
* Model pulled via Ollama (e.g., `qwen2.5-coder:7b`, `deepseek-coder:6.7b`, etc.)

---

## 🛠️ Setup Directory Structure

```bash
your-project/
├── controllers/
│   ├── AuthController.cc
│   └── AuthController.h
├── llm-test/
│   ├── generated_tests/
│   └── instructions/
│       └── testgen.yaml
├── generate_tests.sh
```

---

## 🧾 YAML Prompt (Strict Mode)

**File:** `llm-test/instructions/testgen.yaml`

```yaml
prompt: |
  You are an AI that only outputs valid C++ source code. Do not include markdown, explanations, comments, or thinking steps.

  Task:
  Given a C++ source file, generate a single self-contained C++ unit test file using GoogleTest.

  Output Format Rules:
  - Output only raw .cpp source code.
  - Do NOT use Markdown or backticks.
  - Do NOT include explanations, comments, or descriptions.
  - Do NOT use any language except English.
  - No "thinking", "done", or narrative. Only code.

  Testing Rules:
  * Cover all public classes, methods, and functions.
  * Include edge cases and failure scenarios.
  * Use ASSERT_* and EXPECT_*.
  * Group related tests using TEST() macros.
  * Don't include main() unless required.
  * Add required includes and namespaces.

strict: true
output_dir: generated_tests
```

---

## 🧪 Bash Script for Test Generation

**File:** `generate_tests.sh`

```bash
#!/bin/bash
SRC_DIR="./controllers"
OUT_DIR="llm-test/generated_tests"
YAML_PROMPT="llm-test/instructions/testgen.yaml"

mkdir -p "$OUT_DIR"

find "$SRC_DIR" \( -name "*.cc" -o -name "*.h" \) | while read -r file; do
    echo "Generating tests for $file"
    {
        cat "$YAML_PROMPT"
        echo
        cat "$file"
    } | ollama run qwen2.5-coder:7b > "$OUT_DIR/$(basename "$file").test.cpp"
done
```

> 🔁 Swap model (`qwen2.5-coder:7b`) with `deepseek-coder:6.7b` or similar if needed.

---

## 🧰 Useful Ollama Commands

### Pull a Model

```bash
ollama pull qwen2.5-coder:7b
```

### List Models

```bash
ollama ls
```

### Remove Model

```bash
ollama rm qwen2.5-coder:7b
```

### Stop All

```bash
ollama stop all
```

---

## 🏃 Run Test Generation

```bash
chmod +x generate_tests.sh
./generate_tests.sh
```

Generated tests will be in:
`llm-test/generated_tests/*.test.cpp`

---

## 🧪 Compile and Run Tests (Optional)

```bash
cd build
cmake ..
make
./your_project_test_binary
```

---

## 🧼 Troubleshooting

* **Model RAM error?** Use smaller models (`7b`, `6.7b`)
* **Markdown or garbage output?** You didn’t use strict prompt
* **No test generated?** File is too big or syntax broken