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
} from "../Form/FormSyle";
import { Button } from "../Button/ButtonStyle";
import { useState } from "react/cjs/react.development";
import { AddButton, SuccessMessage } from "../../lib/style/generalStyles";
import DataLoader from "../DataLoader/DataLoader";
import { addItem, getAllItems, updateItem } from "../../api/item";
import { getAllTypes } from "../../api/item-type";
import { getAllStorages } from "../../api/storage";
import { Table, TableBody, TableData, TableHead, TableRow, THead } from "../ProcurementFormTable/ProcurementFormTableStyle";
import InputBar from "../InputBar/InputBar";
import { addProcurement } from "../../api/procurement";
import { FaTrash, FaEdit, FaPlusSquare, FaFilePdf} from "react-icons/fa";

const ProcurementForm = ({fetchInitialData}) => {

  const authToken = localStorage.getItem("authToken");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRequestFinished, setIsRequestFinished] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
    const [isItemDeleted, setIsItemDeleted] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  
  const [isStorageSelected, setIsStorageSelected] = useState(false);
  const [input, setInput] = useState("");
  const [option, setOption] = useState("");

  const [storages, setStorages] = useState([]);
  const [defaultItems, setDefaultItems] = useState([]);
  const [items, setItems] = useState([]);
  const [x, setX] = useState([]);

  const fetchData = async () => {
    await getAllStorages(authToken).then((response)=>setStorages(response));
    await getAllItems(authToken).then((response)=>{
        setDefaultItems(response);
        setItems(response);
        setX(response);
    });
  }

  const updateInput = (input) => {
        setInput(input);
        setSelectedQuantity(input);
  };

  const handleAdd = async () => {
    setInput(0);
    const myArray = defaultItems.filter(ar => !formik.values.itemProcurements.find(rm => (rm.item.id === ar.id)))
    console.log(myArray);
    setOption("");
    setX(myArray);
    setItems(myArray);
};

  const handleSelectedItemChange = async (id) => {
    let currentItem = await items.find(item => item.id === parseInt(id));
    console.log(currentItem);
    setSelectedItem(currentItem);
    }


    const updateView = (selectOption) => {
        switch (selectOption) {
          case "":
            setItems(defaultItems.filter(ar => !formik.values.itemProcurements.find(rm => (rm.item.id === ar.id))));
              console.log("USAO");
              break;
          case "DOOR":
            const doors = x.filter((item) => {
              return item.itemType.value === "DOOR";
            });
            console.log(x);
            setItems(doors);
    
            break;
          case "GUIDE":
            const guides = x.filter((item) => {
              return item.itemType.value === "GUIDE";
            });
            setItems(guides);
    
            break;
          case "MOTOR":
            const motors = x.filter((item) => {
              return item.itemType.value === "MOTOR";
            });
            setItems(motors);
            break;
          case "SUSPENSION":
              const suspensions = x.filter((item) => {
                return item.itemType.value === "SUSPENSION";
              });
              setItems(suspensions);
              break;
        }
      };

  useEffect(() => {
    // declare the data fetching function
    
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])

  useEffect(() => {
    
    updateView(option);
  }, [option]);


  const formik = useFormik({
    initialValues: {
      itemProcurements: [],
      storage: {},
    },


    onSubmit: (values, { resetForm }) => {
      setIsLoading(true);
      setIsRequestFinished(false);
      const procurement = {
        storage: JSON.parse(values.storage),
        itemProcurements: values.itemProcurements
      };
      console.log(procurement);
          addProcurement(procurement, authToken)
            .then((res) => {
              resetForm({});
              formik.values.itemProcurements.length = 0;
               setIsLoading(false);
               setIsRequestFinished(true);
               setIsError(false);
               setSuccessMessage("Uspješno ste dodali novi artikl!");
               fetchInitialData();
               setTimeout(() => {
                 setIsRequestFinished(false);
               }, 4000);
             })
             .catch((err) => {
               setIsLoading(false);
               setIsRequestFinished(true);
               setIsError(true);
               setSuccessMessage("Došlo je do greške!");
             });
           setIsLoading(false);
    },
  });

