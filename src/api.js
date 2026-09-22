const BASE_URL = "http://localhost:8081";

async function request(url, options = {}) {
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {})
    }
  });

  const text = await response.text();

  let data = text;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    throw new Error(
      typeof data === "string"
        ? data
        : data?.message || "Request failed"
    );
  }

  return data;
}

export const api = {

  login: (body) =>
    request("/api/users/login", {
      method: "POST",
      body: JSON.stringify(body)
    }),

  register: (body) =>
    request("/api/users/register", {
      method: "POST",
      body: JSON.stringify(body)
    }),

  profile: (username) =>
    request(
      `/api/users/profile/${encodeURIComponent(username)}`
    ),

  updateProfile: (username, body) =>
    request(
      `/api/users/profile/${encodeURIComponent(username)}`,
      {
        method: "PUT",
        body: JSON.stringify(body)
      }
    ),

  getEmployees: () =>
    request("/employees/getAll"),

  getActiveEmployees: () =>
    request("/employees/active"),

  getInactiveEmployees: () =>
    request("/employees/inactive"),

  getEmployee: (id) =>
    request(
      `/employees/getSingle?id=${encodeURIComponent(id)}`
    ),

  addEmployee: (body) =>
    request("/employees/register", {
      method: "POST",
      body: JSON.stringify(body)
    }),

  updateEmployee: (id, body) =>
    request(`/employees/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(body)
    }),

  toggleEmployee: (id) =>
    request(`/employees/toggle/${id}`, {
      method: "PUT"
    }),

  getHolidays: () =>
    request("/api/holidays"),

  getActiveHolidays: () =>
    request("/api/holidays/active"),

  getInactiveHolidays: () =>
    request("/api/holidays/inactive"),

  getHoliday: (id) =>
    request(`/api/holidays/${id}`),

  addHoliday: (body) =>
    request("/api/holidays", {
      method: "POST",
      body: JSON.stringify(body)
    }),

  updateHoliday: (id, body) =>
    request(`/api/holidays/${id}`, {
      method: "PUT",
      body: JSON.stringify(body)
    }),

  toggleHoliday: (id, status) =>
    request(
      `/api/holidays/${id}/status?status=${status}`,
      {
        method: "PATCH"
      }
    )
};