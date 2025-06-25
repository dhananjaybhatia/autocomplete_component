import { useEffect, useState } from "react";
import SuggestionList from "./SuggestionList";

const AutoComplete = ({
  placeholder = "",
  label,
  // staticData,
  fetchSuggestions,
  dataKey = "",
  customLoading = "Loading...",
  onSelect = () => {},
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debounceValue, setDebouncevalue] = useState("");
  const [cache, setCache] = useState({});

  const CACHE_EXPIRY = 30 * 1000; // 30 seconds

  useEffect(() => {
    const handleDebounce = setTimeout(() => {
      setDebouncevalue(inputValue);
    }, 300);
    return () => clearTimeout(handleDebounce);
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  const getSuggestions = async (query) => {
    setError(null);
    setLoading(true);

    if (cache[query] && Date.now() - cache[query].timestamp < CACHE_EXPIRY) {
      setSuggestions(cache[query].data);
      setLoading(false);
      return;
    }

    try {
      let results = [];
      if (fetchSuggestions) {
        results = await fetchSuggestions(query);
      }
      setCache((prev) => ({
        ...prev,
        [query]: {
          data: results,
          timestamp: Date.now(),
        },
      }));
      setSuggestions(results);
    } catch (err) {
      setError("Failed to fetch suggestions: ", err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceValue.length > 1) {
      getSuggestions(debounceValue);
    } else {
      setSuggestions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  const handleSuggestionClick = (suggestion) => {
    setInputValue(dataKey ? suggestion[dataKey] : dataKey);
    onSelect(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-medium text-amber-800 tracking-tight">
        {label}
      </h1>
      <input
        type="text"
        value={inputValue}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        onChange={handleInputChange}
        className="w-[500px] mt-5 px-4 py-3 border border-bg-[#3c3c2f] rounded-full focus:outline-none"
      />
      {(suggestions.length > 0 || error || loading) && (
        <ul className="mt-1 w-[500px] mx-auto border rounded-lg tracking-wider bg-[#a6a683] shadow-lg max-h-60 overflow-y-auto text-left">
          {error && <li className="text-red-600 px-4 py-2">{error}</li>}
          {loading && (
            <li className="text-[#240046] px-4 py-2">{customLoading}</li>
          )}
          <SuggestionList
            suggestions={suggestions}
            dataKey={dataKey}
            highlight={inputValue}
            onSuggestionClick={handleSuggestionClick}
          />
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
