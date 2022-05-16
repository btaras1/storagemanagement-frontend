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
} from "../Form/FormSyle";
import { Button } from "../Button/ButtonStyle";
import { useState } from "react/cjs/react.development";
import { AddButton, SuccessMessage } from "../../lib/style/generalStyles";
import DataLoader from "../DataLoader/DataLoader";
import { addItem, getAllItems, updateItem } from "../../api/item";
import { getAllTypes } from "../../api/item-type";
import { getAllStorages } from "../../api/storage";
import { Table, TableBody, TableData, TableHead, TableRow, THead } from "../ProcurementFormTable/ProcurementFormTableStyle";
import InputBar from "../InputBar/InputBar";
import { addProcurement } from "../../api/procurement";

const ItemView = ({data, isItemStorage}) => {

  useEffect(() => {
      console.log(data);
  }, [data]);

  return (
    <>
      {data && 
    <Form >
            <>
          <FormOneRow>
            <InputLabel>Naziv</InputLabel>
            <InputLabel>{data.value}</InputLabel>
          </FormOneRow>
          {data.description &&
          <FormOneRow>
            <InputLabel>Opis</InputLabel>
            <InputLabel>{data.description}</InputLabel>
          </FormOneRow>
            }
            {data.color &&
          <FormOneRow>
            <InputLabel>Boja</InputLabel>
            <InputLabel>{data.color}</InputLabel>
          </FormOneRow>
            }
            {data?.guideneeded !== null && typeof(data?.guideneeded) !== "undefined" &&
          <FormOneRow>
            <InputLabel>Vodilica potrebna</InputLabel>
            <InputLabel>{data.guideneeded ? ("DA") : ("NE")}</InputLabel>
          </FormOneRow>
            }
          <FormOneRow>
            <InputLabel>Ukupno na skladištu</InputLabel>
            <InputLabel>{data.quantity}</InputLabel>
          </FormOneRow>
          <FormRow>
              <LeftColumn>
                <InputLabel>Rezervirano</InputLabel>
                <InputLabel>{data.notMountedQuantity}</InputLabel>
              </LeftColumn>
              <RightColumn>
                <InputLabel>Dostupno</InputLabel>
                <InputLabel>{data.avaliableQuantity}</InputLabel>
              </RightColumn>
            
          </FormRow>
          </>
      </Form>
}
    </>
  );
};

export default ItemView;
