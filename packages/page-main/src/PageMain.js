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
      threads: { type: Object },
      thread: { type: String },
    };
  }

  constructor() {
    super();
    this.threads = [];
  }

  pushState() {
    let searchfield = this.shadowRoot.getElementById('searchfield');
    history.pushState({search: searchfield.value, thread: this.thread}, "");
    console.log('push', {search: searchfield.value, thread: this.thread});
  }

  clearInput() {
    let searchfield = this.shadowRoot.getElementById('searchfield');
    if (searchfield) {
      searchfield.value = '';
    }
    if (!this.thread) {
      this.threads = [];
    }
    this.thread = undefined;
    this.pushState();
  }

  async fetchData(query) {
    var url = "http://127.0.0.1:5000/api/query/";
    url += encodeURIComponent(query);
    let data = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(resp => resp.json())
      .catch((error) => {
        console.log(error);
      });
    this.threads = data;
    this.thread = undefined;
    this.pushState();
  }

  submit() {
    let searchfield = this.shadowRoot.getElementById('searchfield');
    if (searchfield.value == '' || searchfield.value == undefined) {
      this.threads = [];
    } else {
      this.fetchData(searchfield.value);
    }
  }

  firstUpdated() {
    window.addEventListener('keydown', this.keyHandler.bind(this));
    window.addEventListener('popstate', this.popHandler.bind(this));
    // this.shadowRoot.getElementById('searchfield').focus();
    this.addEventListener('thread-selected', (e) => {
      this.thread = e.detail.thread;
      this.pushState();
    });
    this.pushState();
  }

  popHandler(e) {
    console.log('pop', e.state);
    let searchfield = this.shadowRoot.getElementById('searchfield');
    if (e.state.search == undefined) {
      searchfield.value = '';
    } else {
      searchfield.value = e.state.search;
    }
    this.thread = e.state.thread;
    // if (this.thread == undefined) {
    //   this.submit();
    // }
  }

  keyHandler(e) {
    if (e.key === "Escape") {
      this.clearInput();
    } else if (e.key === "Enter") {
      let searchfield = this.shadowRoot.getElementById('searchfield');
      if (searchfield.focused) {
        this.submit();
      } else {
        searchfield.focus();
      }
    }
  }


  render() {
    return html`
      <paper-input no-label-float label="Search" id="searchfield" autofocus tabindex="0">
        <paper-icon-button slot="suffix" icon="clear" @click="${this.clearInput}"></paper-icon-button>
        <paper-icon-button slot="suffix" icon="search" @click="${this.submit}"></paper-icon-button>
      </paper-input>

      <div class="divider"></div>

      ${this.thread == undefined ? html`
      <net-viel-list .threads="${this.threads}"></net-viel-list>
      ` : html`
      <net-viel-thread thread="${this.thread}"></net-viel-thread>
      `}
    `;
  }
}
