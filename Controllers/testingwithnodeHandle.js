const mysql = require("mysql");

class DBHandle {
  constructor(host, user, password, database, table) {
    this.table = table;
    this.db = mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: database,
    });
  }
  getData() {
    const sql = `SELECT * FROM ${this.table}`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  getSpecificData(id) {
    const sql = `Select * from ${this.table} WHERE id = ${id}`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  registerData(data) {
    // if (data) {
    const checkDuplication = `SELECT * From ${this.table} WHERE email = '${data.email}'`;

    return new Promise((resolve, reject) => {
      this.db.query(checkDuplication, (err, result) => {
        if (err) reject(err);
        if (result.length > 0) {
          resolve("This email address is already registered on it");
        } else {
          const sql = "INSERT INTO testingwithnode set ?";
          this.db.query(sql, data, (err, result) => {
            if (err) reject(err);
            const searchAdd = `SELECT * FROM testingwithnode WHERE id = ${result.insertId} `;

            this.db.query(searchAdd, (err, result) => {
              if (err) reject(err);
              resolve(result);
            });
          });
        }
      });
    });
    // } else {
    //   console.log("No data found");
    //   return "No data Found";
    // }
  }
  DeleteUser(id) {
    const sql = `DELETE FROM testingwithnode WHERE id = ${id}`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, (err, result) => {
        if (err) reject(err);
        resolve(`The ${id} data has been deleted successfully`);
      });
    });
  }

  updateUser(id, data) {
    const { name, email } = data;
    const sql = `UPDATE testingwithnode SET name = '${name}', email = '${email}' WHERE id=${id}`;
    return new Promise((resolve, reject) => {
      this.db.query(sql, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = DBHandle;
