
function createUser(connection,userid,password,name,cb) {
    var query=' SELECT Name FROM Users WHERE userID = "'+ userid +'";';
    connection.query(query,function (error,results) {
        if(results[0]===undefined) {
            query = 'INSERT INTO Users (userID,pasword,Name,books,fine) VALUES ("' + userid + '",' + password + ',"' + name + '",0,0)';
            connection.query(query, function (error, results) {
                cb(error,results) ;
            })
        }
        else {
            cb(error,'already_in_use')
        }

    })
}
function checkUser(connection,userid,cb) {
    var query= 'SELECT pasword,Name FROM Users WHERE userID = "'+ userid +'";';
    connection.query(query,function (error,results) {
        cb(error,results) ;
    })
}
function checkAdmin(connection,userid,cb) {
    var query= 'SELECT pasword,Name FROM Admin WHERE userID= "'+ userid +'";';
    connection.query(query,function (error,results) {
        cb(error,results) ;
    })
}
function fetchUsers(connection,cb) {
    var query='SELECT * FROM Users' ;
    connection.query(query,function (error,results) {
        cb(error,results) ;
    })
}
function fetchBooks(connection,cb) {
    var query='SELECT * FROM Books' ;
    connection.query(query,function (error,results) {
        cb(error,results) ;
    })
}
function fetchBooks1(connection,available,cb) {
    var query='SELECT * FROM Books WHERE available = "'+available+'";' ;
    connection.query(query,function (error,results) {
        cb(error,results) ;
    })
}
function fetchBooks2(connection,category,cb) {
    var query='SELECT * FROM Books WHERE category = "'+category+'";' ;
    connection.query(query,function (error,results) {
        cb(error,results) ;
    })
}
function fetchBooks3(connection,name,cb) {
    var query='SELECT * FROM Books WHERE name LIKE "%'+name+'%" ;' ;
    connection.query(query,function (error,results) {
        cb(error,results) ;
    })
}
function fetchFine(connection,userid,cb) {
    var query= 'SELECT fine FROM Users WHERE userID= "'+userid+'";' ;
    connection.query(query,function (error,results) {
    cb(error,results)
})
}
function calFine(connection,isbn,cb) {
    var today =new Date().toISOString().slice(0,10);
    var query='SELECT issuedate FROM issue WHERE isbn = '+ isbn +';';
    console.log('today from js : '+today) ;

    connection.query(query,function (error,results) {
        if(error) throw error ;
        let issuedate=results[0].issuedate.toISOString().slice(0,10) ;
        issuedate='DATEDIFF("'+today+'","'+issuedate+'")' ;
        query='SELECT '+ issuedate ;
        connection.query(query,function (error,results) {

            cb(error,Object.values(results[0])[0])
        })
    })



}
function issueBook(connection,userid,isbn,cb) {
     var today =new Date().toISOString().slice(0, 19).replace('T', ' ');
    var query= 'INSERT INTO issue (userID,isbn,issueDate) VALUES ("'+userid+'",'+isbn+',"'+today +'")' ;
    connection.query(query,function (error,results) {
        cb(error,results) ;
    }) ;
    query='UPDATE Users ' +
        'SET ' +
        '    books = books + 1' +
        'WHERE ' +
        ' userID="'+userid+'";' ;
    connection.query(query,function (error,results) {
        cb(error,results) ;
    })

}
function addBook(connection,isbn,name,author,category,cb) {

    var query=' SELECT isbn FROM Books WHERE isbn = '+ isbn +';';
    connection.query(query,function (error,results) {
        if(results[0]===undefined) {
            query= 'INSERT INTO Books (isbn,name,author,category,available) VALUES ('+isbn+',"'+name+'","'+author +'","'+category+'",1);' ;
            connection.query(query,function (error,results) {
                cb(error,results)
            })
        }
        else {
            cb(error,'already_in_use')
        }

    })
}
function returnBook(connection,isbn,userid,cb) {
    var query=' SELECT isbn FROM issue WHERE userID = "'+ userid +'";';
        connection.query(query,function (error,results) {
        if(results[0]===undefined) {
            cb(error,'User doesnt have any book to return')
        }
        var b=false ;
        results.forEach(function (a) {
            if(a.isbn===isbn) {
                b=true ;
            }
        }) ;
        
         if (b){
             query='UPDATE Users ' +
                'SET ' +
                '    books = books - 1' +
                'WHERE ' +
                ' userID="'+userid+'";' ;
            connection.query(query,function (error,results) {
                cb(error,results)
            }) ;
            query='DELETE FROM issue WHERE isbn="'+isbn+'" ;' ;
            connection.query(query,function (error) {
                cb(error,'Book Issued Successfully')
            })
        }
        else {
            cb(error,'No such book found')
        }

    })
}


module.exports ={
    createUser,
    checkUser,
    checkAdmin,
    fetchUsers,
    fetchBooks,
    fetchBooks1,
    fetchBooks2,
    fetchBooks3,
    fetchFine,
    calFine,
    issueBook,
    addBook,
    returnBook

} ;