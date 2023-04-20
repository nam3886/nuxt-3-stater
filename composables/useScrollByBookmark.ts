export function useScrollByBookmark() {
  function scrollTo(id: string) {
    const el = document.createElement('a');
    el.href = id;
    document.body.appendChild(el);
    el.click();
    el.remove();
  }

  return { scrollTo };
}
