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
} from "./TableStyle";
import { FaTrash, FaEdit, FaPlusSquare, FaFilePdf } from "react-icons/fa";
import { useState } from "react/cjs/react.development";
import { AddButton } from "../../lib/style/generalStyles";


const Table = ({
  title,
  head,
  data
}) => {
  
  const [dog, setDog] = useState(null);
  const [addPressed, setAddPressed] = useState(false);


  useEffect(() => {
    console.log(data);
  }, []);

  useEffect(() => {
    
  }, [data]);

  return (
    <>
      {/*{addPressed && dogs && (
        <Modal title={title} setModal={openModal}>
          <DogForm
            get={get}
            addPressed={addPressed}
            dog={dog}
            setAddPressed={setAddPressed}
            gender={gender}
          />
        </Modal>
      )}} */ }

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
                  <TableData >{content?.guide_needed ? "DA" : "-"}</TableData>
                  <TableData >{content.itemType.value }</TableData>
                  <TableData >{content.color?.value ? content.color?.value : "-"}</TableData>
                  <DeleteTableData >
                    <FaEdit
                      size={25}
                    />
                  </DeleteTableData>
                  <DeleteTableData >
                    <FaTrash
                      size={25}
                    />
                  </DeleteTableData>
                </TableRow>
              ))}
            </TableBody>
          </TableStyle>
          <AddButton
          >
            Dodaj
          </AddButton>
        </>
      )}
    </>
  );
};
export default Table;
