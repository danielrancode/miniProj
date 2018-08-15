document.addEventListener('DOMContentLoaded', () => {


  function useData(data) {

    let notes = data[0].notes

    let newHTML = notes.map(note => {
      return `<div id="note-${notes.indexOf(note)}-container">
      <div id="note-${notes.indexOf(note)}-preview">
      <h3>${note.title}</h3>
      <h6>${note.body}</h6>
      </div>
      `
    }).join('')
    console.log(newHTML)

    document.body.innerHTML = newHTML
    // document.body.innerHTML = data[0].notes[0].title

  }

fetch('http://localhost:3000/api/v1/users')
.then(res => res.json())
.then(data => useData(data))











})
