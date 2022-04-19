import apiOrigin from "./api";

export const signIn = (user) => {
  return fetch(`${apiOrigin}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export const signUp = (user) => {
    return fetch(`${apiOrigin}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => res.json());
  };