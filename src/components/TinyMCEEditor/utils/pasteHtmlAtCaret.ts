export const pasteHtmlAtCaret = (ctx: Window, html: string) => {
  let sel, range;
  if (ctx.getSelection) {
    sel = ctx.getSelection();
    if (sel && sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();
      const el = document.createElement('div');
      el.innerHTML = html;
      let frag = document.createDocumentFragment(),
        node,
        lastNode;
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);
      if (lastNode) {
        range = range.cloneRange();
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }
};
