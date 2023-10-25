import React, { useState } from "react";
import { database } from "../../back/firebaseConfig";
import './passwordLoginWithFirebase.css';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function RegisterAndlogin() {
  const [login, setLogin] = useState(false);
  const history = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, type: string) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    if (type === "signup") {
      createUserWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, "AuthData");
          history("./home");
        })
        .catch((err) => {
          alert(err.code);
          setLogin(true);
        });
    } else {
      signInWithEmailAndPassword(database, email, password)
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
      <div className="Leftbar">
        {/* Registration and login Screen */}
        <div className="row">
          <div
            id="rightSpace"
            className={login === false ? "activeColor" : "pointer"}
            onClick={() => setLogin(false)}
          >
            Sign Up
          </div>
          <div
            className={login === true ? "activeColor" : "pointer"}
            onClick={() => setLogin(true)}
          >
            Sign In
          </div>
        </div>
        <div className="row2">
          <h1 id="h1Sign">{login ? "Sign In" : "Sign Up"}</h1>
          <form onSubmit={(e) => handleSubmit(e, login ? "signin" : "signup")}>
            <input id='inputMail' name="email" placeholder="Email" />
            <br />
            <input id='inputPassword' name="password" type="password" placeholder="Password" />
            <br />
            <button type="submit">{login ? "Sign In" : "Sign Up"}</button>
          </form>
        </div>
      </div>
      <div className="image">
        <img id="imagelock" src="https://cdn.discordapp.com/attachments/1153239879220740159/1166667262946717826/image.png?ex=654b528f&is=6538dd8f&hm=c1b05fddb2536d9e277aee6bf0eee2867e408160d3319a4a6506fba146d4105d&" alt="Fond" />
      </div>
    </div>
  );
}

export default RegisterAndlogin;
