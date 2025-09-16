const data = {
	  title: "ir al ebais",
	  dueDate: "equisde"
};

fetch('http://localhost:3000/task', {
	  method: 'POST',
	  headers: {
		      'Content-Type': 'application/json'
		    },
	  body: JSON.stringify(data)
})
.then(res => res.json())
.then(response => console.log('Response:', response))
.catch(err => console.error('Error:', err));

