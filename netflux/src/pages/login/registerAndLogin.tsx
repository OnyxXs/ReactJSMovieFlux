import React, { useState } from "react";
import { auth, createUserDocument } from "../../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function RegisterAndlogin() {
  const [login, setLogin] = useState(false);
  const history = useNavigate();
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    type: string
  ) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const displayName = e.currentTarget.displayname.value;
    if (type === "signup") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((data) => {
          console.log(data, "AuthData");
          history("./home");
        })
        .catch((err) => {
          alert(err.code);
          setLogin(true);
        });
      await createUserDocument(auth, { displayName });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((data) => {
          console.log(data, "AuthData");
          history("./home");
        })
        .catch((err) => {
          alert(err.code);
          setLogin(true);
        });
    }
  };

  return (
    <div className="App">
      {/* Registration and login Screen */}
      <div className="row">
        <div
          className={login === false ? "activeColor" : "pointer"}
          onClick={() => setLogin(false)}
        >
          SignUp
        </div>
        <div
          className={login === true ? "activeColor" : "pointer"}
          onClick={() => setLogin(true)}
        >
          SignIn
        </div>
      </div>
      <h1>{login ? "SignIn" : "SignUp"}</h1>
      <form onSubmit={(e) => handleSubmit(e, login ? "signin" : "signup")}>
        <input name="email" placeholder="Email" />
        <br />
        <input name="password" type="password" placeholder="Password" />
        <br />
        <button type="submit">{login ? "SignIn" : "SignUp"}</button>
      </form>
    </div>
  );
}

export default RegisterAndlogin;
