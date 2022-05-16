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
  TextArea,
} from "../Form/FormSyle";
import { Button } from "../Button/ButtonStyle";
import { useState } from "react/cjs/react.development";
import { SuccessMessage } from "../../lib/style/generalStyles";
import DataLoader from "../DataLoader/DataLoader";
import { addItem, updateItem } from "../../api/item";
import { addColor, getAllColors, updateColor } from "../../api/color";
import { getAllTypes } from "../../api/item-type";

const ItemForm = ({isDoor,isMotor,type, passedItem,fetchData}) => {

  const authToken = localStorage.getItem("authToken");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRequestFinished, setIsRequestFinished] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [colors, setColors] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      await getAllColors(authToken).then((items)=>setColors(items));
      await getAllTypes(authToken).then((items) => setTypes(items));
    }
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])

  const formik = useFormik({
    initialValues: {
      id: "",
      value: "",
      description: "",
      guide_needed: "",
      itemType: "",
      color: "",
    },
    validationSchema: Yup.object({
      value: Yup.string().required("Naziv je obavezan!")
    }),
    onSubmit: (values, { resetForm }) => {
      setIsLoading(true);
      setIsRequestFinished(false);
      const setType = types.find((item) => {return item.value === type});
      console.log(setType);
      const item = {
        value: values.value,
        description: values.description,
        guide_needed: values.guide_needed,
        itemType: setType,
        color: JSON.parse(values.color),
      };
      const color = {
        value: values.value
      }
      console.log(item);
      if(passedItem !== null) {
        if(type === "COLOR") {
          updateColor(passedItem.id, color, authToken)
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
          setIsLoading(false);
          setIsRequestFinished(true);
          setIsError(true);
          setSuccessMessage("Došlo je do greške!");
        });
      setIsLoading(false);
        }
        else {
        updateItem(passedItem.id, item, authToken)
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
          setIsLoading(false);
          setIsRequestFinished(true);
          setIsError(true);
          setSuccessMessage("Došlo je do greške!");
        });
      setIsLoading(false);
        }
      }
      else{
        if(type === "COLOR"){
          addColor(color, authToken)
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
              setIsLoading(false);
              setIsRequestFinished(true);
              setIsError(true);
              setSuccessMessage("Došlo je do greške!");
            });
          setIsLoading(false);
        }
        else {
          addItem(item, authToken)
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
              setIsLoading(false);
              setIsRequestFinished(true);
              setIsError(true);
              setSuccessMessage("Došlo je do greške!");
            });
          setIsLoading(false);
        }
          }    
        fetchData();
    },
  });


  useEffect(() => {
    console.log(type);
    if (passedItem !== null) {
      switch (type) {
        case "DOOR":
          formik.setFieldValue("value", passedItem["value"], false);
          formik.setFieldValue("color", JSON.stringify(passedItem["color"]), false);
          formik.setFieldValue("description", passedItem["description"], false);
          break;
        case "GUIDE":
          formik.setFieldValue("value", passedItem["value"], false);
          formik.setFieldValue("description", passedItem["description"], false);
          break;
        case "SUSPENSION":
            formik.setFieldValue("value", passedItem["value"], false);
            formik.setFieldValue("description", passedItem["description"], false);
            break;
        case "MOTOR":
          formik.setFieldValue("value", passedItem["value"], false);
          formik.setFieldValue("guide_needed", passedItem["guide_needed"], false);
          formik.setFieldValue("description", passedItem["description"], false);
            break;
        case "COLOR":
          formik.setFieldValue("value", passedItem["value"], false);
          formik.setFieldValue("description", passedItem["description"], false);
            break;    
      }
    }
  }, []);

  return (
    <>
      {!isLoading ? (
        
        <Form onSubmit={formik.handleSubmit}>
          <FormOneRow>
            <InputLabel htmlFor="value">Naziv</InputLabel>
            <InputText
              id="value"
              type="text"
              {...formik.getFieldProps("value")}
            />
            {formik.touched.value && formik.errors.value ? (
              <InputError>{formik.errors.value}</InputError>
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
          {isMotor &&
          <FormOneRow>
            <InputLabel htmlFor="guide_needed">Vodilica potrebna</InputLabel>
            <SelectText
                id="guide_needed"
                type="select"
                {...formik.getFieldProps("guide_needed")}
              >
                <OptionText value="">--Odaberi--</OptionText>
                <OptionText value={true}>Da</OptionText>
                <OptionText value={false}>Ne</OptionText>
              </SelectText>
            {formik.touched.guide_needed && formik.errors.guide_needed ? (
              <InputError>{formik.errors.guide_needed}</InputError>
            ) : null}
          </FormOneRow>
          }
          {isDoor &&
          <FormRow>
              <InputLabel htmlFor="color">Boja</InputLabel>
              <SelectText
                id="color"
                type="select"
                {...formik.getFieldProps("color")}
              >
              <OptionText value="">--Odaberi--</OptionText>
              {colors.map((item) => (
                <OptionText key={item.id} value={JSON.stringify(item)}>
                  {item.value}
                </OptionText>)
              )}
              </SelectText>
              {formik.touched.color && formik.errors.color ? (
                <InputError>{formik.errors.color}</InputError>
              ) : null}
          </FormRow>
          }
          <FormRow>
            <Button type="submit">{passedItem != null ? ('Ažuriraj') : ('Dodaj')}</Button>
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

export default ItemForm;
