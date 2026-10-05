import { buildCookie } from "./cookie.js";

const LEETCODE = "https://leetcode.com";
const status = document.getElementById("status");
const copyButton = document.getElementById("copy");
const loginButton = document.getElementById("login");

// LEETCODE_SESSION is HttpOnly, so page scripts (and bookmarklets) can't see it;
// the extension cookies API can.
async function readCookie() {
  const [csrf, session] = await Promise.all(
    ["csrftoken", "LEETCODE_SESSION"].map((name) => chrome.cookies.get({ url: LEETCODE, name })),
  );
  return { value: buildCookie(csrf?.value, session?.value), expires: session?.expirationDate };
}

async function copy() {
  const { value, expires } = await readCookie();
  if (!value) {
    status.textContent = "Not signed in to leetcode.com.";
    copyButton.hidden = true;
    loginButton.hidden = false;
    return;
  }
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    status.textContent = "Couldn't write to the clipboard. Click Copy.";
    copyButton.hidden = false;
    return;
  }
  const until = expires ? ` Session valid until ${new Date(expires * 1000).toLocaleDateString()}.` : "";
  status.textContent = `Copied. In Neovim: :Leet cookie update, then paste.${until}`;
  copyButton.hidden = false;
  copyButton.textContent = "Copy again";
}

copyButton.addEventListener("click", copy);
loginButton.addEventListener("click", () => chrome.tabs.create({ url: `${LEETCODE}/accounts/login/` }));
copy();
