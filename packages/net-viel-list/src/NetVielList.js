import { html, css, LitElement } from 'lit-element';
import '@polymer/iron-list/iron-list.js';

export function prettyDate(t) {
  const tNow = Date.now() / 1000;
  const date = new Date(t * 1000);
  if (tNow - t < 24 * 3600) {
    return date.toLocaleTimeString();
  }
  if (tNow - t > 24 * 3600 * 365) {
    return date.toLocaleDateString();
  }
  const options = { day: 'numeric', month: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

export class NetVielList extends LitElement {
  static get styles() {
    return css`
      :host {
      }

      .thread-container {
        padding: 0.3em 0;
        border-bottom: 1px solid #e3e3e3;
        cursor: pointer;
      }

      .from,
      .subject,
      .time {
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

      .gray {
        opacity: 0.6;
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

  clickHandler(e) {
    const targetId = e.target.parentElement.getAttribute('id');
    if (targetId) {
      this.dispatchEvent(
        new CustomEvent('thread-selected', {
          bubbles: true,
          composed: true,
          detail: { thread: targetId },
        }),
      );
    }
  }

  render() {
    const { threads } = this;
    threads.map(thread => {
      const newThread = thread;
      newThread.pretty_time = prettyDate(thread.newest_date);
      newThread.authors = thread.authors.replace('| ', ', ');
      newThread.more_than_one = thread.total_messages > 1;
      return newThread;
    });

    return html`
      <iron-list .items=${threads} as="thread" @click="${this.clickHandler}">
        <template>
          <div class="thread-container" id="[[thread.thread_id]]">
            <span class="from"
              >[[thread.authors]]
              <template is="dom-if" if="{{thread.more_than_one}}">
                <span class="gray">([[thread.total_messages]])</span>
              </template> </span
            ><!--
          --><span class="subject">[[thread.subject]]</span
            ><!--
          --><span class="time">[[thread.pretty_time]]</span>
          </div>
        </template>
      </iron-list>
    `;
  }
}
