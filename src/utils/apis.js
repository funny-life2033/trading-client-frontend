import Axios from "./axios";

export const signup = async (input) => {
  try {
    const { data } = await Axios.post("/auth/signup", input, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.log(error);
    return { message: "Failed!" };
  }
};

export const login = async (input) => {
  try {
    const { data } = await Axios.post("/auth/login", input, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.log(error);
    return { message: "Failed!" };
  }
};

export const userVerification = async () => {
  try {
    const { data } = await Axios.post("/auth", {}, { withCredentials: true });
    return data;
  } catch (error) {
    console.log(error);
    return { status: false };
  }
};

export const sendVerificationCode = async () => {
  try {
    await Axios.post(
      "/auth/sendVerificationCode",
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.log(error);
  }
};

export const emailVerify = async (code) => {
  try {
    await Axios.post("/auth/emailVerify", { code }, { withCredentials: true });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const emailValidate = async (email) => {
  try {
    const { data } = await Axios.post(
      "/auth/emailValidate",
      { email },
      { withCredentials: true }
    );
    return { valid: data.valid };
  } catch (error) {
    console.log(error);
    return null;
  }
};
