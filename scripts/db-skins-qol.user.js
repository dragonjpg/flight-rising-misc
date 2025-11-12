// ==UserScript==
// @name        Flight Rising: DB Skins QoL
// @namespace   https://github.com/dragonjpg
// @author      dragon.jpg
// @description adds a link to the artist's clan profile in the sidebar and a link to the fullsize transparent skin art under the preview
// @match       https://www1.flightrising.com/game-database/item/*
// @grant       none
// @version     1.0.0
// @license     MIT
// @icon        https://www.google.com/s2/favicons?sz=64&domain=flightrising.com
// ==/UserScript==

function skinsDBQOL() {
  // check if it's a skin
  let artist_wrapper = document.querySelector(`.game-database-record-sidebar-attribute:has(a[href*="?skin_by="])`);

  // if it is, edit the author link section to have a link to the clan profile as well
  if (artist_wrapper != null) {
    let prev_sibling = artist_wrapper.previousElementSibling.querySelector(`.game-database-record-sidebar-value`),
        link = artist_wrapper.querySelector("a"),
        link_dupe = link.cloneNode(true),
        txt = link_dupe.innerText.split(" "),
        artist = txt[0],
        id = txt[1].substring(2,txt[1].length-1);

    link.before(link_dupe);
    link.innerText = prev_sibling.innerText;
    prev_sibling.innerText = ``;
    prev_sibling.appendChild(link);
    link.title = `More Skins by ${artist}`;
    link_dupe.href = `/clan-profile/${id}`;
    link_dupe.setAttribute("rel","noreferrer");
    link_dupe.title = `Visit ${artist}${ (artist.slice(-1).toLowerCase() == 's') ? `'` : `'s` } Clan Profile`;

    let fullsize = document.createElement("a"),
        item = document.querySelector(`#game-database-open-tooltip .tooltip-itemid strong`).innerText;
    fullsize.href = `https://flightrising.com/images/cms/skins/art/${item}.png`;
    fullsize.setAttribute("target","_blank");
    fullsize.setAttribute("rel","noreferrer");
    fullsize.style = `display: block;font-size: 0.8em; margin: 1em auto 0.2em;text-align:center;`
    fullsize.innerText = `(Transparent)`;
    fullsize.title = `Opens the Transparent Skin image in a New Tab.`;
    document.querySelector(`div.game-database-skin-preview`).after(fullsize);

  }
}

skinsDBQOL();
