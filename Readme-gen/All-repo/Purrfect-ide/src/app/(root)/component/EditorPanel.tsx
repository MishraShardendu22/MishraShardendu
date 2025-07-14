"use client";
import React, { useEffect } from "react";
import { useCodeEditorStore } from "../store/useCodeEditor";
import { LANGUAGE_CONFIG, defineMonacoThemes } from "../constant";
import { Editor } from "@monaco-editor/react";
import Image from "next/image";
import { useClerk } from "@clerk/nextjs";
import useMounted from "@/hooks/useMounted";
import { RotateCcw, Share, Type, Copy, Terminal } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";

const EditorWithOutput = () => {
  const clerk = useClerk();
  const {
    language,
    theme,
    fontSize,
    editor,
    setFontSize,
    setEditor,
    output,
    error,
    isRunning,
  } = useCodeEditorStore();
  const mounted = useMounted();

  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`);
    const newCode = savedCode || LANGUAGE_CONFIG[language]?.defaultCode || "";
    if (editor) editor.setValue(newCode);
  }, [language, editor]);

  useEffect(() => {
    const savedFontSize = localStorage.getItem("editor-font-size");
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
  }, [setFontSize]);

  const handleRefresh = () => {
    const defaultCode = LANGUAGE_CONFIG[language]?.defaultCode || "";
    if (editor) editor.setValue(defaultCode);
    localStorage.removeItem(`editor-code-${language}`);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value) localStorage.setItem(`editor-code-${language}`, value);
  };

  const handleFontSizeChange = (value: number[]) => {
    const size = Math.min(Math.max(value[0], 12), 24);
    setFontSize(size);
    localStorage.setItem("editor-font-size", size.toString());
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output).then(() => {
        alert("Output copied to clipboard!");
      });
    } else {
      alert("No output to copy.");
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex bg-slate-50 dark:bg-slate-900 p-4 gap-4">
        {/* Code Editor Panel */}
        <div className="w-1/2">
          <Card className="h-[80vh] border-2">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 shadow-sm">
                    <Image
                      src={"/" + language + ".png"}
                      alt={`Language logo for ${language}`}
                      width={32}
                      height={32}
                      className="rounded"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">Code Editor</CardTitle>
                    <CardDescription className="text-sm">
                      {LANGUAGE_CONFIG[language]?.monacoLanguage} Editor
                    </CardDescription>
                  </div>
                </div>

                <div className="py-2 flex items-center gap-4">
                  <div className="flex items-center gap-3 px-4 py-2 bg-secondary/10 rounded-xl shadow-sm">
                    <Type className="w-4 h-4 text-secondary-foreground" />
                    <Slider
                      value={[fontSize || 16]}
                      onValueChange={handleFontSizeChange}
                      min={12}
                      max={24}
                      step={1}
                      className="w-24"
                    />
                    <Badge variant="secondary" className="h-6">
                      {fontSize || 16}px
                    </Badge>
                  </div>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={handleRefresh}
                          className="rounded-xl h-10 w-10 shadow-sm"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Reset to default code</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Button className="gap-2 rounded-xl shadow-sm">
                    <Share className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0 px-4 pb-4 h-[calc(80vh-120px)]">
              <div className="rounded-xl overflow-hidden border-2 shadow-sm h-full">
                {clerk.loaded && (
                  <Editor
                    height="100%"
                    language={LANGUAGE_CONFIG[language]?.monacoLanguage}
                    onChange={handleEditorChange}
                    theme={theme}
                    beforeMount={defineMonacoThemes}
                    onMount={(editor) => setEditor(editor)}
                    options={{
                      minimap: { enabled: true },
                      fontSize,
                      automaticLayout: true,
                      scrollBeyondLastLine: false,
                      padding: { top: 16, bottom: 16 },
                      renderWhitespace: "selection",
                      fontFamily:
                        '"Fira Code", "Cascadia Code", Consolas, monospace',
                      fontLigatures: true,
                      cursorBlinking: "smooth",
                      smoothScrolling: true,
                      contextmenu: true,
                      renderLineHighlight: "all",
                      lineHeight: 1.6,
                      letterSpacing: 0.5,
                      roundedSelection: true,
                      scrollbar: {
                        verticalScrollbarSize: 8,
                        horizontalScrollbarSize: 8,
                      },
                    }}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Output Panel */}
        <div className="w-1/2">
          <Card className="h-[80vh]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/10 shadow-sm">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">Output</CardTitle>
                    <CardDescription className="text-sm">
                      View the output of your code here
                    </CardDescription>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  className="gap-2 rounded-xl shadow-sm"
                  onClick={handleCopy}
                  disabled={!output}
                >
                  <Copy className="w-4 h-4" />
                  Copy Output
                </Button>
              </div>
            </CardHeader>
            <CardContent className="h-[calc(80vh-120px)]">
              <div className="rounded-xl border-2 h-full shadow-sm">
                {isRunning ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                      <span>Running your code...</span>
                    </div>
                  </div>
                ) : error ? (
                  <div className="h-full overflow-auto p-6 font-mono text-sm text-red-500 bg-red-50 dark:bg-red-900/10">
                    {error}
                  </div>
                ) : (
                  <div className="h-full overflow-auto p-6 font-mono text-sm">
                    {output}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditorWithOutput;