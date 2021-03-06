import React from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();

  const searchValue = React.useRef("");

  const handleSub = (e) => {
    e.preventDefault();
  };

  const handleChange = () => {
    return setSearchTerm(searchValue.current.value);
  };

  React.useEffect(() => {
    searchValue.current.focus();
  }, []);
  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSub}>
        <div className="form-control">
          <label htmlFor="name">search your favourite cocktail: </label>
          <input
            type="text"
            id="name"
            ref={searchValue}
            onChange={handleChange}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
