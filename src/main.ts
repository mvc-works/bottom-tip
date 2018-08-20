import { renderTip } from "./bottom-tip";
import { renderControl } from "./control";

import "./draft";

var typeRef = "ok";
var contentRef = "default debug content";
var displayTarget = document.createElement("div");

function makeInactive(content) {
  typeRef = "inactive";
  displayMsg();
}

var displayMsg = function() {
  renderTip(displayTarget, typeRef, contentRef);
};

function makeOk(content) {
  typeRef = "ok";
  contentRef = "ok";
  displayMsg();
}

function makeWarn(content) {
  typeRef = "warn";
  contentRef = "this is \n a warning";
  displayMsg();
}

function makeError(content) {
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
  renderControl(container, makeInactive, makeOk, makeWarn, makeError);
  document.body.appendChild(displayTarget);
  displayMsg();
});

declare var module: any;

if (module.hot) {
  module.hot.accept("./bottom-tip", function() {
    displayMsg();
    console.log("should accept");
  });

  module.hot.accept("./control", function() {
    renderControl(container, makeInactive, makeOk, makeWarn, makeError);
  });

  module.hot.accept("./draft", function() {
    console.log("handling draft");
  });
}
