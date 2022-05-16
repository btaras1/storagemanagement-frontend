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
import {HiOutlineViewList} from 'react-icons/hi'
import { useState } from "react/cjs/react.development";
import { AddButton } from "../../lib/style/generalStyles";
import ItemForm from "../ItemForm/ItemForm";
import Modal from "../Modal/Modal";
import { deleteColor } from "../../api/color";
import { deleteItem } from "../../api/item";
import ItemView from "../ItemView/ItemView";


const SaleTable = ({
  title,
  head,
  data,
  type,
  fetchData,
  optionSelected,
  storageSelected,
  allSelected
}) => {
  
  const [dog, setDog] = useState(null);
  const [addPressed, setAddPressed] = useState(false);
  const [editPressed, setEditPressed] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const authToken = localStorage.getItem("authToken");

  const [viewPressed, setViewPressed] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [isItemStorage, setIsItemStorage] = useState(false);
  const openViewModal = (item) => {
    setViewItem(item);
    setViewPressed(!viewPressed);
  };

  const openModal = () => {
    setEditPressed(!editPressed);
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
        <Modal title={"Artikl"} setModal={openViewModal}>
          <ItemView
            data={viewItem}
            isItemStorage={isItemStorage}
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
                <TableHead>Prikaži</TableHead>
              </TableRow>
            </THead>
            <TableBody>
              {storageSelected && type !== "-" && data?.map((storage) => (
                storage?.itemStorages?.map((content, index) =>
                <TableRow key={index}>
                  {console.log("USAO")}
                   <TableData >{content?.item?.value}</TableData>
                  {content?.item?.guide_needed !== null && typeof(content?.item?.guide_needed) !== "undefined" &&
                  <TableData >{content?.item?.guide_needed  ? "DA" : "NE"}</TableData>
                  }
                  {content.item?.color?.value &&
                  <TableData >{content.item?.color?.value}</TableData>
                  }
                  <TableData >{content.quantity ? content.quantity : 0}</TableData>
                  <TableData >{content.notMountedQuantity ? content.notMountedQuantity : 0}</TableData>
                  <TableData >{content.avaliableQuantity ? content.avaliableQuantity : 0}</TableData>
                  <TableData >
                    <HiOutlineViewList
                      size={25}
                      onClick={() =>
                        {
                          setIsItemStorage(true);
                          openViewModal(content);
                        }}
                    />
                  </TableData>
                </TableRow>
              )))}
              {storageSelected && type === "-" && data?.map((storage) => (
                storage?.itemStorages?.map((content, index) =>
                <TableRow key={index}>
                  {console.log(content)}
                    <>
                    <TableData >{content?.item?.value}</TableData>                  
                    <TableData >{content?.item?.itemType.value}</TableData> 
                    <TableData>{content.quantity}</TableData>
                    <TableData >{content.notMountedQuantity ? content.notMountedQuantity : 0}</TableData>
                    <TableData >{content.avaliableQuantity ? content.avaliableQuantity : 0}</TableData>
                    <TableData >
                    <HiOutlineViewList
                      size={25}
                      onClick={() =>
                        {
                          setIsItemStorage(true);
                          openViewModal(content);
                        }}
                    />
                  </TableData>
                    </>
                </TableRow>
              )))}
                {!storageSelected && data.map((content, index) => (
                  
                <TableRow key={index}>
                  {console.log(data)}
                  {optionSelected ? (
                    <>
                  <TableData >{content?.value}</TableData>
                  {content?.guideneeded !== null && typeof(content?.guideneeded) !== "undefined" &&
                  <TableData >{content?.guideneeded  ? "DA" : "NE"}</TableData>
                  }
                  {content.color &&
                  <TableData >{content.color}</TableData>
                  }
                  <TableData >{content.quantity ? content.quantity : 0}</TableData>
                  <TableData >{content.notMountedQuantity ? content.notMountedQuantity : 0}</TableData>
                  <TableData >{content.avaliableQuantity ? content.avaliableQuantity : 0}</TableData>
                  <TableData >
                    <HiOutlineViewList
                      size={25}
                      onClick={() =>
                        {
                          setIsItemStorage(false);
                          openViewModal(content);
                        }}
                    />
                  </TableData>
                    </>
                  ) : (
                    <>
                    <TableData >{content.value}</TableData>                  
                    <TableData >{content.type}</TableData> 
                    <TableData>{content.quantity}</TableData>
                    <TableData >{content.notMountedQuantity ? content.notMountedQuantity : 0}</TableData>
                    <TableData >{content.avaliableQuantity ? content.avaliableQuantity : 0}</TableData>
                    <TableData >
                    <HiOutlineViewList
                      size={25}
                      onClick={() =>
                        {
                          setIsItemStorage(false);
                          openViewModal(content);
                        }}
                    />
                  </TableData>
                    </>
                  )}
                   
                </TableRow>
              ))}
            </TableBody>
          </TableStyle>
        </>
      )}
    </>
  );
};
export default SaleTable;
