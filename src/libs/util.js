export const setDocumentTitle = title => {
  window.document.title = title || ''
}

export const gettreelist = item => {
  let newtreelist = []
  for (let i of item) {
    if (i.children && i.children.length > 0) {
      newtreelist.push({ label: i.title, id: i.id, children: gettreelist(i.children), row: i.row })
    } else {
      newtreelist.push({ label: i.title, id: i.id })
    }
  }
  return newtreelist
}

export const TIME_STAMP = 'timeStamp'
export const TOKEN_TIMEOUT_VALUE = 1 * 3600 * 1000

export function getTimeStamp() {
  return JSON.parse(localStorage.getItem(TIME_STAMP))
}

export function setTimeStamp() {
  window.localStorage.setItem(TIME_STAMP, Date.now())
}

export function isCheckTimeout() {
  var currentTime = Date.now()

  var timeStamp = getTimeStamp()

  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
