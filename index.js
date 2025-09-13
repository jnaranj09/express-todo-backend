import getPublicIp from "./getIp.js";
import express from "express";
import getUpTime from "./upTime.js";
import Database from "better-sqlite3";

const port = 3000;
const app = express();
const db = new Database("../todo-db/todo.db");

app.use(express.json());

const debugToolBox = async () => {
	const statusResp = await fetch(`http://localhost:${port}/status`);
	const statusData = await statusResp.json();
	const upTime = getUpTime();
	const ipData = await getPublicIp();

	return {
		alive: statusData.alive,
		publicIp: ipData,
		port: port,
		upTimeSeconds: upTime
	};
};

app.get("/status", async (req, res) => {
	const debugEnabled = req.query.debug?.toLowerCase() === 'true';

	if (debugEnabled) {
		const debugInfo = await debugToolBox();
		res.json(debugInfo);
	} else {
		res.json({
			alive: true
		})
	}
});

app.post("/task", (req, res) => {
	const data = req.body;
	const title = data.title;
	const dueDate = data.dueDate
	if (!title) {
	return res.status(400).json({status: "400 Bad Request"});
	}

	const stmt = db.prepare('INSERT INTO tasks(title, due_date) VALUES (?, ?)');
	const info = stmt.run(title, dueDate);

	console.log(`Inserted with ID: ${info.lastInsertRowid}`);

	res.status(201).json({status: "201 Task Created"});

});

app.get("/task/:id", (req, res) => {

	const taskId = req.params.id;
	const query = db.prepare('SELECT * FROM tasks WHERE id = ?');
	const task = query.get(taskId);
	return task ? res.status(200).json(task) : res.status(404).json({error: "404 NOT FOUND"});

});

app.get("/tasks", (req, res) => {
	let tasks = [];	
	const limit = req.query.limit ? parseInt(req.query.limit) : null;
	if ( limit ) {
		const stmt = db.prepare('SELECT * FROM tasks LIMIT ?');
		tasks = stmt.all(limit);
	} else {
		const stmt = db.prepare('SELECT * FROM tasks');
		tasks = stmt.all();
	}
	
	res.status(200).json(tasks);
});

app.delete("/task/:id", (req, res) => {
	const taskId = parseInt(req.params.id);

	if ( Number.isNaN(taskId) ) {
		return res.status(400).send("bad request");
	}
	
	const stmt = db.prepare('DELETE FROM tasks WHERE id = ?');
	stmt.run(taskId);
	res.status(204).send();
});

app.patch("/task/:id", (req, res) => {
	const taskId = parseInt(req.params.id);
	const validFields = ['title', 'completed', 'dueDate'];
	const reqFields = Object.keys(req.body).filter( f => validFields.includes(f));
	if ( reqFields.length === 0 ) {
	  return res.status(400).json({status: "400 Bad Request", message: "No valid fields provided"});
	}
	const setClause = reqFields.map(f => `${f === 'dueDate' ? 'due_date' : f} = @${f}`).join(', ');
	
	const stmt = db.prepare(`UPDATE tasks SET ${setClause} WHERE id = @id`);
	
	const stmtParams = {
	  ...req.body,
	  id: taskId
	};
	
  const result = stmt.run(stmtParams);
  
  if ( result.changes === 0 ) {
    return res.status(404).json({status: "404 Not Found", message: `No task with id=${taskId} found in the database`});
  }
	
	return res.status(200).json({status: "200 Ok", message: ""});
});


app.put("/task/:id", (req, res) => {

    const taskId = parseInt(req.params.id);
    


});

app.listen(port, () => {
	console.log(`Server started at port ${port}`);
	db.exec(`
		CREATE TABLE IF NOT EXISTS tasks (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			title TEXT NOT NULL,
			completed INTEGER DEFAULT 0,
			due_date DATETIME
		)
	`);
});
