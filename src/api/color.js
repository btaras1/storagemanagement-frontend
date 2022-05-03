import apiOrigin from "./api";

export const getAllColors = async (authToken) => {
    return await fetch(`${apiOrigin}/color`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }).then((res) => res.json());
  };

  export const addColor = async (item, authToken) => {
    return await fetch(`${apiOrigin}/color`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    }).then((res) => res.json());
  };

  export const updateColor = async (id, item, authToken) => {
    return await fetch(`${apiOrigin}/color/${id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
  };

  export const deleteColor = async (id, authToken) => {
    return fetch(`${apiOrigin}/color/${id}`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
      method: "DELETE",
    });
  };