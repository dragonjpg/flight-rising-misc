// ==UserScript==
// @name        Flight Rising: Breeding Lock
// @namespace   https://github.com/dragonjpg
// @author      dragon.jpg
// @description Allows you to prevent dragons from being able to be selected on the 'open nest' page.
// @match       https://*.flightrising.com/dragon*
// @match       https://*.flightrising.com/nesting*
// @match       https://*.flightrising.com/lair*
// @match       https://*.flightrising.com/den*
// @grant       none
// @version     1.0.0
// @license     MIT
// @icon        https://www.google.com/s2/favicons?sz=64&domain=flightrising.com
// ==/UserScript==

'use strict';

// constants
const F = 1,
      M = 0,
      NBS_ASSETS = {
        can_breed : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAqNQTFRFAAAAhIB1hIB1hIB1hYF2hYF2hoN2hIB1hIB1hIB1hYB1kYyB5dvR+vPq+fDp49fPiIV1hIB1hIB1hoV2iol21c3Gq6GX5NjI+fDm+vTr69/QsqaXiod3hIB1hIB1hYF2h4V4+vfz9fHqn5KIzb+o4tTB5tbF18iztKiYycO7hYF2hIB1hIB1iIh57+rltaqiqp+Txridw7mXt7CXopiO+fby6+fgiYd2hIB1j4p86uLc1M7GtKmhsKacyMC57Ofiiod3hIB1hIB1hIB1z8fA8Ovm8+/o5NzWr6ifhn9zhIB15dzW8uzn9vXv9/Xwoa+TR2cuI0wGPl0kWGVEf31whIB1hYF27OnixcChvriRwcGhvMWwJE0IKVANPlkmLFQPIUwFWGZEhIB1hYF2v7mn1sau7d7NuKyPy8i3/fz3W3JELU8QfXtcnot6bm9VJksLMVMYhIB1s6eX38265dPAyrmmq6SU+PTtz8nBPFcfRl8ow6yexq2dy7qva21ZZGxRhIB1h4N4p5uTy7Wm79nHvKiXrKWc+vTv9vDra3VUNFcVM1gUbXRNbXRMd4FcTV04PlYoHEEBhIB1gX5xwbSxkIN5q5eKjH502tTP9e/q7ebjHkgBKWMBK2cBKmQBJVkBLGoBJl0BHkcBgnxzopmTzMS+rqWf3tjT9/Hs8+zpHkoBTmUt0r+ySmMvJFkB7eXig310ysG73NPM2tHL4trU5NvV39fRH0oBK2oBZHZF4tLKLUQVJFgBhIB1dGxl2M/Jz8a/zsW+H0sBLm8BLm4BJ1UHbmFeIU0BJlwBhIB1hX92cWljvbSu4tnT5d3XH0wBL3EBKWIBI1MBGz0CdW9mHhMOWE5KcmpkaWBaIkcGI1UBIU8BHEUB////lZSLiYh/l4CBreMNlgAAAOF0Uk5TAILe7/r76g585/T9/v///+h1e97k//////////WVJbz8////////////9VB28////////////+S1+v////////xuGeT//////7hR///////////wQoHy/////////////qdv9v//////////////+ddZ////////////////+JxT6P/////////////////7wWku5P///////////////////9j//////////////wfN/////////////+7/YNj/////////8/j/Bnzh/////////9BscMzp4vv//+kCFhgKeaEyHwAAAM9JREFUeJxjZMACGKEUBPxEEuRghIH3cEEhRgR4DBWUY0QGVyGCOoyMnxn4YIInIYIWjIzPGRikwHqBuvaDBJ2AvDtQt6gC2dtBgl47PRgZr4CEdCEGrAEKhoJZx4GCVhDB+UDBJAhzJ4MH1KoJQMHCT/wg5uowmP2NQMEGRnSQz8gwCVXkHzNjHNCdi8GcJbGMn/+DDPoMFlwPV/VMGkg8BQsy7AVK8zH+Z4LI3IQIngSxX0iChf6fZ4AIMjBcgeqHhKYKNOQZ7gKFFGDRAQCrgSoVqjiWggAAAABJRU5ErkJggg==",
        cant_breed : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAqZQTFRFAAAAbl1Qbl1Qbl1Qb15Rb15RcF9Rbl1Qbl1Qbl1Qb11QeWZYv5+P0bGg0K+fvZyOcWFQbl1Qbl1QcGFRc2RRspWIj3Vnvp2J0K+d0bGhxKKOlXlnc2JRbl1Qbl1Qb15RcWFS0bSmza+ghWpdq4tzvZqEwJyHs5F7lnpoqI6Ab15Rbl1Qbl1QcWNTx6qdl3xvjnRlpYZro4dnmYBnh29h0LOmxKiZcmJRbl1Qd2RVw6SXsZaIlntuk3lrp4x/xaibc2JRbl1Qbl1Qbl1QrZGDyKudy66fvqCSknptcFxPbl1Qv6CSyqyezbKk0LKkonRqczQqYBwPay0jZj01bVpNbl1Qb15RxaqbpIxun4ZjoYxusId9YR0PYiASZysmZCMUYBwNZj42bl1Qb15Rn4dys5B3xqGMmn1iqZF907epdkE2YSEUfVFEhWVUcEhAXx8RYikfbl1QupV/v5qDqYdyj3dlz7GirZKEZSofbzAko31spX5rqYd3YicdYSIYbl1QcV9Si3FlqYRyx56InXpnkHhr0bGkza+hdUlBayYYayYZfEY9hVBIaSMWZh8SWhISbl1QbFxNoYN5eF9Tj25edVxPtpqOza6gxqebYRcPfCcFfykGfScIciAMgyoJfSgFdSQDYBcObVpPh29lqo+CkXhtuZ2Qzq+iy6yfYhcPfCYIdTQqsop6bzMqcCEGxqebbVtPqYyAuJqMtpiLvZ+Rvp+SupyPYxgPgioGficKgEM5vZmKVB4ZbyAGbl1QYU9FtJeKrZCDrI+CZBgPhywIhiwIbSAPXEdAZRoLdCMDbl1Qb1xRXkxEnoN3vZ6Qv6GTZRkQiS4IeycEbB4IVBIRYlFGGQ4KSTkzX01EWEY+XhgTbR4MZxsLXRQQ1bqvfGxfcmNXfl1YSou4DwAAAOJ0Uk5TAILe7/r76g585/T9/v///+h1e97k//////////WVJbz8////////////9VB28////////////+S1+v////////xuGeT//////7hR///////////wQoHy/////////////qdv9v//////////////+dBZ///////////////94FPo/////////////////u9pLuT/////////////////////2P///////////////wfN///////////////u/2DY//////////P4/wZ84f/////////QbHDM6eL7///pAhYYCleBUjwAAADKSURBVHicY2TAAhihFAT8RBLkYISB93BBIUYEeAwVlGNEBlchgjqMjJ8Z+GCCJyGCFoyMzxkYpMB6gbr2gwSdgLw7ULeoAtnbQYJeOz0YGa+AhHQhBqwBCoaCWceBglYQwflAwSQIcyeDB9SqCUDBwk87wkGaQmH2NwEF65FdCfZvISPDBEZ0EA905yIwa2kM4yd+EOMTWHA9qrrHYEGGfYwgRf+ZIILXIYKnQOznUmCh/2cZIIIMDFdhloMDThka8gz3gELysOgAABUsKBV+DcHKAAAAAElFTkSuQmCC",
        settings : "data:image/png;base64,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"
      };

