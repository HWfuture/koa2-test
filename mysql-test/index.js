const mysql = require('mysql')

const con = mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'123456',
    database:'blog'
})

con.connect( (err) => {
    if(err){
        console.log(err)
    }
})

const sql = 'select * from users'

con.query(sql, (err, result) => {
    if(err){
        console.error(err)
        return
    }
    console.log(result)
})

con.end()

