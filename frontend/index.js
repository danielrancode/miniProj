document.addEventListener('DOMContentLoaded', () => {

  const deleteNote = (e) => {
    let noteId = e.target.parentElement.dataset.noteId
    fetch(`http://localhost:3000/api/v1/notes/${noteId}`, {
      method: "DELETE"
    }).then(res => res.json())
    .catch(error => console.error('Error...', error))
    .then(res => console.log(res)).then(() => renderPage())

  }

  const getNote = (id, callback) => {
    let note
    return fetch(`http://localhost:3000/api/v1/notes/${id}`)
    .then(res => res.json())
    .catch(error => console.error('Error!!!', error))
    .then(data => {
    console.log('Success!!!')
    return callback(data)
  })
  }

  const renderEditNoteForm = (note) => {
    console.log(note.id)
    console.log(note.title)
    console.log(note.body)
    console.log(note.user.name)
    console.log(note.user.id)
    let mainContent = document.getElementById('main-content')
    mainContent.innerHTML = `<form id="edit-note-form" action="http://localhost:3000/api/v1/notes/${note.id}">
                          <label for="edit-note-title">Title:</label>
                          <input type="text" id="edit-note-title" name="edit-note-title" placeholder="title">
                          <label for="edit-note-body">Body:</label>
                          <input type="text" id="edit-note-body" name="edit-note-body" placeholder="body">
                          <input id="edit-note-submit" type="submit" value="Update Note">
                        </form>`
    // put in html
  }

    const renderMain = (e = null) => {
      let mainContent = document.getElementById('main-content')
      if (e == null) {
        mainContent.innerHTML = ''
      } else if (e.target.className == 'edit-note-button') {
        let noteId = e.target.parentElement.dataset.noteId
        console.log(noteId)
        // mainContent.innerHTML =
        getNote(noteId, renderEditNoteForm)
      } else {
        let noteId = e.target.parentElement.dataset.noteId
        let note = notes.find(note => note.id == noteId)
        let noteContent =
        `<div data-note-id="${note.id}"> <h3>${note.title}</h3>
        <p>${note.body}</p>
        <button id="delete-note-button" type="button">Delete Note</button>
        </div>
        `
        mainContent.innerHTML = noteContent
        document.getElementById('delete-note-button').addEventListener('click', deleteNote)
      }
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
    })
  }


  const renderSidebar = () => {
    // generate note previews
    let notePreviews = notes.map(note => {
      return `<div id="note-${notes.indexOf(note)}-container" class="note-container" data-note-id="${note.id}">
      <div id="note-${notes.indexOf(note)}-preview" class="note-preview" data-note-id="${note.id}">
      <h3>${note.title}</h3>
      <p>${note.body.substr(0, 50)}...</p>
      <button class="edit-note-button" type="button">Edit</button>
      </div>
      </div>`
      })
      .join('')

    // create new note form
    let createNoteForm = `<form id="create-note-form" action="http://localhost:3000/api/v1/notes">
                          <label for="new-note-title">Title:</label>
                          <input type="text" id="new-note-title" name="new-note-title" placeholder="title">
                          <label for="new-note-body">Body:</label>
                          <input type="text" id="new-note-body" name="new-note-body" placeholder="body">
                          <input id="create-note-submit" type="submit" value="Create New Note">
                        </form>`
    // put in html
    sidebar.innerHTML = notePreviews + createNoteForm
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
    renderMain()
    generateListeners()
  })
}

let noteGlobal
let notes
renderPage()

})
