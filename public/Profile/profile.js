const editSection = document.getElementById('edit_section');
const inputSection = document.getElementById('input_section');
const breadCrumb = document.querySelector('.edit');

function showEditScreen(e, action) {
    if (action === 'show') {
        // Hide right section and show 2nd version of right section
        editSection.children[0].style.display = 'none';
        editSection.children[1].style.display = 'none';
        editSection.children[2].style.display = 'flex';
        // Show Change Password Button
        inputSection.querySelector('button').style.display = 'block';
        // Show Breadcrumb
        breadCrumb.style.display = 'block';
        breadCrumb.nextElementSibling.style.display = 'block';
    } else if (action === 'hide') {
        // Show original right section
        editSection.children[0].style.display = 'flex';
        editSection.children[1].style.display = 'block';
        editSection.children[2].style.display = 'none';
        editSection.style.display = 'flex';
        // Hide change password button
        inputSection.querySelector('button').style.display = 'none';
        // Hide breadcrumb
        breadCrumb.style.display = 'none';
        breadCrumb.nextElementSibling.style.display = 'none';
        // Hide password inputs
        inputSection.nextElementSibling.style.display = 'none';
        // Show original left section
        inputSection.style.display = 'flex';
    } else if (action === 'password') {
        inputSection.style.display = 'none';
        inputSection.nextElementSibling.style.display = 'flex';
        breadCrumb.previousElementSibling.innerHTML = 'Change Password';
        breadCrumb.previousElementSibling.style.display = 'flex';
        breadCrumb.style.display = 'none';
        editSection.style.display = 'none';
        inputSection.nextElementSibling.querySelector('button').style.display = 'block';
        inputSection.parentElement.previousElementSibling.querySelector('button').style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('password') === 'true') {
        localStorage.removeItem('password');
        showEditScreen(null, 'password');
    }
});

document.addEventListener('click', () => {
    if (notifications) {
        if (notifications.style.display === 'flex') notifications.style.display = 'none';
    }
    if (document.querySelector('#menu').style.transform === 'scaleY(1)') document.querySelector('#menu').style.transform = 'scaleY(0)';
    if (document.querySelector('#language').style.transform === 'scaleY(1)') {
        document.querySelector('#language').style.transform = 'scaleY(0)';
        document.querySelector('#language').style.top = '50%';
    }
});

function getProfile(data) {
    document.getElementById('name').value = 'Admin';
    document.getElementById('email').value = 'admin@eloroverde.com';
    document.getElementById('contact').value = data.phone;
    document.getElementById('loc').value = data.loc ? data.loc : "Not Provided";
}

async function Edits() {
    var data = JSON.parse(localStorage.getItem('Login'));
    var sets = {}
        data.name == document.getElementById('name').value ? null : sets.name = document.getElementById('name').value
        data.phone == document.getElementById('contact').value ? null : sets.phone = document.getElementById('contact').value
        data.email == document.getElementById('email').value ? null : sets.email = document.getElementById('email').value

        // document.getElementById('name').value = data.name;
        // document.getElementById('email').value = data.email;
        // document.getElementById('contact').value = data.phone;
        // document.getElementById('loc').value

        console.log(Object.keys(sets).length === 0 && sets.constructor === Object, ind, profile, data, id)
        if(!(Object.keys(sets).length === 0 && sets.constructor === Object))
        {
        var bod = {
            "id": data._id,
            "new": sets
        }
        try {
            const response = await fetch(BASE_URL + 'user/editprofile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+profile.token
            },
            body: JSON.stringify(bod)
            });
            const result = await response.json();
            // localStorage.setItem('Category','');
            if(result.success)
            {
            Posts(
                {
                    email: document.getElementById('mail').value,
                    password: document.getElementById('pass').value,
                    method: 'POST',
                    urls: 'user/login',
                    headerss: {
                        'Content-Type': 'application/json',
                    },
                    // actions: window.location.href = '../Dashboard/dashboard.html',
                    saving: 'Login'
                }
            ).then((res)=> {
                if(res.success)
                {
                    window.location.href = '../Dashboard/dashboard.html'
                }
            })
            console.log("Response:", result);
            window.location.reload();
        }
        } catch (error) {
            console.error("Error:", error);
        }
        }
}