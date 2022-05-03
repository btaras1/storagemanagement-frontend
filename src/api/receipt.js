import apiOrigin from "./api";

export const getAllReceipts = async (authToken) => {
    return await fetch(`${apiOrigin}/receipt`, {
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