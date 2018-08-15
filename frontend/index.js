document.addEventListener('DOMContentLoaded', () => {

    const renderMain = (e) => {
      let noteId = e.target.parentElement.dataset.noteId
      let note = notes.find(note => note.id == noteId)
      let noteContent = `<h3>${note.title}</h3>
      <p>${note.body}</p>
      </div>
      </div>`

      document.getElementById('main-content').innerHTML = noteContent
    }


  const sidebar =  document.getElementById('sidebar')


  const generateListeners = () => {
    sidebar.addEventListener('click', renderMain)
  }


  const renderSidebar = (notes) => {
    let newHTML = notes.map(note => {
      return `<div id="note-${notes.indexOf(note)}-container" class="note-container" data-note-id="${note.id}">
      <div id="note-${notes.indexOf(note)}-preview" class="note-preview" data-note-id="${note.id}">
      <h3>${note.title}</h3>
      <p>${note.body.substr(0, 50)}...</p>
      </div>
      </div>`
      })
      .join('')

    sidebar.innerHTML = newHTML
  }


  const renderPage = () => {
    fetch('http://localhost:3000/api/v1/users')
    .then(res => res.json())
    .then(data => {
      notes = data[0].notes
    renderSidebar(notes)
    generateListeners()
  })
}


let notes
renderPage()

})
