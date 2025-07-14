#!/bin/bash

SRC_DIR="../"
OUT_DIR="llm-test-1/generated_tests"
YAML_PROMPT="instructions/testgen.yaml"
MODEL="qwen2.5-coder:7b"

mkdir -p "$OUT_DIR"

find "$SRC_DIR" \( -name "*.cc" -o -name "*.h" \) | while read -r file; do
    echo "Generating tests for $file"
    {
        cat "$YAML_PROMPT"
        echo
        cat "$file"
    } | ollama run "$MODEL" > "$OUT_DIR/$(basename "$file").test.cpp"
done
