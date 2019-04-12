var mysql = require('mysql');
var operations = require('./operations');

var connection = mysql.createConnection({
    host     : 'remotemysql.com',
    user     : 'UwpIckRvEY',
    password : 'TrmVB8NUIC',
    database : 'UwpIckRvEY',
    port:3306
});

function connectDB() {
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        console.log('connected as id ' + connection.threadId);
    });

}


function checkUser(userid,cb){
    operations.checkUser(connection,userid ,function (err,data) {
        cb(err,data) ;
    })
}


function checkAdmin(userid,cb){
    operations.checkAdmin(connection,userid ,function (err,data) {
        cb(err,data) ;
    })
}

function fetchUsers(cb){
    operations.fetchUsers(connection,function (err,data) {
        cb(err,data) ;
    })
}
function fetchBooks(cb){
    operations.fetchBooks(connection,function (err,data) {
        cb(err,data) ;
    })
}
function fetchBooks1(available,cb){
    operations.fetchBooks1(connection , available ,function (err,data) {
        cb(err,data) ;
    })
}
function fetchBooks2(category,cb){
    operations.fetchBooks2(connection,category,function (err,data) {
        cb(err,data) ;
    })
}
function fetchBooks3(name,cb){
    operations.fetchBooks3(connection,name, function (err,data) {
        cb(err,data) ;
    })
}
function createUser(userid,password,name,cb){
    operations.createUser(connection,userid,password,name,function (err,data) {
        cb(err,data) ;
    })
}
function issueBook(userid,isbn,cb){
    operations.issueBook(connection,userid,isbn,function (err,data) {
        cb(err,data) ;
    })
}
function fetchFine(userid,cb){
    operations.fetchFine(connection,userid,function (err,data) {
        cb(err,data) ;
    })
}
function addBook(isbn,name,author,category,cb){
    operations.addBook(connection,isbn,name,author,category,function (err,data) {
        cb(err,data)
    })
}
function returnBook(isbn,userid,cb){
    operations.returnBook(connection,userid,isbn,function (err,data) {
        cb(err,data)
    })
}
function calFine(isbn,cb) {
    operations.calFine(connection,isbn,function (err,data) {
        cb(err,data)
    })
}
module.exports={
    connectDB,
    createUser,
    checkUser,
    checkAdmin,
    fetchUsers,
    fetchBooks,
    fetchBooks1,
    fetchBooks2,
    fetchBooks3,
    issueBook,
    fetchFine,
    addBook,
    returnBook,
    calFine
}