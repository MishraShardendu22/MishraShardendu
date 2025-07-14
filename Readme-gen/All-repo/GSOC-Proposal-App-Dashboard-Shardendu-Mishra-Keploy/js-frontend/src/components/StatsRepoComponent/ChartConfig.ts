// ChartConfig.ts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
} from 'chart.js'

// Register all the Chart.js components
export function registerCharts() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    RadialLinearScale
  )
}

// Utility function to generate colors for charts
export const generateColors = (count: number) => {
  const colors = []
  const transparentColors = []

  for (let i = 0; i < count; i++) {
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)

    colors.push(`rgba(${r}, ${g}, ${b}, 0.8)`)
    transparentColors.push(`rgba(${r}, ${g}, ${b}, 0.2)`)
  }

  return { colors, transparentColors }
}

// Initialize charts
registerCharts()