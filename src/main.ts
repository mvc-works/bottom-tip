import renderBottomTip, { PanelKind } from "./bottom-tip";
import { renderControl } from "./control";

import "./draft";

var typeRef: PanelKind = "ok";
var contentRef = "default debug content";

function makeInactive() {
  typeRef = "inactive";
  displayMsg();
}

var displayMsg = function() {
  renderBottomTip(typeRef, contentRef || null);
};

function makeOk() {
  typeRef = "ok";
  contentRef = "Ok";
  displayMsg();
}

function makeOkPop() {
  typeRef = "ok~";
  contentRef = "Ok";
  displayMsg();
}

function makeWarn() {
  typeRef = "warn";
  contentRef = "this is \n a warning";
  displayMsg();
}

function makeError() {
  typeRef = "error";
  contentRef = "this is \n an error, and \n it is \n long \nin \nmultiple lines";
  displayMsg();
}

var oldWarn = console.warn;
var oldError = console.error;
console.warn = function(...args) {
  oldWarn(...args);
  typeRef = "warn";
  contentRef = args.join("\n");
  displayMsg();
};
console.error = function(...args) {
  oldError(...args);
  typeRef = "error";
  contentRef = args.join("\n");
  displayMsg();
};

let container;

window.addEventListener("load", function(event) {
  container = document.querySelector("#container");
  renderControl(container, makeInactive, makeOk, makeOkPop, makeWarn, makeError);
  displayMsg();
});

if ((import.meta as any).hot) {
  (import.meta as any).hot.accept("./bottom-tip", function() {
    displayMsg();
    console.log("should accept");
  });

  (import.meta as any).hot.accept("./control", function() {
    renderControl(container, makeInactive, makeOk, makeOkPop, makeWarn, makeError);
  });

  (import.meta as any).hot.accept("./draft", function() {
    console.log("handling draft");
  });
}
