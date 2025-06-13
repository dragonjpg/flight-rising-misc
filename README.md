# About
Miscellaneous one-off userstyles for Flight Rising.

All styles will be hosted here in this repo, and mirrors are available via my [Userstyles.World Account.](https://userstyles.world/user/meow)\
All USO Versions of these styles are considered **abandoned.**

# Style List:
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

Simple userstyle that allows you to preview outfits/skins directly in the scrying workshop or the dressing room without having to save the scry or the outfits. Outfits MUST have a marva's invisibility cloak included.

![Gif showcasing the style](https://i.postimg.cc/FKJqfMVf/quickscry.gif)

## 3. AH Sell & Item Select Popup Filter
**Last Updated:** 2025-06-13\
**Current Version:** 2.0.1\
**Install**:
- [Via Github](https://github.com/dragonjpg/flight-rising-misc/raw/refs/heads/main/item-select-filter.user.css)
- [Userstyles.World Mirror](https://userstyles.world/style/5315/flight-rising-ah-sell-item-select-popup-filter)

**Style #1:**\
![image](https://github.com/user-attachments/assets/4fa2bfe2-8e12-4647-b092-ef28633d53c0)

**Style #2:**\
![image](https://github.com/user-attachments/assets/0b04e042-3c86-4619-b103-ce1d4e0c6922)

**Works on the Following Pages:**
- Auction House Selling Pages
- Crossroads Item Attachment Selection Popup
- Message Item Attachment Selection Popup
- Baldwin Item Selection Popup

**Known Glitches:**
- Spacing issues with the Visibility option in the popups. Unsure of how to fix it.

**How it Works:**
In the site code for the area that displays the items you can list for sale, each icon also has its full name included in the code under a value called "data-name." Using a [CSS [attribute="value"] selector](https://www.w3schools.com/css/css_attribute_selectors.asp), you can use css to make a simple item filter.

**Other Notes:**
- One of the limitations of using only css is that I can't make it ignore the styling if the search has nothing in the string, so you have to disable the style when you're done searching and want to look through your items normally, and enable it again when you want to use the style to search for particular items.
