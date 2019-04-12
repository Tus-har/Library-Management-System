$(document).ready(function () {
    console.log('Admin page ready') ;
    let btn = $('#btn') ;          // add book
    let btn2 = $('#isbn') ;
    let btn3 = $('#name') ;
    let btn4 = $('#author') ;
    let btn5 = $('#category') ;

    let btn1 = $('#btn1') ; //fetch Books

    let btn6 = $('#btn2') ; //Fetch Users
    let inp = $('#inp');

    btn.click(function () {
        let bookISBN=btn2.val() ;
        let bookName=btn3.val() ;
        let bookAuthor=btn4.val() ;
        let bookCategory=btn5.val() ;


        $.ajax({
            url: '/addBook',
            method: 'post',
            data: {
                isbn: bookISBN,
                name: bookName,
                author: bookAuthor,
                category: bookCategory
            },
            success: function (a) {
                console.log(a)
            }
        });
    })

    btn1.click(function () {

        let input=inp.val();

        let str = '/fetchbooks';

        if (document.getElementById("rad1").checked)
            str = '/fetchbooks1';

        else if (document.getElementById("rad2").checked)
            str='/fetchbooks2';

        else if(document.getElementById("rad3").checked)
            str = '/fetchbooks3';


        if(str==='/fetchbooks')
        {$.ajax({
            url: str,
            method: 'post',
            success: function (a) {
                console.log(a);
                var html = "<table border=1|1>";
                html+="<tr>";
                html+="<td>"+"isbn"+"</td>";
                html+="<td>"+"name"+"</td>";
                html+="<td>"+"author"+"</td>";
                html+="<td>"+"category"+"</td>";
                html+="<td>"+"available"+"</td>";
                html+="</tr>";

                for (var i=0;i<a.length;i++){
                    html+="<tr>";
                    html+="<td>"+a[i].isbn+"</td>";
                    html+="<td>"+a[i].name+"</td>";
                    html+="<td>"+a[i].author+"</td>";
                    html+="<td>"+a[i].category+"</td>";
                    html+="<td>"+a[i].available+"</td>";
                    html+="</tr>";
                }
                html+="</table>";
                document.getElementById('result').innerHTML=html;
            }
        });
        }
        else if (str==='/fetchbooks1') {
            $.ajax({
                url: str,
                method: 'post',
                data:{
                    available: input.toString()
                },
                success: function (a) {
                    console.log(a)
                }
            });
        }
        else if (str==='/fetchbooks2') {
            $.ajax({
                url: str,
                method: 'post',
                data:{
                    category: input.toString()
                },
                success: function (a) {
                    console.log(a)
                }
            });
        }
        else  {
            $.ajax({
                url: str,
                method: 'post',
                data:{
                    bookName: input.toString()
                },
                success: function (a) {
                    console.log(a)
                }
            });
        }

    })
    btn6.click(function () {
        $.ajax({
            url: '/fetchUsers',
            method: 'post' ,
            success: function (a) {
                console.log(a)
            }
        });
    })
});