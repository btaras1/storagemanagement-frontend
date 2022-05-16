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
import { addPReceipt } from "../../api/receipt";

const ReceiptForm = () => {

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

  const fetchData = async () => {
    await getAllStorages(authToken).then((response)=>setStorages(response));
    await getAllItems(authToken).then((response)=>{
        setDefaultItems(response);


    });
    await getAllBuyers(authToken).then((response) => setBuyers(response));
  }

  const updateInput = (input) => {
        setInput(input);
        setSelectedQuantity(input);
  };

  const handleAdd = async () => {
    setInput(0);
    // const myArray = defaultItems.filter(ar => !formik.values.itemReceipts.find(rm => (rm.item.id === ar.id)))
    // console.log(myArray);
    setOption("");
    // setX(myArray);
    // setItems(myArray);
};

  const handleSelectedItemChange = async (arrayItem1) => {
      console.log(arrayItem1);
      let selected = JSON.parse(arrayItem1);
      console.log(selected);
      let id = selected.item.id;
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


    const updateView = (selectOption) => {
        if(selectedStorage != null){
        switch (selectOption) {
          case "":
            setItems(selectedStorage.itemStorages.filter(ar => !formik.values.itemReceipts.find(rm => (rm.item.id === ar.id))));
              console.log("USAO");
              break;
          case "DOOR":
            const doors = selectedStorage.itemStorages.filter((filterItem) => {
              return filterItem.item.itemType.value === "DOOR";
            });
            console.log(x);
            console.log("VRATA");
            console.log(doors);
            setItems(doors);
    
            break;
          case "GUIDE":
            const guides = selectedStorage.itemStorages.filter((filterItem) => {
                return filterItem.item.itemType.value === "GUIDE";
              });
            setItems(guides);
    
            break;
          case "MOTOR":
            const motors = selectedStorage.itemStorages.filter((filterItem) => {
                return filterItem.item.itemType.value === "MOTOR";
              });
            setItems(motors);
            break;
          case "SUSPENSION":
              const suspensions = selectedStorage.itemStorages.filter((filterItem) => {
                return filterItem.item.itemType.value === "SUSPENSION";
              });
              setItems(suspensions);
              break;
        }
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
      sold: "",
      description: "",
      buyer: {},
      itemReceipts: [],
      firstname: "",
      lastname: "",
      address: "",
      city: "",
      mobile:""
    },


    onSubmit: (values, { resetForm }) => {
        alert(values);
        console.log(values);
        if(buyerOption == "NEW"){
            const newReceipt = {
                sold: values.sold,
                itemReceipts: values.itemReceipts,
                buyer: {
                    firstname: values.firstname,
                    lastname: values.lastname,
                    address: values.address,
                    city: values.city,
                    mobile: values.mobile
                }
            }
            console.log(newReceipt);
            addPReceipt(newReceipt, authToken).then((response) => console.log(response));
        }
        if(buyerOption == "EXISTING"){
            const newReceipt = {
                sold: values.sold,
                itemReceipts: values.itemReceipts,
                buyer: selectedBuyer
            }
            console.log(newReceipt);
            addPReceipt(newReceipt, authToken).then((response) => console.log(response));
        }
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

//   useEffect(() => {
//     if (passedItem !== null) {
//           formik.setFieldValue("storage", JSON.stringify(passedItem["storage"]), false);
//           formik.values.itemReceipts.push(passedItem.itemReceipts);
//       }
//   }, []);


useEffect(() => {
    formik.setFieldValue("sold", new Date().toISOString().split('T')[0], false);
}, [])

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
            <InputLabel htmlFor="sold">Datum prodaje :</InputLabel>
            <InputText type="date" 
            id="sold"
            {...formik.getFieldProps("sold")}
            />
            {formik.touched.sold && formik.errors.sold ? (
              <InputError>{formik.errors.sold}</InputError>
            ) : null}
        </FormOneRow>
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
              <InputLabel>Kupac :</InputLabel>
              <SelectText
              type="select"
              value={buyerOption}
              disabled={!(1 > 0)}
              onChange={(e) => {
                setBuyerOption(e.target.value);
                }
              }
            >
              <OptionText value="NEW">Novi</OptionText>
              <OptionText value="EXISTING">Postojeći</OptionText>
            </SelectText>
          </FormOneRow>
          {buyerOption == "NEW" ? 
          (
            <>
            <Border>
            <FormOneRow><InputLabel>Kreiranje novog kupca : </InputLabel></FormOneRow>
            <FormRow>
                <LeftColumn>
                <InputLabel htmlFor="firstname">Ime kupca :</InputLabel>
            <InputText type="text" 
            id="firstname"
            {...formik.getFieldProps("firstname")}
            />
            {formik.touched.firstname && formik.errors.firstname ? (
              <InputError>{formik.errors.firstname}</InputError>
            ) : null}
            </LeftColumn>
            <RightColumn>
            <InputLabel htmlFor="lastanem">Prezime kupca :</InputLabel>
            <InputText type="text" 
            id="lastname"
            {...formik.getFieldProps("lastname")}
            />
            {formik.touched.lastname && formik.errors.lastname ? (
              <InputError>{formik.errors.lastname}</InputError>
            ) : null}
            </RightColumn>
            </FormRow>
            <FormRow>
                <LeftColumn><InputLabel htmlFor="address">Adresa kupca :</InputLabel>
            <InputText type="text" 
            id="address"
            {...formik.getFieldProps("address")}
            />
            {formik.touched.address && formik.errors.address ? (
              <InputError>{formik.errors.address}</InputError>
            ) : null}</LeftColumn>
                <RightColumn><InputLabel htmlFor="city">Grad :</InputLabel>
            <InputText type="text" 
            id="city"
            {...formik.getFieldProps("city")}
            />
            {formik.touched.city && formik.errors.city ? (
              <InputError>{formik.errors.city}</InputError>
            ) : null}</RightColumn>
            
            </FormRow>
            <FormOneRow>
            <InputLabel htmlFor="mobile">Telefon :</InputLabel>
            <InputText type="text" 
            id="mobile"
            {...formik.getFieldProps("mobile")}
            />
            {formik.touched.mobile && formik.errors.mobile ? (
              <InputError>{formik.errors.mobile}</InputError>
            ) : null}
            </FormOneRow>
            </Border>
            </>
          ) 
          : (
            <FormOneRow>
            <InputLabel htmlFor="buyer">Odaberi kupca :</InputLabel>
            <SelectText
                id="buyer"
                type="select"
                disabled={false}
                onChange={e => 
                    handleSelectedBuyerChange(e.target.value)}
              >
                <OptionText value="">--Odaberi--</OptionText>
                {buyers?.map((buyer) => (
                <OptionText key={buyer.id} value={buyer.id}>
                  {buyer.firstname + " " + buyer.lastname + " - " + buyer.address + " - " + buyer.city}
                </OptionText>)
              )}
              </SelectText>
            {formik.touched.buyer && formik.errors.buyer ? (
              <InputError>{formik.errors.buyer}</InputError>
            ) : null}
            </FormOneRow>
          )}
          
          <FormOneRow>
            <InputLabel htmlFor="storage">Skladište</InputLabel>
            <SelectText
                id="storage"
                type="select"
                disabled={false}
                onChange={e => 
                    handleSelectedStorageChange(e.target.value)}
              >
                <OptionText value={null}>--Odaberi--</OptionText>
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
          <FormOneRow>
              <InputLabel>Vrsta artikla</InputLabel>
              <SelectText
              type="select"
              value={option}
              disabled={!(1 > 0)}
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
            <InputLabel htmlFor="itemReceipts">Artikl</InputLabel>
              <SelectText
                id="itemReceipts"
                type="select"
                disabled={selectedStorage == null}
                onChange={e => 
                    handleSelectedItemChange(e.target.value)}
              >
                  
              <OptionText value={null}>--Odaberi--</OptionText>
              {items && items?.map((arrayItem) => (
                <OptionText key={arrayItem.item.id} value={JSON.stringify(arrayItem)}>
                  {arrayItem.item.value + " - " + arrayItem.avaliableQuantity}
                </OptionText>)
              )}
              </SelectText>
              {formik.touched.item && formik.errors.item ? (
                <InputError>{formik.errors.item}</InputError>
              ) : null}
              {arrayItem != null &&
              <InputError>{"Količina artikla na odabranom skladištu je " + ": " + arrayItem.avaliableQuantity}</InputError>
              }
              </LeftColumn>
                  {/* {itemReceipts && itemReceipts.length > 0
                    ? itemReceipts.map((itemProcurement, index) => (
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
                    isDisabled={!(1 > 0)}
                    />
                    {formik.touched.item && formik.errors.item ? (
                    <InputError>{formik.errors.item}</InputError>
                    ) : null}
                    {arrayItem != null && selectedQuantity != null && selectedQuantity > arrayItem.avaliableQuantity ? (
                    <InputError>{"Količina je veća od dostupne količine na skladištu"}</InputError>
                    ) : null}
                  </RightColumn>
                  </FormRow>
                  <FormOneRow>
                  {1 > 0 && 
                    <AddButton
                    type="button"
                    disabled={arrayItem != null && selectedQuantity != null && selectedQuantity > arrayItem.avaliableQuantity }
                    onClick={() =>{
                      formik.values.itemReceipts.push({
                        item: selectedItem,
                        storage: selectedStorage,
                        quantity: parseInt(selectedQuantity)
                      });
                      console.log(formik.values.itemReceipts);
                      handleAdd();
                    }
                    } 
                  >
                     Dodaj artikl
                  </AddButton>
                }
                </FormOneRow>
                  {formik.values.itemReceipts && formik.values.itemReceipts.length > 0
                    ? (
                  <FormOneRow>
                      <Table>
                          <THead>
                              <TableRow>
                              <TableHead>Artikl</TableHead>
                              <TableHead>Količina</TableHead>
                              <TableHead>Skladište</TableHead>
                              <TableHead>Obriši</TableHead>
                              </TableRow>
                          </THead>
                          <TableBody>
                          {formik.values.itemReceipts.map((itemReceipt, index) => (
                              <TableRow key={index + itemReceipt.item.id + itemReceipt.storage.id}>
                              <TableData>{itemReceipt.item.value}</TableData>
                              <TableData>{itemReceipt.quantity}</TableData>
                              <TableData>{itemReceipt.storage.name + "-" + itemReceipt.storage.location}</TableData>
                              <TableData >
                                <FaTrash
                                size={25}
                                onClick={() =>
                                {
                                    formik.values.itemReceipts.splice(index, 1);
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
              {1 > 0 && formik.values.itemReceipts.length > 0 &&
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

export default ReceiptForm;
