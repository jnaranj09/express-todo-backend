fetch("http://localhost:3000/tasks?limit=10", { 
  method: "GET",
  headers: {
	  "Accept": "application/json"
  }
})
.then(resp => resp.json())
.then(data => console.log(data))
.catch(err => console.log(err))
