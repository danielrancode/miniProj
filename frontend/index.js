document.addEventListener('DOMContentLoaded', () => {

    const renderMain = (e) => {
      let noteId = e.target.parentElement.dataset.noteId
      let note = notes.find(note => note.id == noteId)
      let noteContent =
      `<h3>${note.title}</h3>
      <p>${note.body}</p>
      </div>
      </div>`

      document.getElementById('main-content').innerHTML = noteContent
    }


  const sidebar =  document.getElementById('sidebar')


  const generateListeners = () => {
    sidebar.addEventListener('click', renderMain)
    let createNoteSubmit = document.getElementById('create-note-submit')
    createNoteSubmit.addEventListener('submit', (e) => {
        e.preventDefault()
        debugger
    })

  }


  const renderSidebar = () => {
    // generate note previews
    let notePreviews = notes.map(note => {
      return `<div id="note-${notes.indexOf(note)}-container" class="note-container" data-note-id="${note.id}">
      <div id="note-${notes.indexOf(note)}-preview" class="note-preview" data-note-id="${note.id}">
      <h3>${note.title}</h3>
      <p>${note.body.substr(0, 50)}...</p>
      </div>
      </div>`
      })
      .join('')

    // create new note form
    let newNoteButton = `<form id="create-note-form" action="index.html" method="post">
                          <label for="new-note-title">Title:</label>
                          <input type="text" id="new-note-title" name="new-note-title" placeholder="title">
                          <label for="new-note-body">Body:</label>
                          <input type="text" id="new-note-body" name="new-note-body" placeholder="body">
                          <input id="create-note-submit" type="submit" value="Create New Note">
                        </form>`
    // put in html
    sidebar.innerHTML = notePreviews + newNoteButton
  }


  const renderPage = () => {
    fetch('http://localhost:3000/api/v1/users')
    .then(res => res.json())
    .then(data => {
      notes = data[0].notes
    renderSidebar()
    generateListeners()
  })
}


let notes
renderPage()

})