// MAIN
function runNoBreedScript() {

  console.log("[FR Breeding Lock Script] Active")

  // set up defaults on first run
  if(localStorage.getItem(`fr-do-not-breed-list`)  == null) {
    localStorage.setItem( `fr-do-not-breed-list`, `[]` );
    localStorage.setItem( `fr-do-not-breed-remove`, `false` );
    localStorage.setItem(`fr-do-not-breed-lair-management`,`true`);
    console.log("\t[FR Breeding Lock Script] First run, local storage initialized.");
  };

  if (/nesting/.test(window.location.href) && document.querySelector(".nest-current-user") != null) {
    console.log("\t[FR Breeding Lock Script] on nesting grounds");
    applyBreedScriptCSS(`
    .ui-modal-content {
      position: relative;
      border: 0;
      padding: .5em 1em;
      background: none;
      overflow: auto;
    }
    #nobreed-controls {
      position: absolute;
      top: 8px;
      right: 40px;
    }
    .nobreed-button {
      padding: 0;
      height: 47px;
      width: 47px;
      box-sizing: border-box;
      position: relative;
      z-index: 5;
      cursor: pointer;
    }
    .nobreed-modal:not(.hide) + .nobreed-button.modal {
      z-index: 11;
    }
    .nobreed-modal:not(.hide) + .nobreed-button.modal::before {
      content: '';
      position:fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      border: none;
      background: rgba(0,0,0,0.5);
      outline: none;
      border: none;
    }
    .nobreed-modal {
      position: absolute;
      width: var(--width, 250px);
      min-height: 200px;
      z-index: 101;
      top: 50px;
      box-sizing: border-box;
      left: var(--left, -50%);
    }
    .nobreed-modal .ui-widget-content h3:first-child {
      margin-top: 0;
    }
    .nobreed-modal img {
      vertical-align: middle;
      margin-left: 0.5em;
    }
    .nobreed-modal a {
      color: var(--link, #731d08)
    }
    .check-list, .button-list {
      display: grid;
      text-align: left;
      grid-gap: 0.5em;
      margin: 0.8em 0 0.5em;
    }
    .col-2 {
      grid-template-columns: 1fr 1fr;
    }
    .check-list label {
      display: grid;
      grid-template-columns: 25px auto;
      align-items: center;
    }
    .button-list {
      flex-wrap: wrap;
    }
    #backup-zone #data {
      grid-column: 1 / 3;
      resize: none;
      height: 150px;
      width: 100%;
      font-size: 10px;
      font-family: monospace;
    }
    .expand-setting {
      cursor: pointer;
      background: none;
      border: none;
      color: inherit;
      font: inherit;
      display: inline-flex;
      justify-content: space-between;
      width: 100%;
    }
    .expand-setting span {
      margin-left: auto;
    }
    .expand {
      max-height: 0px;
      overflow: hidden;
      transition: max-height 0.3s, opacity: 0.3s;
    }
    .expand.expanded {
      max-height:500px;
      opacity: 1;
    }
    .expander :is(.on,.off) {
      pointer-events: none;
    }
    #dragon-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    #dragon-list ul {
      margin: 10px 0 10px 5px;
      height: 16em;
      overflow: auto;
      padding-right: 1em;
      padding-left: 0;
      border: 1px solid var(--borders, #ccc);
      padding: 0.5em 1em 0 0;
      background: var(--widget-med, #f6f4f1);
    }
    #dragon-list li {
      display: flex;
      margin-bottom: 0.5em;
      margin-left: 0.6em;
    }
    #dragon-list li > a {
      text-overflow: ellipsis;
      overflow-x: hidden;
      white-space: pre;
      line-height: 1.3em;
      max-width: 100%;
      display: flex;
      flex: 1;
    }
    #dragon-list li > a img {
      margin-left: auto;
    }
    .rmv-dragon {
      margin-right: 1em;
      color: rgba(var(--error, 150, 0, 0),0.3);
      background: rgba(var(--error, 150, 0, 0),0.1);
      border: none;
      position: relative;
      cursor: pointer;
      font-weight: bold;
      transition: 0.3s color;
      padding: 0 0.3em;
      border-radius: 5px;
    }
    .rmv-dragon:hover {
      color: rgba(var(--error, 150, 0, 0),1);
    }
    .rmv-dragon.tipsy::after {
      font-weight: normal;
      left: 1.5em;
      min-width: 120px;
      padding: 5px;
      top: -0.3em;
    }
    .tipsy::after {
      content: attr(data-tipsy); min-width: 150px; max-width: 300px; height: auto; line-height: 120%;
      font-size: 1rem; color: var(--text, #000); background: var(--tooltip-bg, #fff); border-radius: 10px;
      font-size: inherit; position: absolute; border:1px solid var(--borders, #888);box-shadow:rgba(0, 0, 0, 0.5) 1px 1px 6px;
      top: 112%; left: calc(50% - 100px); padding: 8px; box-sizing: border-box; z-index: 2;right:unset;bottom:unset;
      text-align: left;
      display: none;
    }
    .tipsy:hover::after { display: block !important; }
    .nobreed-modal:not(.hide) + .nobreed-button.modal::after { display: none !important; }
    .threads:empty::before { content: "No threads found."; display: block; font-style: italic; margin-bottom: 1.2em; }
    .toggled[data-toggled="0"] .on { display: none; }
    .toggled[data-toggled="1"] .off { display: none; }
    .hide {
      display: none !important;
    }
    `);
    let modal_content = `<div class="common-dialog-section" id="settings-list"><h3>General:</h3><div id="general-settings" class="check-list"></div><h3>Manage Locked Dragons:</h3><div id="dragon-list"></div><h3><button class="expand-setting expander toggled" data-target="#backup-zone" data-toggled="0">Backups: <span class="off">☰</span><span class="on">✕</span></h3><div id="backup-zone" class="button-list col-2 expand"></div><h3><button class="expand-setting expander toggled" data-target="#danger-zone" data-toggled="0">Reset: <span class="off">☰</span><span class="on">✕</span></h3><div id="danger-zone" class="button-list col-2 expand"></div></div>`,
        settings_modal = createNoBreedScriptModal('settings', `Breeding Lock Script Settings`, modal_content,`--width: 350px;--left:-300px;`),
        settings_button = createNoBreedScriptButton('settings', `Breeding Lock Script Settings`, settings_modal, NBS_ASSETS.settings),
        container = document.createElement("div");
    document.querySelector(`.inner-content`).before(container);
    container.id = `nobreed-controls`;
    container.append(settings_modal,settings_button);

    // functionality for settings button
    settings_button.addEventListener("click", function(e) { loadNoBreedScriptSettings();})

    // add functionality to collapseable sections inside settings modal
    document.querySelectorAll(`button.expander`).forEach(btn => {
      btn.addEventListener("click", function(e) {
        let target= document.querySelector(this.getAttribute("data-target")),
            on = this.getAttribute("data-toggled");
        this.setAttribute("data-toggled", (on == 1) ? 0 : 1);
        target.classList.toggle("expanded");

      });
    });

    // backup section
    let backup_zone = settings_modal.querySelector("#settings-list #backup-zone");
    backup_zone.innerHTML += `<textarea id="data"></textarea>`;
    [{type:"import",label:"Import JSON"},{type:"export",label:"Export JSON"}].forEach(obj => {
      let button = document.createElement("button");
      button.classList = (obj.type == "import") ? "rmv-setting redbutton anybutton" : "rmv-setting thingbutton beigebutton";
      button.id = `backup-${obj.type}`;
      button.innerText = obj.label;
      button.addEventListener("click", function(e) { backupNoBreedScript(obj.type) });
      backup_zone.prepend(button);
    });
    backup_zone.querySelector("#backup-import").disabled = true;

    // dynamically enable import button based on whether or not textarea is empty
    ['change','keyup'].forEach(event => {
      backup_zone.querySelector("#data").addEventListener(event, function(e) {
        if(this.value.length > 0) {
            document.querySelector('#backup-zone #backup-import').disabled = false;
        } else {
            document.querySelector('#backup-zone #backup-import').disabled = true;
        }
      })
    });

    // add danger zone buttons for resetting stuff
    let danger_zone = settings_modal.querySelector("#settings-list #danger-zone");
    [{type:"reset",label:"Reset All Settings"}].forEach(obj => {
      let button = document.createElement("button");
      button.classList = (obj.type == "reset") ? "rmv-setting redbutton anybutton" : "rmv-setting thingbutton beigebutton";
      button.innerText = obj.label;
      button.addEventListener("click", function(e) { resetNoBreedScript() });
      danger_zone.append(button);
    });

  } else if (/open-nest/.test(window.location.href)) {
    console.log("\t[FR Breeding Lock Script] On Breeding Page");

    // load and split our unbreedables into separate mom and dad lists
    let unbreedables = JSON.parse(localStorage.getItem(`fr-do-not-breed-list`)),
        remove = localStorage.getItem(`fr-do-not-breed-remove`),
        dads = unbreedables.filter((dragon) => dragon.gender == M),
        moms = unbreedables.filter((dragon) => dragon.gender == F),
        dad_info = document.querySelector("#nest_dad"),
        mom_info = document.querySelector("#nest_mom");

    // set up of mutation observers to deal with the selects constantly being re-populated
    // whenever the select is undisabled after we've changed dragons & the possible list of breeding partners is updated by the site,
    // we call the function to handle removing or disabling dragons that we don't want to breed.
    const observer_dad = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type != "childList" && mutation.target.classList.contains("nest-picker") && mutation.target.disabled != true) {
          doDragonRemove(mutation.target,dads,remove);
        }
      });
    });
    const observer_mom = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type != "childList" && mutation.target.classList.contains("nest-picker") && mutation.target.disabled != true) {
          doDragonRemove(mutation.target,moms,remove);
        }
      });
    });
    // start observing the parents of the selects
    observer_dad.observe(dad_info, {
      attributes: true,
      childList: true,
      subtree: true,
    });
     observer_mom.observe(mom_info, {
      attributes: true,
      childList: true,
      subtree: true,
    });

  } else if (/dragon/.test(window.location.href) && document.querySelector("#dragon-profile-owner-buttons") != null && document.querySelector(`.common-ui-button[data-tooltip-source="#button-breed-tooltip"]`) != null) {
    console.log("\t[FR Breeding Lock Script] on dragon's profile");

    applyBreedScriptCSS(`[data-toggle="on"] .off { display: none; }
    [data-toggle="off"] .on { display: none; }
    .breed-lock-icon { float: right; position: relative; cursor: pointer;}
    .tipsy::after {
      content: attr(data-tipsy); min-width: 150px; max-width: 300px; height: auto; line-height: 120%;
      font-size: 1rem; color: var(--text, #000); background: var(--tooltip-bg, #fff); border-radius: 10px;
      font-size: inherit; position: absolute; border:1px solid var(--borders, #888);box-shadow:rgba(0, 0, 0, 0.5) 1px 1px 6px;
      top: 112%; left: calc(50% - 100px); padding: 8px; box-sizing: border-box; z-index: 2;right:unset;bottom:unset;
      text-align: left;
      display: none;
      font-weight: normal;
    }
    .tipsy:hover::after { display: block !important; }
    .hide { display: none !important }
    `);

    // get gender, id, and toggle button
    let header = document.querySelector("#dragon-profile-details-lineage > .dragon-profile-details-header"),
        name = document.querySelector(".dragon-profile-header-name").innerText,
        id = document.querySelector(".dragon-profile-header-number").innerText.substring(2, document.querySelector(".dragon-profile-header-number").innerText.length-1),
        gender = (document.querySelector(`.dragon-profile-icons img[alt~="Female"]`) != null) ? F : M,
        unbreedables = JSON.parse(localStorage.getItem(`fr-do-not-breed-list`)),
        found = unbreedables.find((dwagon) => dwagon.id == id),
        toggle_button = document.createElement("span"),
        breed_button = document.querySelector(`.common-ui-button[data-tooltip-source="#button-breed-tooltip"]`),
        breed_tooltip = document.querySelector("#button-breed-tooltip"),
        original_breeding_tooltip = breed_tooltip.cloneNode(true),
        started_disabled = (breed_button.classList.contains(`common-ui-button-disabled`)) ? true : false;
    breed_tooltip.setAttribute("data-original-image",breed_button.querySelector(`img`).src);
    original_breeding_tooltip.id = "button-breed-tooltip-original"; //make copy of original tooltip for toggling purposes
    original_breeding_tooltip.classList = "hide";
    breed_tooltip.after(original_breeding_tooltip); // put after the original tooltip

    if (document.querySelector("#dragon-profile-button-breed") != null) {
      breed_button.setAttribute("data-href",breed_button.href) // save a copy of the original link
    }
    // disable breed button if dragon is locked on pageload
    if (found != undefined) {
      breed_tooltip.innerHTML = `This dragon has been <strong>locked</strong> from breeding.`;
      breed_button.classList.add("common-ui-button-disabled");
      breed_button.disabled = true;
      breed_button.href = '';
      breed_button.querySelector(`img`).src = `/static/layout/profile/button-breed-disabled.png`;
    }
    // add our toggle breed lock button to the 'lineage' header
    toggle_button.innerHTML = `<img src="${NBS_ASSETS.cant_breed}" class="off" alt="This Dragon is Locked for Breeding"><img src="${NBS_ASSETS.can_breed}" class="on" alt="This Dragon is Unlocked For Breeding">`;
    toggle_button.classList = `breed-lock-icon tipsy`;
    toggle_button.setAttribute("data-toggle",(found != undefined) ? "off" : "on");
    toggle_button.setAttribute("data-tipsy-off","Click to Unlock this Dragon for Breeding");
    toggle_button.setAttribute("data-tipsy-on","Click to Lock this Dragon for Breeding");
    toggle_button.setAttribute("data-tipsy",(found != undefined) ? toggle_button.getAttribute("data-tipsy-off") : toggle_button.getAttribute("data-tipsy-on"));
    toggle_button.addEventListener("click", function() { manageNoBreedScriptDragonStatus(name, id, gender, this, breed_tooltip, breed_button, started_disabled) });
    breed_button.addEventListener("click", function(event) {
      if (this.classList.contains(`common-ui-button-disabled`)) {
          event.preventDefault(); // prevent us from clicking locked dragons' buttons
      }
    });
    header.append(toggle_button);

  } else if ((/lair/.test(window.location.href) || /den/.test(window.location.href)) && document.querySelector("#lair-action-edit") != null) {
    console.log("\t[FR Breeding Lock Script] In our lair or den.");

    applyBreedScriptCSS(`[data-toggle="on"] .off { display: none; }
    [data-toggle="off"] .on { display: none; }
    .breed-lock-icon {position:relative; font-size: 11px;}
    .pointer {cursor: pointer;}
    .breed-lock-icon img {height: 18px; }
    .lair-page-dragons .lair-page-dragon .lair-page-dragon-box .lair-page-dragon-icons { overflow: visible;}
    .tipsy::after {
      content: attr(data-tipsy); min-width: 150px; max-width: 300px; height: auto; line-height: 120%;
      color: var(--text, #000); background: var(--tooltip-bg, #fff); border-radius: 10px;
      font-size: inherit; position: absolute; border:1px solid var(--borders, #888);box-shadow:rgba(0, 0, 0, 0.5) 1px 1px 6px;
      top: 112%; left: calc(50% - 100px); padding: 8px; box-sizing: border-box; z-index: 2;right:unset;bottom:unset;
      text-align: left;
      display: none;
    }
    .tipsy:hover::after { display: block !important; }
    `);

    // get all dragons & our list of unbreedables
    let dragons = document.querySelectorAll(".lair-page-dragon"),
        unbreedables = JSON.parse(localStorage.getItem(`fr-do-not-breed-list`)),
        lair_management = localStorage.getItem(`fr-do-not-breed-lair-management`),
        toggle_button = document.createElement("span");
    
    // set up base lair icon to copy and use    
    toggle_button.innerHTML = `<img src="${NBS_ASSETS.cant_breed}" class="off" alt="This Dragon is Locked for Breeding"><img src="${NBS_ASSETS.can_breed}" class="on" alt="This Dragon is Unlocked For Breeding">`;
    toggle_button.classList = `breed-lock-icon tipsy`;
    toggle_button.setAttribute("data-toggle","on")
    toggle_button.setAttribute("data-tipsy-off","This Dragon is Locked for Breeding");
    toggle_button.setAttribute("data-tipsy-on","This Dragon is Unlocked For Breeding");
    toggle_button.setAttribute("data-tipsy",toggle_button.getAttribute("data-tipsy-on"));

    // loop thru dragons, getting their info & checking if they're already locked or not
    dragons.forEach(dragon => {
      let url = dragon.querySelector("a").href.split("/"),
          id = url[url.length-1],
          gender = (dragon.getAttribute("data-gender") == "1") ? F : M,
          name = dragon.getAttribute("data-name"),
          found = unbreedables.find((dwagon) => dwagon.id == id),
          can_breed = toggle_button.cloneNode(true);
      if (found != undefined) {
        can_breed.setAttribute("data-toggle","off");
        can_breed.setAttribute("data-tipsy",toggle_button.getAttribute("data-tipsy-off"));
      }
      if (lair_management == "true") { // if lair management is enabled, we add functionality to the icons, otherwise it's just an icon
        can_breed.addEventListener("click", function() {
          manageNoBreedScriptDragonStatus(name,id,gender,can_breed);
        })
        can_breed.classList.add("pointer");
      }
      dragon.querySelector(".lair-page-dragon-icons").append(can_breed);
    });
  } else {
    console.log(`\t[FR Breeding Lock Script] Not on a valid page, doing nothing`)
  }

};

