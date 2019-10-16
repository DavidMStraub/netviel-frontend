import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { openWcLogo } from './open-wc-logo.js';

import '../../page-main/page-main.js';
import '../../net-viel-list/net-viel-list.js';
import '../../net-viel-thread/net-viel-thread.js';
import { templateAbout } from './templateAbout.js';

export class NetViel extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
    };
  }

  constructor() {
    super();
    this.page = 'main';
  }

  _renderPage() {
    switch (this.page) {
      case 'main':
        return html`
          <page-main .logo=${openWcLogo}></page-main>
        `;
      case 'about':
        return templateAbout;
      default:
        return html`
          <p>Page not found try going to <a href="#main">Main</a></p>
        `;
    }
  }

  __clickPageLink(ev) {
    ev.preventDefault();
    this.page = ev.target.hash.substring(1);
  }

  __addActiveIf(page) {
    return classMap({ active: this.page === page });
  }

  render() {
    return html`
      <header>
        <ul>
          <li>
            <a href="#main" class=${this.__addActiveIf('main')} @click=${this.__clickPageLink}
              >Main</a
            >
          </li>
          <li>
            <a href="#about" class=${this.__addActiveIf('about')} @click=${this.__clickPageLink}
              >About</a
            >
          </li>
        </ul>
      </header>

      <main>
        ${this._renderPage()}
      </main>

      <p class="app-footer">
      </p>
    `;
  }

  static get styles() {
    return [
      css`
        :host {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          font-size: 16px;
          color: #555555;
          max-width: 960px;
          margin: 0 auto;
        }

        header {
          width: 100%;
          background: #fff;
          border-bottom: 1px solid #ccc;
          display: none;
        }

        header ul {
          display: flex;
          justify-content: space-between;
          min-width: 400px;
          margin: 0 auto;
          padding: 0;
        }

        header ul li {
          display: flex;
        }

        header ul li a {
          color: #ccc;
          text-decoration: none;
          font-size: 18px;
          line-height: 36px;
        }

        header ul li a:hover,
        header ul li a.active {
          color: #000;
        }

        main {
          width: calc(100% - 2em);
          padding: 0 2em;
        }

        .app-footer {
          color: #a8a8a8;
          font-size: calc(12px + 0.5vmin);
          align-items: center;
        }

        .app-footer a {
          margin-left: 5px;
        }
      `,
    ];
  }
}

export function apiHost() {
  // This function returns the host name.
  // The string 'ENV' is replaced by 'production' in rollup.config.js
  // at build time. The second option is for development.
  if ('ENV' == 'production') {
    return "";
  } else {
    return "http://127.0.0.1:5000";
  }
}