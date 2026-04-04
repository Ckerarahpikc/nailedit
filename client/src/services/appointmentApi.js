import { URL_API } from "../utils/constants";

// Get all appointments (different data based on user role)
export async function getAppointments() {
  const res = await fetch(`${URL_API}/appointments`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Cache-Control": "no-cache",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(
      data.error?.message || "Failed to fetch appointments"
    );
    error.response = { status: res.status, data };
    throw error;
  }

  return data.data.appointments;
}

// Get single appointment
export async function getAppointment(appointmentId) {
  const res = await fetch(`${URL_API}/appointments/${appointmentId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Cache-Control": "no-cache",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(
      data.error?.message || "Failed to fetch appointment"
    );
    error.response = { status: res.status, data };
    throw error;
  }

  return data.data.appointment;
}

// Create new appointment (only for clients)
export async function createAppointment(appointmentData) {
  const res = await fetch(`${URL_API}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointmentData),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(
      data.error?.message || "Failed to create appointment"
    );
    error.response = { status: res.status, data };
    throw error;
  }

  return data.data.appointment;
}

// Update appointment
export async function updateAppointment({ appointmentId, updates }) {
  const res = await fetch(`${URL_API}/appointments/${appointmentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(
      data.error?.message || "Failed to update appointment"
    );
    error.response = { status: res.status, data };
    throw error;
  }

  return data.data.appointment;
}

// Delete appointment
export async function deleteAppointment(appointmentId) {
  const res = await fetch(`${URL_API}/appointments/${appointmentId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const data = await res.json();
    const error = new Error(
      data.error?.message || "Failed to delete appointment"
    );
    error.response = { status: res.status, data };
    throw error;
  }

  return null;
}

// Get available time slots for booking
export async function getAvailableSlots({ masterId, date, procedureName }) {
  const params = new URLSearchParams({
    masterId,
    date: date.toISOString().split('T')[0], // YYYY-MM-DD format
    procedureName,
  });

  const res = await fetch(`${URL_API}/appointments/available-slots?${params}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Cache-Control": "no-cache",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(
      data.error?.message || "Failed to fetch available slots"
    );
    error.response = { status: res.status, data };
    throw error;
  }

  return data.data.availableSlots;
}

// Get masters list (for future multi-master support)
export async function getMasters() {
  const res = await fetch(`${URL_API}/user/masters`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Cache-Control": "no-cache",
    },
  });

  // If endpoint doesn't exist yet, return empty array
  if (res.status === 404) {
    return [];
  }

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(
      data.error?.message || "Failed to fetch masters"
    );
    error.response = { status: res.status, data };
    throw error;
  }

  return data.data.masters || [];
}