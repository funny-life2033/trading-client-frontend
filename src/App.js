import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SendVerificationCode from "./components/SendVerificationCode";
import EmailVerify from "./components/EmailVerify";
import Checkout from "./components/Checkout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="sendVerificationCode" element={<SendVerificationCode />} />
        <Route path="verify/:verificationCode" element={<EmailVerify />} />
        <Route path="signals" element={<>signals</>} />
        <Route path="help" element={<>help</>} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="/" element={<>home</>} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Router>
  );
}

export default App;
