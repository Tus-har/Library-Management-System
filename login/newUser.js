$(document).ready(function() {
    console.log('new User file ready') ;
    let inp3 = $('#inp3');
    let inp4 = $('#inp4');
    let inp5 = $('#inp5');
    let btn2 = $('#btn2');



    btn2.click(function () {
        let userid = inp3.val();
        let pwd = inp4.val();
        let username = inp5.val();
        $.ajax({
            url: '/createUser',
            method: 'post',
            data: {
                userid: userid,
                pwd: pwd,
                userName: username
            }
            ,
            success: function (a) {
                console.log(a)
            }
        });
    })
});