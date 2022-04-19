import { useContext, useEffect, useState } from "react";
import { getAllItems } from "../../api/item";
import Section from "../../components/Section/Section";
import Table from "../../components/Table/Table";
import { FormRow, Main } from "../../lib/style/generalStyles";
import { SelectText } from "../../lib/style/generalStyles";
import { OptionText } from "../../lib/style/generalStyles";

const Item = () => {

    const [data, setData] = useState([]);
    const [defaultData, setDefaultData] = useState([]);
    const [option, setOption] = useState("Door");

    const authToken = localStorage.getItem("authToken");

    async function getItems() {
        setData(null);
        getAllItems(authToken).then((items) => setDefaultData(items));
      }

      const updateView = (selectOption) => {
        
        switch (selectOption) {
          case "Door":
            const doors = defaultData.filter((item) => {
              return item.itemType.value === "DOOR";
            });
            console.log(doors);
    
            break;
          case "Guide":
            const guides = defaultData.filter((item) => {
              return item.itemType.value === "GUIDE";
            });
            console.log(guides);
    
            break;
          case "Motor":
            const motors = defaultData.filter((item) => {
              return item.itemType.value === "MOTOR";
            });
            console.log(motors);
            break;
        }
      };

      useEffect(() => {
        getItems();
        setData(defaultData);
        setOption("Door");
      }, []);

      useEffect(() => {
        updateView(option);
      }, [option]);


    return (
        
            <Main>
              <FormRow>
              <SelectText
              type="select"
              value={option}
              onChange={(e) => {
                console.log(e.target.value);
                setOption(e.target.value);
                }
              }
            >
              <OptionText value="">---Odaberi---</OptionText>
              <OptionText value="Door">Vrata</OptionText>
              <OptionText value="Guide">Vodilice</OptionText>
              <OptionText value="Motor">Motori</OptionText>
            </SelectText>
              </FormRow>
                <Section title={"Artikli"} withoutTopPadding={false}>
                    <Table
                    title = {"Artikli"}
                    head = {["Naziv", "Vodilica potrebna", "Vrsta", "Boja"]}
                    data = {data}
                    />
                </Section>
            </Main>
        
    );
}

export default Item;