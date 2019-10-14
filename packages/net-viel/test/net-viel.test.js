import { html, fixture, expect } from '@open-wc/testing';

import '../net-viel.js';

describe('NetViel', () => {
  it('has page "main" by default', async () => {
    const el = await fixture(html`
      <net-viel></net-viel>
    `);

    expect(el.page).to.equal('main');
    expect(el.shadowRoot.querySelector('main')).lightDom.to.equal(`
      <page-main></page-main>
    `);
  });

  // it('renders page-one if page property is set to pageOne', async () => {
  //   const el = await fixture(html`
  //     <net-viel page="pageOne"></net-viel>
  //   `);
  //   expect(el.shadowRoot.querySelector('main')).lightDom.to.equal(`
  //     <page-one></page-one>
  //   `);
  // });

  it('changes the page if a menu link gets clicked', async () => {
    const el = await fixture(html`
      <net-viel></net-viel>
    `);
    el.shadowRoot.querySelectorAll('header a')[2].click();

    expect(el.page).to.equal('about');
  });
});
