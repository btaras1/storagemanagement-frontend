import React from "react";
import { InputText } from "../../lib/style/generalStyles";
const InputBar = ({ input, setInput, isDisabled}) => {
  return (
      <>
      <InputText
        value={input}
        placeholder={"Unesite količinu..."}
        disabled={isDisabled}
        onChange={(event) => setInput(event.target.value)}
      />
      </>
  );
};

export default InputBar;
