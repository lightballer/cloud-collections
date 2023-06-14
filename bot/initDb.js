const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("cloud-collections-bot.db");

db.run(`
  CREATE TABLE IF NOT EXISTS tokens (
    id INTEGER PRIMARY KEY,
    userId TEXT,
    token TEXT 
  )
`);

const saveToken = (userId, token) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO tokens (userId, token) VALUES (?, ?)",
      [userId, token],
      (err, res) => {
        if (err) {
          reject(err);
        }

        resolve("ok");
      }
    );
  });
};

const getToken = (userId) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM tokens WHERE userId = ?",
      userId.toString(),
      (err, row) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        if (row) {
          resolve(row?.token);
        }
        resolve(null);
      }
    );
  });
};

const deleteToken = (usedId) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM tokens WHERE userId = ?", [usedId], (err, row) => {
      if (err) {
        reject(err);
      }

      resolve("ok");
    });
  });
};

module.exports = { db, saveToken, getToken, deleteToken };