//   useEffect(() => {
//     if (passedItem !== null) {
//           formik.setFieldValue("storage", JSON.stringify(passedItem["storage"]), false);
//           formik.values.itemProcurements.push(passedItem.itemProcurements);
//       }
//   }, []);

  useEffect(() => {}, [isItemDeleted])

  return (
    <>
      {items && storages ? (
        
<>
    <Form onSubmit={formik.handleSubmit} >
          <FormOneRow>
            <InputLabel htmlFor="storage">Skladište</InputLabel>
            <SelectText
                id="storage"
                type="select"
                disabled={formik.values.itemProcurements.length > 0}
                {...formik.getFieldProps("storage")}
              >
                <OptionText value="">--Odaberi--</OptionText>
                {storages?.map((item) => (
                <OptionText key={item.id} value={JSON.stringify(item)}>
                  {item.name + "-" + item.location}
                </OptionText>)
              )}
              </SelectText>
            {formik.touched.storage && formik.errors.storage ? (
              <InputError>{formik.errors.storage}</InputError>
            ) : null}
          </FormOneRow>
          <FormOneRow>
              <InputLabel>Vrsta artikla</InputLabel>
              <SelectText
              type="select"
              value={option}
              disabled={!(formik.values.storage.length > 0)}
              onChange={(e) => {
                setOption(e.target.value);
                }
              }
            >
              
              <OptionText value="">---Odaberi---</OptionText>
              <OptionText value="DOOR">Vrata</OptionText>
              <OptionText value="GUIDE">Vodilice</OptionText>
              <OptionText value="MOTOR">Motori</OptionText>
              <OptionText value="SUSPENSION">Ovjesi</OptionText>
            </SelectText>
          </FormOneRow>
          <FormRow>
            
            <LeftColumn>
            <InputLabel htmlFor="itemProcurements">Artikl</InputLabel>
              <SelectText
                id="itemProcurements"
                type="select"
                disabled={!(formik.values.storage.length > 0)}
                onChange={e => 
                    handleSelectedItemChange(e.target.value)}
              >
                  
              <OptionText value={null}>--Odaberi--</OptionText>
              {items?.map((item) => (
                <OptionText key={item.id} value={item.id}>
                  {item.value}
                </OptionText>)
              )}
              </SelectText>
              {formik.touched.item && formik.errors.item ? (
                <InputError>{formik.errors.item}</InputError>
              ) : null}
              </LeftColumn>
                  {/* {itemProcurements && itemProcurements.length > 0
                    ? itemProcurements.map((itemProcurement, index) => (
                        <div key={index}>
                          <Field
                            placeholder="Item name"
                            name={`itemProcurement.${index}.item.value`}
                          />

                          <br />
                          <Field
                            placeholder="user email"
                            name={`itemProcurement.${index}.quantity`}
                          />
                          <br />
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                          >
                            -
                          </button>
                          <br />
                          <br />
                        </div>
                      ))
                    : null} */}
                    <RightColumn>
                    <InputLabel htmlFor="quantity">Količina</InputLabel>
                    <InputBar 
                    input={input}
                    setInput={updateInput}
                    isDisabled={!(formik.values.storage.length > 0)}
                    />
                  </RightColumn>
                  </FormRow>
                  <FormOneRow>
                  {formik.values.storage.length > 0 && 
                    <AddButton
                    type="button"
                    onClick={() =>{
                      formik.values.itemProcurements.push({
                        item: selectedItem,
                        quantity: parseInt(selectedQuantity)
                      });
                      handleAdd();
                    }
                    } 
                  >
                     Dodaj artikl
                  </AddButton>
                }
                </FormOneRow>
                  {formik.values.itemProcurements && formik.values.itemProcurements.length > 0
                    ? (
                  <FormOneRow>
                      <Table>
                          <THead>
                              <TableRow>
                              <TableHead>Artikl</TableHead>
                              <TableHead>Količina</TableHead>
                              <TableHead>Obriši</TableHead>
                              </TableRow>
                          </THead>
                          <TableBody>
                          {formik.values.itemProcurements.map((itemProcurement, index) => (
                              <TableRow key={index}>
                              <TableData>{itemProcurement.item.value}</TableData>
                              <TableData>{itemProcurement.quantity}</TableData>
                              <TableData >
                                <FaTrash
                                size={25}
                                onClick={() =>
                                {
                                    formik.values.itemProcurements.splice(index, 1);
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
                {...formik.getFieldProps("itemProcurements")}
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
              {formik.values.storage.length > 0 && formik.values.itemProcurements.length > 0 &&
              <Button type="submit">Unesi nabavku</Button>
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

export default ProcurementForm;
