// ==UserScript==
// @name        Flight Rising: More BBCode Buttons
// @namespace   https://github.com/dragonjpg
// @author      dragon.jpg
// @description adds more icons to the BBCode tag bar in various places across the site. includes buttons for color, size, columns, etc.
// @match       https://*.flightrising.com/dragon/*
// @match       https://*.flightrising.com/clan-profile/*
// @match       https://*.flightrising.com/forums/*
// @match       https://*.flightrising.com/msgs/*
// @grant       none
// @version     1.0.0
// @icon        https://www.google.com/s2/favicons?sz=64&domain=flightrising.com
// ==/UserScript==

(function() {

  'use strict';

  // most areas use a textarea called message...
  var textarea_to_affect = 'message',
      element_to_wait_for = '#bbcode-tag-bar',
      repeat = false;

  // ...except for clan profiles, which use one named clan_bio. we must also wait until the modal is dynamically added to the page.
  if (/clan-profile/.test(window.location.href)) {
    textarea_to_affect = 'clan_bio';
    element_to_wait_for = '.ui-dialog:not([style*="display: none"]):has(#bbcode-tag-bar) #bbcode-tag-bar';
    var recursive_condition_to_wait_for = `.ui-dialog[style*="display: none"]:has(#bbcode-tag-bar)`;
    repeat = true;
  }

  console.log("[BBC] More BBCode Tags Active");

  // NEW BBCODE TAGS TO ADD
  // images are so small we can use base64 so we don't have to load any external resources :)
  const bbcode_tag_list = [
    {
      tag : "size",
      title: "Size",
      prompt : "Enter Size (0-7):",
      src : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAH5QTFRF////d3d3AAAAh4eH9vb2Nzc3UVFR/Pz8BgYGFBQU9/f3QkJCYGBgAQEB+vr6CwsLR0dHdnZ2LS0tMzMz+/v7BwcHJSUlOzs7/v7+GRkZPT097+/vERERREREampqISEhJycnOjo639/fHBwcMjIy7e3tKSkp3t7eHh4eNDQ0keobGgAAAJJJREFUeJxjZMAKGKkkzAiTYvzLwMDCyMj4EyzM8QsqzP6dgYsRiL+AhZm4P/N9YfvB8o/3I4PAJ6A0/3uQsBDjW5F3wq8ZxBhfSjC+BApLPINaCVINMUj6udQTuEsGUlj2KZCQeYQmLMH+GMT7ABFWeAQk5O8DCSXG+0B8GyKsdgdIiII8yKDOyPjnNvWiARsAAMMlOxe2AGyyAAAAAElFTkSuQmCC",
      prepend : true,
      type: 2
    },
    {
      tag : "color",
      title: "Color",
      prompt : "Enter Color:",
      src : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAP9QTFRF////WVlZJSUl5+fntra2nZ2d+vr6V1dXAAAAKCgo7Ozs/v7+Z2dnMzMz7u7u8/PzPj4+MjIyXV1dRUVFLCws6urq+Pj4Q0NDJycn6Ojo+/v7SEhI6enpTk5OKSkp7e3t+fn5QkJCISEh4eHh/Pz8U1NTExMTMTExNTU1GRkZWlpaHR0d29vb9PT0SkpKFRUV9/f39vb2PT09e3t7o6Oj5OTkbGxsfX19UVFRXFxcgICAGBgYa2tr2tra9fX15eXl4+PjDg4OEhIS1tbWdHR0yMjIDAwMDw8P0dHRBgYGr6+vCgoKzMzMcnJyODg4w8PDCAgIx8fHy8vLycnJAQEBFG6EXwAAAONJREFUeJxjZMAKGKkmzMjI+JeBgYWR8ReKMDsjCPxhYGX8hCzMz/iDk/HbL8GvPIyvkc0WY/zIIADU8PaX1BMkYSnm10CphwqMz6UY78KFVRgfywEFb4B0KX54DhPWuqcMtvQCgyHjNe2zUGGTK4w6p6FOMLukfxIqbHHBEOar/+eN78EMsTmD8J46HyPjQYiwA+NxmKgV416Xk/++Qqx0ZTwEEbVn3GHPtd9pG9Tdrmx7QZQd2xYG390MbptgIejPuIOBwZltPQOD6mMGq33wgA06aHzWfh2QEfxOeONv6sQOAFbNPRePoS6cAAAAAElFTkSuQmCC",
      prepend : true,
      type: 2
    },
    {
      tag : "font",
      title: "Font",
      prompt : "Enter Font:",
      src : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAI1QTFRF////+Pj4Ozs7PDw8pqamAAAARkZG5eXlAQEBhoaGDAwMh4eHISEhYGBgxsbGwMDAx8fHZmZmICAg/v7+aGho9/f3CwsLgICAEBAQ+vr6oaGhv7+/qKioSUlJAgIC6urqiYmJ4ODgJiYmRERE8/Pz8vLyKCgo4eHhHh4eampqIiIiDg4Orq6uCgoKb29vBU3rhwAAALtJREFUeJyd0WkLgkAQBuAZKu2wpEJMgkCoyP//TyI6oKAyiCg6SCuP3GYTyaNPzodl99lheJdF+FuYkxExYFkuIjA/ywIDdDMs4hsKzElzxS+BJ9hplpwyvEQrxY0nVOEBtWuSm1adktzlU4IVvLQOoJ7buI8zhVao+wjqLs5C9L6OGWMeOiwNNz+m0DIfqt287jpi3RXNHi5pNwi2ui0tQh6taOnPvjH53TRkgxqHOOGBjDkdx/l/J1Ef8m81F83+da4AAAAASUVORK5CYII=",
      prepend : true,
      type: 2
    },
    {
      tag : "spoiler",
      title: "Spoiler",
      src : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAM9QTFRF////Ly8vjIyMpKSkBQUFTk5O8PDwlJSUBgYGAAAAVFRU/v7+zMzMGxsbISEhExMTgICAZWVlOjo6f39/9fX17OzsPz8/Xl5el5eXrKysMjIyLCws/f39d3d3ioqKU1NT4ODg3Nzcra2tCwsLZGRkNzc32NjYJSUlcnJy9PT0TExMmJiYhoaGAgICXV1d+fn56enpfX19vb29MzMz5ubmn5+fnZ2d4+PjFRUVwsLCFxcX8vLy+Pj4BAQEkZGRx8fHQEBAb29vAwMDbW1tycnJTiBy4AAAAK1JREFUeJxjZMAKGKkkzMj4D5swMyMYwAQYv0IN4QEK/mdiYPzBycjw+zf3G5jZooyf+V4ySHwUeM4gxfgUYaUM4xvRR/Kv/v5iUGC8j+wSJUbG12K3MR2oxvhI/gYWd2sy3lO+iimsfVUH6KKLaMIGNzXOG91VYTyDKmx6RfcUg/kpc8bjSMLC34CEIeNRm0/8jIcQwvaM14Cm7wey2K0Z92ILQZePp6kXDdgAAOpQKxe4Kac1AAAAAElFTkSuQmCC",
      prepend : false,
      type: 1
    },
    {
      tag : "sup",
      title: "Superscript",
      src : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAANVQTFRF////5ubmh4eHsbGx2dnZBwcHAAAAGRkZ4uLiCQkJDw8POjo66+vrs7OzkJCQz8/PLy8vS0tLERERhISE9fX1n5+flZWV/v7+Q0NDHR0dycnJqqqqCwsL39/fcnJyCAgI2NjYi4uLAQEBx8fH3t7eISEh+fn5KioqJycnBQUFdnZ28PDwMzMza2tr0tLSBgYGLS0t+/v7Xl5esLCwTU1Nd3d3cHBw8vLywMDAnp6ewcHBHBwcvr6+8/Pze3t7LCwscXFxbW1tPz8/dXV14ODgU1NTrq6uwGXS2QAAANJJREFUeJxjZMAKGDEEGBn/YgqzAIV/YgpzMP5l+QYR5v7NyPoFSPP+ZOD4xP8dJizwjYH7PZAp+IWB9y1CWITxI4PAK3HGd8KMzxikX4sxPoaaLfdCkpHxqQzjXQaVRwwM8rehwmqM95UY76pcY2DQZrzFoH4Z5hI9xusMWoznMbxjdIVB9yyGL8Gqv91CEwaarXf5v/5pNGGzC8JyjOdALkESVhE9y2ByDOhKU0bGwwhhybcMFoeAJkkeZ7A6gBB2ZGR8B3KbCzCYduEIb9oLAwDorToXi8UCmAAAAABJRU5ErkJggg==",
      prepend : false,
      type: 1
    },
    {
      tag : "sub",
      title: "Subscript",
      src : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAANVQTFRF////Ojo6AAAAGRkZ6+vrs7OzkJCQLy8vS0tL5ubmERERhISE9fX1n5+flZWV/v7+Q0NDHR0dycnJcnJyCAgI2NjYi4uLAQEBx8fH+fn5KioqJycnBQUFdnZ20tLSBgYGLS0t+/v7Xl5esLCwh4eHsbGxTU1Nd3d32dnZBwcHcHBw8vLywMDA4uLiCQkJDw8P3t7enp6ewcHBHBwcvr6+8/Pzz8/Pe3t7LCwscXFxbW1tPz8/dXV14ODgU1NTrq6uqqqqCwsL39/fISEh8PDwMzMza2trhIE6HwAAAMxJREFUeJxjZMAKGKklzAgEf4A0618Gll8IYfbfDGw/GBg4GX8wcH5FCPMwfmXg+cTPCETvUMwWfi/EyPhGlPEFqpWSjC8kGZ9JP0Z3iRzjYyC+j+FApQcMincx3A1W/fM5kMUpzXgbyWyVu/9VbzIwaDDeZPwLE9a6wS/FeA3kEl3GK7oXIcIGjBcZDM4BXWnIyHja7AxMWPAjg+lJoEnypxjMjyOErRgZn4LcZsv4l+WgwyF7xn0YIWhwiYHBcS+GsAvjXgaXXdSJHQCOGzoXYsiYnQAAAABJRU5ErkJggg==",
      prepend : false,
      type: 1
    },
    {
      tag : "columns",
      title: "Table",
      prompt : "Enter Number of Columns (1-6):",
      src : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAFRQTFRF////rq6uJiYmAAAANjY2zMzMGhoaTExMMDAwCwsLCgoKCQkJ6urq1dXVAgIC29vbycnJFhYWt7e3MjIyLy8vY2Nj1tbWZmZmPz8/QEBAeXl56OjotZuPCgAAAGJJREFUeJxjZMAKGKklzMiILMnI+BsizPYXRSXLT4gwM6oBrD9gwmwgzT/BFNMPhDDIFJ7vzL+AFO+3wSfM95UH5O7PfP9Aaj4KvIUIi7xH8aXQa4iwGHJQAcPtKRWjAQsAAMyHMhexonoAAAAAAElFTkSuQmCC",
      prepend : false,
      type: 2
    },
    {
      tag : "hidden",
      title: "Hidden",
      prompt : "Hidden Title (Leave Blank for Default Title)",
      src : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAMAAADzapwJAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVZQTFRF////7e3tZGRkFBQUAAAAYmJiaGhoFxcXAQEBAgICERERBAQEBQUFBgYG2traICAgqamp1dXVv7+/39/fGBgYZmZm9/f3xsbGQ0NDDQ0NU1NT5+fn6OjoOjo6GRkZBwcHc3Nzzc3N1tbWmJiYMDAwwsLC/Pz8cHBwDg4Ovb29ampqJSUloKCgwcHBra2tbW1tq6urCgoKKSkpgoKCDw8Prq6uo6OjISEh9vb2mpqa19fXJCQkMjIy+fn5h4eHPj4+QEBAf39/wMDA2NjYlpaW8/PzUlJSLi4ukZGRHR0dS0tLWlpaRERE/v7+7u7ukpKSjIyMSEhI3d3dCQkJ0NDQ7OzsgYGBpaWlAwMDW1tbxcXFFRUVdHR0fn5+ycnJEhISi4uL3Nzc6enp3t7eNDQ0KioqdnZ2VFRUFhYW+/v7bm5uGxsbzs7Or6+ve3t7iIiIl5eXODg47MP6QwAAAQ9JREFUeJxjZMAKGBkYgQBF6D8QMDKw/sdQy/SLkYH9Lwua6j9s3xgZWBjYQcKMEE2M/xn//2D4AxLm+oSimu8bRJib8QOQJ8jI+BZFmIcF5Jo3DAyijIxPEcJcfCBhxq88jIz3lW4jhD+pgYQfKDJeUf7DdxkurMB40YDxsh5Q6rQZI+M1qDAvr/RxBiuwQQcZHBjPQoXtDtnvVZUHC29nUNA6AjPEFijwWG5jwE6P9UGMjLtgwu73lVaFA50IdOB5o8UIl8QBvfLtvP98aSYm53kIYYZkoDG31RiPgIxbhBBmyGRhvMOo8ngdg8CvtCkQ4ZxLyCElevIJSJjtH9ZoCD3xHE009+4mRgylYAAAEi9kF6wxwu4AAAAASUVORK5CYII=",
      prepend : false,
      type: 2
    },
    {
      tag : "rule",
      title: "Horizontal Rule",
      src : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWBAMAAAA2mnEIAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAACFQTFRF////oqKiOTk5MzMzpKSkDg4OAAAAUFBQ3NzcbGxsZWVlxXi5VAAAAC9JREFUeJxjZEAARpqzhRQhrI93GBnCBCDs/7MZGco+QFXMZGTohKp5l0F79yAAAB6uCBfXxtvzAAAAAElFTkSuQmCC",
      prepend : false,
      type: 3
    }
  ];

  // we won't bother to do anything unless the BBCode bar will actually exist on the page
  if ( document.querySelector("textarea#message") || document.querySelector("#clan-profile-set-clan-bio") ) {
    if (repeat) {
      // sooo on clan profiles the clan bio modal is re-created EVERY time it's opened, so we must use a recursive function to keep observing after the modal is closed
      clanProfileHandler();
    } else {
      // elsewhere it's available on page load and never removed, so we can just run the button creator function once and be done
      createBBCodeButtons(document.querySelector(element_to_wait_for));
    }
  } else {
    console.log("[BBC] DONE: no BBCode controls present on page, skipping.");
  }

  // recursive function to handle the uniqueness of the clan bio
  function clanProfileHandler() {
    // recursive -> wait for modal to open, then do stuff with it
     return waitForElement(element_to_wait_for).then((bbcode_controls) => {
       // once the modal is opened and the bar exists, we add the buttons
       createBBCodeButtons(bbcode_controls);
       // then we start waiting for modal to be closed.
       console.log("[BBC] Waiting for clan bio modal to be closed.");
       waitForElement(recursive_condition_to_wait_for).then((closed_dialog) => {
         // when it's closed, we then use recursion to start observing for the modal to be opened again
         console.log("[BBC] Clan bio modal closed, waiting for it to be reopened.");
         return clanProfileHandler();
       });
    });
  }

  // function to create & add the buttons
  function createBBCodeButtons(bbcode_controls) {
    console.log(`[BBC] ${element_to_wait_for} found! adding new buttons.`);

    // fix quick reply header covering the additional buttons in forum threads
    if (document.querySelector(".editor-text-header")) { document.querySelector(".editor-text-header").style = "position: static;"; }

    // loop thru & create buttons for each of our tags
    bbcode_tag_list.forEach(tag => {
      var button = document.createElement("img");
      button.src = tag.src;
      button.alt = tag.title;
      button.title = tag.title;
      button.name = `btn${tag.title.replace(/\s/g, '')}`;
      button.setAttribute("data-tag",tag.tag);
      if (tag.type == 2) {
        // tags with prompts
        button.setAttribute("data-prompt",tag.prompt);
        button.classList = `bbc-prompt`;
      } else if (tag.type == 3) {
        // tags without closing tags
        button.classList = `bbc-single`;
      } else {
        // regular tags
        button.classList = `bbc-normal`;
      }
      // add to front or end of list. i like font, color, & size buttons to be at the front with b/i/u/etc so i set it up to do that :)
      if (tag.prepend) {
        bbcode_controls.prepend(" ", button);
      } else {
        bbcode_controls.append(button, " ");
      }

    });

    // for some reason it just didn't want to work when i was setting the click events in the above loop, so we just do it after in separate loops since we need to set up different functions for different behaviors anyways
    document.querySelectorAll('.bbc-prompt').forEach(bbcode => {
      // buttons with prompts get their own special function based on the dev's doURL function
      let tag = bbcode.getAttribute("data-tag"), prompt = bbcode.getAttribute("data-prompt");
      bbcode.addEventListener("click", function (e) {
       doPromptedTag(tag, prompt, textarea_to_affect);
      });
    });
    // non-prompt buttons can just use the site's doAddTags function
    document.querySelectorAll('.bbc-normal').forEach(bbcode => {
      let tag = bbcode.getAttribute("data-tag");
      bbcode.addEventListener("click", function (e) {
        doAddTags(`[${tag}]`,`[/${tag}]`,textarea_to_affect);
      });
    });
    document.querySelectorAll('.bbc-single').forEach(bbcode => {
      let tag = bbcode.getAttribute("data-tag");
      bbcode.addEventListener("click", function (e) {
        doAddTags(`[${tag}]`,``,textarea_to_affect);
      });
    });

    console.log(`[BBC] DONE: ${bbcode_tag_list.length} buttons added!`);
  }

  // function to handle any tag that needs a prompt
  function doPromptedTag(tag, prompt_text, textarea_id) {
      var textarea = document.getElementById(textarea_id),
          prompt_val = prompt(prompt_text, ""),
          scrollTop = textarea.scrollTop,
          scrollLeft = textarea.scrollLeft;

    // INPUT VALIDATION
    if (tag == "hidden" & prompt_val == "") { prompt_val = "Hidden"; } // set default title for hidden
    if ((tag == "size" & prompt_val != null) && (isNaN(parseInt(prompt_val)) || prompt_val > 7 || prompt_val < 0)) { prompt_val = (prompt_val > 7) ? 7 : 0; }; // clamp range for size between 0-7

    // DO STUFF
    if (prompt_val != "" && prompt_val != null && tag == "columns") {
        // special case for columns... how many columns? if your response was a huge number or invalid you get 1 column. otherwise it'll format
        if(isNaN(parseInt(prompt_val)) || (prompt_val > 6 || prompt_val < 1)) { prompt_val = (prompt_val > 6) ? 6 : 1; }
        var col = "\n[nextcol]\n",
            col_inner = '';
        // loop and add nextcols for 2+ cols
        for (let i = 1; i < parseInt(prompt_val); i++) {
          col_inner += col;
        }
        // appending logic copied from doUrl function
        if (document.selection) {
              textarea.focus();
              var sel = document.selection.createRange();
              sel.text = (sel.text == "") ? `[${tag}]\n${col_inner}\n[/${tag}]` : `[${tag}]\n${sel.text}${col_inner}\n[/${tag}]`;
          } else {
              var len = textarea.value.length,
                  start = textarea.selectionStart,
                  end = textarea.selectionEnd,
                  sel = textarea.value.substring(start, end);
            var rep = (sel == "") ? `[${tag}]\n${col_inner}\n[/${tag}]` : `[${tag}]\n${sel}${col_inner}\n[/${tag}]`;
            textarea.value = textarea.value.substring(0, start) + rep + textarea.value.substring(end, len);
            textarea.scrollTop = scrollTop;
            textarea.scrollLeft = scrollLeft;
          }
      } else if (prompt_val != "" && prompt_val != null) {
          // for most tags like color, font, size, etc. we can just re-use the same block
          var tag1 = tag, tag2 = tag;

          // special check for tags that require a slightly different tag
          if ((tag == "hidden")) { tag1 = `${tag} title`; };

          // appending logic copied from doUrl function
          if (document.selection) {
              textarea.focus();
              var sel = document.selection.createRange();
              sel.text = (sel.text == "") ? `[${tag1}="${prompt_val}"][/${tag2}]` : `[${tag1}="${prompt_val}"]${sel.text}[/${tag2}]`;
          } else {
              var len = textarea.value.length,
                  start = textarea.selectionStart,
                  end = textarea.selectionEnd,
                  sel = textarea.value.substring(start, end);
            var rep = (sel == "") ? `[${tag1}="${prompt_val}"][/${tag2}]` : `[${tag1}="${prompt_val}"]${sel}[/${tag2}]`;
            textarea.value = textarea.value.substring(0, start) + rep + textarea.value.substring(end, len);
            textarea.scrollTop = scrollTop;
            textarea.scrollLeft = scrollLeft;
          }
      }
  }

  // function to wait until an element exists to start doing things
  // FROM: https://stackoverflow.com/a/61511955
  function waitForElement(selector) {
    console.log(`[BBC] waiting for '${selector}'...`);

    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
          // if it aint there we observe until it is
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector)); // returns the element for us to do stuff with once it shows up
            }

        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
  }


})();

