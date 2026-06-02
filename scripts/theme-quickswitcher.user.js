// ==UserScript==
// @name        Flight Rising: Theme Quickswitcher
// @namespace   https://github.com/dragonjpg
// @author      dragon.jpg
// @version     1.1.1
// @match       https://*.flightrising.com/*
// @run-at      document-body
// @grant       none
// @license     MIT
// @icon        https://www.google.com/s2/favicons?sz=64&domain=flightrising.com
// @description Adds a button to quickly toggle between two themes of your choice. Made so you can make the most of my Simple Themes userstyle. keeps track of your active theme and overwrites the data-theme value the site serves on pageload. advice: keep dark mode as your selected theme in account settings because there may be a flash of content before themes switch, and dark to light is easier on the eyes than light to dark.
// ==/UserScript==

// CHANGE THESE TO SWAP BETWEEN DIFFERENT THEMES
const DAY = 'default',
      NIGHT = 'dark';

// DO NOT TOUCH BELOW
const NIGHT_SVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" class="theme-svg-player-module-logout-glyph-fill"/></svg>`,
      DAY_SVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" class="theme-svg-player-module-logout-glyph-fill"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V4C12.75 4.41421 12.4142 4.75 12 4.75C11.5858 4.75 11.25 4.41421 11.25 4V2C11.25 1.58579 11.5858 1.25 12 1.25ZM3.66865 3.71609C3.94815 3.41039 4.42255 3.38915 4.72825 3.66865L6.95026 5.70024C7.25596 5.97974 7.2772 6.45413 6.9977 6.75983C6.7182 7.06553 6.2438 7.08677 5.9381 6.80727L3.71609 4.77569C3.41039 4.49619 3.38915 4.02179 3.66865 3.71609ZM20.3314 3.71609C20.6109 4.02179 20.5896 4.49619 20.2839 4.77569L18.0619 6.80727C17.7562 7.08677 17.2818 7.06553 17.0023 6.75983C16.7228 6.45413 16.744 5.97974 17.0497 5.70024L19.2718 3.66865C19.5775 3.38915 20.0518 3.41039 20.3314 3.71609ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H4C4.41421 11.25 4.75 11.5858 4.75 12C4.75 12.4142 4.41421 12.75 4 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM19.25 12C19.25 11.5858 19.5858 11.25 20 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H20C19.5858 12.75 19.25 12.4142 19.25 12ZM17.0255 17.0252C17.3184 16.7323 17.7933 16.7323 18.0862 17.0252L20.3082 19.2475C20.6011 19.5404 20.601 20.0153 20.3081 20.3082C20.0152 20.6011 19.5403 20.601 19.2475 20.3081L17.0255 18.0858C16.7326 17.7929 16.7326 17.3181 17.0255 17.0252ZM6.97467 17.0253C7.26756 17.3182 7.26756 17.7931 6.97467 18.086L4.75244 20.3082C4.45955 20.6011 3.98468 20.6011 3.69178 20.3082C3.39889 20.0153 3.39889 19.5404 3.69178 19.2476L5.91401 17.0253C6.2069 16.7324 6.68177 16.7324 6.97467 17.0253ZM12 19.25C12.4142 19.25 12.75 19.5858 12.75 20V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V20C11.25 19.5858 11.5858 19.25 12 19.25Z" class="theme-svg-player-module-logout-glyph-fill"/></svg>`;

(function() {
  if(document.querySelector(`#fr-layout`) != null) {
    if(localStorage.getItem(`fr-active-theme`)  == null) {
      localStorage.setItem(`fr-active-theme`, document.querySelector(`#fr-layout`).getAttribute('data-theme'));
    };
    document.querySelector(`#fr-layout`).setAttribute('data-theme',localStorage.getItem(`fr-active-theme`));
    waitForElm('#fr-layout-banner').then((elm) => {
      let toggler = document.createElement(`div`);
      let togglerCSS = document.createElement(`style`);
      togglerCSS.type = `text/css`;
      togglerCSS.appendChild(document.createTextNode(`.fr-layout-player-module-username { padding-right: 50px } #themeswap { position: absolute; top: 8px; right: 36px; width: 20px; height: 20px; cursor: pointer; border: none; background: none; z-index: 4; } .day, .night { filter: drop-shadow(-1px -1px 0px var(--button-disabled-stroke)) drop-shadow(1px -1px 0px var(--button-disabled-stroke)) drop-shadow(1px 1px 0px var(--button-disabled-stroke)) drop-shadow(-1px 1px 0px var(--button-disabled-stroke)); color: var(--button-disabled-text) } .night:hover, .day:hover { --button-disabled-stroke: var(--button-icon); color: var(--button-stroke); } #fr-layout-login-box {display: flex;grid-gap: 5px;} #fr-layout-login-box #themeswap {position: static } .fr-theme[data-theme="${DAY}"] .night { display: none } .fr-theme[data-theme="${NIGHT}"] .day { display: none }`));
      toggler.innerHTML = `<button id="themeswap" data-theme="${localStorage.getItem(`fr-active-theme`)}" title="Toggle Theme"><span class="day">${DAY_SVG}</span><span class="night">${NIGHT_SVG}</span></button>`;
      if (document.querySelector(`#fr-layout-login-box`)) {
        document.querySelector(`#fr-layout-login`).after(toggler);
      } else {
        document.querySelector(`#fr-layout-player-module-logout`).before(toggler);
      }
      toggler.before(togglerCSS);
      toggler.addEventListener('click',function() {
        if (localStorage.getItem(`fr-active-theme`) == DAY) {
          localStorage.setItem( `fr-active-theme`,NIGHT);
          document.querySelector(`#fr-layout`).setAttribute('data-theme',NIGHT);
        } else {
          localStorage.setItem( `fr-active-theme`,DAY);
          document.querySelector(`#fr-layout`).setAttribute('data-theme',DAY);
        }
      })
    })
  };
})();

function waitForElm(selector) {
  /*https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists*/
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }
        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });
        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
