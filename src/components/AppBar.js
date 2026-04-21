class AppBar extends HTMLElement {
  static get observedAttributes() {
    return ["brand", "subtitle"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  updateCount(count) {
    const el = this.querySelector(".note-count");
    if (el) el.textContent = `${count} catatan`;
  }

  render() {
    const brand = this.getAttribute("brand") || "Notes";
    const subtitle = this.getAttribute("subtitle") || "";
    this.innerHTML = `
      <div class="app-bar-inner">
        <span class="brand">${brand}<span>${subtitle}</span></span>
        <span class="note-count">— catatan</span>
      </div>`;
  }
}

customElements.define("app-bar", AppBar);
export default AppBar;
