const data = {
	title: "jugar",  
	dueDate: "12-04-2025",
	completed: 0
};

fetch('http://localhost:3000/task/1', {
	          method: 'PUT',
	          headers: {
		    'Content-Type': 'application/json'
		  },
	          body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => console.log(data))
.catch(err => console.error('Error:', err));
