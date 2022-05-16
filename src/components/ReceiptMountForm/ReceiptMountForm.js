import React, { useEffect } from "react";
import { ErrorMessage, Field, FieldArray, useFormik } from "formik";
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
  TextArea,
} from "../Form/FormSyle";
import { Button } from "../Button/ButtonStyle";
import { useState } from "react/cjs/react.development";
import { AddButton, SuccessMessage, Border } from "../../lib/style/generalStyles";
import DataLoader from "../DataLoader/DataLoader";
import { addItem, getAllItems, updateItem } from "../../api/item";
import { getAllTypes } from "../../api/item-type";
import { getAllStorages } from "../../api/storage";
import { Table, TableBody, TableData, TableHead, TableRow, THead } from "../ProcurementFormTable/ProcurementFormTableStyle";
import InputBar from "../InputBar/InputBar";
import { addProcurement } from "../../api/procurement";
import { FaTrash, FaEdit, FaPlusSquare, FaFilePdf} from "react-icons/fa";
import { getAllBuyers } from "../../api/buyer";
import { addPReceipt, updateMountReceipt } from "../../api/receipt";
import { getAllEmployees } from "../../api/employee";

const ReceiptMountForm = ({passedItem}) => {

  const authToken = localStorage.getItem("authToken");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRequestFinished, setIsRequestFinished] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
    const [isItemDeleted, setIsItemDeleted] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [buyerOption, setBuyerOption] = useState("NEW")
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [isStorageSelected, setIsStorageSelected] = useState(false);
  const [input, setInput] = useState("");
  const [option, setOption] = useState("");
    const [buyers, setBuyers] = useState([]);
  const [storages, setStorages] = useState([]);
  const [defaultItems, setDefaultItems] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [arrayItem, setArrayItem] = useState(null);
  const [x, setX] = useState([]);
  const [employees, setEmployees] = useState([])

  const fetchData = async () => {
    await getAllEmployees(authToken).then((response)=>{
        setEmployees(response);
        setDefaultItems(response);
    });

  }

  const updateInput = (input) => {
        setInput(input);
        setSelectedQuantity(input);
  };

  const handleAdd = async () => {
    setInput(0);
    const myArray = defaultItems.filter(ar => !formik.values.employees.find(rm => (rm.id === ar.id)))
    console.log(myArray);
    setOption(selectedItem);
    setX(myArray);
    setEmployees(myArray);
};

  const handleSelectedItemChange = async (arrayItem1) => {
      console.log("SELECTED");
      let selected = JSON.parse(arrayItem1);
      console.log(selected);
      let id = selected.id;
    let currentItem = await defaultItems.find(item => item.id === parseInt(id));
    console.log(currentItem);
    setSelectedItem(currentItem);
    setArrayItem(selected);
    }
    const handleSelectedStorageChange = async (id) => {
        let currentStorage = await storages.find(item => item.id === parseInt(id));
        console.log(currentStorage);
        setSelectedStorage(currentStorage);
        setItems(currentStorage.itemStorages);
        }  
        const handleSelectedBuyerChange = async (id) => {
            let currentBuyer = await buyers.find(item => item.id === parseInt(id));
            console.log(currentBuyer);
            setSelectedBuyer(currentBuyer);
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
      description: "",
      employees: []
    },


    onSubmit: (values, { resetForm }) => {
        alert(values);
        console.log(values);
        updateMountReceipt(passedItem.id, values, authToken).then((response) => console.log(response));
            //addPReceipt(newReceipt, authToken).then((response) => console.log(response));
        
    //   setIsLoading(true);
    //   setIsRequestFinished(false);
    //   const procurement = {
    //     storage: JSON.parse(values.storage),
    //     itemReceipts: values.itemReceipts
    //   };
    //   alert(procurement);
    //   console.log(procurement);
    //       addProcurement(procurement, authToken)
    //         .then((res) => {
    //           resetForm({});
    //           formik.values.itemReceipts.length = 0;
    //            setIsLoading(false);
    //            setIsRequestFinished(true);
    //            setIsError(false);
    //            setSuccessMessage("Uspješno ste dodali novi artikl!");
    //            setTimeout(() => {
    //              setIsRequestFinished(false);
    //            }, 4000);
    //          })
    //          .catch((err) => {
    //            setIsLoading(false);
    //            setIsRequestFinished(true);
    //            setIsError(true);
    //            setSuccessMessage("Došlo je do greške!");
    //          });
    //        setIsLoading(false);
    },
  });

   useEffect(() => {
     if (passedItem !== null) {
           formik.setFieldValue("description", passedItem["description"], false);
       }
   }, []);

   useEffect(() => {

}, [option])
useEffect(() => {
    handleAdd();
}, [isItemDeleted])




  useEffect(() => {

  }, [isItemDeleted])
  useEffect(() => {
    setOption("");
    setSelectedItem(null);
}, [selectedStorage])

  return (
    <>
      {items && storages ? (
        
<>
    <Form onSubmit={formik.handleSubmit} >
        <FormOneRow>
            <InputLabel htmlFor="description">Opis</InputLabel>
            <TextArea
            id="description"
            type="text"
            {...formik.getFieldProps("description")}
            />
            {formik.touched.description && formik.errors.description ? (
              <InputError>{formik.errors.description}</InputError>
            ) : null}
            
          </FormOneRow>

            <FormOneRow>
            <InputLabel htmlFor="employees">Montirali</InputLabel>
              <SelectText
                id="employees"
                type="select"
                onChange={e => 
                    handleSelectedItemChange(e.target.value)}
              >
                  
              <OptionText value={null}>--Odaberi--</OptionText>
              {employees && employees?.map((arrayItem) => (
                <OptionText key={arrayItem.id} value={JSON.stringify(arrayItem)}>
                  {arrayItem.firstname + " - " + arrayItem.lastname}
                </OptionText>)
              )}
              </SelectText>
                  {1 > 0 && 
                    <AddButton
                    type="button"
                    disabled={arrayItem != null && selectedQuantity != null && selectedQuantity > arrayItem.avaliableQuantity }
                    onClick={() =>{
                      formik.values.employees.push(
                        selectedItem,
                      );
                      handleAdd();
                    }
                    } 
                  >
                     Dodaj artikl
                  </AddButton>
                }
                </FormOneRow>
                  {formik.values.employees && formik.values.employees.length > 0
                    ? (
                  <FormOneRow>
                      <Table>
                          <THead>
                              <TableRow>
                              <TableHead>Ime</TableHead>
                              <TableHead>Prezime</TableHead>
                              <TableHead>Obriši</TableHead>
                              </TableRow>
                          </THead>
                          <TableBody>
                          {formik.values.employees.map((employee, index) => (
                              <TableRow key={index}>
                              <TableData>{employee.firstname}</TableData>
                              <TableData>{employee.lastname}</TableData>
                              <TableData >
                                <FaTrash
                                size={25}
                                onClick={() =>
                                {
                                    formik.values.employees.splice(index, 1);
                                    setIsItemDeleted(!isItemDeleted);
                                }}
                                />
                              </TableData>
                              </TableRow>
                              ))}
                          </TableBody>
                          
                      </Table>
                  </FormOneRow>
                    )   
                  : null}
                {/*  <br />
                  <br />
                  <br />
                  <div>
                    <button type="submit">Form Submit</button>
                  </div> */}
                
              
            
          

          {/* <FormRow>
              <InputLabel htmlFor="item">Artikl</InputLabel>
              <SelectText
                id="item"
                type="select"
                multiple={true}
                {...formik.getFieldProps("itemReceipts")}
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
          </FormRow> */}
        
          <FormRow>
              {1 > 0 && formik.values.employees.length > 0 &&
              <Button type="submit">Ažuriraj račun</Button>
              }
          </FormRow>

          {isRequestFinished && (
            <FormRow>
              <SuccessMessage isError={isError}>
                {successMessage}
              </SuccessMessage>
            </FormRow>
          )}
          </Form>
            </>
      ) : (
        <DataLoader />
      )}
      
    </>
  );
};

export default ReceiptMountForm;
