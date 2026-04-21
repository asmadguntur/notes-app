import "./styles.css";
import "./components/AppBar.js";
import "./components/LoadingIndicator.js";
import "./components/NoteForm.js";
import "./components/NoteItem.js";
import "./components/NotesList.js";
import {
  getNotes,
  getArchivedNotes,
  addNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "./api.js";

//  Helpers
function showToast(msg, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.className = `toast show${type === "error" ? " error" : ""}`;
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// State
let activeTab = "active";

//  Render catatan
async function loadNotes() {
  const loading = document.querySelector("loading-indicator");
  const notesList = document.querySelector("notes-list");
  const appBar = document.querySelector("app-bar");

  loading.show();
  try {
    const notes =
      activeTab === "active" ? await getNotes() : await getArchivedNotes();

    notesList.render(notes);
    appBar.updateCount(notes.length);
  } catch (err) {
    // Kriteria Opsional 2: Feedback saat error
    showToast(`⚠ Gagal memuat catatan: ${err.message}`, "error");
    notesList.render([]);
  } finally {
    loading.hide();
  }
}

// Tab switching
function updateTabUI() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === activeTab);
  });
  const title = document.querySelector(".notes-section-title");
  if (title) {
    title.textContent =
      activeTab === "active" ? "Catatan Aktif" : "Catatan Diarsipkan";
  }
}

// Event: Tambah Catatan
document.addEventListener("note-submit", async (e) => {
  const loading = document.querySelector("loading-indicator");
  loading.show();
  try {
    await addNote(e.detail);
    showToast("✓ Catatan berhasil ditambahkan!");
    activeTab = "active";
    updateTabUI();
    await loadNotes();
  } catch (err) {
    showToast(`⚠ Gagal menambahkan catatan: ${err.message}`, "error");
  } finally {
    loading.hide();
  }
});

// Event: Hapus Catatan
document.addEventListener("note-delete", async (e) => {
  const loading = document.querySelector("loading-indicator");
  loading.show();
  try {
    await deleteNote(e.detail.id);
    showToast("🗑 Catatan berhasil dihapus.");
    await loadNotes();
  } catch (err) {
    showToast(`⚠ Gagal menghapus catatan: ${err.message}`, "error");
  } finally {
    loading.hide();
  }
});

//Event: Arsip / Batal Arsip
document.addEventListener("note-archive", async (e) => {
  const loading = document.querySelector("loading-indicator");
  const { id, archived } = e.detail;
  loading.show();
  try {
    if (archived === true || archived === "true") {
      await unarchiveNote(id);
      showToast("📂 Catatan dipindahkan ke aktif.");
    } else {
      await archiveNote(id);
      showToast("📁 Catatan berhasil diarsipkan.");
    }
    await loadNotes();
  } catch (err) {
    showToast(`⚠ Gagal mengarsipkan catatan: ${err.message}`, "error");
  } finally {
    loading.hide();
  }
});

//  Init
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeTab = btn.dataset.tab;
      updateTabUI();
      loadNotes();
    });
  });

  loadNotes();
});
