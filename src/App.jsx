import { useState } from "react";
import AutoComplete from "./components/AutoComplete";
import axios from "axios";
import RecipeModal from "./components/RecipeModal";

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
    <>
      <h1 className="text-7xl text-center mt-4 font-bold">
        Autocomplete Component
      </h1>
      <AutoComplete
        placeholder={"Enter Recipe Name..."}
        label={"Search for Recipes"}
        // staticData={staticData}
        fetchSuggestions={fetchSuggestions}
        dataKey={"name"}
        customLoading={<>Loading Recipes...</>}
        onSelect={(recipe) => {
          console.log("🍽️ Selected recipe:", recipe);
          setSelectedRecipe(recipe);
        }}
        onChange={(input) => {}}
        onBlur={(e) => {}}
        onFocus={(e) => {}}
      />
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </>
  );
}

export default App;