function manageNoBreedScriptDragonStatus(name, id, gender, button, breed_tooltip = null, breed_button = null, started_disabled = false) {

  let unbreedables = JSON.parse(localStorage.getItem(`fr-do-not-breed-list`)),
      found = unbreedables.find((element) => element.id == id),
      skip = (breed_tooltip == null || breed_button == null) ? true : false; // we skip certain parts of function if not on a dragon profile

  if (found == undefined) {
    // not found, so we add dragon to list of locked dragons
    let dragon = {
      name: name,
      id : id,
      gender : gender
    };
    unbreedables.push(dragon);
    button.setAttribute("data-toggle","off");
    button.setAttribute("data-tipsy",button.getAttribute("data-tipsy-off"));
    if (!skip) {
      breed_tooltip.innerHTML = `This dragon has been <strong>locked</strong> from breeding.`;
      breed_button.classList.add("common-ui-button-disabled");
      breed_button.href = '';
      breed_button.querySelector(`img`).src = `/static/layout/profile/button-breed-disabled.png`;
    }
    console.log(`\t[FR Breeding Lock Script] Added ${dragon.name} (#${dragon.id}) to unbreedable list.`)
  } else {
    // otherwise must be removing dragon
    let removed = unbreedables.indexOf(found);
    unbreedables.splice(removed,1);
    button.setAttribute("data-toggle","on");
    button.setAttribute("data-tipsy",button.getAttribute("data-tipsy-on"));
    if (!skip) {
      breed_tooltip.innerHTML = document.querySelector("#button-breed-tooltip-original").innerHTML;
      if (!started_disabled) {
        breed_button.classList.remove("common-ui-button-disabled");
        breed_button.querySelector(`img`).src = breed_tooltip.getAttribute("data-original-image");
        breed_button.href = breed_button.getAttribute("data-href");
      }
    }
    console.log(`\t[FR Breeding Lock Script] Removed ${found.name} (#${found.id}) from unbreedable list.`)
  }
  // sort list of dragons by id & save to local storage
  unbreedables.sort((a, b) => a.id - b.id);
  localStorage.setItem(`fr-do-not-breed-list`,JSON.stringify(unbreedables));
}

