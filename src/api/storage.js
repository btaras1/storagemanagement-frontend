import apiOrigin from "./api";

export const getAllItemsInStorages = async (authToken) => {
    return await fetch(`${apiOrigin}/storage/items-storage`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }).then((res) => res.json());
  };

  export const getAllStorages = async (authToken) => {
    return await fetch(`${apiOrigin}/storage`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }).then((res) => res.json());
  };

  export const getStorage = async (id,authToken) => {
    return await fetch(`${apiOrigin}/storage/${id}`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }).then((res) => res.json());
  };


  export const transferBetweenStorage = async (transferReq, authToken) =>{
    return await fetch(`${apiOrigin}/storage/transfer`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + authToken,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(transferReq)
      }).then((res) => res.json());
  };

  export const addToStorage = async (addReq, authToken) =>{
    return await fetch(`${apiOrigin}/storage/add`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + authToken,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(addReq)
      }).then((res) => res.json());
  };

  export const getCountItems = async (authToken) => {
    return await fetch(`${apiOrigin}/storage/count-items`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }).then((res) => res.json());
  };