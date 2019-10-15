import { html, css, LitElement } from 'lit-element';
import '@polymer/iron-list/iron-list.js';

export class NetVielMessage extends LitElement {
  static get styles() {
    return css`
      :host {
      }
      
      .message-container {
        border-top: 1px solid #e3e3e3;
        margin-bottom: 1em;
        padding-top: 1em;
        padding-bottom: 2em;
      }

      .from {
        font-weight: 500;
        font-size: 0.9em;
        margin-bottom: 0em;
        margin-top: 0em;
      }
      .to {
        font-weight: 400;
        font-size: 0.9em;
        margin-bottom: 0em;
        margin-top: 0em;
        opacity: 0.65;
      }

      .date {
        float: right;
        margin-top: 0;
      }
      
      .content {
        margin-top: 2em;
        margin-left: 0;
        margin-right: 0;
      }

      #content-text pre {
        font-size: 16px;
        color: #555555;
        font-family: Roboto;
      }
    `;
  }

  static get properties() {
    return {
      message: { type: Object },
    };
  }

  constructor() {
    super();
    this.message = {};
  }

  prettyDate(t) {
    var t_now = Date.now()
    var date = new Date(t * 1000)
    if (t_now - t < 24 * 3600) {
      return date.toLocaleTimeString();
    } else if (t_now - t < 24 * 3600 * 365) {
      return date.toLocaleDateString();
    } else {
      let options = { day: 'numeric', month: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    }
  }

  updated() {
    if (this.message.content_type == 'text/html') {
      this.shadowRoot.querySelector('#content-html').innerHTML = this.message.content;
    } else {
      this.shadowRoot.querySelector('#content-text').innerHTML = '<pre>' + this.message.content + '</pre>';
    }

  }

  render() {
    return html`
    <div class="message-container">
      <p class="date">${this.prettyDate(Date.parse(this.message.date) / 1000)}</p>
      <p class="from">${this.message.from}</p>
      <p class="to">To: ${this.message.to}</p>
      ${this.message.cc ? html`<p class="to">CC: ${this.message.cc}</p>` : ''}
      ${this.message.bcc ? html`<p class="to">BCC: ${this.message.bcc}</p>` : ''}
      <div class="content">
        <div id="content-html"></div>
        <div id="content-text"></div>
      </div>
      ${this.message.cc ? html`<p class="attachments">${this.message.attachments}</p>` : ''}
    </div>
    `;
  }
}
