document.addEventListener('DOMContentLoaded', () => {

  // API paths
  const usersUrl = 'http://localhost:3000/api/v1/users'
  const notesUrl = 'http://localhost:3000/api/v1/notes'
  const noteUrl = id => `${notesUrl}/${id}`

  // HTML elements
  const sidebar =  document.getElementById('sidebar')
  const mainContent = document.getElementById('main-content')

  const getNote = (id, callback) => {
    let note
    return fetch(noteUrl(id))
    .then(res => res.json())
    .catch(error => console.error('Error', error))
    .then(data => {
    return callback(data)
  })
  }

  const callApi = (call) => {
    return call.then(res => res.json())
    .catch(error => console.error('Error', error))
    .then(res => console.log('Success', res)).then(() => renderPage())
  }

  const post = (note) => {
    return fetch(notesUrl, {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const update = (note) => {
    return fetch(noteUrl(note.id), {
      method: "PATCH",
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const deleteNote = (noteId) => {
    return fetch(noteUrl(noteId), {
      method: "DELETE"
    })
  }

  const renderEditNoteForm = (note) => {
    let mainContent = document.getElementById('main-content')
    mainContent.innerHTML = `<form id="edit-note-form" action="${noteUrl(note.id)}">
                          <label for="edit-note-title">Title:</label>
                          <input type="text" id="edit-note-title" name="edit-note-title" value="${note.title}">
                          <label for="edit-note-body">Body:</label>
                          <input type="text" id="edit-note-body" name="edit-note-body" value="${note.body}">
                          <input id="edit-note-submit" type="submit" value="Update Note">
                        </form>`

    let editNoteForm = document.getElementById('edit-note-form')
    editNoteForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const noteTitle = document.getElementById('edit-note-title').value
        const noteBody = document.getElementById('edit-note-body').value
        callApi(update({id: note.id, title: noteTitle, body: noteBody, user_id:1}))
    })
  }

    const renderMain = (e = null) => {
      if (e == null) {
        mainContent.innerHTML = ''
      } else if (e.target.className == 'edit-note-button') {
        let noteId = e.target.parentElement.dataset.noteId
        getNote(noteId, renderEditNoteForm)
      } else if (e.target.className == 'delete-note-button') {
        let noteId = e.target.parentElement.dataset.noteId
        console.log(e.target.parentElement.dataset)
        getNote(noteId, callApi(deleteNote(noteId)))
        // document.getElementById('delete-note-button').addEventListener('click', deleteNote)
      } else {
        let noteId = e.target.parentElement.dataset.noteId
        let note = notes.find(note => note.id == noteId)
        let noteContent =
        `<div data-note-id="${note.id}"> <h3>${note.title}</h3>
        <p>${note.body}</p>
        </div>
        `
        mainContent.innerHTML = noteContent
      }
    }

  const generateListeners = () => {
    sidebar.addEventListener('click', renderMain)
    let createNoteForm = document.getElementById('create-note-form')
    createNoteForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const newNoteTitle = document.getElementById('new-note-title').value
        const newNoteBody = document.getElementById('new-note-body').value
        callApi(post({title: newNoteTitle, body: newNoteBody, user_id:1}))
        // postNote({title: newNoteTitle, body: newNoteBody, user_id:1})
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
      <button class="delete-note-button" type="button">Delete</button>
      </div>
      </div>`
      })
      .join('')

    // create new note form
    let createNoteForm = `<form id="create-note-form" action="${notesUrl}">
                          <label for="new-note-title">Title:</label>
                          <input type="text" id="new-note-title" name="new-note-title" placeholder="title">
                          <label for="new-note-body">Body:</label>
                          <input type="text" id="new-note-body" name="new-note-body" placeholder="body">
                          <input id="create-note-submit" type="submit" value="Create New Note">
                        </form>`
    // put in html
    sidebar.innerHTML = notePreviews + createNoteForm
  }

  const renderPage = () => {
    fetch(usersUrl)
    .then(res => res.json())
    .then(data => {
      notes = data[0].notes
    renderSidebar()
    renderMain()
    generateListeners()
  })
}

let notes
renderPage()

})
