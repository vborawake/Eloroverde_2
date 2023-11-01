
window.addEventListener('load', () => {
    document.querySelector('.container.flex_row').style.display = 'none';
    document.querySelector('.loader.flex_row.justify_center.center').style.display = 'flex';
    
    setTimeout(() => {
        document.querySelector('.container.flex_row').style.display = 'flex';
        document.querySelector('.loader.flex_row.justify_center.center').style.display = 'none';
    }, 1000);
});

document.addEventListener('DOMContentLoaded', () => {
    addAnimations();
});

function addAnimations() {
    gsap.from('.left_section img', {
        y: '5rem',
        opacity: '0',
        duration: 0.5,
        delay: 1
    });
    gsap.from('.right_section', {
        y: '-5rem',
        opacity: '0',
        duration: 0.5,
        delay: 1
    });
    gsap.from('.right_section .content_wrapper #stagger', {
        y: '1rem',
        opacity: '0',
        duration: 0.5,
        delay: 1.5,
        stagger: {
            amount: 0.5
        }
    });
}

function Logs() {
    document.getElementById('logss').style.display = 'none'
    document.getElementById('loadings').style.display = 'block'
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
            document.getElementById('logss').style.display = 'block'
            document.getElementById('loadings').style.display = 'none'
            document.getElementById('snackbar').style.visibility = 'visible'
            document.getElementById('texts').innerHTML = 'Logged in Successfully'
            setTimeout(function() {document.getElementById('snackbar').style.visibility = 'hidden'}, 2000);
            window.location.href = '../Dashboard/dashboard.html'
        }
        else if(!res.success)
        {
            document.getElementById('logss').style.display = 'block'
            document.getElementById('loadings').style.display = 'none'
            document.getElementById('snackbar').style.visibility = 'visible'
            document.getElementById('texts').innerHTML = 'Incorrect Credentials'
            setTimeout(function() {document.getElementById('snackbar').style.visibility = 'hidden'}, 2000);
        }
    })
}