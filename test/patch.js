const data = {
  title: "Finish Patch Endpoint!!!"
};

fetch('http://localhost:3000/task/6', {
  method: 'PATCH',
	headers: {
	  'Content-Type': 'application/json'
	},
	body: JSON.stringify(data)
})
.then(res => res.json() )
.then(data => console.log(`Status: ${data.status}. Message: ${data.message}`))
.catch(err => console.error('Error:', err));
