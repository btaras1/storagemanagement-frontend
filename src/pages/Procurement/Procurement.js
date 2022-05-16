import { useEffect, useState } from "react";
import { getAllProcurements } from "../../api/procurement";
import { FormOneRow, LeftColumn, RightColumn, FormRow } from "../../components/Form/FormSyle";
import Modal from "../../components/Modal/Modal";
import ProcurementForm from "../../components/ProcurementForm/ProcurementForm";
import ProcurementTable from "../../components/ProcurementTable/ProcurementTable";
import SearchBar from "../../components/SearchBar/SearchBar";
import Section from "../../components/Section/Section";
import { AddButton,  InputLabel, Main, OptionText, SelectText } from "../../lib/style/generalStyles";

const Procurement = () => {
  const authToken = localStorage.getItem("authToken");

const [addPressed, setAddPressed] = useState(false);
const [data, setData] = useState(null);
const [reservedData, setReservedData] = useState(null);
const [option, setOption] = useState("Broj");

const initialFetchData = async () => {
    await getAllProcurements(authToken).then((items) => {
      setData(items);
      setReservedData(items);
    });
  }

  const openAddModal = () => {
    setAddPressed(!addPressed);
  };
  
  useEffect(() => {
    // declare the data fetching function
    
  
    // call the function
    initialFetchData()
      // make sure to catch any error
      .catch(console.error);

  }, [])
  const [input, setInput] = useState("");
  const updateInput = (input) => {
    switch (option) {
      case "Broj":
        const filteredProcurementsId = reservedData.filter((procurement) => {
          console.log(procurement);
          return procurement.id.toString().toLowerCase().includes(input.toLowerCase());
        });
        setInput(input);
        setData(filteredProcurementsId);

        break;
      case "Datum":
        const filteredProcurementsDate = reservedData.filter((procurement) => {
          console.log(procurement);
          return procurement.created.toString().toLowerCase().includes(input.toLowerCase());
        });
        setInput(input);
        setData(filteredProcurementsDate);

        break;

    }
  };

  return (
    <>
    <Main>
      <Section title="Nabava">
        <FormRow><InputLabel>Pretraži :</InputLabel></FormRow>
      <FormRow>
        
        <LeftColumn>
                <SelectText
                  type="select"
                  value={option}
                  onChange={(e) => setOption(e.target.value)}
                >
              <OptionText value="Broj">Po broju dokumenta</OptionText>
              <OptionText value="Datum">Po datumu dokumenta</OptionText>
            </SelectText>
            </LeftColumn>
            <RightColumn>
                <SearchBar
                  input={input}
                  setInput={updateInput}
                  isDisabled={false}
                  placeholder={"Pretraži nabave po odabranom filteru"}
                />
                </RightColumn>
              </FormRow>
            <ProcurementTable fetchData={initialFetchData} data={data}/>
            
      </Section>
    </Main>
    </>
  );
};

export default Procurement;