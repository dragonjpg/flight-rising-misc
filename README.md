# About
Miscellaneous one-off userstyles & appearance-modifying userscripts for Flight Rising.

**I do not and WILL NOT write scripts that automate gameplay and/or scrape other site pages for data.** Any scripts I create are purely for QoL and/or aesthetic purposes, and can be achieved entirely through gathering info from and manipulating the DOM of the single page they are loaded on.

All styles will be hosted here in this repo, and mirrors are available via my [Userstyles.World Account.](https://userstyles.world/user/meow)\
All USO Versions of these styles are considered **abandoned.**

| Quick Nav 	|
|---	|
| 1. [Styles](#style-list)<br>2. [Scripts](#script-list) 	|

# Style List
## 1. Arlo's Plot Focuser
**Last Updated:** 2025-06-13\
**Current Version:** 1.1.1\
**Install**:
- [Via Github](https://github.com/dragonjpg/flight-rising-misc/raw/refs/heads/main/arlos-plot-focuser.user.css)
- [Userstyles.World Mirror](https://userstyles.world/style/9992/flight-rising-arlos-plot-focuser)

Eliminate excess scrolling in Arlo's Ancient Artifacts digsites by bringing a specified plot to the top of the list and optionally compacting the dig site list.

**How to use:**
- Hover over the plot to get its number.
- Put that number into the style for the corresponding digsite.
- It's now at the beginning of the list of plots. Hooray!

## 2. Scry Dresser
**Last Updated:** 2025-06-13\
**Current Version:** 1.0.1\
**Install**:
- [Via Github](https://github.com/dragonjpg/flight-rising-misc/raw/refs/heads/main/scry-dresser.user.css)
- [Userstyles.World Mirror](https://userstyles.world/style/15870/flight-rising-scry-dresser)

Simple userstyle that allows you to preview outfits/skins directly in the scrying workshop or the dressing room without having to save the scry or the outfits.\
**Outfits MUST have a marva's invisibility cloak included.**

![image](https://github.com/user-attachments/assets/c5d59960-2b19-47d3-81ef-b39f66fb925e)


## 3. AH Sell & Item Select Popup Filter
**Last Updated:** 2025-06-13\
**Current Version:** 2.0.1\
**Install**:
- [Via Github](https://github.com/dragonjpg/flight-rising-misc/raw/refs/heads/main/item-select-filter.user.css)
- [Userstyles.World Mirror](https://userstyles.world/style/5315/flight-rising-ah-sell-item-select-popup-filter)

**Style #1:**\
<img alt="image" width="500px" src="https://github.com/user-attachments/assets/4fa2bfe2-8e12-4647-b092-ef28633d53c0" />

**Style #2:**\
<img alt="image" width="500px"  src="https://github.com/user-attachments/assets/0b04e042-3c86-4619-b103-ce1d4e0c6922" />

**Works on the Following Pages:**
- Auction House Selling Pages
- Crossroads Item Attachment Selection Popup
- Message Item Attachment Selection Popup
- Baldwin Item Selection Popup

**Known Glitches:**
- Spacing issues with the Visibility option in the popups. Unsure of how to fix it.

**How it Works:**
- In the site code for the area that displays the items you can list for sale, each icon also has its full name included in the code under a value called "data-name." Using a [CSS [attribute] selector](https://www.w3schools.com/css/css_attribute_selectors.asp), you can use css to make a simple item filter.

**Other Notes:**
- One of the limitations of using only css is that I can't make it ignore the styling if the search has nothing in the string, so you have to disable the style when you're done searching and want to look through your items normally, and enable it again when you want to use the style to search for particular items.

# Script List
## 1. More Dragon Share Widgets
**Last Updated:** 2025-08-27\
**Current Version:** 1.0.0\
**Install**:
- [Via Github](https://github.com/dragonjpg/flight-rising-misc/raw/refs/heads/main/scripts/more-dragon-share-widgets.user.js)

Adds a few more BBCode widgets that you can copy and paste to use in bios. The generated img tags have alt tags consisting of the dragon's name followed by their ID number.

<img width="300" alt="image" src="https://github.com/user-attachments/assets/f790d0ba-7a71-49ea-a3db-ea8245a524c3" />

- This script is compatible with base FR and my dark mode.
- The copy buttons added by the script utilize Flight Rising's existing function, **frCopyToClipboard**, to copy the text to your clipboard.
- It also adds an alt tag to the existing Widget, which has also been relabeled to Fullsize Widget. Example: ``[url=https://www1.flightrising.com/dragon/1110482][img alt="PlagueFestival (#1110482)"]https://www1.flightrising.com/rendern/350/11105/1110482_350.png[/img][/url]``
- It adds the following additional widgets:
  - Avatar (Example: ``[url=https://www1.flightrising.com/dragon/1110482][img alt="PlagueFestival (#1110482)"]https://flightrising.com/rendern/portraits/11105/1110482p.png[/img][/url]``)
  - Lair Portrait (Example: ``[url=https://www1.flightrising.com/dragon/1110482][img alt="PlagueFestival (#1110482)"]https://flightrising.com/rendern/avatars/11105/1110482.png[/img][/url]``
  - Coliseum Portrait (Example: ``[url=https://www1.flightrising.com/dragon/1110482][img alt="PlagueFestival (#1110482)"]https://flightrising.com/rendern/coliseum/portraits/11105/1110482.png[/img][/url]``

## 2. Morphology Widget
**Last Updated:** 2025-08-27\
**Current Version:** 1.0.0\
**Install**:
- [Via Github](https://github.com/dragonjpg/flight-rising-misc/raw/refs/heads/main/scripts/morphology-widget.user.js)

Adds a third share button next to the share image and link buttons that copies BBCode of the morphology's picture that links directly to the morphology parameters to your clipboard. Detailed alt text is copied from the alt tag of morphology image.

**Example output:**\
<img width="500" alt="image" src="https://github.com/user-attachments/assets/ba8391e4-c188-426b-a96b-53576f99695d" />

``[url=https://www1.flightrising.com/scrying/predict?breed=4&gender=0&age=1&bodygene=15&body=94&winggene=232&wings=94&tertgene=213&tert=96&element=1&eyetype=3][img alt="Adult Male Pearlcatcher dragon with Copper Skink primary, Copper Saddle secondary, and Abyss Wish tertiary genes. The dragon has Rare Earth element eyes."]https://www1.flightrising.com/dgen/preview/dragon?age=1&body=94&bodygene=15&breed=4&element=1&eyetype=3&gender=0&tert=96&tertgene=213&winggene=232&wings=94&auth=8a08fa296d0c767d427b20644368cee9cec51429&dummyext=prev.png[/img][/url]``

- This script is compatible with base FR and my dark mode.
- The button added by the script utilize Flight Rising's existing function, **frCopyToClipboard**, to copy the text to your clipboard.


## 3. Quick Ping
**Last Updated:** 2025-08-27\
**Current Version:** 1.0.0\
**Install**:
- [Via Github](https://github.com/dragonjpg/flight-rising-misc/raw/refs/heads/main/scripts/quick-ping.user.js)

Adds a button to the post controls that functions like Quick Quote but for pings. It appends a ping for the author of the post ('@author ') using FR's existing function for appending BBCode tags to the quick reply box and other textareas across the site.

**Example:**\
<img width="500" alt="image" src="https://github.com/user-attachments/assets/8231d37c-39ba-4068-8c27-77841eadf61a" />\
<img width="500" alt="image" src="https://github.com/user-attachments/assets/bf6f1f07-b3dd-4396-92e3-333393e949c9" />


- This script is compatible with base FR and my dark mode.
- The button added by the script utilizes Flight Rising's existing function, **doAddTags**, to append the ping to the quick reply textarea. This means that the ping buttons work exactly like the Bold/Italic/etc. buttons, so you can highlight an entire message and it will append it to the start, or you can place your cursor in a specific part of the text and then click the ping icon and it will insert it at that position.
- It behaves similar to the Quick Quote by immediately focusing the Quick Reply button after the ping button is clicked, but it does NOT overwrite the existing text.
