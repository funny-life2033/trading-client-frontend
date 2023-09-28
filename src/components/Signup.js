import { useState } from "react";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setEmailAndValidation = (value) => {
    setEmail(value);
  };

  const signup = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={signup}>
      <input
        type="text"
        name="firstname"
        placeholder="First Name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <input
        type="text"
        name="lastname"
        placeholder="Last Name"
        value={lastname}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        name="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmailAndValidation(e.target.value)}
      />
      <input
        type="text"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Submit</button>
    </form>
  );
};

export default Signup;
