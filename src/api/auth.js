const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://dinmaegler.onrender.com";

function toErrorMessage(errorData, fallbackMessage) {
  if (!errorData) {
    return fallbackMessage;
  }

  if (typeof errorData === "string") {
    return errorData;
  }

  if (errorData.message && typeof errorData.message === "string") {
    return errorData.message;
  }

  if (Array.isArray(errorData.message) && errorData.message.length > 0) {
    const firstMessage = errorData.message[0];
    if (firstMessage?.messages?.[0]?.message) {
      return firstMessage.messages[0].message;
    }
  }

  return fallbackMessage;
}

async function postJson(endpoint, payload, fallbackMessage) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(toErrorMessage(data, fallbackMessage));
  }

  return data;
}

export async function loginRequest(identifier, password) {
  return postJson(
    "/auth/local",
    { identifier, password },
    "Login failed. Check your email and password."
  );
}

export async function registerRequest({ username, email, password }) {
  const payload = {
    username,
    email,
    password,
  };

  const registrationEndpoints = ["/auth/local/register", "/register"];

  for (const endpoint of registrationEndpoints) {
    try {
      return await postJson(endpoint, payload, "Registration failed.");
    } catch (error) {
      const isLastTry = endpoint === registrationEndpoints[registrationEndpoints.length - 1];
      if (isLastTry) {
        throw error;
      }
    }
  }

  throw new Error("Registration failed.");
}

export async function getCurrentUserRequest(token) {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(toErrorMessage(data, "Could not fetch current user."));
  }

  return data;
}
