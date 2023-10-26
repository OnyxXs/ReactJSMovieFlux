import React, { useState } from "react";

const MyComponent = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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

  return (
    <div>
      <input
        type="checkbox"
        value="Action"
        onChange={handleCategoryChange}
        placeholder="Categorie1"
      />{" "}
      Action
      <input
        type="checkbox"
        value="Comedie"
        onChange={handleCategoryChange}
        placeholder="Categorie2"
      />{" "}
      Comedie
      <input
        type="checkbox"
        value="Horror"
        onChange={handleCategoryChange}
        placeholder="Categorie3"
      />{" "}
      Horror
      {/* Ajoutez autant d'inputs que nécessaire pour chaque catégorie... */}
      <div>Catégories sélectionnées: {selectedCategories.join(", ")}</div>
    </div>
  );
};

export default MyComponent;
