import { ModalWrapper, FormWrapper, FormRow, Title } from "./ModalStyle";
import { GrClose } from "react-icons/gr";
const BuyerModal = (props) => {
  return (
    <>
      <ModalWrapper>
        <FormWrapper>
          <FormRow>
            <Title>{props.title}</Title>
            <GrClose onClick={() => props.setModal()} />
          </FormRow>
          {props.children}
        </FormWrapper>
      </ModalWrapper>
    </>
  );
};
export default BuyerModal;
