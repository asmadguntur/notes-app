function formatDate(iso) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

class NotesList extends HTMLElement {
  connectedCallback() {
    this.render([]);
  }

  render(notes = []) {
    if (notes.length === 0) {
      this.innerHTML = `
        <div class="notes-grid">
          <div class="empty-state">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586
                   a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19
                   a2 2 0 01-2 2z"/>
            </svg>
            <p>Belum ada catatan.</p>
          </div>
        </div>`;
      return;
    }

    this.innerHTML = `<div class="notes-grid"></div>`;
    const grid = this.querySelector(".notes-grid");

    notes.forEach((note, i) => {
      const item = document.createElement("note-item");
      item.setAttribute("note-id", note.id);
      item.setAttribute("note-title", note.title);
      item.setAttribute("note-body", note.body);
      item.setAttribute("note-date", formatDate(note.createdAt));
      item.setAttribute("note-archived", String(note.archived));
      item.style.animationDelay = `${i * 40}ms`;
      grid.appendChild(item);
    });
  }
}

customElements.define("notes-list", NotesList);
export default NotesList;
