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
} from "../SaleTable/TableStyle";
import { FaTrash, FaEdit, FaPlusSquare, FaFilePdf} from "react-icons/fa";
import {HiOutlineViewList, HiDocumentText} from 'react-icons/hi'
import { useState } from "react/cjs/react.development";
import { AddButton } from "../../lib/style/generalStyles";
import ItemForm from "../ItemForm/ItemForm";
import Modal from "../Modal/Modal";
import { deleteColor } from "../../api/color";
import { deleteItem } from "../../api/item";
import ProcurementForm from "../ProcurementForm/ProcurementForm";
import ProcurementView from "../ProcurementView/ProcurementView";
import { getProcurementPdf } from "../../api/procurement";


const ProcurementTable = ({
  title,
  head,
  data,
  type,
  fetchData,
  optionSelected,
  storageSelected
}) => {
  
  const authToken = localStorage.getItem("authToken");

  const [dog, setDog] = useState(null);
  const [addPressed, setAddPressed] = useState(false);
  const [viewPressed, setViewPressed] = useState(false);
  const [editPressed, setEditPressed] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [passedItem, setPassedItem] = useState(null);


  const openAddModal = () => {
    setAddPressed(!addPressed);
  };

  const openViewModal = (procurement) => {
    setViewItem(procurement);
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
    {addPressed  && (
            <Modal title={"Nabava"} setModal={openAddModal}>
              <ProcurementForm fetchInitialData={fetchData}/>
            </Modal>
            )}
      {viewPressed  && (
            <Modal title={"Nabava"} setModal={openViewModal}>
              <ProcurementView
              data={viewItem}
              />
            </Modal>
            )}      
      {/*editPressed &&
        <Modal title={"Artikl"} setModal={openModal}>
          <ItemForm
            isDoor={type === "DOOR" ? true : false }
            isMotor={type === "MOTOR" ? true : false}
            type={type}
            passedItem={selectedItem}
            fetchData={fetchData}
          />
        </Modal>*/
      }

      {data !== null && (
        <>
          <TableStyle>
            <THead>
              <TableRow>
                <TableHead >Br.</TableHead>
                <TableHead >Kreirano</TableHead>
                <TableHead >Skladište</TableHead>
                <TableHead >Pogledaj</TableHead>
                <TableHead>PDF</TableHead>
              </TableRow>
            </THead>
            <TableBody>
              {data?.map((content) => 
                <TableRow key={content.id}>
                   <TableData >{content.documentId != null ? (content.documentId):(content?.id)}</TableData>
                   <TableData >{content?.created}</TableData>
                   <TableData >{content?.storage?.name + '-' + content?.storage?.location}</TableData>
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
                          getProcurementPdf(content)
                        }}
                    />
                  </TableData>
                </TableRow>
              )}
            </TableBody>
          </TableStyle>
          <AddButton
                onClick={() => openAddModal()}>
                Dodaj
                </AddButton>
        </>
      )}
    </>
  );
};
export default ProcurementTable;


