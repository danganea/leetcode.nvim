# leetcode.nvim cookie helper (Chrome)

One click copies your leetcode.com session cookie in the format `:Leet cookie update`
expects, instead of digging the `Cookie` request header out of DevTools.

A bookmarklet can't do this: `LEETCODE_SESSION` is an HttpOnly cookie, invisible to
page JavaScript. An extension can read it through `chrome.cookies`.

## Install

1. Open `chrome://extensions` and turn on **Developer mode** (top right).
2. **Load unpacked** and pick this `contrib/chrome-cookie` folder.
3. Pin it from the puzzle-piece menu so the icon stays in the toolbar.

## Use

1. Be signed in to leetcode.com in Chrome.
2. Click the extension icon. The cookie is now on your clipboard.
3. In Neovim: `:Leet cookie update` (or "Sign in (By Cookie)" in the `:Leet` menu), paste, Enter.

## What it can access

Only cookies for `https://leetcode.com` (`cookies` + that one host permission), and
clipboard write. It makes no network requests and stores nothing. The whole thing is
`popup.js` and `cookie.js`.

The copied text is a live session, as good as your password for LeetCode, so don't
paste it anywhere else.
