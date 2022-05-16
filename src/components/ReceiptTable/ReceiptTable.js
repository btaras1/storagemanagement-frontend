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
import {HiOutlineViewList, HiDocumentText} from 'react-icons/hi'
import { getReceiptPdf } from "../../api/receipt";

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


  const [viewItem, setViewItem] = useState(null);
const openViewModal = (procurement) => {
    setViewItem(procurement);
    setViewPressed(!viewPressed);
  };

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
          item={viewItem}
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
                <TableHead >Prikaži</TableHead>
                <TableHead >PDF</TableHead>
                </>
                
              </TableRow>
            </THead>
            <TableBody>
              {data?.map((content) => (
                <TableRow key={content.id}>
                   <TableData >{content?.id}</TableData>
                   <TableData >{content?.sold}</TableData>
                   <TableData >{content?.mountedDate ? content.mountedDate : "-"}</TableData>
                   <TableData >{content?.buyer ? (content.buyer.firstname + " " + content.buyer.lastname) : "-"}</TableData>
                   <TableData >{content?.buyer ? (content.buyer.city) : "-"}</TableData>
                
                   <TableData >
                    <HiOutlineViewList
                      size={25}
                      onClick={() =>
                        {
                          openViewModal(content);
                        }}
                    />
                  </TableData>
                  <TableData >
                    <HiDocumentText
                      size={25}
                      onClick={() =>
                        {
                          getReceiptPdf(content.id, authToken)
                        }}
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