function doDragonRemove(selector, dragonlist, remove) {
  dragonlist.forEach(dragon => {
    try {
      if(selector.querySelector(`option[value="${dragon.id}"]`) == undefined || selector.querySelector(`option[value="${dragon.id}"]`) == null) {
        throw Error("Not loaded and/or Dragon not in list.");
      } else {
        if (remove === "true") {
          selector.querySelector(`option[value="${dragon.id}"]`).remove();
        } else {
          selector.querySelector(`option[value="${dragon.id}"]`).disabled = true;
        }
      }
    } catch(err) {
      // it looks like in some cases the site doesn't fetch all possible dragons and actually keeps part of the option list intact?
      // so we should just silently fail without stopping or it won't work properly
    }
  })
  console.log(`\t\t[FR Breeding Lock Script] doDragonRemove called: ${(remove === "true") ? "removed" : "disabled"} ${dragonlist.length} dragons ${(remove === "true") ? "from" : "in"} list ${selector.id}`)
}

function createNoBreedScriptModal(name, title, content, style = "") {
  var modal = document.createElement("div");
  modal.classList = `ui-dialog ui-corner-all ui-widget ui-widget-content nobreed-${name}-modal nobreed-modal hide`;
  modal.setAttribute("aria-labeled-by",`ui-nobreed-${name}`);
  modal.setAttribute("data-open","0");
  modal.setAttribute("data-name",name);
  modal.style = style;
  modal.innerHTML = `<div class="ui-dialog-titlebar ui-corner-all ui-widget-header ui-helper-clearfix"><span id="ui-nobreed-${name}" class="ui-dialog-title">${title}</span>
    </div>
  <div class="ui-modal-content ui-widget-content">
  </div>
  `;
  modal.querySelector(".ui-widget-content").innerHTML = content;
  return modal;
}

