
import * as diffhtml from 'diffhtml/dist/cjs'
import hsl from 'hsl'
import {createElement, createTextElement} from './dom'

diffhtml.enableProllyfill()

var typeColorMap = {
  ok: hsl(100, 0, 90),
  error: hsl(0, 94, 80),
  warn: hsl(60, 90, 70),
  info: hsl(240, 80, 80)
}

function panelStyle(type, content) {
  var lineCount = content.split('\n').length
  if (type == 'inactive') {
    return `
    position: fixed;
    bottom: 0;
    left: 0;
    max-height: 0%;
    height: 0px ;
    width: 100%;
    overflow: hidden;
    line-height: 20px;
    transition-duration: 300ms;
    font-family: Source Code Pro, Menlo, monospace;
    font-size: 12px;
    box-sizing: border-box;
    padding: 0 16px;
    `
  } else {
    return `
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    max-height: 100%;
    padding: 16px;
    background-color: ${typeColorMap[type]};
    font-family: Source Code Pro, Menlo, monospace;
    white-space: pre;
    height: ${32 + (18 * lineCount)}px;
    line-height: 18px;
    font-size: 12px;
    box-sizing: border-box;
    transition-duration: 300ms;
    overflow: auto;
    `
  }
}

function contentStyle(type) {
  return ``
}

export function render(target, type, content) {
  // console.debug(':debug:', type, content)
  var newHTML = createElement('div', {style: panelStyle(type, content)}, [
    createElement('div', {style: contentStyle(type)}, []),
    createElement('div', {}, [
      createTextElement(content)
    ])
  ])
  diffhtml.innerHTML(target, newHTML)
}
