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
import { getAllStorages } from "../../api/storage";
import { getAllEmployees } from "../../api/employee";
import StorageForm from "../../components/StorageForm/StorageForm";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";


const Other = (props) => {
  const authToken = localStorage.getItem("authToken");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRequestFinished, setIsRequestFinished] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [addStoragePressed, setAddStoragePressed] = useState(false);
  const [addEmployeePressed, setAddEmployeePressed] = useState(false);
  const [employeeData, setEmployeeData] = useState(null)
  const [storageData, setStorageData] = useState(null);

  const initialFetchData = async () => {
    await getAllStorages(authToken).then((items) => setStorageData(items));
    await getAllEmployees(authToken).then((items) => setEmployeeData(items));
   
    //setOption("-");
  }

  useEffect(() => {
    // declare the data fetching function
    
  
    // call the function
    initialFetchData()
      // make sure to catch any error
      .catch(console.error);

  }, [])

  useEffect(() => {

  }, [storageData, employeeData])

  const openEmployeeModal= () => {
    setAddEmployeePressed(!addEmployeePressed);
  }
  const openStorageModal= () => {
    setAddStoragePressed(!addStoragePressed);
  }
  return (
    <>
    {addStoragePressed  && (
            <Modal title={"Dodavanje skladišta"} setModal={ openStorageModal}>
              <StorageForm fetchData={initialFetchData}/>
            </Modal>
            )}
    {addEmployeePressed  && (
            <Modal title={"Dodavanje zaposlenika"} setModal={openEmployeeModal}>
              <EmployeeForm fetchData={initialFetchData}/>
            </Modal>
            )}        
          {employeeData ? (
          <>
          <Section title={"Zaposlenici"}>
            <TableStyle>
              <THead>
                <TableRow>
                    <TableHead>Ime</TableHead>
                    <TableHead>Prezime</TableHead>
                </TableRow>
              </THead>
              <TableBody>
                {employeeData.map((content) => (
                  <TableRow>
                    <TableData>{content.firstname}</TableData>
                    <TableData>{content.lastname}</TableData>
                  </TableRow>
                ))}
              </TableBody>
            </TableStyle>
            <AddButton
                onClick={() => openEmployeeModal()}>
                Dodaj
                </AddButton>
                </Section>
          </>
        ) : (
          <Section title="LOADING..." />
        )}
        {storageData ? (
          <>
          <Section title={"Skladišta"} withoutTopPadding={true}>
            <TableStyle>
              <THead>
                <TableRow>
                    <TableHead>Naziv</TableHead>
                    <TableHead>Lokacija</TableHead>
                </TableRow>
              </THead>
              <TableBody>
                {storageData.map((content) => (
                  <TableRow>
                    <TableData>{content.name}</TableData>
                    <TableData>{content.location}</TableData>
                  </TableRow>
                ))}
              </TableBody>
            </TableStyle>
            <AddButton
                onClick={() => openStorageModal()}>
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

export default Other;