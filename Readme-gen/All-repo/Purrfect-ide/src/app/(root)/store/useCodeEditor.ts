/* eslint-disable @typescript-eslint/no-explicit-any */
import { CodeEditorState } from "@/types";
import { Monaco } from "@monaco-editor/react";
import { create } from "zustand";
import { LANGUAGE_CONFIG } from "../constant";

const getInitialState = () => {
  if (typeof window === "undefined") {
    return {
      language: "javascript",
      fontSize: 16,
      theme: "vs-dark",
    };
  }

  // On the client side, retrieve values from localStorage
  const savedLanguage = localStorage.getItem("language") || "javascript";
  const savedTheme = localStorage.getItem("theme") || "vs-dark";
  const savedFontSize = localStorage.getItem("fontSize") || 16;

  return {
    language: savedLanguage,
    theme: savedTheme,
    fontSize: Number(savedFontSize),
  };
};

export const useCodeEditorStore = create<CodeEditorState>((set: any, get: any) => {
  const initialState = getInitialState();

  return {
    ...initialState,
    output: "",
    isRunning: false,
    error: "",
    editor: null,
    executionResult: null,

    getCode: () => get().editor?.getValue() || "",

    setEditor: (editor: Monaco) => {
      if (typeof window !== "undefined") {
        const savedCode = localStorage.getItem(`editor-code-${get().language}`);
        if (savedCode) editor.setValue(savedCode);
      }
      set({ editor });
    },

    setTheme: (theme: string) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", theme);
      }
      set({ theme });
    },

    setLanguage: (language: string) => {
      if (typeof window !== "undefined") {
        const currentCode = get().editor?.getValue();
        if (currentCode) {
          localStorage.setItem(`editor-code-${get().language}`, currentCode);
        }
        localStorage.setItem("language", language);
      }
      set({ language, output: "", error: "" });
    },

    setFontSize: (fontSize: number) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("fontSize", fontSize.toString());
      }
      set({ fontSize });
    },
    runCode: async () => {
      const { language, getCode } = get();
      const code = localStorage.getItem(`editor-code-${language}`) || getCode();  
    
      if (!code.trim()) {
        set({ error: "Please write some valid code to run" });
        return;
      }
    
      set({ isRunning: true, output: "", error: "" });
    
      try {
        const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
        console.log("cp-1")
        console.log(code);
        const res = await fetch("https://emkc.org/api/v2/piston/execute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language,
            version: runtime.version,
            files: [{ content: code }],
          }),
        });
        console.log("cp-2")
    
        if (!res.ok) {
          set({
            error: `Request failed with status ${res.status}`,
            executionResult: {
              code,
              output: "",
              error: `Request failed with status ${res.status}`,
            },
          });
          return;
        }
    
        const data = await res.json();
    
        if (data.message) {
          set({
            error: data.message,
            executionResult: {
              code,
              output: "",
              error: data.message,
            },
          });
          return;
        }
    
        if (data.run && data.run.code !== 0) {
          const errorOutput = data.run.stderr || data.run.output;
          set({
            error: errorOutput,
            executionResult: {
              code,
              output: "",
              error: errorOutput,
            },
          });
          return;
        }
    
        const output = data.run.output;
        set({
          output: output.trim(),
          error: null,
          executionResult: {
            code,
            output: output.trim(),
            error: null,
          },
        });
    
      } catch (error) {
        console.error("Error running code:", error);
        set({
          error: "Error running code",
          executionResult: { code, output: "", error: "Error running code" },
        });
      } finally {
        set({ isRunning: false });
      }
    },
  };
});

export const getExecutionResult = () => useCodeEditorStore.getState().executionResult;