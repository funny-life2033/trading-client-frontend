import { useEffect, useState } from "react";
import { sendVerificationCode } from "../utils/apis";

const SendVerificationCode = () => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const send = async () => {
      try {
        await sendVerificationCode();
        setMessage("Verification code was sent! Please check your inbox.");
      } catch (error) {
        console.log(error);
        setMessage("Please try again to send verification code.");
      }
    };
    send();
  }, []);

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};

export default SendVerificationCode;
