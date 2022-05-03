import { useEffect, useState } from "react";
import Section from "../../components/Section/Section";
import { getAllBuyers, getAllBuyersDetail } from "../../api/buyer";
import SearchBar from "../../components/SearchBar/SearchBar";
import {
  Table as TableStyle,
  TableHead,
  TableRow,
  TableData,
  THead,
  TableBody,
} from "../../components/ItemTable/TableStyle";
import {
  FormRow,
  SelectText,
  OptionText,
  RightColumn,
  LeftColumn,
} from "../../components/Form/FormSyle";

const Buyers = () => {
  const authToken = localStorage.getItem("authToken");
  const [buyers, setBuyers] = useState([]);
  const [buyersDefault, setBuyersDefault] = useState([]);
  const [input, setInput] = useState("");
  const [option, setOption] = useState("");
  const head = [
    "Ime",
    "Prezime",
    "Adresa",
    "Grad",
    "Mobitel"
  ];

  async function getBuyers() {
    getAllBuyers(authToken).then(function (items) {
      setBuyersDefault(items);
      setBuyers(items);
    });
  }

  useEffect(() => {
    getBuyers();
  }, []);

  const updateInput = (input) => {
    switch (option) {
      case "Ime":
        setBuyers(buyersDefault);
        const filteredName = buyersDefault.filter((buyer) => {
          return buyer.firstname.toLowerCase().includes(input.toLowerCase());
        });
        setInput(input);
        setBuyers(filteredName);

        break;
      case "Grad":
        const filteredCity = buyersDefault.filter((buyer) => {
          return buyer.city.toLowerCase().includes(input.toLowerCase());
        });
        setInput(input);
        setBuyers(filteredCity);

        break;

    }
  };
  return (
    <>
      <Section title="KUPCI">
        <FormRow>
          <LeftColumn>
            <SelectText
              type="select"
              value={option}
              onChange={(e) => setOption(e.target.value)}
            >
              <OptionText value="">---Odaberi---</OptionText>
              <OptionText value="Ime">Ime</OptionText>
              <OptionText value="Grad">Grad</OptionText>
            </SelectText>
          </LeftColumn>
          <RightColumn>
            <SearchBar
              input={input}
              setInput={updateInput}
              isDisabled={false}
            />
          </RightColumn>
        </FormRow>
        {buyers ? (
          <>
            <TableStyle>
              <THead>
                <TableRow>
                  {head.map((title) => (
                    <TableHead>{title}</TableHead>
                  ))}
                </TableRow>
              </THead>
              <TableBody>
                {buyers.map((content) => (
                  <TableRow>
                    <TableData>{content.firstname}</TableData>
                    <TableData>{content.lastname}</TableData>
                    <TableData>{content.adress}</TableData>
                    <TableData>{content.city}</TableData>
                    <TableData>{content.mobile}</TableData>
                  </TableRow>
                ))}
              </TableBody>
            </TableStyle>
          </>
        ) : (
          <Section title="LOADING..." />
        )}
      </Section>
    </>
  );
};

export default Buyers;