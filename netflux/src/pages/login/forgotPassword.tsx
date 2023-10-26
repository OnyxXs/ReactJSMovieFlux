import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { auth } from "../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const history = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const emailInput = e.currentTarget.elements.namedItem(
      "email"
    ) as HTMLInputElement;
    e.preventDefault();
    const emailVal = emailInput.value;

    sendPasswordResetEmail(auth, emailVal)
      .then((data) => {
        alert("Check your gmail");
        history("/");
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  return (
    <div className="App">
      <h1>Forgot Password</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input name="email" placeholder="Email" />
        <br />
        <button>Reset</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
