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
} from "../../components/Form/FormSyle";
import { Button } from "../../components/Button/ButtonStyle";
import { useState } from "react/cjs/react.development";
import { addUser, getAllUsers } from "../../api/user";
import { SuccessMessage } from "../../lib/style/generalStyles";
import DataLoader from "../../components/DataLoader/DataLoader";
import UserForm from "../../components/UserForm/UserForm";
import { AddButton } from "../../lib/style/generalStyles";
import Section
 from "../../components/Section/Section";
import Modal from "../../components/Modal/Modal";
import { Table as TableStyle, TableData, THead, TableRow, TableHead, TableBody } from "../../components/ItemTable/TableStyle";


const UserManagement = (props) => {
  const authToken = localStorage.getItem("authToken");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRequestFinished, setIsRequestFinished] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [addPressed, setAddPressed] = useState(false);
  const [data, setData] = useState(null)

  const initialFetchData = async () => {
    await getAllUsers(authToken).then((items) => setData(items));
   
    //setOption("-");
  }

  useEffect(() => {
    // declare the data fetching function
    
  
    // call the function
    initialFetchData()
      // make sure to catch any error
      .catch(console.error);

  }, [])

  const openModal= () => {
    setAddPressed(!addPressed);
  }
  return (
    <>
    {addPressed  && (
            <Modal title={"Dodavanje korisnika"} setModal={openModal}>
              <UserForm
              />
            </Modal>
            )}
          {data ? (
          <>
          <Section title={"Korisnici"}>
            <TableStyle>
              <THead>
                <TableRow>
                    <TableHead>Korisničko ime</TableHead>
                    <TableHead>Izrađen</TableHead>
                    <TableHead>Prava</TableHead>
                </TableRow>
              </THead>
              <TableBody>
                {data.map((content) => (
                  <TableRow>
                    <TableData>{content.username}</TableData>
                    <TableData>{content.created}</TableData>
                    {content.roles.map((role) => 
                      <TableData>{role.name}</TableData>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </TableStyle>
            <AddButton
                onClick={() => openModal()}>
                Dodaj
                </AddButton>
                </Section>
          </>
        ) : (
          <Section title="LOADING..." />
        )}
    </>
  );
};

export default UserManagement;