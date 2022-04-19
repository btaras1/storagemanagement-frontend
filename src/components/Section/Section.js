import React from "react";
import {
  Section as SectionWrapper,
  SectionWithoutTopPadding,
  Title,
} from "./SectionStyle";

const Section = ({ children, title, withoutTopPadding }) => {
  return (
    <>
      {withoutTopPadding ? (
        <SectionWithoutTopPadding>
          {title && <Title>{title}</Title>}
          {children}
        </SectionWithoutTopPadding>
      ) : (
        <SectionWrapper>
          {title && <Title>{title}</Title>}
          {children}
        </SectionWrapper>
      )}
    </>
  );
};
export default Section;
