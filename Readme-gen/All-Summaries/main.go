package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
)

const inputDir = "./"
const outputFile = "merged.json"

func main() {
	var allData []map[string]interface{}

	files, err := filepath.Glob(filepath.Join(inputDir, "*.json"))
	if err != nil {
		log.Fatal(err)
	}

	for _, file := range files {
		if filepath.Base(file) == outputFile {
			continue
		}

		content, err := ioutil.ReadFile(file)
		if err != nil {
			log.Fatal(err)
		}

		var obj map[string]interface{}
		var arr []map[string]interface{}

		if err := json.Unmarshal(content, &arr); err == nil {
			allData = append(allData, arr...)
			continue
		}

		if err := json.Unmarshal(content, &obj); err == nil {
			allData = append(allData, obj)
			continue
		}

		log.Fatalf("invalid JSON in file: %s", file)
	}

	outFile, err := os.Create(outputFile)
	if err != nil {
		log.Fatal(err)
	}
	defer outFile.Close()

	encoder := json.NewEncoder(outFile)
	encoder.SetIndent("", "  ")
	if err := encoder.Encode(allData); err != nil {
		log.Fatal(err)
	}
}
