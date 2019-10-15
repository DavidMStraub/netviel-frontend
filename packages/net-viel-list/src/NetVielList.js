import { html, css, LitElement } from 'lit-element';
import '@polymer/iron-list/iron-list.js';

export class NetVielList extends LitElement {
  static get styles() {
    return css`
      :host {
      }

      .thread-container {
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
      threads: { type: Object },
    };
  }

  constructor() {
    super();
    this.threads = [];
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

  clickHandler(e) {
    const targetId = e.target.parentElement.getAttribute('id');
    if (targetId) {
      this.dispatchEvent(new CustomEvent('thread-selected',
        {bubbles: true, composed: true, detail: {thread: targetId}})
      );
    }

  }

  render() {
    var threads = this.threads;
    var _prettyDate = this.prettyDate;  // binding to correct 'this'
    threads.map(thread => {
      thread.pretty_time = _prettyDate(thread.newest_date);
      return thread;
    })

    return html`
    <iron-list .items=${threads} as="thread" @click="${this.clickHandler}">
      <template>
        <div class="thread-container" id="[[thread.thread_id]]">
          <span class="from">[[thread.authors]]  ([[thread.total_messages]])
          </span><!--
          --><span class="subject">[[thread.subject]]</span><!--
          --><span class="time">[[thread.pretty_time]]</span>
        </div>
      </template>
    </iron-list>
    `;
  }
}
