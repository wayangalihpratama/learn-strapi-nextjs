const getApiUrl = () => {
  if (typeof window === "undefined" && process.env.INTERNAL_BACKEND_URL) {
    return process.env.INTERNAL_BACKEND_URL;
  }
  return process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1337/api";
};

export async function fetchFromStrapi(endpoint) {
  try {
    const response = await fetch(`${getApiUrl()}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching from Strapi:", error);
    return null;
  }
}

export async function postToStrapi(endpoint, data) {
  try {
    const response = await fetch(`${getApiUrl()}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error posting to Strapi:", error);
    return null;
  }
}
