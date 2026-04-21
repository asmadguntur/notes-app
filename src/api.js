const BASE_URL = "https://notes-api.dicoding.dev/v2";

// GET semua catatan aktif
export async function getNotes() {
  const response = await fetch(`${BASE_URL}/notes`);
  const result = await response.json();
  if (result.status !== "success") throw new Error(result.message);
  return result.data;
}

// GET semua catatan terarsip
export async function getArchivedNotes() {
  const response = await fetch(`${BASE_URL}/notes/archived`);
  const result = await response.json();
  if (result.status !== "success") throw new Error(result.message);
  return result.data;
}

// POST tambah catatan baru
export async function addNote({ title, body }) {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body }),
  });
  const result = await response.json();
  if (result.status !== "success") throw new Error(result.message);
  return result.data;
}

// DELETE hapus catatan
export async function deleteNote(id) {
  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });
  const result = await response.json();
  if (result.status !== "success") throw new Error(result.message);
  return result;
}

// POST arsipkan catatan
export async function archiveNote(id) {
  const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
    method: "POST",
  });
  const result = await response.json();
  if (result.status !== "success") throw new Error(result.message);
  return result;
}

// POST batalkan arsip catatan
export async function unarchiveNote(id) {
  const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
    method: "POST",
  });
  const result = await response.json();
  if (result.status !== "success") throw new Error(result.message);
  return result;
}
