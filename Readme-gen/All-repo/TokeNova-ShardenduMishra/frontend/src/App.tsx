import { useAccount } from "wagmi";
import {
  HomePage,
  MyEvents,
  MyTickets,
  LandingPage,
  CreateEvent,
} from "./Pages";
import Layout from "./components/Layout";
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const { address } = useAccount();

  return (
    <>
      {address ? (
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            {/* <Route path="/event/:id" element={<EventDetail />} /> */}
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/my-events" element={<MyEvents />} />
            {/* my tickets */}
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
          {/* <Theme /> */}
        </Layout>
      ) : (
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          {/* <Theme /> */}
        </div>
      )}
    </>
  );
};

export default App;