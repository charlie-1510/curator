import { useState } from "react";
export const Search = ({ setLibrary, searchTerm, setSearchTerm }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = ({ target: { value } }) => {
    setSearchInput(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target[0].value !== "") {
      if (event.target[0].value !== searchTerm) {
        setLibrary([]);
        setSearchTerm(event.target[0].value);
      }
    } else {
      setSearchTerm("");
    }
    setSearchInput("");
  };

  return (
    <div className="search">
      <div className="">
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="searchBar">Search here: </label> */}
          <input
            id="searchBar"
            type="text"
            placeholder="Search ..."
            onChange={handleChange}
            value={searchInput}
          ></input>
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};
