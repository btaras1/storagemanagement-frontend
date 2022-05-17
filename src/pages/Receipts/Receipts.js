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
import { getAllReceipts } from "../../api/receipt";
import ReceiptTable from "../../components/ReceiptTable/ReceiptTable";
import ReceiptForm from "../../components/ReceiptForm/ReceiptForm";
import DataLoader from "../../components/DataLoader/DataLoader";
import SearchBar  from "../../components/SearchBar/SearchBar";
import { LeftColumn, RightColumn } from "../../components/Form/FormSyle";


const Receipt = () => {

    const [data, setData] = useState(null);
    const [addPressed, setAddPressed] = useState(false);
    const [transferPressed, setTransferPressed] = useState(false);
    const [defaultData, setDefaultData] = useState([]);
    const [storageData, setStorageData] = useState([]);
    const [colorData, setColorData] = useState([]);
    const [option, setOption] = useState("Broj");
    const [head, setHead] = useState([]);
    const [storageSelected, setStorageSelected] = useState(false);
    const [storage, setStorage] = useState(null);
    const [storageOption, setStorageOption] = useState("");
    const [input, setInput] = useState("");
  
    const authToken = localStorage.getItem("authToken");

    const fetchData = async () => {
      console.log("fetch")
      setDefaultData(null);
      setData(null);
      await getAllReceipts(authToken).then((items) => {
        console.log(items);
        setDefaultData(items);
        setData(items);
      });
      
      //updateView(option);
    }
    const initialFetchData = async () => {
      setDefaultData(null);
      setData(null);
      await getAllReceipts(authToken).then((items) => {
        console.log("items");
        console.log(items);
        setDefaultData(items);
        setData(items);
        });
        console.log()
     
      //setOption("-");
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

    const updateInput = (input) => {
      console.log(input);
      if(data != null && defaultData != null){
      switch (option) {
        case "Broj":
          console.log("DEFAULT")
          console.log(defaultData)
          const filteredReceiptsId = defaultData.filter((receipt) => {
            console.log(receipt);
            return receipt?.documentId?.toString().toLowerCase().includes(input.toLowerCase());
          });
          setInput(input);
          setData(filteredReceiptsId);
  
          break;
        case "Datum":
          const filteredReceiptsDate = defaultData.filter((receipt) => {
            console.log(receipt);
            return receipt.sold.toString().toLowerCase().includes(input.toLowerCase());
          });
          setInput(input);
          setData(filteredReceiptsDate);
  
          break;
        case "Montirano":  
        const filteredReceiptsMount = defaultData.filter((receipt) => {
          console.log(receipt);
          return receipt.mounted.toString().toLowerCase().includes(input.toLowerCase());
        });
        setInput(input);
        setData(filteredReceiptsMount);

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

      useEffect(() => {
        updateInput(input);
      }, [input]);

      useEffect(() => {
        
      }, [data]);

      

 


    return (
        <>
          {addPressed  && (
            <Modal title={"Dodaj"} setModal={openAddModal}>
              <ReceiptForm fetchInitialData={fetchData}/>
            </Modal>
            )}
            <Main>
                <Section title={"Prodaja"} withoutTopPadding={false}>
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
              <OptionText value="Montirano">Montirano</OptionText>
            </SelectText>
            </LeftColumn>
            <RightColumn>
              
                <SearchBar
                  input={input}
                  setInput={setInput}
                  isDisabled={false}
                  placeholder={"Pretraži prodaje po odabranom filteru"}
                />
                </RightColumn>
              </FormRow>
                <FormRow>
             {/* <InputLabel>Skladište :</InputLabel>
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
            </SelectText>*/}
              </FormRow>
                  {data != null ? (
                    <ReceiptTable
                    title = {"Stanje"}
                    head = {["Br.","Datum prodaje","Datum montiranja", "Kupac", "Grad"]}
                    data = {data}
                    type = {option}
                    fetchData={fetchData}
                    optionSelected={false}
                    storageSelected={storageSelected}
                    />
                  ):(
                    <Section>
                      <DataLoader />
                    </Section>
                  ) 
                  }
                <FormRow>
                <AddButton
                onClick={() => openAddModal()}>
                Dodaj
                </AddButton>
                </FormRow>
                
                </Section>
            </Main>
        </>
    );
}

export default Receipt;