package command

import (
	"bufio"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	data "github.com/MishraShardendu22/Data"
	"github.com/charmbracelet/bubbles/list"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/spf13/cobra"
)

type item string

func (i item) Title() string       { return string(i) }
func (i item) FilterValue() string { return string(i) }
func (i item) Description() string { return data.LangMap[string(i)] }

type teaModel struct {
	list         list.Model
	fromLanguage string
	toLanguage   string
	step         int
	quitting     bool
}

func initialModel() teaModel {
	items := make([]list.Item, 0, len(data.LangMap))
	for k := range data.LangMap {
		items = append(items, item(k))
	}

	l := list.New(items, list.NewDefaultDelegate(), 30, 10)
	l.Title = "Select source language"
	return teaModel{list: l, step: 0}
}

func (m teaModel) Init() tea.Cmd {
	return nil
}

func (m teaModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch msg.String() {
		case "q", "ctrl+c":
			m.quitting = true
			return m, tea.Quit
		case "enter":
			switch m.step {
			case 0:
				if i, ok := m.list.SelectedItem().(item); ok {
					m.fromLanguage = string(i)
					m.step = 1
					m.list.Title = "Select target language"
					return m, nil
				}
			case 1:
				if i, ok := m.list.SelectedItem().(item); ok {
					m.toLanguage = string(i)
					return m, tea.Quit // quit Bubble Tea here after languages selected
				}
			}
		}
	}

	var cmd tea.Cmd
	if m.step < 2 {
		m.list, cmd = m.list.Update(msg)
		return m, cmd
	}

	return m, nil
}

func (m teaModel) View() string {
	if m.quitting {
		return "Aborted.\n"
	}
	switch m.step {
	case 0, 1:
		return m.list.View()
	default:
		return ""
	}
}

var rootCmd = &cobra.Command{
	Use:   "translate",
	Short: "Translate CLI",
	Long:  "Translate CLI using Lingva API",
	Run: func(cmd *cobra.Command, args []string) {
		p := tea.NewProgram(initialModel())
		m, err := p.Run()
		if err != nil {
			fmt.Println("Error:", err)
			os.Exit(1)
		}

		model := m.(teaModel)
		// Now that languages are selected, get text input manually from terminal
		fmt.Printf("Source language selected: %s (%s)\n", model.fromLanguage, data.LangMap[model.fromLanguage])
		fmt.Printf("Target language selected: %s (%s)\n", model.toLanguage, data.LangMap[model.toLanguage])
		fmt.Print("Enter text to translate: ")

		reader := bufio.NewReader(os.Stdin)
		text, err := reader.ReadString('\n')
		if err != nil {
			fmt.Println("Error reading input:", err)
			os.Exit(1)
		}
		text = text[:len(text)-1]

		res, err := http.Get(data.URL + "/" + data.LangMap[model.fromLanguage] + "/" + data.LangMap[model.toLanguage] + "/" + text)
		if err != nil {
			fmt.Println("Error fetching translation:", err)
			os.Exit(1)
		}
		defer res.Body.Close()

		var translation struct {
			Translation string `json:"translation"`
		}
		if err := json.NewDecoder(res.Body).Decode(&translation); err != nil {
			fmt.Println("Error decoding response:", err)
			os.Exit(1)
		}

		fmt.Println("Translation result: ", translation.Translation)
	},
}

func Execute() {
	fmt.Print(`
██╗  ██╗███████╗██╗     ██╗      ██████╗ 
██║  ██║██╔════╝██║     ██║     ██╔═══██╗
███████║█████╗  ██║     ██║     ██║   ██║
██╔══██║██╔══╝  ██║     ██║     ██║   ██║
██║  ██║███████╗███████╗███████╗╚██████╔╝
╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝ 
🔤 T R A N S L A T E   C L I   A C T I V E 🔤
`)

	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
