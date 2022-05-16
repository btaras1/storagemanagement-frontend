import apiOrigin from "./api";

export const addProcurement = async (procurement, authToken) => {
    return await fetch(`${apiOrigin}/procurement`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(procurement)
    }).then((res) => res.json());
  };

  export const getAllProcurements = async (authToken) => {
    return await fetch(`${apiOrigin}/procurement`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }).then((res) => res.json());
  };