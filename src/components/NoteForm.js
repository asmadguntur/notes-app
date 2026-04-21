class NoteForm extends HTMLElement {
  static get observedAttributes() {
    return ["max-title", "max-body"];
  }

  get maxTitle() {
    return parseInt(this.getAttribute("max-title") || "100");
  }
  get maxBody() {
    return parseInt(this.getAttribute("max-body") || "500");
  }

  connectedCallback() {
    this.render();
    this.attachListeners();
  }

  attributeChangedCallback() {
    this.render();
    this.attachListeners();
  }

  attachListeners() {
    const titleInput = this.querySelector("#note-title");
    const bodyInput = this.querySelector("#note-body");
    const form = this.querySelector("#note-form");
    const btn = this.querySelector(".btn-add");
    const titleErr = this.querySelector("#title-error");
    const bodyErr = this.querySelector("#body-error");
    const titleCount = this.querySelector("#title-count");
    const bodyCount = this.querySelector("#body-count");

    if (!form) return;

    const validate = () => {
      let valid = true;
      const t = titleInput.value.trim();
      const b = bodyInput.value.trim();

      if (!t) {
        titleErr.textContent = "Judul tidak boleh kosong.";
        titleErr.classList.add("visible");
        titleInput.classList.add("error");
        valid = false;
      } else if (t.length > this.maxTitle) {
        titleErr.textContent = `Judul maksimal ${this.maxTitle} karakter.`;
        titleErr.classList.add("visible");
        titleInput.classList.add("error");
        valid = false;
      } else {
        titleErr.classList.remove("visible");
        titleInput.classList.remove("error");
      }

      if (!b) {
        bodyErr.textContent = "Isi catatan tidak boleh kosong.";
        bodyErr.classList.add("visible");
        bodyInput.classList.add("error");
        valid = false;
      } else if (b.length > this.maxBody) {
        bodyErr.textContent = `Isi maksimal ${this.maxBody} karakter.`;
        bodyErr.classList.add("visible");
        bodyInput.classList.add("error");
        valid = false;
      } else {
        bodyErr.classList.remove("visible");
        bodyInput.classList.remove("error");
      }

      btn.disabled = !valid;
      return valid;
    };

    // Realtime validation (Kriteria Opsional 2)
    titleInput.addEventListener("input", () => {
      const len = titleInput.value.length;
      titleCount.textContent = `${len}/${this.maxTitle}`;
      titleCount.className =
        "char-count" +
        (len > this.maxTitle
          ? " over"
          : len > this.maxTitle * 0.8
            ? " warn"
            : "");
      validate();
    });

    bodyInput.addEventListener("input", () => {
      const len = bodyInput.value.length;
      bodyCount.textContent = `${len}/${this.maxBody}`;
      bodyCount.className =
        "char-count" +
        (len > this.maxBody
          ? " over"
          : len > this.maxBody * 0.8
            ? " warn"
            : "");
      validate();
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate()) return;

      // Kirim data ke index.js via CustomEvent (bukan langsung manipulasi state)
      this.dispatchEvent(
        new CustomEvent("note-submit", {
          bubbles: true,
          detail: {
            title: titleInput.value.trim(),
            body: bodyInput.value.trim(),
          },
        }),
      );

      form.reset();
      titleCount.textContent = `0/${this.maxTitle}`;
      bodyCount.textContent = `0/${this.maxBody}`;
      btn.disabled = true;
    });
  }

  render() {
    this.innerHTML = `
      <div class="form-card">
        <form id="note-form" novalidate>
          <div class="form-row">
            <div class="input-group">
              <label for="note-title">Judul</label>
              <input type="text" id="note-title" placeholder="Judul catatan..." autocomplete="off" />
              <div style="display:flex;justify-content:space-between;align-items:center">
                <span class="error-msg" id="title-error"></span>
                <span class="char-count" id="title-count">0/${this.maxTitle}</span>
              </div>
            </div>
            <div class="input-group">
              <label for="note-body">Isi Catatan</label>
              <textarea id="note-body" placeholder="Tulis catatanmu di sini..."></textarea>
              <div style="display:flex;justify-content:space-between;align-items:center">
                <span class="error-msg" id="body-error"></span>
                <span class="char-count" id="body-count">0/${this.maxBody}</span>
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-add" disabled>+ Tambah Catatan</button>
          </div>
        </form>
      </div>`;
  }
}

customElements.define("note-form", NoteForm);
export default NoteForm;
