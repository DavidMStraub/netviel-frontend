import { html, css, LitElement } from 'lit-element';
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/iron-icons/iron-icons.js";
import { searchHints } from './searchHints.js';
import { apiHost } from "../../net-viel/src/NetViel.js"


export class PageMain extends LitElement {
  static get styles() {
    return css`
      :host {
      }

      div.divider {
        margin-bottom: 1em;
      }

      #search-hints h2 {
        font-size: 1.8em;
        font-weight: 300;
      }   

      #search-hints pre, #search-hints code {
        font-family: Roboto Mono, monospace;
        font-size: 0.9em;
      }
      #search-hints {
        margin-top: 3em;
      }
      #search-hints code {
        background-color: #f0f0f0;
        font-weight: 400;
        border-radius: 0.2em;
        padding: 0.1em 0.3em;
      }
      #search-hints pre {
        font-weight: 400;
        margin: 1em 0;
        opacity: 0.9;
        padding: 1em 1.4em;
        border: 1px solid #eaeaea;
        border-radius: 0.5em;
      }

      a:link, a:visited {
        color: #3366aa;
      }
      a:link, a:visited, a:hover, a:active {
        text-decoration: None;
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
    history.pushState({ search: searchfield.value, thread: this.thread }, "");
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
    var url= apiHost() + "/api/query/";
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
    let searchfield = this.shadowRoot.getElementById('searchfield');
    if (e.state.search == undefined) {
      searchfield.value = '';
    } else {
      searchfield.value = e.state.search;
    }
    this.thread = e.state.thread;
    searchfield.focus();
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

      ${this.thread == undefined && this.threads.length == 0 ? searchHints : ''}

      ${this.thread == undefined ? html`
      <net-viel-list .threads="${this.threads}"></net-viel-list>
      ` : html`
      <net-viel-thread thread="${this.thread}"></net-viel-thread>
      `}
    `;
  }
}
