import { IoMdPrint } from "react-icons/io";

const RecipeModal = ({ recipe, onClose, onDownload }) => {
  const {
    caloriesPerServing,
    cookTimeMinutes,
    cuisine,
    difficulty,
    mealType,
    image,
    ingredients,
    name,
    instructions,
    prepTimeMinutes,
    rating,
    reviewCount,
    servings,
  } = recipe;

  return (
    <div className="flex items-center justify-center overflow-auto mt-5">
      <div className="bg-white w-[90%] max-w-6xl h-[70vh] rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Side - Image */}
        <div className="p-6 bg-gray-100 flex items-center justify-center">
          <img
            src={image}
            alt={name}
            className="rounded-lg object-cover max-h-full max-w-full"
          />
        </div>

        {/* Right Side - Recipe Info */}
        <div className="p-6 overflow-y-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-orange-600 mb-1">
                {name}
              </h1>
              <div className="h-6 w-6 rounded-full bg-orange-400 flex items-center justify-center transform hover:scale-110 transition duration-200">
                <IoMdPrint className="text-amber-100" onClick={onDownload} />
              </div>
            </div>

            <button
              onClick={onClose}
              className="right-6 text-xl transform hover:scale-110 transition duration-200 font-bold text-gray-600 hover:text-red-700"
            >
              ×
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-4">(Cuisine: {cuisine})</p>

          <div className="space-y-2 text-sm">
            <p>
              <strong>Calories:</strong> {caloriesPerServing}
            </p>
            <p>
              <strong>Difficulty:</strong> {difficulty}
            </p>
            <p>
              <strong>Meal Type:</strong> {mealType.join(", ")}
            </p>
            <p>
              <strong>Prep Time:</strong> {prepTimeMinutes} min
            </p>
            <p>
              <strong>Cook Time:</strong> {cookTimeMinutes} min
            </p>
            <p>
              <strong>Servings:</strong> {servings}
            </p>
            <p>
              <strong>Rating:</strong> {rating} ⭐ ({reviewCount} reviews)
            </p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Ingredients:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {ingredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              {instructions.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