function createNoBreedScriptButton(name, tooltip, modal, image) {
  var btn = document.createElement("span");
  btn.setAttribute("aria-role","button");
  btn.setAttribute("tabindex",0);
  btn.classList = `nobreed-${name}-button nobreed-button modal tipsy`;
  btn.setAttribute("data-tipsy", tooltip);
  btn.innerHTML = `<img src="${image}" role="button" alt="${name} button">`;
  btn.addEventListener("click", function(event) {
    // close any open modals
    document.querySelectorAll(`.nobreed-modal[data-open="1"]`).forEach(open => {
      if (modal.getAttribute("data-name") != open.getAttribute("data-name")) {
        open.classList.add("hide"); open.setAttribute("data-open","0");
      } })
    modal.classList.toggle("hide");
    let status = (modal.getAttribute("data-open") == "0") ? "1" : "0";
    modal.setAttribute("data-open",status);
  });
  return btn;
}

// create checkbox element that will update local settings when we check or uncheck it
function createNoBreedScriptCheckbox( name, label, image = null ) {
  let itemContainer = document.createElement('div'),
    getSavedVal = localStorage.getItem( `fr-do-not-breed-${name}` );

  image = (image == null) ? " " : `<img src="${image}"> `;

  itemContainer.innerHTML = `<label for="${name}"><span class="common-checkbox" data-selected="0"><input type="checkbox" id="${name}" name="${name}" /></span><span>${image}${label}</span>`;

  let checkboxInput = itemContainer.querySelector("input");
  checkboxInput.checked = (getSavedVal == 'true' || getSavedVal == null ) ? true : false;
  if (getSavedVal == null) { localStorage.setItem( `fr-do-not-breed-${name}` , 'true'); console.log(`\t\t\t[F&BT] Initialized default value for ${name}`) };
  noBreedScriptSettingIsEnabled(checkboxInput);
  checkboxInput.addEventListener('click', (event) => { updateNoBreedScriptSetting(event); noBreedScriptSettingIsEnabled(checkboxInput);  });

  return itemContainer;
}

