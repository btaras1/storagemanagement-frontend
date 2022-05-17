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
import { Border, SuccessMessage } from "../../lib/style/generalStyles";
import DataLoader from "../DataLoader/DataLoader";


const ReceiptViewForm = ({item}) => {
    useEffect(() => {
        console.log(item.productReceipts);
      }, []);
  return (
    <>
    {item &&
        <Form>
          <FormRow><InputLabel>Broj računa :</InputLabel>
          <InputLabel>{`\xa0` + item.id}</InputLabel></FormRow>
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
              <LeftColumn>Opis : </LeftColumn>
              <RightColumn><InputLabel>{item?.description}</InputLabel></RightColumn>
          </FormRow>
          </RightColumn>
          </FormRow>
          <FormRow>
            <InputLabel>Montirali :</InputLabel>
            {item && item.employees.map((content, index) => (
            <>
            
            {index + 1 === item.employees.length ? (<InputLabel key={index}>{`\xa0 ${content.firstname} \xa0 ${content.lastname}`}</InputLabel>)
            :(
              <InputLabel key={index}>{`\xa0 ${content.firstname} \xa0 ${content.lastname} ,`}</InputLabel>
            )  
          }
            </>
            ))}
          </FormRow>
        <FormRow>
        <Title>Stavke :</Title>
        </FormRow>
          {item && item.itemReceipts.map((content) => (
            <>
            <Border>
              <FormRow>
                
            <LeftColumn>Naziv :</LeftColumn>
            <RightColumn><InputLabel>{content?.item.itemType.value === "DOOR" ? (content?.item.value + '-' + content?.item.color.value) : (content?.item.value )}</InputLabel></RightColumn>
              </FormRow>
              <FormRow>
              <LeftColumn>Opis :</LeftColumn>
              <RightColumn><InputLabel>{content?.item?.description}</InputLabel></RightColumn>
                </FormRow>
                <FormRow>
                <LeftColumn>Količina :</LeftColumn>
                <RightColumn><InputLabel>{content?.quantity}</InputLabel></RightColumn>
                  </FormRow>
                  <FormRow>
                <LeftColumn>Količina :</LeftColumn>
                <RightColumn><InputLabel>{content?.storage.name + '-' + content?.storage.location}</InputLabel></RightColumn>
                  </FormRow>
                  </Border>
            </>
          ))}

        </Form>
}
    </>
  );
};

export default ReceiptViewForm;
