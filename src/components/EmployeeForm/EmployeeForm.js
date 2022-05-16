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
import { addEmployee } from "../../api/employee";

const EmployeeForm = (props) => {
  const authToken = localStorage.getItem("authToken");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRequestFinished, setIsRequestFinished] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      firstname:"",
      lastname:"",
    },
    validationSchema: Yup.object({
        firstname: Yup.string().required("Ime je obavezno"),
      lastname: Yup.string().required("Prezime je obavezno"),
    }),
    onSubmit: (values, { resetForm }) => {
      setIsLoading(true);
      setIsRequestFinished(false);

        const employee = {
          firstname: values.firstname,
          lastname: values.lastname
        };

        addEmployee(employee, authToken)
          .then((res) => {
            resetForm({});
            setIsLoading(false);
            setIsRequestFinished(true);
            setIsError(false);
            setSuccessMessage("Uspješno ste ažurirali podatke!");
            props.fetchData();
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
            <InputLabel htmlFor="firstname"> Ime</InputLabel>
            <InputText
              id="firstname"
              type="text"
              {...formik.getFieldProps("firstname")}
            />
            {formik.touched.firstname && formik.errors.firstname ? (
              <InputError>{formik.errors.firstname}</InputError>
            ) : null}
          </FormOneRow>
          <FormOneRow>
            <InputLabel htmlFor="lastname">Prezime</InputLabel>
            <InputText
              id="lastname"
              type="text"
              {...formik.getFieldProps("lastname")}
            />
            {formik.touched.lastname && formik.errors.lastname ? (
              <InputError>{formik.errors.lastname}</InputError>
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

export default EmployeeForm;