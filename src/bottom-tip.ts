import { h, diff, patch, VTree } from "virtual-dom";
import createElement from "virtual-dom/create-element";
import { nanoid } from "nanoid";

var typeTextColors = {
  ok: "#444",
  inactive: "hsla(0,0%,100%,0)",
  error: "white",
  warn: "white",
};

var typeBgColors = {
  ok: "hsl(122deg 88% 88%)",
  inactive: "#bfd8d2",
  error: "#df644a",
  warn: "#dcb239",
};

export type PanelKind = "inactive" | "ok" | "warn" | "error" | "ok~";

function panelStyle(type: PanelKind, content: string) {
  var lineCount = content.split("\n").length;
  if (type == "inactive") {
    return {
      color: typeTextColors[type],
      position: "fixed",
      bottom: 0,
      left: 0,
      maxHeight: "0%",
      height: "0px",
      width: "100%",
      overflow: "hidden",
      lineHeight: "20px",
      transitionDuration: "300ms",
      backgroundColor: typeBgColors[type],
      fontFamily: "Source Code Pro, Menlo, monospace",
      fontSize: "12px",
      boxSizing: "border-box",
      zIndex: 999999,
    };
  } else {
    return {
      color: typeTextColors[type],
      boxShadow: "0 0 8px 2px hsla(0,0%,0%,0.1)",
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      maxHeight: "calc(100% - 40px)",
      backgroundColor: typeBgColors[type],
      fontFamily: "Source Code Pro, Menlo, monospace",
      whiteSpace: "pre",
      height: `${32 + 18 * lineCount}px`,
      lineHeight: "18px",
      fontSize: "12px",
      boxSizing: "border-box",
      transitionDuration: "300ms",
      overflowX: "auto",
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

var styleContent = {
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  padding: "16px",
  overflow: "auto",
};

function contentStyle(type: PanelKind) {
  return {};
}

var _rendered = false;
var _oldTree: VTree = null;
var _rootNode: Element = null;

export function renderTip(target: HTMLDivElement, type: PanelKind, content: string) {
  // console.debug(':debug:', type, content)
  var tree = h("div", { style: panelStyle(type, content) }, [
    h("div", { style: contentStyle(type) }, []),
    h("div", { style: styleContent }, [content]),
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
      if ((event.target as any).className === "bottom-tip-close") {
        renderTip(target, "inactive", "");
      }
    });
  }
}

let mountTarget: HTMLDivElement = null;

/** ok~ tip has async task, need to check */
let _transactionTag: string = null;

export default function (type: PanelKind, content: string) {
  if (mountTarget == null) {
    mountTarget = document.createElement("div");
    document.body.append(mountTarget);
  }
  _transactionTag = nanoid();
  if (type === "ok~") {
    renderTip(mountTarget, "ok", content || "");
    let openTag = _transactionTag;
    setTimeout(() => {
      if (_transactionTag === openTag) {
        renderTip(mountTarget, "inactive", "");
      }
    }, 720);
  } else {
    renderTip(mountTarget, type, content || "");
  }
}
