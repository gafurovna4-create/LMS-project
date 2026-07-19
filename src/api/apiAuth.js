import { api } from "./api";


const BASE_URL = "https://api.escuelajs.co/api/v1"

export async function loginRequest(email, password) {
    const response = await api.post("/auth/login", { email, password })

    if (!response.data) {
        throw new Error("Something went wrong!")
    }

    return response.data;
}

export async function registerRequest(email, name, password) {
  const response = await api.post("/users", {
    email,
    name,
    password,
    avatar,
  });
  
  if (!response.data) {
    throw new Error("Something went wrong!")
  }

  return response.data;
}

export async function getProfile(token) {
    const response = await fetch(`${BASE_URL}/auth/profile`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Something went wrong!");
    }

    return response.json();
}
