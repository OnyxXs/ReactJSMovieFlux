import React, { useState } from "react";
import { database } from "../../back/firebaseConfig";
import "./passwordLoginWithFirebase.css";
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
            <input id="inputMail" name="email" placeholder="Email" />
            <br />
            <input
              id="inputPassword"
              name="password"
              type="password"
              placeholder="Password"
            />
            <br />
            <button type="submit">{login ? "Sign In" : "Sign Up"}</button>
          </form>
        </div>
      </div>

      <div className="image">
        <img
          id="imagelock"
          src="https://media.discordapp.net/attachments/1166370986355064844/1167367538997460993/image.png?ex=654ddebd&is=653b69bd&hm=46139017d884fd38c1f4ed40cc43b30fd4182b19216ea50373c5176d875994a3&=&width=1262&height=1128"
          alt="Fond"
        />
      </div>

      <div className="overlay">
        <img
          src="https://cdn.discordapp.com/attachments/1166370986355064844/1166728272751628390/AddText_10-25-03.21.23.png?ex=654b8b60&is=65391660&hm=20ee96d2ca0ecfcb6bbba7ec74307286069480762a016c5ea91f38572ce1bd6c&"
          alt="Image overlay"
        />
      </div>

      <div className="overlay-logo">
        <img
          id="logoimg"
          src="https://media.discordapp.net/attachments/1166370986355064844/1166726811795853322/bdEgzhNKDbngnvEkLVN7--4--hm6l8.jpg?ex=654b8a04&is=65391504&hm=5d0bb72a23a144bee0ed46fa9fd5c4e853570b82cb0bb29b87eaf487197f078c&=&width=671&height=671"
          alt="Logo overlay"
        />
      </div>
    </div>
  );
}

export default RegisterAndlogin;
