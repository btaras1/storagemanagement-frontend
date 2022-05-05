import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Form,
  FormRow,
  InputLabel,
  InputText,
  InputError,
  SelectText,
  OptionText,
  RightColumn,
  LeftColumn,
  FormOneRow,
  InputCheckbox,
} from "../Form/FormSyle";
import { Button } from "../Button/ButtonStyle";
import { useState } from "react/cjs/react.development";
import { SuccessMessage } from "../../lib/style/generalStyles";
import DataLoader from "../DataLoader/DataLoader";
import { addItem, getAllItems, updateItem } from "../../api/item";
import { getAllTypes } from "../../api/item-type";
import { getAllStorages } from "../../api/storage";

const ProcurementForm = () => {

  const authToken = localStorage.getItem("authToken");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRequestFinished, setIsRequestFinished] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [storages, setStorages] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [items, setItems] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  let selectedItemsMock = [];
   
  const handleSelectedStorage = async (id) => {
      console.log("BOK");
      console.log(storages);
      console.log(typeof id);
      storages.map(storage => console.log(typeof storage.id));
      const currentStorage = await storages.find(storage => storage.id === parseInt(id));
      setSelectedStorage(currentStorage);
      console.log(currentStorage);
  }

  const handleSelectedItemChange = async (id) => {
      console.log(id);
      const currentItem = await items.find(item => item.id === parseInt(id));
      setSelectedItem(currentItem);
  }

  const fetchData = async () => {
    await getAllStorages(authToken).then((response)=>setStorages(response));
    await getAllItems(authToken).then((response)=>setItems(response));
  }



  useEffect(() => {
    // declare the data fetching function
    
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])

  const formik = useFormik({
    initialValues: {
      id: "",
      storage: "",
      selectedItems: [],
    },
    validationSchema: Yup.object({
      value: Yup.string().required("Naziv je obavezan!")
    }),
    onSubmit: (values, { resetForm }) => {
      setIsLoading(true);
      setIsRequestFinished(false);
      const procurement = {
        storage: values.storage,
        items: selectedItems,
      };
    //   console.log(item);
    //       addItem(item, authToken)
    //         .then((res) => {
    //           resetForm({});
    //           setIsLoading(false);
    //           setIsRequestFinished(true);
    //           setIsError(false);
    //           setSuccessMessage("Uspješno ste dodali novi artikl!");
    //           setTimeout(() => {
    //             setIsRequestFinished(false);
    //           }, 4000);
    //         })
    //         .catch((err) => {
    //           setIsLoading(false);
    //           setIsRequestFinished(true);
    //           setIsError(true);
    //           setSuccessMessage("Došlo je do greške!");
    //         });
    //       setIsLoading(false);
    },
  });


  return (
    <>
      {items && storages ? (
        
<>

          <FormOneRow>
            <InputLabel htmlFor="storage">Skladište</InputLabel>
            <SelectText
                id="storage"
                type="select"
                onChange={e =>
                handleSelectedStorage(e.target.value)}
              >
                <OptionText value="">--Odaberi--</OptionText>
                {storages?.map((item) => (
                <OptionText key={item.id} value={item.id}>
                  {item.name + "-" + item.location}
                </OptionText>)
              )}
              </SelectText>
            {formik.touched.storage && formik.errors.storage ? (
              <InputError>{formik.errors.storage}</InputError>
            ) : null}
          </FormOneRow>
          <FormRow>
              <InputLabel htmlFor="item">Artikl</InputLabel>
              <SelectText
                id="item"
                type="select"
                onChange={e => 
                handleSelectedItemChange(e.target.value)}
              >
              <OptionText value="">--Odaberi--</OptionText>
              {items?.map((item) => (
                <OptionText key={item.id} value={item.id}>
                  {item.value}
                </OptionText>)
              )}
              </SelectText>
              {formik.touched.item && formik.errors.item ? (
                <InputError>{formik.errors.item}</InputError>
              ) : null}
          </FormRow>
          {selectedItem?.value &&
          <>
            <InputLabel>{selectedItem.value}</InputLabel>
            <InputLabel>Količina :</InputLabel>
            <InputText/>
            {selectedStorage?.itemStorages.map(function(obj){
                if(obj.item.id === selectedItem.id) return true;
            }) &&
            <>
            <InputLabel>{selectedStorage?.itemStorages.map(function(obj){
                if(obj.item.id === selectedItem.id) return 'Trenutna količina na skladištu : ' + obj.quantity;
            })}</InputLabel>
            </>
            }
            <Button onClick={() => setSelectedItems([...selectedItems, selectedItem])}>Dodaj na nabavku</Button>
            
          </>
          }
            {selectedItems.length > 0 &&
            <FormRow>
            {selectedItems.map(item =>
            <InputLabel>{item.value}</InputLabel>)}
            </FormRow>}
          <FormRow>
            <Button type="submit">Dodaj</Button>
          </FormRow>

          {isRequestFinished && (
            <FormRow>
              <SuccessMessage isError={isError}>
                {successMessage}
              </SuccessMessage>
            </FormRow>
          )}
            </>
      ) : (
        <DataLoader />
      )}
    </>
  );
};

export default ProcurementForm;
