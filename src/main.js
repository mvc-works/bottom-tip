
var renderTip = require('./bottom-tip').renderTip
var renderControl = require('./control').renderControl
require('./draft')

var typeRef = 'ok'
var contentRef = 'default debug content'
var displayTarget = document.createElement('div')

var displayMsg = function() {
  renderTip(displayTarget, typeRef, contentRef)
}

function makeInactive(content) {
  typeRef = 'inactive'
  displayMsg()
}

function makeOk(content) {
  typeRef = 'ok'
  contentRef = 'ok'
  displayMsg()
}

function makeWarn(content) {
  typeRef = 'warn'
  contentRef = 'this is \n a warning'
  displayMsg()
}

function makeError(content) {
  typeRef = 'error'
  contentRef = 'this is \n an error, and \n it is \n long'
  displayMsg()
}

var oldWarn = console.warn
var oldError = console.error
console.warn = function(...args) {
  oldWarn(...args)
  typeRef = 'warn'
  contentRef = args.join('\n')
  displayMsg()
}
console.error = function(...args) {
  oldError(...args)
  typeRef = 'error'
  contentRef = args.join('\n')
  displayMsg()
}

window.addEventListener('load', function(event){
  var container = document.querySelector('#container')
  renderControl(container, makeInactive, makeOk, makeWarn, makeError)
  document.body.appendChild(displayTarget)
  displayMsg()
})

if (module.hot) {
  module.hot.accept('./bottom-tip', function() {
    render = require('./bottom-tip').render
    displayMsg()
    console.log('should accept')
  })

  module.hot.accept('./control', function() {
    renderControl = require('./control').renderControl
    renderControl(container, makeInactive, makeOk, makeWarn, makeError)
  })

  module.hot.accept('./draft', function() {
    console.log('handling draft')
    require('./draft')
  })
}
