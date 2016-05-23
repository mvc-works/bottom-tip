
import * as diffhtml from 'diffhtml/dist/cjs'
import hsl from 'hsl'
import {createElement, createTextElement} from './dom'

diffhtml.enableProllyfill()

export function renderControl(target, makeInactive, makeOk, makeWarn, makeError) {
  var controlPanel = createElement('div', {}, [
    createElement('button', {onclick: makeInactive}, [
      createTextElement('inactive')
    ]),
    createElement('button', {onclick: makeOk}, [
      createTextElement('ok')
    ]),
    createElement('button', {onclick: makeWarn}, [
      createTextElement('warn')
    ]),
    createElement('button', {onclick: makeError}, [
      createTextElement('error')
    ])
  ])

  diffhtml.innerHTML(target, controlPanel)
}
