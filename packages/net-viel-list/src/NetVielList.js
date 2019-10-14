import { html, css, LitElement } from 'lit-element';
import '@polymer/iron-list/iron-list.js';

export class NetVielList extends LitElement {
  static get styles() {
    return css`
      :host {
      }
      
      .message-container {
        padding: 0.3em 0;
        border-bottom: 1px solid #e3e3e3;
      }

      .from, .subject, .time {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0;
      }

      .subject {
        width: calc(100% - 19em);
        padding-right: 1em;
      }

      .from {
        width: 12em;
        padding-right: 1em;
      }

      .time {
        width: 5em;
        text-align: right;
      }
    `;
  }

  static get properties() {
    return {
      messages: {type: Object},
    };
  }

  constructor() {
    super();
    this.messages = [];
  }

  prettyDate(t) {
      var t_now = Date.now()
      var date = new Date(t * 1000)
      if (t_now - t < 24 * 3600) {
        return date.toLocaleTimeString();
      } else if (t_now - t < 24 * 3600 * 365) {
        return date.toLocaleDateString();
      } else {
        let options={day: 'numeric', month: 'numeric'};
        return date.toLocaleDateString(undefined, options);
    }
  }

  render() {
    var messages = this.messages;
    var _prettyDate =  this.prettyDate;  // binding to correct 'this'
    messages.map(message => {
      message.pretty_time = _prettyDate(message.newest_date);
      return message;
    })

    return html`
    <iron-list .items=${messages} as="message">
      <template>
        <div class="message-container">
          <span class="from">[[message.authors]]
          </span><!--
          --><span class="subject">[[message.subject]]</span><!--
          --><span class="time">[[message.pretty_time]]</span>
        </div>
      </template>
    </iron-list>
    `;
  }
}
