
import h from 'virtual-dom/h'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'
import hsl from 'hsl'

var _rendered = false
var _oldTree = null

export function renderControl(target, makeInactive, makeOk, makeWarn, makeError) {

  var tree = h('div', {}, [
    h('button', {onclick: makeInactive}, ['inactive']),
    h('button', {onclick: makeOk}, ['ok']),
    h('button', {onclick: makeWarn}, ['warn']),
    h('button', {onclick: makeError}, ['error'])
  ])

  if (_rendered) {
    var patches = diff(_oldTree, tree)
    target = patch(target, patches)
    _oldTree = tree
  } else {
    var rootNode = createElement(tree)
    target.appendChild(rootNode)
    _oldTree = tree
    _rendered = true
  }

}
