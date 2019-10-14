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

      .subject {
        display: inline-block;
        width: calc(100% - 13em);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0;
      }

      .from {
        display: inline-block;
        width: 12em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 1em;
        padding: 0;
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
    this.messages = [
      {
        subject: "Subject 1",
        from: "From 1",
      },
      {
        subject: "Subject Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt",
        from: "From Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt",
      },
    ];
  }


  render() {
    return html`
    <iron-list .items=${this.messages} as="message">
      <template>
        <div class="message-container">
        <span class="from">[[message.from]]</span><span class="subject">[[message.subject]]</span>
        </div>
      </template>
    </iron-list>
    `;
  }
}
