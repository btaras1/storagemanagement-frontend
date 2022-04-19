import apiOrigin from "./api";

export const getAllItems = (authToken) => {
    return fetch(`${apiOrigin}/item`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }).then((res) => res.json());
  };