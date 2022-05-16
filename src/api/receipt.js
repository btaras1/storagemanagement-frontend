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

  export const getReceiptPdf = async (content) => {
    return fetch(`${apiOrigin}/receipt/download/${content.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/pdf',
      },
    })
    .then((response) => response.blob())
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(
        new Blob([blob]),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `RACUN_${content.sold}.pdf`,
      );
  
      // Append to html link element page
      document.body.appendChild(link);
  
      // Start download
      link.click();
  
      // Clean up and remove the link
      link.parentNode.removeChild(link);
    });
  };

  