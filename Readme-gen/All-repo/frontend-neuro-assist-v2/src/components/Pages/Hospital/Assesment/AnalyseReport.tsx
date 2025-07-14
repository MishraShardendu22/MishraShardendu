import { Button } from "@/components/ui/button"
import { DocStore } from "@/store/docsStore"
import { Link } from "react-router-dom"

const AnalyseReport = () => {
  const docsName = DocStore(state => state.documentName)
  const docsURL = DocStore(state => state.documentUrl)
  
  return (
    <div>
      <h1>Analysis Report</h1>
      <h3>{docsName}</h3>
      <p>{docsURL}</p>

      <Button>
        Analyse
      </Button>

      <Link
        to="/patient/allReports"
      >
        Back
      </Link>
    </div>
  )
}

export default AnalyseReport
