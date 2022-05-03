import apiOrigin from "./api";

export const getEmployeeCount = async (authToken) => {
    return await fetch(`${apiOrigin}/employee/count`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }).then((res) => res.json());
  };