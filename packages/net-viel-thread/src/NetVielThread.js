import { html, css, LitElement } from 'lit-element';
import '@polymer/iron-list/iron-list.js';
import '../../net-viel-message/net-viel-message.js';

export class NetVielThread extends LitElement {
  static get styles() {
    return css`
      :host {
      }

      h2.subject {
        font-size: 1.8em;
        font-weight: 300;
        margin-bottom: 1.5em;
        margin-top: 1em;
      }

      .aside {
        opacity: 0.6;
      }
    `;
  }

  static get properties() {
    return {
      thread: {type: String},
      _messages: {type: Object}
    };
  }

  constructor() {
    super();
    this.thread = undefined;
    this._messages = [];
  }

  firstUpdated() {
    this.fetchData();
  }

  async fetchData() {
    if (this.thread == undefined) {
      return;
    }
    var url = "http://127.0.0.1:5000/api/thread/";
    url += this.thread;
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
    this._messages = data;
  }
  
  render() {
    if (this._messages == undefined || this._messages.length == 0) {
      return html`
      Loading
      `;  
    }
    return html`
    <h2 class="subject">
      ${this._messages[0].subject ? this._messages[0].subject : 'No Subject'}
      ${this._messages.length > 1 ? html`
        <span class="aside">(${this._messages.length})</span>
      ` : ''}
    </h2>
    ${this._messages.map(message => {
      return html`<net-viel-message .message="${message}"></net-viel-message>`;
    })}
    `;
  }
}
