import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { signup, userVerification } from "../utils/apis";
import { useCookies } from "react-cookie";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();

  const setEmailAndValidation = async (value) => {
    setCookie("email", value);
    setEmail(value);
  };

  const submit = async (e) => {
    e.preventDefault();
    const { success, message, user } = await signup({
      firstname,
      lastname,
      email,
      password,
    });

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
    setFirstname("");
    setLastName("");
    setPassword("");
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

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
    <div>
      <h2>Signup Account</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmailAndValidation(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button>Submit</button>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
