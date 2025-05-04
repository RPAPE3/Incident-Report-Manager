export async function loginUser(apiUrl, username, password) {
  const res = await fetch(`${apiUrl}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ username, password }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || "Invalid credentials");
  }
  return await res.json();
}

export function handleLoginSuccess(data, navigate) {
  localStorage.setItem("token", data.access_token);
  navigate("/dashboard");
} 