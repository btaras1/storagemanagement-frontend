import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DataLoader from "../../components/DataLoader/DataLoader";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "../../components/Button/ButtonStyle";
import {
  Form,
  FormRow,
  InputLabel,
  InputText,
  InputError,
  SuccessMessage,
} from "../../lib/style/generalStyles";
import { LoginWrapper, Inner, Logo, LogoContainer } from "./LoginStyle";
import LogoImage from "../../assets/images/loginLogo.png";
import { signIn } from "../../api/auth";
import { getAllUsers } from "../../api/user";
import Section from "../../components/Section/Section";
import { useHistory } from "react-router-dom";


const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [isError, setIsError] = useState(false);
  const [isRequestFinished, setIsRequestFinished] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { userLogin } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required("Korisničko ime nije uneseno"),
      password: Yup.string().required("Lozinka nije unesena"),
    }),

    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      try {
        const response = await signIn({
          username: values.username,
          password: values.password,
        });
        console.log(response);
        const users = await getAllUsers(response.accessToken);
        const isAdmin = users
          .find((user) => user.username === values.username)
          .roles.map((role) => {return role.name === "ROLE_ADMIN"});
          console.log(users);
          
        console.log("JEL ADMIN" + isAdmin);

        userLogin(response.accessToken, isAdmin);
        resetForm({});

        setIsLoading(false);
        setIsError(false);
        setIsRequestFinished(true);
        setSuccessMessage("Uspješna prijava!");

        setTimeout(() => {
          setIsRequestFinished(false);
          history.push("/");
        }, 100);
      } catch (error) {
        alert(error);
        setIsError(true);
        setIsLoading(false);
        setIsRequestFinished(true);
        setSuccessMessage("Neuspješna prijava!");
      }
      setIsLoading(false);
    },
  });
  return (
    
    <Section title="POSAVAC - PROZORI I VRATA">
      <LoginWrapper>
        <LogoContainer>
          <Logo src={LogoImage} alt="Horrman logo" />
        </LogoContainer>
        <Inner>
          {isRequestFinished && (
            <SuccessMessage isError={isError}>{successMessage}</SuccessMessage>
          )}

          {!isLoading ? (
            <Form onSubmit={formik.handleSubmit} fullWidth>
              <FormRow>
                <InputLabel htmlFor="username">Korisničko ime</InputLabel>
                <InputText
                  id="username"
                  type="text"
                  {...formik.getFieldProps("username")}
                />
                {formik.touched.username && formik.errors.username && (
                  <InputError>{formik.errors.username}</InputError>
                )}
              </FormRow>
              <FormRow>
                <InputLabel htmlFor="password">Lozinka</InputLabel>
                <InputText
                  id="password"
                  type="password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && (
                  <InputError>{formik.errors.password}</InputError>
                )}
              </FormRow>
              <FormRow>
                <Button type="submit">Prijava</Button>
              </FormRow>
            </Form>
          ) : (
            <DataLoader />
          )}
        </Inner>
      </LoginWrapper>
    </Section>
  );
};

export default Login; 