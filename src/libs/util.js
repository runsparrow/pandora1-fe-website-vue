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
