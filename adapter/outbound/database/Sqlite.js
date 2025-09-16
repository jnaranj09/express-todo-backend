import Database from "better-sqlite3";

const dbName = "./TaskManager.db";
const db = new Database(dbName);

db.exec(`
		CREATE TABLE IF NOT EXISTS tasks (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			title TEXT NOT NULL,
			completed INTEGER DEFAULT 0,
			due_date DATETIME
		)
	`);
	
	export default db;