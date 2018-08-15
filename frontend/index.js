document.addEventListener('DOMContentLoaded', () => {


  function useData(data) {
    console.log(data)

  }

fetch('http://localhost:3000/api/v1/users')
.then(res => res.json())
.then(data => useData(data))

















})
