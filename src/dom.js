
export const createElement = (tagName, attributes, childNodes) => ({
  uuid: String(Math.floor(Math.random() * Date.now())),
  nodeName: tagName.toLowerCase(),
  nodeType: 1,
  nodeValue: '',
  attributes: Object.keys(attributes || []).map(
    keyName => ({
      name: keyName,
      value: attributes[keyName]
    })
  ),
  childNodes: childNodes || [],
})

export const createTextElement = value => ({
  uuid: String(Math.floor(Math.random() * Date.now())),
  nodeName: '#text',
  nodeType: 3,
  nodeValue: value,
  key: '',
  attributes: [],
  childNodes: [],
})
