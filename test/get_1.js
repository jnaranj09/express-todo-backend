fetch("http://localhost:3000/task/7", { 
  method: "GET",
  headers: {
	  "Accept": "application/json"
  }
})
.then(resp => resp.json())
.then(data => console.log(data))
.catch(err => console.log(err))
