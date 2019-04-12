$(document).ready(function() {
    console.log('index file ready') ;
    let btn = $('#btn');
    let inp1 = $('#inp1');
    let inp2 = $('#inp2');
    let btn1 = $('#btn1');


    btn.click(function () {


        if(document.getElementById("rad2").checked) {

            let userid = inp1.val();
            let pwd = inp2.val();

            if(userid=="") {
                document.getElementById("result1").innerHTML = "field can't be empty";
                document.getElementById('result1').setAttribute("class","style");
                return;
            }
            else if(pwd==""){
                document.getElementById("result2").innerHTML = "field can't be empty";
                document.getElementById('result2').setAttribute("class","style");
                return;
            }


            $.ajax({
                url: '/checkUser',
                method: 'post',
                data: {
                    userid: userid,
                    pwd: pwd
                }
                ,
                success: function (a) {
                    if(a=='userid not available') {
                        console.log(a)
                        document.getElementById("result1").innerHTML=a;
                        document.getElementById('result1').setAttribute("class","style");
                    }
                    else if(a=='Incorrect Password') {
                        console.log(a)
                        document.getElementById("result2").innerHTML=a;
                        document.getElementById('result2').setAttribute("class","style");
                    }
                    else {
                        console.log(' Correct Password Redirecting...')
                        window.location.href='user.html';
                    }
                }
            });
        }

        else {
            let userid = inp1.val();
            let pwd = inp2.val();

            if(userid=="") {
                document.getElementById("result1").innerHTML = "field can't be empty";
                document.getElementById('result1').setAttribute("class","style");
                return;
            }
            else if(pwd==""){
                document.getElementById("result2").innerHTML = "field can't be empty";
                document.getElementById('result2').setAttribute("class","style");
                return;
            }


            $.ajax({
                url: '/checkAdmin',
                method: 'post',
                data: {
                    userid: userid,
                    pwd: pwd
                }
                ,
                success: function (a) {
                    if(a=='userid not available') {
                        console.log(a)
                        document.getElementById("result1").innerHTML=a;
                        document.getElementById('result1').setAttribute("class","style");
                    }
                    else if(a=='Incorrect Password') {
                        console.log(a)
                        document.getElementById("result2").innerHTML=a;
                        document.getElementById('result2').setAttribute("class","style");
                    }
                    else {
                        console.log(' Correct Password Redirecting...') ;
                        window.location.href='admin.html'
                    }
                }
            });
        }



    });

    btn1.click(function () {
        console.log('Redirecting for new user') ;
        window.location.href='newUser.html';
    }) ;

    inp1.click(function hide() {
        document.getElementById('result1').setAttribute("class","style1");
    });
    inp2.click(function hide() {
        document.getElementById('result2').setAttribute("class","style1");
    });

}) ;