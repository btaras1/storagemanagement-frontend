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
import {HiOutlineViewList, HiAdjustments} from 'react-icons/hi'
import ReceiptMountForm from "../ReceiptMountForm/ReceiptMountForm";

const ReceiptMountTable = ({
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
  const [adjustmentsPressed, setAdjustmentsPressed] = useState(false);
  const [adItem, setAdItem] = useState(null);
  const authToken = localStorage.getItem("authToken");


  const [viewItem, setViewItem] = useState(null);
const openViewModal = (procurement) => {
    setViewItem(procurement);
    setViewPressed(!viewPressed);
  };

  const openAdViewModal = (receipt) => {
    setAdItem(receipt);
    setAdjustmentsPressed(!adjustmentsPressed);
  };

  const openModal = () => {
    setViewPressed(!viewPressed);
  };

  const openAdModal = () => {
    setAdjustmentsPressed(!adjustmentsPressed);
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
      {adjustmentsPressed &&
        <Modal title={"Podaci o prodaji"} setModal={openAdModal}>
        <ReceiptMountForm
        passedItem={adItem}
        fetchInitialData={fetchData}
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
                <TableHead>Postavi</TableHead>
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
                    <HiAdjustments
                      size={25}
                      onClick={() =>
                        {
                          openAdViewModal(content);
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
export default ReceiptMountTable;
