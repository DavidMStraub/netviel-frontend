import { html, css, LitElement } from 'lit-element';
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/iron-icons/iron-icons.js";

export class PageMain extends LitElement {
  static get styles() {
    return css`
      :host {
      }

      div.divider {
        margin-bottom: 1em;
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      logo: { type: Function },
    };
  }

  constructor() {
    super();
    this.title = 'Hello open-wc world!';
    this.logo = html``;
  }

  clearInput() {
    let searchfield = this.shadowRoot.getElementById('searchfield');
    if (searchfield) {
      searchfield.value = '';
    }
  }
  
  render() {
    return html`
      <paper-input no-label-float label="Search" id="searchfield">
        <paper-icon-button slot="suffix" icon="clear" @click="${this.clearInput}"></paper-icon-button>
        <paper-icon-button slot="suffix" icon="search" type="submit"></paper-icon-button>
      </paper-input>

      <div class="divider"></div>

      <net-viel-list></net-viel-list>
    `;
  }
}
