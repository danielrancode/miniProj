document.addEventListener('DOMContentLoaded', () => {



  // API paths
  const usersUrl = 'http://localhost:3000/api/v1/users'
  const notesUrl = 'http://localhost:3000/api/v1/notes'
  const noteUrl = id => `${notesUrl}/${id}`

  // HTML elements
  const sidebar =  document.getElementById('sidebar')
  const notePreviewsDisplay = document.getElementById('note-previews')
  const mainContent = document.getElementById('main-content')


  function renderPage() {
    fetchAllNotes(displayNotePreviews)
    mainDisplay()
    generateListeners()
  }

  function fetchAllNotes(callback) {
    fetch(notesUrl).then(res => res.json()).then(callback)
  }

  function displayNotePreviews(notes) {
    notePreviewsDisplay.innerHTML = notes.reverse().map(note =>
      `<div id="note-${notes.indexOf(note)}-container" class="note-container" data-note-id="${note.id}">
          <div id="note-${notes.indexOf(note)}-preview" class="note-preview" data-note-id="${note.id}">
            <h3>${note.title}</h3>
            <p>${note.body.substr(0, 50)}...</p>
            <button class="edit-note-button" type="button">Edit</button>
            <button class="delete-note-button" type="button">Delete</button>
          </div>
        </div>`)
      .join('')
  }


  function mainDisplay(e) {
    if (!e) {
      mainContent.innerHTML = ''
    } else {
        let id = e.target.parentElement.dataset.noteId
        if (e.target.className == 'edit-note-button') {
            getNote(id, renderEditNoteForm)
        } else if (e.target.className == 'delete-note-button') {
            getNote(id, callApi(deleteNote(id)))
        } else {
            getNote(id, (note) => {
              mainContent.innerHTML = `
              <div data-note-id="${note.id}">
                <h3>${note.title}</h3>
                <p>${note.body}</p>
              </div>
              `})
        }
    }
  }


  function getNote(id, callback) {
    return fetch(`${notesUrl}/${id}`).then(res => res.json()).catch(error => console.error('Error', error)).then(callback)
  }

  function callApi(call) {
    return call.then(res => res.json()).catch(error => console.error('Error', error)).then(res => console.log('Success', res)).then(() => renderPage())
  }

  function post(note) {
    return fetch(notesUrl, {method: "POST", body: JSON.stringify(note), headers: {'Content-Type': 'application/json'}})
  }

  function update(note) {
    return fetch(`${notesUrl}/${note.id}`, {method: "PATCH", body: JSON.stringify(note), headers: {'Content-Type': 'application/json'}})
  }

  function deleteNote(id) {
    return fetch(`${notesUrl}/${id}`, {method: "DELETE"})
  }

  function renderEditNoteForm(note) {
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



  const generateListeners = () => {
    sidebar.addEventListener('click', mainDisplay)
    let createNoteForm = document.getElementById('create-note-form')
    createNoteForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const newNoteTitle = document.getElementById('new-note-title').value
        const newNoteBody = document.getElementById('new-note-body').value
        callApi(post({title: newNoteTitle, body: newNoteBody, user_id:1}))
        // postNote({title: newNoteTitle, body: newNoteBody, user_id:1})
    })
  }

  renderPage()


})
