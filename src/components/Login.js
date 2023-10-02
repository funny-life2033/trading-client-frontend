import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { login, userVerification } from "../utils/apis";
import { useCookies } from "react-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const setEmailAddress = (value) => {
    setEmail(value);
    setCookie("email", value);
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message, user } = await login({ email, password });
    if (success) {
      handleSuccess(message);
      setTimeout(() => {
        if (user.isVerified) {
          navigate("/");
        } else {
          navigate("/sendVerificationCode");
        }
      }, 1000);
    } else {
      handleError(message);
    }
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    const verifyCookie = async () => {
      if (cookies.token) {
        const { status, user } = await userVerification();
        console.log("status", status);
        if (status) {
          if (user.isVerified) {
            navigate("/");
          } else {
            navigate("/sendVerificationCode");
          }
        } else {
          removeCookie("token");
        }
      }
    };
    verifyCookie();
  }, [cookies, removeCookie, navigate]);

  return (
    <div className="form_container">
      <h2>Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
