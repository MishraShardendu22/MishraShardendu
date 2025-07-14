import Layout from "./Layout";
import Theme from "./store/ThemeStore";
import Home from "./components/LandingPage/LandingPage";
import { Route, Routes } from "react-router-dom";
import NoStroke from "./components/Pages/NoStroke";
import NotFound from "./components/Pages/Not-Found";
import Survey from "./components/Pages/Hospital/Survey";
import AnalyseReport from "./components/Pages/Hospital/Assesment/AnalyseReport";
import AutomatedCTReportAnalysis from "./components/Pages/Hospital/Assesment/Analysis";
import Thrombolysis from "./components/Pages/Hospital/Assesment/Treatment/Thrombolysis";
import Thrombectomy from "./components/Pages/Hospital/Assesment/Treatment/Thrombectomy";
import { GeneralAssesment } from "./components/Pages/Hospital/Assesment/general.assesment";
import Hemorrhage from "./components/Pages/StrokeClassification/Hemorrhage";
import NoHemorrhage from "./components/Pages/StrokeClassification/NoHemorrhage";
import Occulsion from "./components/Pages/StrokeClassification/Occulsion";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patient/survey" element={<Survey />} />
        <Route path="/patient/clot" element={<Occulsion />} />
        <Route path="/patient/NoStroke" element={<NoStroke />} />
        <Route path="/patient/hemmorage" element={<Hemorrhage />} />
        <Route path="/patient/nohemmorage" element={<NoHemorrhage />} />
        <Route path="/patient/thrombectomy" element={<Thrombectomy />} />
        <Route path="/patient/thrombolysis" element={<Thrombolysis />} />
        <Route path="/patient/sendAnalysis" element={<AnalyseReport />} />
        <Route
          path="/patient/generalAssessment"
          element={<GeneralAssesment />}
        />
        <Route
          path="/patient/allReports"
          element={<AutomatedCTReportAnalysis />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Theme />
    </Layout>
  );
};

export default App;
