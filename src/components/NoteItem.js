// Menggunakan custom attribute: note-id, note-title, note-body, note-date, note-archived
// (memenuhi Kriteria Opsional 3: Custom Attribute pada Custom Element)
class NoteItem extends HTMLElement {
  static get observedAttributes() {
    return ["note-id", "note-title", "note-body", "note-date", "note-archived"];
  }

  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }

  render() {
    const id = this.getAttribute("note-id") || "";
    const title = this.getAttribute("note-title") || "";
    const body = this.getAttribute("note-body") || "";
    const date = this.getAttribute("note-date") || "";
    const archived = this.getAttribute("note-archived") === "true";

    this.innerHTML = `
      <div class="note-card ${archived ? "archived" : ""}">
        ${archived ? '<span class="archived-badge">Diarsipkan</span>' : ""}
        <div class="note-card-title">${title}</div>
        <div class="note-card-body">${body.replace(/\n/g, "<br>")}</div>
        <div class="note-card-date">${date}</div>
        <div class="note-card-actions">
          <button class="btn-icon btn-archive" data-id="${id}" data-archived="${archived}">
            ${archived ? "Batal Arsip" : "Arsipkan"}
          </button>
          <button class="btn-icon btn-delete" data-id="${id}">Hapus</button>
        </div>
      </div>`;

    this.querySelector(".btn-delete").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("note-delete", {
          bubbles: true,
          detail: { id },
        }),
      );
    });

    this.querySelector(".btn-archive").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("note-archive", {
          bubbles: true,
          detail: { id, archived },
        }),
      );
    });
  }
}

customElements.define("note-item", NoteItem);
export default NoteItem;
