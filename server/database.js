/* Требуемые функции
addToEvent - добавление человека в список участников
addToParticipants - добавление участников в группу
getUserInEvent - получение списка участников мероприятия
getUserInGroup - получение списка участников в определенной группе
getInfoWithId - Получение информации из определенной таблице по id
getColumn - получение массива данных из колонки в определнной таблице
updateRole - изменение роли
*/
const sqlite3 = require("sqlite3").verbose()
class database{
    constructor(name_db) {
        this.name_db=name_db
        this.db = this.connection()
        this.create_db()
    }

    create_db () {
        this.db.run(`
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            name TEXT,
            email TEXT,
            phone TEXT,
            password TEXT,
            role TEXT
          )`, (err) => {
            if (err) {
            console.error(err.message+" in create_db users");
            }})
    }

    addUser (data) {
        const allTable = this.getAll("users")
        allTable.then(rows => {
            let id = rows.length+1
            this.db.run(`INSERT INTO users VALUES (
                "${id}",
                "${data.name}",
                "${data.mail}",
                "${data.phone}",
                "${data.password}",
                "user"
            )`)
        })
    }

    NewOrganizator (IdUser, NameEvent) {
        this.db.run(`
        CREATE TABLE IF NOT EXISTS ${NameEvent}_participants (
            id INTEGER PRIMARY KEY, 
            name TEXT,
            tg_contact TEXT,
            phone TEXT,
            email TEXT,
            age TEXT,
            team TEXT
        )`, (err) => {
            if (err) {
            console.error(err.message+" in create_db participants");
            }})
        
          this.db.run(`
          CREATE TABLE IF NOT EXISTS ${NameEvent}_organizers (
            id INTEGER PRIMARY KEY, 
            name TEXT,
            tg_contact TEXT,
            phone TEXT,
            email TEXT,
            password TEXT,
            age TEXT,
            event TEXT,
            control_groups TEXT
          )`, (err) => {
            if (err) {
            console.error(err.message+" in create_db organizers");
            }})

            
    }


    connection (){
        const db = new sqlite3.Database('./database/'+this.name_db+'.sqlite', (err) => {
            if (err) {
            console.error(err.message);
            }
            else {console.log('Connected to the database this name:'+this.name_db);
        }});
        return db
    }

    getAll(name_table) {
        // const item, set_item=
        return new Promise((resolve, reject) => {
          this.db.all(`SELECT * FROM ${name_table}`, (err, rows) => {
            if (err) {
              reject(err);
              console.log(err)
            } else {
              resolve(rows);
              
            }
          });
        }); 
      }
}
new database(name_db="db")
// const d = 
// q = d.addUser({
//     mail:"email2",
//     password:"pass",
//     role:"user"
// })
// new database(name_db="db")
module.exports = database;
