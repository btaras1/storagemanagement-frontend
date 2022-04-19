import apiOrigin from "./api";

export const getAllUsers = (authToken) => {
  return fetch(`${apiOrigin}/user`, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  }).then((res) => res.json());
};

export const deleteUser = (id, authToken) => {
  return fetch(`${apiOrigin}/user/${id}`, {
    headers: {
      Authorization: "Bearer " + authToken,
    },
    method: "DELETE",
  });
};

export const addUser = (user, authToken) => {
  return fetch(`${apiOrigin}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export const updateUser = (id, user, authToken) => {
  return fetch(`${apiOrigin}/user/${id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};
