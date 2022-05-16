import { useContext, useEffect, useState } from "react";
import { getAllItems } from "../../api/item";
import { getAllColors } from "../../api/color";
import Section from "../../components/Section/Section";
import ItemTable from "../../components/ItemTable/ItemTable";
import { FormRow, Main } from "../../lib/style/generalStyles";
import { SelectText } from "../../lib/style/generalStyles";
import { OptionText } from "../../lib/style/generalStyles";
import { AddButton } from "../../lib/style/generalStyles";
import ItemForm from "../../components/ItemForm/ItemForm";
import Modal from '../../components/Modal/Modal';
import DataLoader from "../../components/DataLoader/DataLoader";

const Item = () => {

    const [data, setData] = useState(null);
    const [addPressed, setAddPressed] = useState(false);
    const [defaultData, setDefaultData] = useState([]);
    const [colorData, setColorData] = useState([]);
    const [option, setOption] = useState("");
    const [head, setHead] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const authToken = localStorage.getItem("authToken");


  const handleChange = () => {
    setRefresh(!refresh);
  }

    const fetchData = async () => {
      await getAllItems(authToken).then((items) => 
      {
        console.log("items");
        console.log(items);
        setDefaultData(items);
        
      });
      await getAllColors(authToken).then((items)=>setColorData(items));
      
    }
    const initialFetchData = async () => {
      await getAllItems(authToken).then((items) => setDefaultData(items));
      await getAllColors(authToken).then((items)=>setColorData(items));
      setOption("DOOR");
    }

    async function getItems() {
        setData(null);
        getAllItems(authToken).then((items) => setDefaultData(items));
      }

      const updateView = (selectOption) => {
        
        switch (selectOption) {
          case "DOOR":
            console.log(defaultData);
            const doors = defaultData.filter((item) => {
              return item.itemType.value === "DOOR";
            });
            console.log(doors);
            setHead(["Naziv","Boja"]);
            setData(doors);
    
            break;
          case "GUIDE":
            const guides = defaultData.filter((item) => {
              return item.itemType.value === "GUIDE";
            });
            console.log(guides);
            setHead(["Naziv"]);
            setData(guides);
    
            break;
          case "MOTOR":
            const motors = defaultData.filter((item) => {
              return item.itemType.value === "MOTOR";
            });
            console.log(motors);
            setHead(["Naziv", "Vodilica potrebna"]);
            setData(motors);
            break;
          case "SUSPENSION":
            console.log("AFTER");
            console.log(defaultData);
              const suspensions = defaultData.filter((item) => {
                return item.itemType.value === "SUSPENSION";
              });
              console.log(suspensions);
              setHead(["Naziv"]);
              setData(suspensions);
              break;
          case "COLOR":
            console.log(colorData);
            setHead(["Naziv"]);
            setData(colorData);
        }
      };

      const openModal = () => {
        setAddPressed(!addPressed);
      };

      useEffect(() => {
        initialFetchData()
          .catch(console.error);

      }, [])

      {/*useEffect(() => {
        getItems();
        setData(defaultData);
        updateView("Door");
      }, []);*/}

      useEffect(() => {
        updateView(option);
      }, [option]);

      useEffect(() => {
        updateView(option);
      }, [defaultData]);


    return (
        <>
          {addPressed  && (
            <Modal title={"Artikli"} setModal={openModal}>
              <ItemForm
              isDoor={option === "DOOR" ? true : false }
              isMotor={option === "MOTOR" ? true : false}
              type={option}
              passedItem={null}
              fetchData={handleChange}
              refresh={refresh}
              />
            </Modal>
            )}
            <Main>
                <Section title={"Artikli"} withoutTopPadding={false}>
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
              <OptionText value="DOOR">Vrata</OptionText>
              <OptionText value="GUIDE">Vodilice</OptionText>
              <OptionText value="MOTOR">Motori</OptionText>
              <OptionText value="SUSPENSION">Ovjesi</OptionText>
              <OptionText value="COLOR">Boje</OptionText>
            </SelectText>
              </FormRow>
                  {data ? (
                    <ItemTable
                    title = {"Artikli"}
                    head = {head}
                    data = {data}
                    type = {option}
                    fetchData={fetchData}
                    refresh={refresh}
                    
                    />
                  ):(
                    <Section withoutTopPadding={true}>
                    <DataLoader />
                    </Section>
                  ) 
                  }
                <AddButton
                onClick={() => openModal()}>
                Dodaj
                </AddButton>
                </Section>
            </Main>
        </>
    );
}

export default Item;