// using logic of hoard setting checkboxes
function noBreedScriptSettingIsEnabled(checkbox) {
  if (checkbox.checked) {
    checkbox.parentNode.setAttribute("data-selected",1)
  } else {
    checkbox.parentNode.setAttribute("data-selected",0)
  }
}

function applyBreedScriptCSS(css) {
  const head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');
  head.appendChild(style);
  style.type = 'text/css';
  style.id = `fr-breeding-lock`;
  style.appendChild(document.createTextNode(css));
}

function updateNoBreedScriptSetting( e ) {
  localStorage.setItem( `fr-do-not-breed-${e.target.name}`, e.target.checked );
}

function resetNoBreedScript() {
  localStorage.setItem( `fr-do-not-breed-list`, `[]` );
  localStorage.setItem( `fr-do-not-breed-remove`, `false` );
  localStorage.setItem(`fr-do-not-breed-lair-management`,`true`);
  alert("[FR Breeding Lock Script] Reset all settings.");
  document.querySelector(`.nobreed-settings-button`).click();
  document.querySelector(`.nobreed-settings-button`).click();
}

function removeDragonFromNoBreedScriptList(event) {
  let dragon = parseInt(event.target.getAttribute("data-id")),
      unbreedables = JSON.parse(localStorage.getItem(`fr-do-not-breed-list`)),
      found = unbreedables.find((element) => element.id == dragon);
  // as long as thread actually exists we'll delete it from array
  if (found != undefined) {
    let removed = unbreedables.indexOf(found);
    unbreedables.splice(removed,1);
    localStorage.setItem(`fr-do-not-breed-list`,JSON.stringify(unbreedables));
    console.log(`\t[FR Breeding Lock Script] removed ${found.name} (#${found.id}) from list.`);
    // edge case of deleting a bookmark via modal when inside the bookmarked thread. toggles the bookmark button back to unbookmarked
    event.target.parentNode.remove();
  } else {
      console.log(`\t\t[F&BT] something went wrong removing #${dragon} from the list.`)
  }
}

