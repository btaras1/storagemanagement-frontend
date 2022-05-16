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

const ProcurementView = ({data}) => {

  useEffect(() => {
  }, [data]);

  return (
    <>
      {data &&
    <Form >
      <FormOneRow>
            <InputLabel>Datum</InputLabel>
            <InputLabel>{data?.created}</InputLabel>
          </FormOneRow>
          <FormOneRow>
            <InputLabel>Skladište</InputLabel>
            <InputLabel>{data?.storage?.name + '-' + data?.storage?.location}</InputLabel>
          </FormOneRow>
            {data.itemProcurements && data.itemProcurements.length > 0
                    ? (
                  <FormOneRow>
                      <Table>
                          <THead>
                              <TableRow>
                              <TableHead>Artikl</TableHead>
                              <TableHead>Količina</TableHead>
                              </TableRow>
                          </THead>
                          <TableBody>
                          {data.itemProcurements.map((itemProcurement, index) => (
                              <TableRow key={index}>
                              <TableData>{itemProcurement.item.value}</TableData>
                              <TableData>{itemProcurement.quantity}</TableData>
                              </TableRow>
                              ))}
                          </TableBody>
                          
                      </Table>
                  </FormOneRow>
                    )   
                  : null}
      </Form>
      }
    </>
  );
};

export default ProcurementView;
