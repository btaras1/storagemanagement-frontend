import apiOrigin from "./api";

export const getAllItems = async (authToken) => {
    return await fetch(`${apiOrigin}/item`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }).then((res) => res.json());
  };

  export const addItem = async (item, authToken) => {
    return await fetch(`${apiOrigin}/item`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    }).then((res) => res.json());
  };

  export const updateItem = async (id, item, authToken) => {
    return await fetch(`${apiOrigin}/item/${id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
  };

  export const deleteItem = async (id, authToken) => {
    return fetch(`${apiOrigin}/item/${id}`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
      method: "DELETE",
    });
  };