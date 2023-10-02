import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { emailVerify } from "../utils/apis";

const EmailVerify = () => {
  const { verificationCode } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const verify = async () => {
      const result = await emailVerify(verificationCode);
      if (result) {
        setMessage("Email verified successfully");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setMessage(
          "Email verification failed, possibly the link is invalid or expired"
        );
      }
    };

    verify();
  }, [verificationCode, navigate]);

  return <h2>{message}</h2>;
};

export default EmailVerify;
