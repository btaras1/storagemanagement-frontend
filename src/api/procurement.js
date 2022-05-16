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

  export const getProcurementPdf = async (content) => {
    return fetch(`${apiOrigin}/procurement/download/${content.id}`, {
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
        `NABAVA_${content.created}.pdf`,
      );
  
      // Append to html link element page
      document.body.appendChild(link);
  
      // Start download
      link.click();
  
      // Clean up and remove the link
      link.parentNode.removeChild(link);
    });
  };