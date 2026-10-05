// Builds the string `:Leet cookie update` parses (see lua/leetcode/cache/cookie.lua):
// it only needs `csrftoken=...` and `LEETCODE_SESSION=...`.
export function buildCookie(csrftoken, session) {
  if (!csrftoken || !session) {
    return null;
  }
  return `csrftoken=${csrftoken}; LEETCODE_SESSION=${session}`;
}
