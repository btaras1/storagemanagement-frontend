import React, { useEffect } from "react";
import {
  Table as TableStyle,
  TableHead,
  TableRow,
  TableData,
  THead,
  TableBody,
  DeleteTableData,
  PuppyTable,
  TableDataCenter,
  TableHeadCenter
} from "./TableStyle";
import { FaTrash, FaEdit, FaPlusSquare, FaFilePdf } from "react-icons/fa";
import { useState } from "react/cjs/react.development";
import { AddButton } from "../../lib/style/generalStyles";
import ItemForm from "../ItemForm/ItemForm";
import Modal from "../Modal/Modal";
import { deleteColor } from "../../api/color";
import { deleteItem } from "../../api/item";
import ReceiptViewForm from "../ReceiptViewForm/ReceiptViewForm";


const ReceiptTable = ({
  title,
  head,
  data,
  type,
  fetchData,
  optionSelected,
  storageSelected
}) => {
  
  const [dog, setDog] = useState(null);
  const [viewPressed ,setViewPressed] = useState(false);
  const [addPressed, setAddPressed] = useState(false);
  const [editPressed, setEditPressed] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const authToken = localStorage.getItem("authToken");

  const openModal = () => {
    setViewPressed(!viewPressed);
  };

  const handleDelete = (id) => {
    if(type === "COLOR") {
      deleteColor(id, authToken);
      fetchData();
    }
    else {
      deleteItem(id, authToken);
      fetchData();
    }
  };

  useEffect(() => {
    console.log(data);
  }, []);

  useEffect(() => {
    
  }, [data]);

  return (
    <>
      {viewPressed &&
        <Modal title={"Podaci o prodaji"} setModal={openModal}>
          <ReceiptViewForm
          item={selectedItem}
          />
        </Modal>
      }

      {data !== null && (
        <>
          <TableStyle>
            <THead>
              <TableRow>
                {head.map((title) => (
                  <TableHead key={title}>
                    {title}
                  </TableHead>
                ))}
             
                <>
                <TableHead >Uredi</TableHead>
                </>
                
              </TableRow>
            </THead>
            <TableBody>
              {data?.map((content) => (
                <TableRow key={content.id}>
                   <TableData >{content?.id}</TableData>
                   <TableData >{content?.sold}</TableData>
                   <TableData >{content?.mounted ? content.mounted : "-"}</TableData>
                
                  <TableData >
                    <FaEdit
                      size={25}
                      onClick={() =>
                        {
                          setSelectedItem(content);
                          openModal();
                        }
                      
                      }
                    />
                  </TableData>
                </TableRow>
              ))}
            </TableBody>
          </TableStyle>
        </>
      )}
    </>
  );
};
export default ReceiptTable;
