document.addEventListener('DOMContentLoaded', () => {


  function useData(data) {
    document.innerHTML = data

  }

fetch('http://localhost:3000/api/v1/users')
.then(res => res.json())
.then(data => useData(data))
 
















})
