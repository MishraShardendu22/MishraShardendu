# 📝 Translate CLI – Docs 

## 📌 Overview

This is a little app you run in your terminal (black screen where you type).  
It helps you **translate text** from one language to another.

You pick languages using arrow keys, press Enter, type text, and get translation.

The code uses:

- **bubbletea** for showing menus you can move through
- **cobra** to add terminal commands and flags

---

## 🎈 bubbletea Explanation (Menu Logic)

### 🧱 What is `teaModel`?

It's like a game level tracker. It remembers:

- the list of language choices
- what step you're on (step 0 = pick source, step 1 = pick target)
- if you want to quit

```go
type teaModel struct {
  list         list.Model  // the scrollable list
  fromLanguage string      // selected source language
  toLanguage   string      // selected target language
  step         int         // 0 = from, 1 = to
  quitting     bool        // true if user quits
}
````

---

### 🌱 `initialModel()`

This is the **starting setup**. It fills a list with all language names.

```go
func initialModel() teaModel {
  items := []list.Item{}  // list starts empty

  for k := range data.LangMap {
    items = append(items, item(k))  // add each language
  }

  l := list.New(items, list.NewDefaultDelegate(), 30, 10)
  l.Title = "Select source language"

  return teaModel{list: l, step: 0}
}
```

---

### ⚙️ `Init()`

This is called when the menu starts. In our case, it does nothing.

```go
func (m teaModel) Init() tea.Cmd {
  return nil
}
```

---

### 🔁 `Update(msg tea.Msg)`

This is how the app **responds to keypresses** like arrows, Enter, or quit.

```go
func (m teaModel) Update(msg tea.Msg) (tea.Model, tea.Cmd)
```

* If you press **`q`** or **Ctrl+C**, the app quits.
* If you press **Enter**:

  * At step 0: it remembers the source language and moves to step 1
  * At step 1: it remembers the target language and quits
* Otherwise, it lets the list update with up/down keys.

---

### 👀 `View()`

Shows what you see in the terminal.

```go
func (m teaModel) View() string
```

* If quitting, it prints `"Aborted.\n"`
* If choosing languages, it shows the scrollable list
* After selection, it hides everything

---

## 🧪 item Type

Each language item has:

* Title = name of language
* Description = short code like `en` or `fr`

```go
func (i item) Title() string       { return string(i) }
func (i item) FilterValue() string { return string(i) }
func (i item) Description() string { return data.LangMap[string(i)] }
```

---

<!--Cobra is Highly un necessary in this project I added it cause I was going throung the project without a proper plan-->
## 🐍 cobra Explanation (Command/Flags)

### 🧠 `rootCmd`

This is the main command. It runs when you type `translate` in terminal.

```go
var rootCmd = &cobra.Command{
  Use:   "translate",
  Short: "Translate CLI",
  Long:  "Translate CLI using Lingva API",
  Run: func(cmd *cobra.Command, args []string) {
    ...
  },
}
```

### 🎏 Flag Setup

You can turn on "verbose mode" by adding `-v` when running.

```go
rootCmd.PersistentFlags().BoolP("verbose", "v", false, "enable verbose output")
```

---

### ▶️ `Execute()`

This runs the command and prints a big banner first.

```go
func Execute() {
  fmt.Print(`...`)
  rootCmd.Execute()
}
```

If something fails, it prints the error and exits.

---

## 🚀 How `main()` Works

```go
func main() {
  fmt.Println("Welcome to Translate CLI!")
  command.Execute()
}
```

* It shows a welcome message.
* Then it runs the command logic, which:

  1. Starts the language picker
  2. Lets you type your text
  3. Calls the internet to translate it
  4. Prints the result

---

## 🗺️ Extra: `data` Package

* `LangMap`: maps names like `"Hindi"` to codes like `"hi"`
* `URL`: is the address used to ask for the translation

```go
var LangMap = map[string]string{
  "Detect language": "auto",
  "Zulu":            "zu",
}
```