import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";

const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);

  useState(() => {
    const fetchCocktail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}${id}`);
        const data = await response.json();
        const { drinks } = data;

        if (drinks) {
          const {
            strDrink: name,
            strCategory: category,
            strAlcoholic: info,
            strGlass: glass,
            strInstructions: instructions,
            strDrinkThumb: image,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = drinks[0];
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];

          const newCocktail = {
            name,
            category,
            info,
            glass,
            instructions,
            image,
            ingredients,
          };
          setCocktail(newCocktail);
        } else {
          return setCocktail(null);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchCocktail();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!cocktail) {
    return <h2 className="section-title">no cocktail to display</h2>;
  }
  const { name, category, info, glass, instructions, image, ingredients } =
    cocktail;

  return (
    <section className="section cocktail-section">
      <h2 className="section-title">{name}</h2>
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
      <div className="drink">
        <img src={image} alt={name}></img>
        <div className="drinks-info">
          <p>
            <span className="drink-data">name :</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category :</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info :</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass :</span>
            {glass}
          </p>

          <p>
            <span className="drink-data">instructions :</span>
            {instructions}
          </p>

          <p>
            <span className="drink-data">ingredients :</span>
            {ingredients.map((item, index) => {
              return item ? <span key={index}>{item}</span> : null;
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
