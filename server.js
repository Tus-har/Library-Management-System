const express = require('express');
const app = express();
const database = require('./database');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/',express.static('login'));

app.post('/checkUser', function(req,res) {


    database.checkUser(req.body.userid ,function(err,data) {
        if(err) {
            throw err
        }
        else if(data[0]===undefined) {
            res.send('userid not available')
        }
        else if(data[0].pasword===req.body.pwd) {
            res.send('index1.html')
        }
        else {
            res.send('Incorrect Password')
        }

    });

});



app.post('/checkAdmin', function(req,res) {


    database.checkAdmin(req.body.userid ,function(err,data) {
        if(err) {
            throw err
        }
        else if(data[0]==undefined) {
            res.send('userid not available')
        }
        else if(data[0].pasword===req.body.pwd) {
            res.send('Correct Password for'+data[0].Name)
        }
        else {
            res.send('Incorrect Password')
        }

    });

});


app.post('/createUser', function(req,res) {


    database.createUser(req.body.userid,req.body.pwd,req.body.userName ,function(err,data) {
        if(err) {
            throw err
        }
        else if(data=='already_in_use') {
            res.send('userid is already in use')
        }
        else {
            res.send('User Created')
        }

    });

});


app.post('/fetchUsers', function(req,res) {


    database.fetchUsers(function(err,data) {
        if(err) {
            throw err
        }
        else if(data[0]===undefined) {
            res.send('No users available')
        }
        else {
            res.send(data)
        }

    });

});

app.post('/fetchBooks', function(req,res) {

    database.fetchBooks(function(err,data) {
        if(err) {
            throw err
        }
        else if(data[0]===undefined) {
            res.send('No Books available')
        }
        else {
            res.send(data)
        }

    });

});



app.post('/fetchBooks1', function(req,res) {


    database.fetchBooks1(req.body.available,function(err,data) {
        if(err) {
            throw err
        }
        else if(data[0]===undefined) {
            res.send('No Books found')
        }
        else {
            res.send(data)
        }

    })

});


app.post('/fetchBooks2', function(req,res) {

    database.fetchBooks2(req.body.category,function(err,data) {
        if(err) {
            throw err
        }
        else if(data[0]===undefined) {
            res.send('No Books found')
        }
        else {
            res.send(data)
        }

    });

});


app.post('/fetchBooks3', function(req,res) {

    database.fetchBooks3(req.body.bookName,function(err,data) {
        if(err) {
            throw err
        }
        else if(data[0]===undefined) {
            res.send('No Books found')
        }
        else {
            res.send(data)
        }

    });

});

app.post('/fetchFine', function(req,res) {

    database.fetchFine(req.body.userid,function(err,data) {
        if(err) {
            throw err
        }
        else if(data[0]===undefined) {
            res.send('No such userid')
        }
        else {
            res.send(data)
        }

    });

});



app.post('/issueBook', function(req,res) {

    database.issueBook(req.body.userid,req.body.isbn,function(err,data) {
        if(err) {
            throw err
        }
        else {
            res.send(data)
        }

    });

});
app.post('/addBook', function(req,res) {

    database.addBook(req.body.isbn,req.body.name,req.body.author,req.body.category,function(err,data) {
        if(err) {
            throw err
        }
        else if(data==='already_in_use') {
            res.send('Book already present with this isbn')
        }
        else{
            res.send(data)
        }


    })

});
app.post('/returnBook', function(req,res) {

    database.returnBook(req.body.isbn,req.body.userid,function(err,data) {
        if(err) {
            throw err
        }
        else {
            res.send(data)
        }
    })

});
app.listen(5000, function(){
    console.log("Application running on port 5000");
    database.connectDB() ;
    database.fetchBooks3('rd',function (err,data) {
        console.log(data[0])
    })

}) ;


