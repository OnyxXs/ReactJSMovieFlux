import React, { useState, useEffect } from "react";
import { auth, firestore } from "../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import {
  User,
  sendEmailVerification,
  updatePassword,
  updateEmail,
} from "firebase/auth";

function UserProfile() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Utilisateur récupéré:", user); // Pour déboguer
      if (user) {
        setCurrentUser(user);
        fetchUserCategory(user.uid);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  async function fetchUserCategory(uid: string) {
    const db = getFirestore();
    const userDoc = doc(db, "Users", uid);

    try {
      const docSnap = await getDoc(userDoc);
      // Ajouter une logique pour gérer le document récupéré
    } catch (error) {
      console.error(error);
    }
  }

  const handleSignOut = () => {
    auth.signOut().then(() => navigate("/login"));
  };

  const handleSendEmailVerification = () => {
    if (currentUser) {
      sendEmailVerification(currentUser)
        .then(() => {
          alert("Email de vérification envoyé");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const handlePasswordUpdate = () => {
    if (currentUser) {
      updatePassword(currentUser, newPassword)
        .then(() => {
          alert("Mot de passe mis à jour avec succès");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const handleEmailUpdate = () => {
    if (currentUser) {
      updateEmail(currentUser, newEmail)
        .then(() => {
          alert("Email mis à jour avec succès");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedCategories((prev) => {
      if (prev.includes(value)) {
        return prev.filter((cat) => cat !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleSaveCategory = () => {
    // Implémenter la logique pour sauvegarder les catégories
  };

  return (
    <div>
      <div>
        Connecté en tant que:{" "}
        {currentUser ? currentUser.email : "Chargement..."}
      </div>
      <input type="file" placeholder="File" />
      <button>Upload</button>
      <img
        src="https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg"
        alt="avatar"
        className="avatar"
      />

      <div>
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Nouvel email"
        />
        <button onClick={handleEmailUpdate}>Changer l'email</button>
      </div>

      <div>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Nouveau mot de passe"
        />
        <button onClick={handlePasswordUpdate}>Changer le mot de passe</button>
      </div>

      <div>
        <label>Sélectionnez vos catégories de films préférées:</label>
        <div>
          <input
            type="checkbox"
            value="Action"
            checked={selectedCategories.includes("Action")}
            onChange={handleCategoryChange}
            placeholder="Action"
          />{" "}
          Action
          <input
            type="checkbox"
            value="Comédie"
            checked={selectedCategories.includes("Comédie")}
            onChange={handleCategoryChange}
            placeholder="Comedie"
          />{" "}
          Comédie
          {/* Ajouter plus de catégories si nécessaire */}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
