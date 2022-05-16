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

const UserForm = (props) => {
  const authToken = localStorage.getItem("authToken");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRequestFinished, setIsRequestFinished] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      roles: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Korisničko ime je obavezno"),
      email: Yup.string().required("Email mora biti unesen"),
      password: Yup.string()
        .min(6, "Lozinka mora biti minimalne duljine 6 znakova")
        .required("Lozinka je obavezna"),
      roles: Yup.string().required("Uloga je obavezna"),
    }),
    onSubmit: (values, { resetForm }) => {
      setIsLoading(true);
      setIsRequestFinished(false);

        const user = {
          username: values.username,
          email: values.email,
          password: values.password,
          roles: [values.roles],
        };

        addUser(user)
          .then((res) => {
            resetForm({});
            setIsLoading(false);
            setIsRequestFinished(true);
            setIsError(false);
            setSuccessMessage("Uspješno ste ažurirali podatke!");
            setTimeout(() => {
              setIsRequestFinished(false);
            }, 4000);
            props.fetchData();
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
            <InputLabel htmlFor="username">Korisničko ime</InputLabel>
            <InputText
              id="username"
              type="text"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username ? (
              <InputError>{formik.errors.username}</InputError>
            ) : null}
          </FormOneRow>
          <FormRow>
            <LeftColumn>
              <InputLabel htmlFor="password">Lozinka</InputLabel>
              <InputText
                id="password"
                type="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <InputError>{formik.errors.password}</InputError>
              ) : null}
            </LeftColumn>
            <RightColumn></RightColumn>
          </FormRow>
          <FormRow>
            <RightColumn>
              <InputLabel htmlFor="active">E-mail</InputLabel>
              <InputText
                id="email"
                type="email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <InputError>{formik.errors.email}</InputError>
              ) : null}
            </RightColumn>
            <LeftColumn>
              <InputLabel htmlFor="roles">Uloga</InputLabel>
              <SelectText
                id="roles"
                type="select"
                {...formik.getFieldProps("roles")}
              >
                <OptionText value="">--Odaberi--</OptionText>
                <OptionText value={"admin"}>Admin</OptionText>
                <OptionText value={"user"}>User</OptionText>
              </SelectText>
              {formik.touched.roles && formik.errors.roles ? (
                <InputError>{formik.errors.roles}</InputError>
              ) : null}
            </LeftColumn>
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

export default UserForm;