const SuggestionList = ({
  suggestions = [],
  highlight,
  dataKey,
  onSuggestionClick,
}) => {
  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));

    return (
      <span>
        {parts.map((part, index) => {
          return part.toLowerCase() === highlight.toLowerCase() ? (
            <b className="text-[#ff006e]" key={index}>
              {part}
            </b>
          ) : (
            part
          );
        })}
      </span>
    );
  };

  return (
    <>
      {suggestions.map((suggestion, index) => {
        const currSuggestion = dataKey ? suggestion[dataKey] : suggestion;
        return (
          <li
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="cursor-pointer px-4 py-2 hover:bg-[#c8c89e] hover:font-medium border-b mb-1"
          >
            {getHighlightedText(currSuggestion, highlight)}
          </li>
        );
      })}
    </>
  );
};

export default SuggestionList;
