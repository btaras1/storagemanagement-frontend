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
import DataLoader from "../../components/DataLoader/DataLoader";
import  SearchBar  from "../../components/SearchBar/SearchBar";


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
    const [allSelected, setAllSelected] = useState(true);
    const [input, setInput] = useState("");
    const [reservedData, setReservedData] = useState([]);
    const authToken = localStorage.getItem("authToken");

    const fetchData = async () => {
      await getAllItemsInStorages(authToken).then((items) => setDefaultData(items));
      await getAllStorages(authToken).then((items) => {
      setStorageData(items);
      });
      updateView(option);
    }
    const initialFetchData = async () => {
      await getAllItemsInStorages(authToken).then((items) => setDefaultData(items));
      await getAllStorages(authToken).then((items) => setStorageData(items));
      setOption("-");
      setStorageOption("-")
    }

    const fetchStorage = async (id) =>{
      if(storageOption === "-") setStorageSelected(false);
      else {
        await getStorage(id,authToken).then((items) => setStorage(items));
        setStorageSelected(true);
      }
    }

    const updateInput = (input) => {
      if(storageSelected){
        const search = reservedData.map(item =>{
          return Object.assign({}, item,{
            itemStorages: item.itemStorages.filter((x) => {
              return x.item.value.toLowerCase().includes(input.toLowerCase())
            })
              })
          });
        setInput(input);
        setData(search);
      }
      else if(!storageSelected){
        const filteredItems = reservedData.filter((item) => {
          return item.value.toLowerCase().includes(input.toLowerCase());
        });
        setInput(input);
        console.log(filteredItems);
        setData(filteredItems);
      }
          
    };

      const updateView = (selectOption) => {
        
        if(storageSelected){
          console.log("STORAGE TRUE");
          switch (selectOption) {
            case "-":
              setAllSelected(true);
              const setStorageA = storageData.filter(x => x.id === parseInt(storageOption));
              setData(setStorageA);
              setReservedData(setStorageA);
              setHead(["Naziv","Vrsta","Ukupno","Rezervirano","Dostupno"]);
              break;
            case "DOOR":
              setAllSelected(false);
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
              setHead(["Naziv","Boja","Ukupno","Rezervirano","Dostupno"]);
              console.log("Door data");
              console.log(doors);
              setData(doors);
              setReservedData(doors);
      
              break;
            case "GUIDE":
              setAllSelected(false);
              const storageDataGuide = storageData;
              const setStorageG = storageDataGuide.filter(x => x.id === parseInt(storageOption));
              const guides = setStorageG.map(item =>{
                return Object.assign({}, item,{
                  itemStorages: item.itemStorages.filter((x) => x.item.itemType.value === "GUIDE")
                })
              });
              setHead(["Naziv","Ukupno","Rezervirano","Dostupno"]);
              console.log("Guides data");
              console.log(guides);
              setData(guides);
              setReservedData(guides);
      
              break;
              case "SUSPENSION":
              setAllSelected(false);
              const storageDataSuspension = storageData;
              const setStorageS = storageDataSuspension.filter(x => x.id === parseInt(storageOption));
              const suspensions = setStorageS.map(item =>{
                return Object.assign({}, item,{
                  itemStorages: item.itemStorages.filter((x) => x.item.itemType.value === "SUSPENSION")
                })
              });
              setHead(["Naziv","Ukupno","Rezervirano","Dostupno"]);
              console.log("Suspensions data");
              console.log(suspensions);
              setData(suspensions);
              setReservedData(suspensions);
      
              break;
            case "MOTOR":
              setAllSelected(false);
              const storageDataMotor = storageData;
              const setStorageM = storageDataMotor.filter(x => x.id === parseInt(storageOption));
              const motors = setStorageM.map(item =>{
                return Object.assign({}, item,{
                  itemStorages: item.itemStorages.filter((x) => x.item.itemType.value === "MOTOR")
                })
              });
              setHead(["Naziv", "Vodilica potrebna","Ukupno","Rezervirano","Dostupno"]);
              console.log("Motor data");
              console.log(motors);
              setData(motors);
              setReservedData(motors);
              break;
        }
        }
        else if(!storageSelected){
          console.log("STORAGE FALSE");
        switch (selectOption) {
          case "-":
            setAllSelected(true);
            setData(defaultData);
            setReservedData(defaultData);
            setHead(["Naziv","Vrsta","Ukupno","Rezervirano","Dostupno"]);
            break;
          case "DOOR":
            const doors = defaultData.filter((item) => {
              return item.type === "DOOR";
            });
            setAllSelected(false);
            setHead(["Naziv","Boja","Ukupno","Rezervirano","Dostupno"]);
            setData(doors);
            setReservedData(doors);
    
            break;
          case "GUIDE":
            setAllSelected(false);
            const guides = defaultData.filter((item) => {
              return item.type === "GUIDE";
            });
            setHead(["Naziv","Ukupno","Rezervirano","Dostupno"]);
            setData(guides);
            setReservedData(guides);
    
            break;
            case "SUSPENSION":
            setAllSelected(false);
            const suspensions = defaultData.filter((item) => {
              return item.type === "SUSPENSION";
            });
            setHead(["Naziv","Ukupno","Rezervirano","Dostupno"]);
            setData(suspensions);
            setReservedData(suspensions);
    
            break;
          case "MOTOR":
            setAllSelected(false);
            const motors = defaultData.filter((item) => {
              return item.type === "MOTOR";
            });
            setHead(["Naziv", "Vodilica potrebna","Ukupno","Rezervirano","Dostupno"]);
            setData(motors);
            setReservedData(motors);
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
        console.log(data);
      }, [option,storageOption]);

      useEffect(() => {

      }, [input]);
 


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
                  console.log("IF");
                }
                else {
                  setStorageSelected(true);
                  console.log("ELSE");
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
              <OptionText value="SUSPENSION">Ovjesi</OptionText>
            </SelectText>
              </FormRow>
              <FormRow>
                <InputLabel>Pretraži po nazivu :</InputLabel>
                <SearchBar
                  input={input}
                  setInput={updateInput}
                  isDisabled={false}
                  placeholder={"Pretraži artikle prema nazivu"}
                />
              </FormRow>
                  {data ? (
                    <SaleTable
                    title = {"Stanje"}
                    head = {head}
                    data = {data}
                    type = {option}
                    allSelected = {allSelected}
                    fetchData={fetchData}
                    optionSelected={option != "-"}
                    storageSelected={storageSelected}
                    />
                  ):(
                    <Section withoutTopPadding={true}>
                    <DataLoader />
                    </Section>
                  ) 
                  }
                </Section>
            </Main>
        </>
    );
}

export default Sale;