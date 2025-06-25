# AutoComplete Component (React)

A flexible and customizable AutoComplete component built with React. Supports both static data and async API suggestions, debounced input, caching, and keyboard accessibility.

## Features

- Dynamic suggestions as user types
- Debounced input handling (300ms)
- In-memory caching with optional expiry
- Custom loading indicator support
- Graceful error handling
- Click to select suggestion
- Works with both static and async data sources
- Tailwind CSS styling (easily customizable)
- In-memory caching with 30-second expiry (auto-refresh on stale data)
- Matching text is highlighted using RegExp with global + case-insensitive flags
- Print Functionality is also added.

## Tech Stack

- React
- Axios
- Tailwind CSS (for styling)

Also Note - there is an issue with react-router that when you refresh it is unable to find the path and gives 404. I have 404.html component inside public where i have routed any 404 to homepage.

I have hosted this small component on gitPages for users to use and see how it works: 

https://dhananjaybhatia.github.io/autocomplete_component/
