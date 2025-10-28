import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./pages/user/Registration";
import Login from "./pages/user/Login";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import MainLayout from "./layouts/MainLayout";
import VotingCard from "./components/user/VotingCard";
import AdminPage from "./layouts/AdminPage";
import AdminLogin from "./pages/admin/auth/AdminLogin";
import Votes from "./pages/admin/votes/Votes";
import Voters from "./pages/admin/voters/Voters";
import Positions from "./pages/admin/positions/PositionsPage";
import Candidates from "./pages/admin/candidates/CandidatesPage";
import BallotPosition from "./pages/admin/ballot-position/BallotPosition";
import ElectionTitle from "./pages/admin/election-title/ElectionTitle";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Registration />} />

        {/* student routes */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <VotingCard />
            </MainLayout>
          }
        />

        {/* admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminPage />}>
          {/* Routes for REPORTS */}
          <Route index element={<AdminDashboard />} />
          <Route path="votes" element={<Votes />} />

          {/* Routes for MANAGE */}
          <Route path="voters" element={<Voters />} />
          <Route path="positions" element={<Positions />} />
          <Route path="candidates" element={<Candidates />} />

          {/* Routes for SETTINGS */}
          <Route path="ballot-position" element={<BallotPosition />} />
          <Route path="election-title" element={<ElectionTitle />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default App;
