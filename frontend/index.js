document.addEventListener('DOMContentLoaded', () => {


  function renderSidebar(data) {

    let notes = data[0].notes

    let newHTML = notes.map(note => {
      return `<div id="note-${notes.indexOf(note)}-container" class="note-container">
      <div id="note-${notes.indexOf(note)}-preview" class="note-preview">
      <h3>${note.title}</h3>
      <p>${note.body.substr(0, 50)}...</p>
      </div>
      </div>
      `
    }).join('')
    console.log(newHTML)

    document.getElementById('sidebar').innerHTML = newHTML
  }

  function renderPage(data) {

    renderSidebar(data)

  }

fetch('http://localhost:3000/api/v1/users')
.then(res => res.json())
.then(data => renderPage(data))











})
