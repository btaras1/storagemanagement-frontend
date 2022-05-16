import apiOrigin from "./api";

export const getAllReceipts = async (authToken) => {
    return await fetch(`${apiOrigin}/receipt`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }).then((res) => res.json());
  };

  export const getAllReceiptsNotMounted = async (authToken) => {
    return await fetch(`${apiOrigin}/receipt/mount-false`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }).then((res) => res.json());
  };

  export const getLatestReceipt = async (authToken) => {
    return await fetch(`${apiOrigin}/receipt/last`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }).then((res) => res.json());
  };

  export const getMostSelledDoor = async (authToken) => {
    return await fetch(`${apiOrigin}/receipt/most-selled-door`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }).then((res) => res.json());
  };

  export const getReceiptCountForCurrentMonth = async (authToken) => {
    return await fetch(`${apiOrigin}/receipt/count-receipts-current-month`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }).then((res) => res.json());
  };

  export const addPReceipt = async (receipt, authToken) => {
    return await fetch(`${apiOrigin}/receipt`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(receipt)
    }).then((res) => res.json());
  };

  export const updateMountReceipt = async (id,requestDto, authToken) => {
    return await fetch(`${apiOrigin}/receipt/mount/${id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestDto)
    }).then((res) => res.json());
  };