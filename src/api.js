// src/api.js
export const API_BASE = "https://starfish-app-zvgwt.ondigitalocean.app/api/v1";

// Login
export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

// Sign Up
export async function signin(email, password) {
  const res = await fetch(`${API_BASE}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Sign up failed");
  return res.json();
}

// WhoAmI
export async function whoami(token) {
  const res = await fetch(`${API_BASE}/whoami`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Not authenticated");
  return res.json();
}

// Get API Keys
export async function getKeys(token) {
  const res = await fetch(`${API_BASE}/keys`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch API keys");
  return res.json();
}

// Create API Key
export async function createKey(token) {
  const res = await fetch(`${API_BASE}/keys`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "text/plain;charset=UTF-8",
    },
    body: "",
  });
  if (!res.ok) throw new Error("Failed to create API key");
  return res.json();
}
