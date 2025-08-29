import getPublicIp from "./getIp.js";
import express from "express";
import getUpTime from "./upTime.js";

const tasks = [];

let taskId = 0;
const port = 3000;
const app = express();

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
	if (!title || !dueDate) {
	return res.status(400).json({status: "400 Bad Request"});
	}

	tasks.push({id: taskId++, title: title, dueDate: dueDate});
	res.status(201).json({status: "201 Task Created"});

});

app.get("/tasks", (req, res) => {
	res.status(200).json(tasks);
});

app.listen(port, () => {
	console.log(`Server started at port ${port}`);
});
