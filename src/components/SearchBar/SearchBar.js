import React from "react";
import { Container, SearchBar as SearchBarWrapper } from "./SearchBarStyle";
const SearchBar = ({ input, setInput, isDisabled, placeholder }) => {
  return (
    <Container>
      <SearchBarWrapper
        value={input}
        placeholder={placeholder}
        onChange={(event) => setInput(event.target.value)}
        disabled={isDisabled}
      />
    </Container>
  );
};

export default SearchBar;
