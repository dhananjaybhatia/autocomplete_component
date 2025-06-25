import { useState } from "react";
import AutoComplete from "./components/AutoComplete";
import axios from "axios";
import RecipeModal from "./components/RecipeModal";
import RecipePrint from "./components/RecipetPrint";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  // const staticData = [
  //   "Apple",
  //   "Banana",
  //   "Mango",
  //   "Strawberry",
  //   "Blueberry",
  //   "Pineapple",
  //   "Orange",
  //   "Papaya",
  //   "Watermelon",
  //   "Kiwi",
  //   "Peach",
  //   "Cherry",
  //   "Grapes",
  //   "Pomegranate",
  //   "Guava",
  // ];

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/recipes/search?q=${query}`
      );
      return response.data.recipes;
    } catch (error) {
      throw new Error("Failed to fetch suggestions: ", error);
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1 className="text-7xl text-center mt-4 font-bold">
              Autocomplete Component
            </h1>
            <AutoComplete
              placeholder={"Enter Recipe Name..."}
              label={"Search for Recipes"}
              fetchSuggestions={fetchSuggestions}
              dataKey={"name"}
              customLoading={<>Loading Recipes...</>}
              onSelect={(recipe) => {
                console.log("🍽️ Selected recipe:", recipe);
                setSelectedRecipe(recipe);
              }}
            />
            {selectedRecipe && (
              <RecipeModal
                recipe={selectedRecipe}
                onClose={() => setSelectedRecipe(null)}
                onDownload={() =>
                  navigate("/recipe-print", {
                    state: { recipe: selectedRecipe },
                  })
                }
              />
            )}
          </>
        }
      />
      <Route path="/recipe-print" element={<RecipePrint />} />
    </Routes>
  );
}
export default App;