function backupNoBreedScript(action) {

  let backup_json;

  if (action == "import") {
    // attempt to load from textarea
    try {
      // --- JSON VALIDATION --------------------------------------------- //
      // doing all these checks now
      var backup_data = document.querySelector("#backup-zone #data").value;
      if (backup_data.length <= 0 || backup_data == null || backup_data == undefined) {
        throw new TypeError("Not valid JSON.");
      }
      // try to parse input as JSON, will throw error if there's something wrong with it and spit out the error
      backup_json = JSON.parse(backup_data);

      // check if keys exist
      var removed = backup_json[`remove_enabled`],
          dragons = backup_json[`dragons`],
          lair_management = backup_json[`lair_management`];

      // check the T/F settings
      if (!(removed == "true" || removed == "false") || !(lair_management == "true" || lair_management == "false")) {
        throw new TypeError(`Invalid value(s) for "remove_enabled" and "lair_management". Both keys must exist and be either "true" or "false"`);
      }

      // make sure we have arrays in bookmark
      if (!(Array.isArray(dragons))) {
        throw new TypeError("Dragon list is missing or malformed.")
      }

      // validate existence of all necessary keys in dragon list & their types/values
      for (const [index, dragon] of dragons.entries()) {
        if (dragon.name == undefined || dragon.id == undefined || dragon.gender == undefined) {
          throw new ReferenceError(`Dragon entry #${index+1} is missing one or more of the required values to import.`)
        }
        if (isNaN(dragon.id) || isNaN(dragon.gender) || dragon.id < 12 || !(dragon.gender == F || dragon.gender == M)) {
          throw new TypeError(`Dragon entry #${index+1} has invalid id and/or gender values.`)
        }
      };
      // --- END VALIDATION ---------------------------------------------- //

      // if all of the above checks passed we can proceed with overwriting the local storage
      localStorage.setItem(`fr-do-not-breed-list`,JSON.stringify(dragons));
      localStorage.setItem(`fr-do-not-breed-remove`,removed);
      localStorage.setItem(`fr-do-not-breed-lair-management`,lair_management);

      alert(`[FR No Breed Script] Successfully imported settings!`);

      // the lazy way to refresh the modal content :)
      document.querySelector(`.nobreed-settings-button`).click();
      document.querySelector(`.nobreed-settings-button`).click();

    } catch (err) {
      alert(`[FR No Breed Script] Something is wrong with your backup data:\n\n${err}`);
      console.log(`\t[FR No Breed Script] Error! ${err}`)
    }
  } else { // otherwise just assume we're exporting
    backup_json = {};

    backup_json[`remove_enabled`] = localStorage.getItem(`fr-do-not-breed-remove`);
    backup_json[`lair_management`] = localStorage.getItem(`fr-do-not-breed-lair-management`);
    backup_json[`dragons`] = JSON.parse(localStorage.getItem(`fr-do-not-breed-list`));

    // trigger onchange event to enable import button when the value of the backup textarea is changed
    var event = new Event('change');
    document.querySelector("#backup-zone #data").value = JSON.stringify(backup_json, null, 4);
    document.querySelector("#backup-zone #data").dispatchEvent(event);
  }
}

