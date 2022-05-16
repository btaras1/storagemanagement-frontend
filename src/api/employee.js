import apiOrigin from "./api";

export const getEmployeeCount = async (authToken) => {
    return await fetch(`${apiOrigin}/employee/count`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    }).then((res) => res.json());
  };


export const getAllEmployees = async (authToken) => {
  return await fetch(`${apiOrigin}/employee`, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  }).then((res) => res.json());
};

export const addEmployee= async (employee, authToken) =>{
  return await fetch(`${apiOrigin}/employee`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(employee)
    }).then((res) => res.json());
};