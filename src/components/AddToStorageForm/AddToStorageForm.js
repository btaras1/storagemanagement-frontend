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
import { addColor, getAllColors, updateColor } from "../../api/color";
import { getAllTypes } from "../../api/item-type";
import {  getAllStorages } from "../../api/storage";

const AddToStorageForm= ({isDoor,isMotor,type, passedItem,fetchData}) => {

  const authToken = localStorage.getItem("authToken");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRequestFinished, setIsRequestFinished] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [colors, setColors] = useState([]);
  const [types, setTypes] = useState([]);

  const [storages, setStorages] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      
      await getAllItems(authToken).then((items)=>setItems(items));
      await getAllStorages(authToken).then((items) => setStorages(items));
    }
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])

  const formik = useFormik({
    initialValues: {
      storageId: "",
      itemId: "",
      quantity: ""
    },
    validationSchema: Yup.object({

    }),
    onSubmit: (values, { resetForm }) => {
      setIsLoading(true);
      setIsRequestFinished(false);
      const addRequest = {
        storageId: values.storageId,
        itemId: values.itemId,
        quantity: values.quantity,
      };

     

    },
  });


  useEffect(() => {
    console.log(passedItem);
    if (passedItem !== null) {
      switch (type) {
        case "DOOR":
          formik.setFieldValue("value", passedItem["value"], false);
          formik.setFieldValue("color", JSON.stringify(passedItem["color"]), false);
          break;
        case "GUIDE":
          formik.setFieldValue("value", passedItem["value"], false);
          break;
        case "MOTOR":
          formik.setFieldValue("value", passedItem["value"], false);
          formik.setFieldValue("guide_needed", passedItem["guide_needed"], false);
            break;
        case "COLOR":
          formik.setFieldValue("value", passedItem["value"], false);
            break;    
      }
    }
  }, []);

  return (
    <>
      {!isLoading ? (
        
        <Form onSubmit={formik.handleSubmit}>
          <FormOneRow>
            <InputLabel htmlFor="storageId">Skladište :</InputLabel>
            <SelectText
                id="storageId"
                type="select"
                {...formik.getFieldProps("storageId")}
              >
                <OptionText value="">--Odaberi--</OptionText>
              {storages.map((item) => (
                <OptionText key={item.id} value={parseInt(item.id)}>
                  {item.name + "-" + item.location}
                </OptionText>)
              )}
              </SelectText>
            {formik.touched.fromStorageId && formik.errors.fromStorageId ? (
              <InputError>{formik.errors.fromStorageId}</InputError>
            ) : null}
          </FormOneRow>
          <FormRow>
              <InputLabel htmlFor="itemId">Artikl</InputLabel>
              <SelectText
                id="itemId"
                type="select"
                {...formik.getFieldProps("itemId")}
              >
              <OptionText value="">--Odaberi--</OptionText>
              {items.map((item) => (
                <OptionText key={item.id} value={parseInt(item.id)}>
                  {item.value}
                </OptionText>)
              )}
              </SelectText>
              {formik.touched.itemId && formik.errors.itemId ? (
                <InputError>{formik.errors.itemId}</InputError>
              ) : null}
          </FormRow>
          <FormRow>
              <InputLabel htmlFor="quantity">Količina</InputLabel>
              <InputText
                id="quantity"
                type="number"
                {...formik.getFieldProps("quantity")}
              />
              {formik.touched.quantity && formik.errors.quantity ? (
                <InputError>{formik.errors.quantity}</InputError>
              ) : null}
          </FormRow>
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
        </Form>
      ) : (
        <DataLoader />
      )}
    </>
  );
};

export default AddToStorageForm;
