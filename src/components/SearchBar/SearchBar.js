import React from "react";
import { Container, SearchBar as SearchBarWrapper } from "./SearchBarStyle";
const SearchBar = ({ input, setInput, isDisabled }) => {
  return (
    <Container>
      <SearchBarWrapper
        value={input}
        placeholder={"Pretraži kupce po odabranom filteru..."}
        onChange={(event) => setInput(event.target.value)}
        disabled={isDisabled}
      />
    </Container>
  );
};

export default SearchBar;
