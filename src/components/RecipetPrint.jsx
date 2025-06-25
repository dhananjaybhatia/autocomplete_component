import { useLocation } from "react-router-dom";

const RecipePrint = () => {
  const { state } = useLocation();
  const recipe = state?.recipe;

  if (!recipe) return <div className="p-10 text-center">No recipe found.</div>;

  return (
    <div className="p-10 max-w-4xl mx-auto text-gray-900 print:p-4">
      <h1 className="text-4xl text-orange-500 font-bold mb-2">{recipe.name}</h1>
      <p className="mb-4 text-sm text-orange-600">
        (Cuisine: {recipe.cuisine})
      </p>

      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      <p>
        <strong>Calories:</strong> {recipe.caloriesPerServing}
      </p>
      <p>
        <strong>Prep Time:</strong> {recipe.prepTimeMinutes} min
      </p>
      <p>
        <strong>Cook Time:</strong> {recipe.cookTimeMinutes} min
      </p>
      <p>
        <strong>Difficulty:</strong> {recipe.difficulty}
      </p>
      <p>
        <strong>Meal Type:</strong> {recipe.mealType?.join(", ")}
      </p>
      <p>
        <strong>Servings:</strong> {recipe.servings}
      </p>
      <p>
        <strong>Rating:</strong> {recipe.rating} ⭐ ({recipe.reviewCount})
      </p>

      <h3 className="mt-6 font-semibold text-lg">Ingredients:</h3>
      <ul className="list-disc pl-5">
        {recipe.ingredients.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>

      <h3 className="mt-6 font-semibold text-lg">Instructions:</h3>
      <ol className="list-decimal pl-5">
        {recipe.instructions.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipePrint;
