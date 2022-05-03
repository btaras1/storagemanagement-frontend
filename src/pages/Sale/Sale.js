import { useContext, useEffect, useState } from "react";
import { getAllItems } from "../../api/item";
import { getAllColors } from "../../api/color";
import Section from "../../components/Section/Section";
import SaleTable from "../../components/SaleTable/SaleTable";
import { FormRow, InputLabel, Main } from "../../lib/style/generalStyles";
import { SelectText } from "../../lib/style/generalStyles";
import { OptionText } from "../../lib/style/generalStyles";
import { AddButton } from "../../lib/style/generalStyles";
import ItemForm from "../../components/ItemForm/ItemForm";
import Modal from '../../components/Modal/Modal';
import { getAllItemsInStorages, getAllStorages, getStorage } from "../../api/storage";
import AddToStorageForm from "../../components/AddToStorageForm/AddToStorageForm";
import TransferBetweenStorageForm from "../../components/TransferBetweenStorageForm/TransferBetweenStorageForm";


const Sale = () => {

    const [data, setData] = useState(null);
    const [addPressed, setAddPressed] = useState(false);
    const [transferPressed, setTransferPressed] = useState(false);
    const [defaultData, setDefaultData] = useState([]);
    const [storageData, setStorageData] = useState([]);
    const [colorData, setColorData] = useState([]);
    const [option, setOption] = useState("");
    const [head, setHead] = useState([]);
    const [storageSelected, setStorageSelected] = useState(false);
    const [storage, setStorage] = useState(null);
    const [storageOption, setStorageOption] = useState("")
  
    const authToken = localStorage.getItem("authToken");

    const fetchData = async () => {
      await getAllItemsInStorages(authToken).then((items) => setDefaultData(items));
      await getAllStorages(authToken).then((items) => setStorageData(items));
      updateView(option);
    }
    const initialFetchData = async () => {
      await getAllItemsInStorages(authToken).then((items) => setDefaultData(items));
      await getAllStorages(authToken).then((items) => setStorageData(items));
      setOption("-");
      setStorageOption("-")
    }

    const handleStorageOptionChange = (e) => {
        console.log("handle");
    }

    const fetchStorage = async (id) =>{
      if(storageOption === "-") setStorageSelected(false);
      else {
        await getStorage(id,authToken).then((items) => setStorage(items));
        setStorageSelected(true);
      }
    }

      const updateView = (selectOption) => {
        
        if(storageSelected){
          console.log("STORAGE TRUE");
          switch (selectOption) {
            case "-":
              const setStorageA = storageData.filter(x => x.id === parseInt(storageOption));
              setData(setStorageA);
              setHead(["Naziv","Vrsta","Količina"]);
              break;
            case "DOOR":
              const storageDataDoor = storageData;
              const setStorageD = storageDataDoor.filter(x => x.id === parseInt(storageOption));
              console.log("BEFORE")
              console.log(setStorageD);
              const doors = setStorageD.map(item =>{
                return Object.assign({}, item,{
                  itemStorages: item.itemStorages.filter((x) => x.item.itemType.value === "DOOR")
                })
              });
              console.log("AFTER");
              console.log(setStorageD);
              setHead(["Naziv","Boja","Količina"]);
              console.log("Door data");
              console.log(doors);
              setData(doors);
      
              break;
            case "GUIDE":
              const storageDataGuide = storageData;
              const setStorageG = storageDataGuide.filter(x => x.id === parseInt(storageOption));
              const guides = setStorageG.map(item =>{
                return Object.assign({}, item,{
                  itemStorages: item.itemStorages.filter((x) => x.item.itemType.value === "GUIDE")
                })
              });
              setHead(["Naziv","Količina"]);
              console.log("Guides data");
              console.log(guides);
              setData(guides);
      
              break;
            case "MOTOR":
              const storageDataMotor = storageData;
              const setStorageM = storageDataMotor.filter(x => x.id === parseInt(storageOption));
              const motors = setStorageM.map(item =>{
                return Object.assign({}, item,{
                  itemStorages: item.itemStorages.filter((x) => x.item.itemType.value === "MOTOR")
                })
              });
              setHead(["Naziv", "Vodilica potrebna","Količina"]);
              console.log("Motor data");
              console.log(motors);
              setData(motors);
              break;
        }
        }
        else if(!storageSelected){
          console.log("STORAGE FALSE");
        switch (selectOption) {
          case "-":
            setData(defaultData);
            setHead(["Naziv","Vrsta","Količina"]);
            break;
          case "DOOR":
            const doors = defaultData.filter((item) => {
              return item.type === "DOOR";
            });
            setHead(["Naziv","Boja","Količina"]);
            setData(doors);
    
            break;
          case "GUIDE":
            const guides = defaultData.filter((item) => {
              return item.type === "GUIDE";
            });
            setHead(["Naziv","Količina"]);
            setData(guides);
    
            break;
          case "MOTOR":
            const motors = defaultData.filter((item) => {
              return item.type === "MOTOR";
            });
            setHead(["Naziv", "Vodilica potrebna","Količina"]);
            setData(motors);
            break;
      }}
    };

      const openAddModal = () => {
        setAddPressed(!addPressed);
      };
      const openTransferModal = () => {
        setTransferPressed(!transferPressed);
      };

      useEffect(() => {
        // declare the data fetching function
        
      
        // call the function
        initialFetchData()
          // make sure to catch any error
          .catch(console.error);

      }, [])

      {/*useEffect(() => {
        getItems();
        setData(defaultData);
        updateView("Door");
      }, []);*/}

      useEffect(() => {
        updateView(option);
      }, [option,storageOption]);
 


    return (
        <>
          {addPressed  && (
            <Modal title={"Dodaj"} setModal={openAddModal}>
              <AddToStorageForm
              />
            </Modal>
            )}
            {transferPressed  && (
            <Modal title={"Prebaci"} setModal={openTransferModal}>
              <TransferBetweenStorageForm
              />
            </Modal>
            )}
            <Main>
                <Section title={"Stanje"} withoutTopPadding={false}>
                <FormRow>
              <InputLabel>Skladište :</InputLabel>
              <SelectText
              type="select"
              value={storageOption}
              onChange={(e) => {
               console.log(e.target.value === "-");
                if(e.target.value === "-") {
                  setStorageSelected(false);
                }
                else {
                  handleStorageOptionChange(e.target.value);
                  setStorageSelected(true);
                  console.log("ODMAH UDEM");
                }
                setStorageOption(e.target.value);
                }
              }
            >
              
              <OptionText value="-">Svi</OptionText>
              {storageData.map((item) => (
                <OptionText key={item.id} value={item.id}>
                  {item.name + " - " + item.location}
                </OptionText>)
              )}
            </SelectText>
              </FormRow>
                <FormRow>
              <InputLabel>Vrsta artikla :</InputLabel>
              <SelectText
              type="select"
              value={option}
              onChange={(e) => {
                console.log(e.target.value);
                setOption(e.target.value);
                }
              }
            >
              
              <OptionText value="-">---Odaberi---</OptionText>
              <OptionText value="DOOR">Vrata</OptionText>
              <OptionText value="GUIDE">Vodilice</OptionText>
              <OptionText value="MOTOR">Motori</OptionText>
            </SelectText>
              </FormRow>
                  {data ? (
                    <SaleTable
                    title = {"Stanje"}
                    head = {head}
                    data = {data}
                    type = {option }
                    fetchData={fetchData}
                    optionSelected={false}
                    storageSelected={storageSelected}
                    />
                  ):(
                    <h1>Bok</h1>
                  ) 
                  }
                {storageSelected &&
                <FormRow>
                <AddButton
                onClick={() => openAddModal()}>
                Dodaj
                </AddButton>
                <AddButton
                onClick={() => openTransferModal()}>
                Prebaci
                </AddButton>
                </FormRow>
                }
                
                </Section>
            </Main>
        </>
    );
}

export default Sale;