 document.getElementById('btn').addEventListener('click', function () {

            let uname = document.getElementById('uname');
            let lastname = document.getElementById('lastname');
            let email = document.getElementById('email');
            const eror = document.getElementById('eror');
            const eror1 = document.getElementById('eror1');
            const eror2 = document.getElementById('eror2');
            if (uname.value == "") {
                eror.innerHTML = '*please Enter User Name';
                eror.style.color = 'red';
                uname.focus();
            } else {
                eror.innerHTML = "";
            }
            if (lastname.value == "") {
                eror1.innerHTML = '*please Enter User Last Name';
                eror1.style.color = 'red';
                uname.focus();
            } else {
                eror1.innerHTML = "";
            }
            if (email.value == "" || email.value.indexOf('@') == -1 || email.value.indexOf('.') == -1) {
                eror2.innerHTML = '*please Enter Email address';
                eror2.style.color = 'red';
                email.focus();
            } else {
                eror2.innerHTML = "";
            }
        })