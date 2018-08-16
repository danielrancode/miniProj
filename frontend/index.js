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
    let createNoteForm= document.getElementById('create-note-form')
    createNoteForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const newNoteTitle = document.getElementById('new-note-title').value
        const newNoteBody = document.getElementById('new-note-body').value
        postNote({title: newNoteTitle, body: newNoteBody, user_id:1})
        // console.log(`title: '${title}', body: '${body}', user_id:1`)
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
    let newNoteButton = `<form id="create-note-form" action="http://localhost:3000/api/v1/notes">
                          <label for="new-note-title">Title:</label>
                          <input type="text" id="new-note-title" name="new-note-title" placeholder="title">
                          <label for="new-note-body">Body:</label>
                          <input type="text" id="new-note-body" name="new-note-body" placeholder="body">
                          <input id="create-note-submit" type="submit" value="Create New Note">
                        </form>`
    // put in html
    sidebar.innerHTML = notePreviews + newNoteButton
  }

  const postNote = (noteObj) => {
    return fetch('http://localhost:3000/api/v1/notes', {
      method: "POST",
      body: JSON.stringify(noteObj),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error!!!', error))
    .then(res => console.log('Success!!!', res)).then(() => renderPage())

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
