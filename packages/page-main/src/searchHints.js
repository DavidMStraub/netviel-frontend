import { html } from 'lit-html';

export const searchHints = html`
  <div id="search-hints">
    <h2>Start searching</h2>
    <p>The search syntax is the same as for <code>notmuch search</code>:</p>
    <pre>
body:&lt;word-or-quoted-phrase&gt;
from:&lt;name-or-address&gt; or from:/&lt;regex&gt;/
to:&lt;name-or-address&gt;
subject:&lt;word-or-quoted-phrase&gt; or subject:/&lt;regex&gt;/
attachment:&lt;word&gt;
mimetype:&lt;word&gt;
tag:&lt;tag&gt; or tag:/&lt;regex&gt;/ or is:&lt;tag&gt; or is:/&lt;regex&gt;/
id:&lt;message-id&gt; or mid:&lt;message-id&gt; or mid:/&lt;regex&gt;/
thread:&lt;thread-id&gt;
thread:{&lt;notmuch query&gt;}
path:&lt;directory-path&gt; or path:&lt;directory-path&gt;/** or path:/&lt;regex&gt;/
folder:&lt;maildir-folder&gt; or folder:/&lt;regex&gt;/
date:&lt;since&gt;..&lt;until&gt; or date:&lt;date&gt;
lastmod:&lt;initial-revision&gt;..&lt;final-revision&gt;
query:&lt;name&gt;
property:&lt;key&gt;=&lt;value&gt;
</pre>
<p><a href="https://notmuchmail.org/manpages/notmuch-search-terms-7/">More</a></p>

  </div>
`;
