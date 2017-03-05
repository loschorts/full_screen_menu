# full_screen_menu

A full screen carousel menu with date selector in React.

# Key Changes

- `util/api.js` now includes more robust error handling for unexpected API responses.
- `menu.jsx` now displays a message when the app is unable to handle the API response.
- Missing thumbnail and broadcast data no longer results in a `no games found` message, and placeholders are inserted where appropriate.
- Left and Right arrow key UX is reversed.

# To Run

**Supported Browers:** Chrome, Opera

**Controls:** Arrow Keys, Space/Enter

**Home:** http://fullscreenmenu2.surge.sh

**Non-empty:** http://fullscreenmenu2.surge.sh?date=5-20-2016

# Timeline

**Day 1**
- [x] Wireframes
- [x] Environment Configuration
- [x] Root *
- [x] API Util
- [x] OnPress Util

**Day 2**
- [x] Date util
- [x] Controls
- [x] Menu *
- [x] Thumbnail *
- [x] DateSelector *
- [x] Modal *
- [x] cursor
- [x] Cursor bug when menu not present
- [x] large thumbnails bug (band-aid)
- [x] date bug (off by one)
- [x] Testing
- [x] Styling

**Day 3**
- [x] Off-Balance Carousel bug

**Day 4**
- [x] Add Network Error Message
- [x] API broadcast contains objects where strings expected bug
- [x] API thumbnail data 404s bug
- [x] Reverse direction of menu scroll

(*) indicates React Component

# Improvements
- [ ] Cross-browser support
- [ ] Transitions
- [ ] Reduxify
- [ ] Unified Control Scheme
