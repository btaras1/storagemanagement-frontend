import React, {useEffect} from "react";
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
  Title,
} from "../Form/FormSyle";
import { Button } from "../Button/ButtonStyle";
import { SuccessMessage } from "../../lib/style/generalStyles";
import DataLoader from "../DataLoader/DataLoader";


const ReceiptViewForm = ({item}) => {
    useEffect(() => {
        console.log(item.productReceipts);
      }, []);
  return (
    <>
    {item &&
        <Form>
        <FormRow>
            <LeftColumn>
          <FormRow>
              <LeftColumn>Kupac :</LeftColumn>
              <RightColumn><InputLabel>{item?.buyer?.firstname + " " + item?.buyer?.lastname}</InputLabel></RightColumn>
          </FormRow>
          <FormRow>
              <LeftColumn>Adresa :</LeftColumn>
              <RightColumn><InputLabel>{item?.buyer?.address + " , " + item?.buyer?.city}</InputLabel></RightColumn>
          </FormRow>
          </LeftColumn>
          <RightColumn>
          <FormRow>
              <LeftColumn>Mobitel : </LeftColumn>
              <RightColumn><InputLabel>{item?.buyer?.mobile}</InputLabel></RightColumn>
          </FormRow>
          <FormRow>
              <LeftColumn>Montirao : </LeftColumn>
              <RightColumn><InputLabel>{item?.employee?.firstname + " " + item?.employee?.lastname}</InputLabel></RightColumn>
          </FormRow>
          </RightColumn>
          </FormRow>

          {item && item.productReceipts.map((content) => (
            <>
            <Title>Podaci o proizvodu</Title>
              <FormRow>
            <LeftColumn>Vrata :</LeftColumn>
            <RightColumn><InputLabel>{content.product?.door?.value}</InputLabel></RightColumn>
              </FormRow>
              <FormRow>
              <LeftColumn>Vodilica :</LeftColumn>
              <RightColumn><InputLabel>{content.product?.guide?.value}</InputLabel></RightColumn>
                </FormRow>
                <FormRow>
                <LeftColumn>Motor :</LeftColumn>
                <RightColumn><InputLabel>{content.product?.motor?.value}</InputLabel></RightColumn>
                  </FormRow>
                  <FormRow>
                <LeftColumn>Količina :</LeftColumn>
                <RightColumn><InputLabel>{content?.quantity}</InputLabel></RightColumn>
                  </FormRow>
            </>
          ))}

        </Form>
}
    </>
  );
};

export default ReceiptViewForm;
