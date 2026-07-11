import seedCopy from "../data/siteCopy";

// The admin CMS is gone; copy is static again. Keep the hook shape so
// components don't care where copy comes from.
export function usePageCopy(page) {
  return { c: seedCopy[page] || {}, loading: false };
}
