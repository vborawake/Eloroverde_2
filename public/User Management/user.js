const popup = document.querySelector('.popup.flex_column');
const details = document.querySelector('.details.popup.flex_column');
const right_section = document.querySelector('.right_section.flex_column');
var myInterval

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

// function showPopup(e) {
//     e.stopPropagation();
//     if (e.target.classList.contains('profile_img') || e.target.classList.contains('username')) {
//         if (e.currentTarget.nextElementSibling.style.transform === 'scaleY(0)' || e.currentTarget.nextElementSibling.style.transform === '') e.currentTarget.nextElementSibling.style.transform = 'scaleY(1)';
//         else e.currentTarget.nextElementSibling.style.transform = 'scaleY(0)';
//     }
// }

function showDetails(e, val) {
    console.log(e, val, "VVVVVVVVVVVVVVVVVVVVV")
    console.log(val.value,"VVVVVVVVVVVVV");
    var data = JSON.parse(localStorage.getItem('Users'));

    let date = new Date(data[parseInt(val.value)].createdDate);
    let times = date.toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
    let dates = new Date(data[parseInt(val.value)].createdDate).toISOString().substring(0, 10)

    let isoDate = '2018-01-01T18:00:00Z';
    let result = date.toISOString().match(/\d\d:\d\d/);
    console.log(result[0]);

    // console.log(date.match(/\d\d:\d\d/));

    document.getElementById('nam').value=data[parseInt(val.value)].name
    document.getElementById('ema').value=data[parseInt(val.value)].email
    document.getElementById('phon').value=data[parseInt(val.value)].phone
    document.getElementById('stat').value=data[parseInt(val.value)].active ? 'Active' : 'InActive'
    document.getElementById('loc').value=data[parseInt(val.value)].location ? data[parseInt(val.value)].location : 'Not Provided'
    document.getElementById('logg').value=dates
    document.getElementById('loggtime').value=result[0]
    
    e.stopPropagation();
    if (e.currentTarget.children[0].innerHTML === 'Back &gt; User Details') {
        right_section.children[1].style.display = 'flex';
        right_section.children[2].style.display = 'flex';
        gsap.to('.details', {
            display: 'none'
        });
        gsap.from([right_section.children[0], right_section.children[1], right_section.children[2]], {
            y: '-2rem',
            duration: 0.5,
            opacity: 0,
            stagger: 0.3
        });
        gsap.from('#table_stagger', {
            y: '-2rem',
            opacity: 0,
            delay: 0.5,
            stagger: 0.3
        });
    } else {
        right_section.children[1].style.display = 'none';
        right_section.children[2].style.display = 'none';
        gsap.to('.details', {
            display: 'flex',
            opacity: 1
        });
        gsap.from('.details', {
            y: '-2rem',
            opacity: 0,
            duration: 0.5
        }, '+=1');
    }
}

function closeDetails(e) {
    requestAnimationFrame(() => {
        popup.style.transform = 'scale(0)';
    });
    setTimeout(() => {
        popup.style.display = 'none';
    }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
    addAnimations();
});

function addAnimations() {
    gsap.from('.sidebar', {
        x: '-4rem',
        opacity: 0,
        duration: 0.5
    });

    gsap.from('#stagger', {
        y: '-2rem',
        opacity: 0,
        stagger: 0.3
    });

    gsap.from('#table_stagger', {
        y: '-2rem',
        opacity: 0,
        delay: 0.5,
        stagger: 0.3
    });

    // gsap.from('#chart_stagger', {
    //     y: '-2rem',
    //     opacity: 0,
    //     delay: 1,
    //     stagger: 0.3
    // });

    // gsap.from('.order_details', {
    //     y: '-2rem',
    //     opacity: 0,
    //     duration: 0.5
    // });
}

function goes() {
    myInterval = setInterval(sets, 1000);
    return myInterval
}

function sets() {
    var text = "";
    var data = JSON.parse(localStorage.getItem('Users'));
    if (data.length != 0) {
        for (var i = 0; i < data.length; i++) {
            let date = new Date(data[i].createdDate);
            let times = date.toLocaleString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
            let dates = new Date(data[i].createdDate).toISOString().substring(0, 10)

            text = text + `<div class="values flex_row space_between center" id="table_stagger">
            <div class="user flex_row center">
                <span></span>
                <p>${data[i].name}</p>
            </div>
            <p>-</p>
            <p>${data[i].email}</p>
            <p>${dates+' '+times}</p>
            <p>${data[i].active ? 'Active' : 'Inactive'}</p>
            <div class="action flex_row space_between center">
                <button value="${i}" onclick="showDetails(event, this, ${i})"><img src="../images/eye.png" alt=""></button>
                <button value="${i}" onclick="{
                    deleteProfile(event, this, ${i})
                    }"><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
            </div>
            </div>`+ '\n'
            }
            console.log(text, "TTTTTTTTTTTTTTTT");
            document.getElementById("datass").innerHTML = text;
            clearInterval(myInterval);
    }
}

async function deleteProfile(event, val, i) {
    var ind = parseInt(val.value);
    var profile = JSON.parse(localStorage.getItem('Login'));
    var data = JSON.parse(localStorage.getItem('Users'));
    var id = data[ind].id
    try {
        const response = await fetch(BASE_URL + 'user/'+id, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer '+profile.token
          },
        });
        const result = await response.json();
        localStorage.setItem('Users','');
        console.log("Response:", result);
        window.location.reload();
    } catch (error) {
        console.error("Error:", error);
    }
}