import h from "virtual-dom/h";
import diff from "virtual-dom/diff";
import patch from "virtual-dom/patch";
import createElement from "virtual-dom/create-element";
import hsl from "hsl";

var typeColorMap = {
  ok: "#fedcd2",
  inactive: "#bfd8d2",
  error: "#df744a",
  warn: "#dcb239",
};

function panelStyle(type, content) {
  var lineCount = content.split("\n").length;
  if (type == "inactive") {
    return {
      color: "white",
      position: "fixed",
      bottom: 0,
      left: 0,
      maxHeight: "0%",
      height: "0px",
      width: "100%",
      overflow: "hidden",
      lineHeight: "20px",
      transitionDuration: "300ms",
      backgroundColor: typeColorMap[type],
      fontFamily: "Source Code Pro, Menlo, monospace",
      fontSize: "12px",
      boxSizing: "border-box",
      padding: "0 16px",
      zIndex: 999999,
    };
  } else {
    return {
      color: "white",
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      maxHeight: "100%",
      padding: "16px",
      backgroundColor: typeColorMap[type],
      fontFamily: "Source Code Pro, Menlo, monospace",
      whiteSpace: "pre",
      height: `${32 + 18 * lineCount}px`,
      lineHeight: "18px",
      fontSize: "12px",
      boxSizing: "border-box",
      transitionDuration: "300ms",
      overflow: "auto",
      zIndex: 999999,
    };
  }
}

var styleClose = {
  position: "absolute",
  top: "8px",
  right: "8px",
  fontSize: "20px",
  fontWeight: "100",
  cursor: "pointer",
  userSelect: "none",
};

function contentStyle(type) {
  return {};
}

var _rendered = false;
var _oldTree = null;
var _rootNode = null;

export function renderTip(target, type, content) {
  // console.debug(':debug:', type, content)
  var tree = h("div", { style: panelStyle(type, content) }, [
    h("div", { style: contentStyle(type) }, []),
    h("div", {}, [content]),
    h("div", { style: styleClose, className: "bottom-tip-close" }, ["×"]),
  ]);
  if (_rendered) {
    var patches = diff(_oldTree, tree);
    _rootNode = patch(_rootNode, patches);
    _oldTree = tree;
  } else {
    _rootNode = createElement(tree);
    target.appendChild(_rootNode);
    _oldTree = tree;
    _rendered = true;

    // bind close event
    _rootNode.addEventListener("click", (event) => {
      if (event.target.className === "bottom-tip-close") {
        renderTip(target, "inactive", "");
      }
    });
  }
}
