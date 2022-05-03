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


const SaleTable = ({
  title,
  head,
  data,
  type,
  fetchData,
  optionSelected,
  storageSelected
}) => {
  
  const [dog, setDog] = useState(null);
  const [addPressed, setAddPressed] = useState(false);
  const [editPressed, setEditPressed] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const authToken = localStorage.getItem("authToken");

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
                {head.map((title) => (
                  <TableHead key={title}>
                    {title}
                  </TableHead>
                ))}
                {storageSelected && 
                <>
                <TableHead >Uredi</TableHead>
                </>
                }
              </TableRow>
            </THead>
            <TableBody>
              {storageSelected && data?.map((storage) => (
                storage?.itemStorages?.map((content) =>
                <TableRow key={content.id}>
                   <TableData >{content?.item?.value}</TableData>
                  {content?.item?.guide_needed !== null && typeof(content?.item?.guide_needed) !== "undefined" &&
                  <TableData >{content?.item?.guide_needed ? "DA" : "NE"}</TableData>
                  }
                  {content.item?.color?.value &&
                  <TableData >{content.item?.color?.value}</TableData>
                  }
                  <TableData >{content.quantity ? content.quantity : 0}</TableData>

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
              )))}
                {!storageSelected && data.map((content) => (
                <TableRow key={content.id}>
                  {optionSelected ? (
                    <>
                    <TableData >{content.value}</TableData> 
                    <TableData >{content.type}</TableData> 
                    </>
                  ) : (
                    <>
                    <TableData >{content.value}</TableData>                  
                    {content?.guideneeded !== null && typeof(content?.guideneeded) !== "undefined" &&
                    <TableData >{content?.guideneeded ? "DA" : "NE"}</TableData>
                    }
                    {content?.color &&
                    <TableData >{content?.color}</TableData>
                    }
                    <TableData>{content.quantity}</TableData>
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
