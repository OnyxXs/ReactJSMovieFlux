import { Auth, UserCredential } from "firebase/auth";
import { auth, firestore } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../types/userTypes";
import "./signup.css";
import { doc, setDoc } from "firebase/firestore";

const SignUp: React.FC = () => {
  const history = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;

    createUserWithEmailAndPassword(auth as Auth, email, password)
      .then(async (data: UserCredential) => {
        setUser({ uid: data.user.uid, email: data.user.email! });

        if (data.user.uid) {
          const userDocRef = doc(firestore, "users", data.user.uid);
          await setDoc(userDocRef, {
            id: data.user.uid,
            email: data.user.email,
          });
        }

        history("/profile");
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  return (
    <div>
      {/* Votre contenu JSX ici */}
      <form onSubmit={handleSubmit}>
        {/* Champs du formulaire et boutons */}
      </form>
      {/* Autres éléments JSX si nécessaire */}
    </div>
  );
};
export default SignUp;
