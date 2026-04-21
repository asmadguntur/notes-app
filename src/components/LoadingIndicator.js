class LoadingIndicator extends HTMLElement {
  static get observedAttributes() {
    return ["active"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  show() {
    this.setAttribute("active", "true");
  }

  hide() {
    this.removeAttribute("active");
  }

  render() {
    const active = this.hasAttribute("active");
    this.innerHTML = `
      <div class="loading-overlay ${active ? "active" : ""}">
        <div class="spinner-ring"></div>
        <p class="loading-text">Memuat...</p>
      </div>`;
  }
}

customElements.define("loading-indicator", LoadingIndicator);
export default LoadingIndicator;
