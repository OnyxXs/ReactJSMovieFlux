import React from "react";

interface CategoriesProps {
  selectedGenres: string[];
}

const Categories: React.FC<CategoriesProps> = ({ selectedGenres }) => {
  return (
    <div>
      <h3>Genres sélectionnés :</h3>
      <ul>
        {selectedGenres.map((genre, index) => (
          <li key={index}>{genre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
