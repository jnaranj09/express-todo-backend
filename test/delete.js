fetch("http://localhost:3000/task/2", { 
  method: "DELETE",
  headers: {
	  "Accept": "application/json"
  }
})
.then(resp => resp.text())
.then(data => console.log(data))
.catch(err => console.log(err))
