
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

function sendMails() {
Email.send({
    Host : "smtp.elasticemail.com",
    Username : "spalvinmuthesh@gmail.com",
    Password : "61858B55EA94A0C2F1C1C56443B0CAC1319F",
    To : 'rrabbit2121@gmail.com',
    From : "spalvinmuthesh@gmail.com",
    Subject : "This is the subject",
    Body : "And this is the body"
}).then(
  message => alert(message)
);
}



// 61858B55EA94A0C2F1C1C56443B0CAC1319F

// smtp.elasticemail.com
// 2525

// api key - 0F456B0F4EC9BFD50AF48923066DDD37BFF80C67392C48A2D95BDB9FC7F4C374ECFF7F047E7BD3801B517149B5ECA665