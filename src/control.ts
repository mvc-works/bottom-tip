import { h, diff, patch } from "virtual-dom";
import createElement from "virtual-dom/create-element";

var _rendered = false;
var _oldTree = null;

export function renderControl(
  target: HTMLDivElement,
  makeInactive: () => void,
  makeOk: () => void,
  makeOkPop: () => void,
  makeWarn: () => void,
  makeError: () => void
) {
  var tree = h("div", {}, [
    h("button", { onclick: makeInactive }, ["inactive"]),
    h("button", { onclick: makeOk }, ["ok"]),
    h("button", { onclick: makeOkPop }, ["ok~"]),
    h("button", { onclick: makeWarn }, ["warn"]),
    h("button", { onclick: makeError }, ["error"]),
  ]);

  if (_rendered) {
    var patches = diff(_oldTree, tree);
    target = patch(target, patches);
    _oldTree = tree;
  } else {
    var rootNode = createElement(tree);
    target.appendChild(rootNode);
    _oldTree = tree;
    _rendered = true;
  }
}
