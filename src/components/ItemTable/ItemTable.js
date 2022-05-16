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


const Table = ({
  title,
  head,
  data,
  type,
  fetchData,
  refresh
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

const handleFetchData = () => {
  fetchData();
}

  useEffect(() => {
    console.log(data);
  }, []);

  useEffect(() => {
    handleFetchData();
  }, [refresh]);

  return (
    <>
      {editPressed &&
        <Modal title={"Artikl"} setModal={openModal}>
          <ItemForm
            isDoor={type === "DOOR" ? true : false }
            isMotor={type === "MOTOR" ? true : false}
            type={type}
            passedItem={selectedItem}
            fetchData={fetchData}
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
                <TableHead >Uredi</TableHead>
                <TableHead >Obriši</TableHead>
              </TableRow>
            </THead>
            <TableBody>
              {data.map((content) => (
                <TableRow key={content.id}>
                  <TableData >{content.value}</TableData>
                  {content?.guide_needed !== null && typeof(content?.guide_needed) !== "undefined" &&
                  <TableData >{content?.guide_needed ? "DA" : "NE"}</TableData>
                  }
                  {content.color?.value &&
                  <TableData >{content.color?.value}</TableData>
                  }
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
                  <TableData >
                    <FaTrash
                      size={25}
                      onClick={()=>
                        {
                          handleDelete(content.id);
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
export default Table;
