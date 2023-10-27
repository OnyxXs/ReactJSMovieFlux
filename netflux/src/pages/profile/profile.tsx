import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import './profile.css'
import {
  Auth,
  getAuth,
  onAuthStateChanged,
  signOut,
  User,
  updateEmail,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import Categories from "../../components/categories";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [newEmail, setNewEmail] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [updateStatus, setUpdateStatus] = useState<
    "IDLE" | "PENDING" | "SUCCESS" | "ERROR"
  >("IDLE");
  const navigate = useNavigate();
  const authInstance: Auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (currentUser) => {
      console.log("État de l'authentification changé:", currentUser);
      if (currentUser) {
        setUser(currentUser);
        fetchUserCategory(currentUser.uid);
      } else {
        setUser(null);
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate, authInstance]);

  const fetchUserCategory = async (uid: string) => {
    const db = getFirestore();
    const userDoc = doc(db, "users", uid);

    try {
      const docSnap = await getDoc(userDoc);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData && userData.genres) {
          setSelectedGenres(userData.genres);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des genres: ", error);
    }
  };
  const handleSignOut = () => {
    signOut(authInstance)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Erreur lors de la déconnexion: ", error);
      });
  };

  const handleSendEmailVerification = () => {
    if (user) {
      sendEmailVerification(user)
        .then(() => {
          alert("E-mail de vérification envoyé!");
        })
        .catch((error) => {
          console.error(
            "Erreur lors de l'envoi de l'e-mail de vérification: ",
            error
          );
          alert("Erreur lors de l'envoi de l'e-mail de vérification.");
        });
    }
  };

  const handleSendPasswordResetEmail = () => {
    if (user && user.email) {
      sendPasswordResetEmail(getAuth(), user.email)
        .then(() => {
          alert(
            "Lien de réinitialisation du mot de passe envoyé à votre e-mail!"
          );
        })
        .catch((error) => {
          console.error(
            "Erreur lors de l'envoi du lien de réinitialisation: ",
            error
          );
          alert("Erreur lors de l'envoi du lien de réinitialisation.");
        });
    }
  };

  const handleEmailUpdate = () => {
    if (user && newEmail) {
      setUpdateStatus("PENDING");
      updateEmail(user, newEmail)
        .then(() => {
          setUpdateStatus("SUCCESS");
          alert("Email mis à jour avec succès!");
          setUser(authInstance.currentUser);
        })
        .catch((error) => {
          setUpdateStatus("ERROR");
          console.error("Erreur lors de la mise à jour de l'e-mail: ", error);
          alert("Erreur lors de la mise à jour de l'e-mail.");
        });
    }
  };

  return (
    <div>
      <h1 className="h1">Profil Utilisateur</h1>
      {user ? (
        <>
          <p>Vous êtes connecté en tant que : {user.email}</p>

          <h2 className="h2">Changer votre email :</h2>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Entrez votre nouvel e-mail"
          />
          <button onClick={handleEmailUpdate}>Mettre à jour l'e-mail</button>
          {updateStatus === "PENDING" && <p>Mise à jour en cours...</p>}
          {updateStatus === "SUCCESS" && <p>Email mis à jour avec succès.</p>}
          {updateStatus === "ERROR" && <p>Erreur lors de la mise à jour.</p>}

          <h2 className="h2">Changer votre mot de passe :</h2>
          <button onClick={handleSendPasswordResetEmail}>
            Envoyer le lien de réinitialisation du mot de passe
          </button>

          <button onClick={handleSignOut}>Déconnexion</button>
        </>
      ) : (
        <p>Veuillez vous connecter pour accéder à votre profil.</p>
      )}
    </div>
  );
};
export default UserProfile;
