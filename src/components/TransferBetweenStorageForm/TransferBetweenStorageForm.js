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
import { getAllStorages, transferBetweenStorage } from "../../api/storage";

const TransferBetweenStorageForm = ({isDoor,isMotor,type, passedItem,fetchData}) => {

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
        fromStorageId: "",
        toStorageId: "",
        itemId: "",
        quantity: "",
    },
    validationSchema: Yup.object({
      fromStorageId: Yup.number().required("Izvorno skladište je obavezno!"),
      toStorageId: Yup.number().required("Odredišno skladište je obavezno!"),
      itemId: Yup.number().required("Artikl je obavezan!"),
      quantity: Yup.number().required("Količina je obavezna!")
    }),
    onSubmit: (values, { resetForm }) => {
      setIsLoading(true);
      setIsRequestFinished(false);
      const transferRequest = {
        fromStorageId: values.fromStorageId,
        toStorageId: values.toStorageId,
        itemId: values.itemId,
        quantity: values.quantity,
      };
      
      console.log(JSON.parse(JSON.stringify(transferRequest)));
          transferBetweenStorage(transferRequest, authToken)
          .then((res) => {
          resetForm({});
          setIsLoading(false);
          setIsRequestFinished(true);
          setIsError(false);
          setSuccessMessage("Uspješno ste dodali novi artikl!");
          setTimeout(() => {
            setIsRequestFinished(false);
          }, 4000);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setIsRequestFinished(true);
          setIsError(false);
          setSuccessMessage("Uspješno ste dodali novi artikl!");
        });
      setIsLoading(false);
       
    },
  });



  return (
    <>
      {!isLoading ? (
        
        <Form onSubmit={formik.handleSubmit}>
          <FormOneRow>
            <InputLabel htmlFor="fromStorageId">Izvorno skladište :</InputLabel>
            <SelectText
                id="fromStorageId"
                type="select"
                {...formik.getFieldProps("fromStorageId")}
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
          <FormOneRow>
            <InputLabel htmlFor="toStorageId">Odredišno skladište</InputLabel>
            <SelectText
                id="toStorageId"
                type="select"
                {...formik.getFieldProps("toStorageId")}
              >
                <OptionText value="">--Odaberi--</OptionText>
              {storages.map((item) => (
                <OptionText key={item.id} value={parseInt(item.id)}>
                  {item.name + "-" + item.location}
                </OptionText>)
              )}
              </SelectText>
            {formik.touched.toStorageId && formik.errors.toStorageId ? (
              <InputError>{formik.errors.toStorageId}</InputError>
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
              {formik.touched.color && formik.errors.color ? (
                <InputError>{formik.errors.color}</InputError>
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

export default TransferBetweenStorageForm;
