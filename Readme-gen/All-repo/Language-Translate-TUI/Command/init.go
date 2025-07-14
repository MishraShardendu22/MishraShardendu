package command

func init() {
  rootCmd.PersistentFlags().BoolP("verbose", "v", false, "enable verbose output")
}