function loadNoBreedScriptSettings() {
  var settings_modal = document.querySelector(`#nobreed-controls [data-name="settings"]`),
      general = settings_modal.querySelector("#settings-list #general-settings"),
      unbreedables = JSON.parse(localStorage.getItem(`fr-do-not-breed-list`)),
      dads = unbreedables.filter((dragon) => dragon.gender == M),
      moms = unbreedables.filter((dragon) => dragon.gender == F),
      dragonlist_container = settings_modal.querySelector("#settings-list #dragon-list"),
          backup_zone = settings_modal.querySelector("#settings-list #backup-zone"),
          exported_backup = backup_zone.querySelector("#data"),
          danger_zone = settings_modal.querySelector("#settings-list #danger-zone");

  // refresh content each time we run this script
  general.innerHTML = '';
  dragonlist_container.innerHTML = '<h4><img src="https://www1.flightrising.com/static/layout/lair/icons/male.png" alt="Male"> Males</h4><h4><img src="https://www1.flightrising.com/static/layout/lair/icons/female.png" alt="Female"> Females</h4><ul class="dragon-list" id="males"></ul><ul id="females" class="dragon-list"></ul>';
  exported_backup.value = '';
  backup_zone.querySelector("#backup-import").disabled = true;
  document.querySelector(`button.expander[data-target="#danger-zone"]`).setAttribute("data-toggled",0);
  danger_zone.classList.remove("expanded");
  document.querySelector(`button.expander[data-target="#backup-zone"]`).setAttribute("data-toggled",0);
  backup_zone.classList.remove("expanded");

  // add buttons
  general.append(createNoBreedScriptCheckbox(`remove`, `Remove locked dragons from parent lists instead of disabling them.`));
  general.append(createNoBreedScriptCheckbox(`lair-management`, `Also enable locking/unlocking dragons on lair pages by clicking the lair page icon (<img src="${NBS_ASSETS.can_breed}" style="width: 16px;"/><img src="${NBS_ASSETS.cant_breed}" style="width: 16px;"/>).`));

  // add dragons to list
  [ {arr: dads, selector: "#males"}, {arr: moms, selector: "#females"}].forEach(sublist => {
    sublist.arr.forEach(dragon => {
      let li = document.createElement("li");
      li.innerHTML = `<button class="rmv-dragon tipsy" data-tipsy="Unlock ${dragon.name}" data-id="${dragon.id}">X</button><a href="https://www1.flightrising.com/dragon/${dragon.id}" target="_blank" rel="noreferrer">${dragon.name}</a>`;
      dragonlist_container.querySelector(sublist.selector).append(li);
    });
  });

  dragonlist_container.querySelectorAll(".rmv-dragon").forEach(button => {
    button.addEventListener("click", function(e) {
      removeDragonFromNoBreedScriptList(e);
    });
  });
}

runNoBreedScript();