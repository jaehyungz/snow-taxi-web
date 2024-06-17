import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import BottomNav from "./components/BottomNav";
import TaxiRouteListPage from "./pages/TaxiRouteListPage";
import RePasswordPage from "./pages/RePasswordPage";
import EmailcheckPage from "./pages/EmailcheckPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import ChattingPage from "./pages/ChattingPage";
import TaxiPotListPage from "./pages/TaxiPotListPage";
import MyChattingPage from "./pages/MyChattingPage";
import HistoryPage from "./pages/HistoryPage";
import HistoryChattingPage from "./pages/HistoryChattingPage";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <BottomNav />
            <TaxiRouteListPage />
          </>
        }
      />
      <Route path="Home/" element={<Home />}>
        <Route path="MyPage" element={<MyPage />} />
        <Route path="Chatting" element={<ChattingPage />} />
        <Route path="TaxiPotList" element={<TaxiPotListPage />} />
        <Route path="MyChatting" element={<MyChattingPage />} />
        <Route path="History" element={<HistoryPage />} />
        <Route path="History/:potId" element={<HistoryChattingPage />} />
      </Route>

      <Route path="/RePassword" element={<RePasswordPage />} />
      <Route path="/Emailcheck" element={<EmailcheckPage />} />
      <Route path="/Signup" element={<SignupPage />} />
      <Route path="/Login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
