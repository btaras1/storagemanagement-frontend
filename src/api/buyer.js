import apiOrigin from "./api";

export const getAllBuyers = async (authToken) => {
    return await fetch(`${apiOrigin}/buyer`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }).then((res) => res.json());
  };

  export const getTopCity = async (authToken) => {
    return await fetch(`${apiOrigin}/buyer/top-city`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }).then((res) => res.json());
  };