import apiOrigin from "./api";

export const getAllTypes = async (authToken) => {
    return await fetch(`${apiOrigin}/item-type`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }).then((res) => res.json());
  };