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
} from "../Form/FormSyle";
import { Button } from "../Button/ButtonStyle";
import { useState } from "react/cjs/react.development";
import { addUser } from "../../api/user";
import { SuccessMessage } from "../../lib/style/generalStyles";
import DataLoader from "../DataLoader/DataLoader";
import Section from "../Section/Section";
import { addStorage } from "../../api/storage";


const StorageForm = (props) => {
  const authToken = localStorage.getItem("authToken");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRequestFinished, setIsRequestFinished] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      name:"",
      location:"",
    },
    validationSchema: Yup.object({
        name: Yup.string().required("Ime je obavezno"),
      location: Yup.string().required("Prezime je obavezno"),
    }),
    onSubmit: (values, { resetForm }) => {
      setIsLoading(true);
      setIsRequestFinished(false);

        const storage = {
          name: values.name,
          location: values.location
        };

        addStorage(storage, authToken)
          .then((res) => {
            resetForm({});
            setIsLoading(false);
            setIsRequestFinished(true);
            setIsError(false);
            setSuccessMessage("Uspješno ste ažurirali podatke!");
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


  return (
    <>
      {!isLoading ? (
        <Form onSubmit={formik.handleSubmit}>
          <FormOneRow>
            <InputLabel htmlFor="name">Naziv</InputLabel>
            <InputText
              id="name"
              type="text"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name ? (
              <InputError>{formik.errors.name}</InputError>
            ) : null}
          </FormOneRow>
          <FormOneRow>
            <InputLabel htmlFor="location">Lokacija</InputLabel>
            <InputText
              id="location"
              type="text"
              {...formik.getFieldProps("location")}
            />
            {formik.touched.location && formik.errors.location ? (
              <InputError>{formik.errors.location}</InputError>
            ) : null}
          </FormOneRow>
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

export default StorageForm;