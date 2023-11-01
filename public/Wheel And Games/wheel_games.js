const popup = document.querySelector('.edit_category.flex_column');
const details = document.querySelector('.details.popup.flex_column');
const right_section = document.querySelector('.right_section.flex_column');
const popup2 = document.querySelector('.popup.flex_column');
var myInterval
var datas = JSON.parse(localStorage.getItem('Login'));
var data = []
var Langs = {}
var prize = []
var index = 0
var index1 = 0

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

function showEditAddPrize(e, element) {
    e.stopPropagation();
    if (element === 'edit_category') {
        const element = document.querySelector('.edit_category.flex_column');
        element.querySelector('.flex_row.center.space_between h1').innerHTML = 'Edit Prize Details';
        element.style.display = 'flex';
        setTimeout(() => { element.style.transform = 'scale(1)'; });
        // element.querySelector('.input.flex_column:nth-child(2) input').placeholder = e.currentTarget.parentElement.parentElement.querySelector('p:nth-child(2)').innerHTML;
    } else if (element === 'add_category') {
        const element = document.querySelector('.edit_category.flex_column');
        element.style.display = 'flex';
        setTimeout(() => { element.style.transform = 'scale(1)'; });
        element.querySelector('.flex_row.center.space_between h1').innerHTML = 'Add Prize Details';
    }
}

function showDetails(e) {
    popup2.style.display = 'flex';
    popup2.style.top = `${ window.scrollY + 50 }px`;
    requestAnimationFrame(() => {
        popup2.style.transform = 'scale(1)';
    });
}

function showScreen(e, screen) {
    if (screen === 'screen_2') {
        right_section.children[2].style.display = 'none';
        right_section.children[3].style.display = 'none';
        right_section.children[4].style.display = 'flex';
        gsap.from('#details_table_stagger', {
            y: '-2rem',
            opacity: 0,
            delay: 0.5,
            stagger: 0.3
        });
    } else {
        right_section.children[2].style.display = 'flex';
        right_section.children[3].style.display = 'flex';
        right_section.children[4].style.display = 'none';
        document.querySelector('.edit_category').style.display = 'none';
        gsap.from('#table_stagger', {
            y: '-2rem',
            opacity: 0,
            delay: 0.5,
            stagger: 0.3
        });
    }
}

function closeDetails(e, element) {
    // e.stopPropagation();
    if (element === 'edit_category') {
        const element = document.querySelector('.edit_category.flex_column');
        element.style.transform = 'scale(0)';
    } else {
        requestAnimationFrame(() => {
            popup2.style.transform = 'scale(0)';
        });
        setTimeout(() => {
            popup2.style.display = 'none';
        }, 500);
    }
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
    var text = ""
    Gets(
        {
            method: 'GET',
            urls: 'games/gamewinner',
            headerss: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+datas.token
            },
            actions: '',
            saving: 'GameWinners'
        }
        ).then((res)=> {
            console.log(res, "RRRRRRRRRRRRRRRRR")
            data = res
            for (var i = 0; i < data.length; i++) {
                text = text + `<div class="values flex_row space_between center" id='table_stagger'>
                <p>${i+1}</p>
                <p>${data[i].name}</p>
                <p>${data[i].email}</p>
                <p>${data[i].prize}</p>
                <p>${data[i].coupon}</p>
                <p>${data[i].expiry}</p>
                <p id="success">${data[i].status}</p>
                <div class="action flex_row space_between center">
                    <button value="${i}" onclick="showDetails(event, 'edit_category'); setDatas(this);"><img src="../images/visibility_black_24dp 5.png" alt=""></button>
                    <button value="${i}" onclick="deleteWinner(this)"><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
                </div>
                </div>`+ '\n'
                }
                console.log(text, "TTTTTTTTTTTTTTTT");
                document.getElementById("datass").innerHTML = text;
        })
    // myInterval = setInterval(sets, 1000);
    // return myInterval
}

function goesss() {
    var text = ""
    Gets(
        {
            method: 'GET',
            urls: 'games/games',
            headerss: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+datas.token
            },
            actions: '',
            // saving: 'GameWinners'
        }
        ).then((res)=> {
            console.log(res, "GGGGGGGGGGGGGGGGGGG")
            prize = res
            for (var i = 0; i < prize.length; i++) {
                text = text + `<div class="values flex_row space_between center" id="details_table_stagger">
                <p>${i+1}</p>
                <p>${prize[i].prize}</p>
                <div class="action flex_row space_between center">
                    <button value="${i}" onclick="{showEditAddPrize(event, 'edit_category'); setPrize(this)}"><img src="../images/edit_yellow.png" alt=""></button>
                    <button value="${i}" onclick="deleteProfile(this)"><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
                </div>
                </div>`+ '\n'
                }
                console.log(text, "TTTTTTTTTTTTTTTT");
                document.getElementById("prizedetails").innerHTML = text;
        })
        
}

function sets() {
    var text = "";
    var data = JSON.parse(localStorage.getItem('GameWinners'));
    if (data.length != 0) {
        for (var i = 0; i < data.length; i++) {
            text = text + `<div class="values flex_row space_between center" id='table_stagger'>
            <p>${i+1}</p>
            <p>${data[i].name}</p>
            <p>${data[i].email}</p>
            <p>${data[i].prize}</p>
            <p>${data[i].coupon}</p>
            <p>${data[i].expiry}</p>
            <p id="success">${data[i].status}</p>
            <div class="action flex_row space_between center">
                <button value="${i}" onclick="showDetails(event, 'edit_category'); setDatas(this);"><img src="../images/visibility_black_24dp 5.png" alt=""></button>
                <button ><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
            </div>
            </div>`+ '\n'
            }
            console.log(text, "TTTTTTTTTTTTTTTT");
            document.getElementById("datass").innerHTML = text;
            clearInterval(myInterval);
    }
}

function setDatas(val) {
    console.log(val, val.value)
    index1 = parseInt(val.value)
    // var data = JSON.parse(localStorage.getItem('GameWinners'));
    document.getElementById('names').value = data[parseInt(val.value)].name
    document.getElementById('emails').value = data[parseInt(val.value)].email
    document.getElementById('status').value = data[parseInt(val.value)].status
    document.getElementById('prizes').value = data[parseInt(val.value)].prize
    document.getElementById('coupons').value = data[parseInt(val.value)].coupon
    document.getElementById('dates').value = data[parseInt(val.value)].expiry
    // parseInt(val.value);
}

async function setPrize(val) {
    console.log(val.value, "SSSSSSSSSSSSSSSSSS")
    var ind = parseInt(val.value)
    index = parseInt(val.value)
    document.getElementById('det').value = prize[ind].prize
    document.getElementById('coup').value = prize[ind].coupon,
    document.getElementById('datesss').value = prize[ind].expiry
}

async function change() {
    // Langs = await English().then((res)=> {
    //     return res
    // })

    var lang = await localStorage.getItem('lang')

    if(lang)
    {
        if(lang == 'english')
        {
            Langs = await English().then((res)=> {
                return res
            })
        }
        else
        {
            Langs = await Spanish().then((res)=> {
                return res
            })
        }
    }
    else
    {
        if(await LANG == 'english')
        {
            Langs = await English().then((res)=> {
                return res
            })
        }
        else
        {
            Langs = await Spanish().then((res)=> {
                return res
            })
        }
    }

    document.getElementById('sides').innerHTML = `<div class="sidebar flex_column">
    <img src="../images/logo.png">
    <ul>
        <li class="flex_column justify_center">
            <a href="../Dashboard/dashboard.html" class="flex_row center">
                <img src="../images/dashboard.png" alt="dashboard">
                <p>${Langs.dashboard}</p>
            </a>
        </li>
        <li class="flex_column justify_center">
            <a href="../User Management/user.html" class="flex_row center">
                <img src="../images/management.png" alt="dashboard">
                <p>${Langs.user_management}</p>
            </a>
        </li>
        <li class="flex_column justify_center">
            <a href="../Product Management/product.html" class="flex_row center">
                <img src="../images/product_management.png" alt="dashboard">
                <p>${Langs.prod_manage}</p>
            </a>
        </li>
        <li class="flex_column justify_center">
            <a href="../Orders/orders.html" class="flex_row center">
                <img src="../images/purchase_order.png" alt="dashboard">
                <p>${Langs.orders}</p>
            </a>
        </li>
        <li class="active flex_column justify_center">
            <a href="../Wheel And Games/wheel_games.html" class="flex_row center">
                <img src="../images/wheel.png" alt="dashboard">
                <p>${Langs.raffel}</p>
            </a>
        </li>
        <li class="flex_column justify_center">
            <a href="../Marketing/marketing.html" class="flex_row center">
                <img src="../images/marketing.png" alt="dashboard">
                <p>${Langs.man_mar}</p>
            </a>
        </li>
        <li class="flex_column justify_center">
            <a href="../Payment/payment.html" class="flex_row center">
                <img src="../images/payment_black_24dp 1.png" alt="dashboard">
                <p>${Langs.man_pay}</p>
            </a>
        </li>
        <li class="flex_column justify_center">
            <a href="../CMS/content.html" class="flex_row center">
                <img src="../images/content.png" alt="dashboard">
                <p>CMS</p>
            </a>
        </li>
        <li class="flex_column justify_center">
            <a href="../Report/report.html" class="flex_row center">
                <img src="../images/graph_report.png" alt="dashboard">
                <p>${Langs.report}</p>
            </a>
        </li>
        <li class="flex_column justify_center">
            <a href="../Support/support.html" class="flex_row center">
                <img src="../images/headphone.png" alt="dashboard">
                <p>${Langs.sup_man}</p>
            </a>
        </li>
    </ul>
        <div class="bottom_buttons flex_row space_between center width_full">
            <!-- <div class="image" onclick="showNotifications(event)">
                <img src="../images/notification.png" alt="">
                <span></span>
            </div> -->
            <div class="image">
                <img src="../images/terms_conditions.png" alt="">
            </div>
            <div class="image" onclick="showLanguage(event)">
                <img src="../images/globe.png" alt="">
            </div>
            <div class="image" onclick="window.location.href = '../Login/login.html'">
                <img src="../images/logout.png" alt="">
            </div>
        </div>
    </div>`

    document.getElementById('raf_list').textContent = Langs.list_raffle
    
    document.getElementById('add_raf').textContent = Langs.add_prize
    
    document.getElementById('raf_whel').textContent = Langs.raffle_wheel
 
    document.getElementById('rafnam').innerHTML = `<p>#</p>
    <p>${Langs.name}</p>
    <p>${Langs.email}</p>
    <p>${Langs.price}</p>
    <p>${Langs.coupon_code}</p>
    <p>${Langs.exp}</p>
    <p>${Langs.status}</p>
    <p>${Langs.action}</p>`

}

// games/games

async function AddGam() {
    const element = document.querySelector('.edit_category.flex_column');
    if(element.querySelector('.flex_row.center.space_between h1').innerHTML=='Edit Prize Details')
    {
        EditData()
    }
    else
    {
    Posts(
        {
            prize: document.getElementById('det').value,
            coupon: document.getElementById('coup').value,
            expiry: document.getElementById('datesss').value,
            method: 'POST',
            urls: 'games/games',
            headerss: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + datas.token
            },
            // actions: window.location.href = '../Dashboard/dashboard.html',
            // saving: 'Login'
        }
    ).then((res) => {
        if (res.success) {
            window.location.reload();
            // window.location.href = '../Dashboard/dashboard.html'
        }
    })
    }
}

async function EditData() {
    var ind = index
    var profile = JSON.parse(localStorage.getItem('Login'));
    var id = prize[ind].id
    var sets = {}

    prize[ind].prize == document.getElementById('det').value ? null : sets.prize = document.getElementById('det').value
    prize[ind].coupon == document.getElementById('coup').value ? null : sets.coupon = document.getElementById('coup').value
    prize[ind].expiry == document.getElementById('datesss').value ? null : sets.expiry = document.getElementById('dates').value
   
    console.log(Object.keys(sets).length === 0 && sets.constructor === Object, ind, profile, data, id)
    if (!(Object.keys(sets).length === 0 && sets.constructor === Object)) {
        var bod = {
            "id": id,
            "new": sets
        }
        try {
            const response = await fetch(BASE_URL + 'games/updategames', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + profile.token
                },
                body: JSON.stringify(bod)
            });
            const result = await response.json();
            console.log("Response:", result);
            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
    }
}

async function deleteProfile(val) {
    console.log(val.value, "VVVVVVVV")
    var ind = parseInt(val.value);
    var profile = JSON.parse(localStorage.getItem('Login'));
    var id = prize[ind]._id
    try {
        const response = await fetch(BASE_URL + 'games/games/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + profile.token
            },
        });
        const result = await response.json();
        console.log("Response:", result);
        window.location.reload();
    } catch (error) {
        console.error("Error:", error);
    }
}

async function EditWinner() {
    var ind = index
    var profile = JSON.parse(localStorage.getItem('Login'));
    var id = data[ind].id
    var sets = {}

    document.getElementById('names').value == data[ind].name ? null : sets.name = document.getElementById('names').value
    document.getElementById('emails').value == data[ind].email ? null : sets.email = document.getElementById('emails').value
    document.getElementById('status').value == data[ind].status ? null : sets.status = document.getElementById('dates').value
    document.getElementById('prizes').value == data[ind].prize ? null : sets.prize = document.getElementById('prizes').value
    document.getElementById('coupons').value == data[ind].coupon ? null : sets.coupon = document.getElementById('coupons').value
    document.getElementById('dates').value == data[ind].expiry ? null : sets.expiry = document.getElementById('dates').value

    console.log(Object.keys(sets).length === 0 && sets.constructor === Object, ind, profile, data, id)
    if (!(Object.keys(sets).length === 0 && sets.constructor === Object)) {
        var bod = {
            "id": id,
            "new": sets
        }
        try {
            const response = await fetch(BASE_URL + 'games/updategamewinner', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + profile.token
                },
                body: JSON.stringify(bod)
            });
            const result = await response.json();
            console.log("Response:", result);
            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
    }
}

async function deleteWinner(val) {
    console.log(val.value, "VVVVVVVV")
    var ind = parseInt(val.value);
    var profile = JSON.parse(localStorage.getItem('Login'));
    var id = prize[ind]._id
    try {
        const response = await fetch(BASE_URL + 'games/gamewinner/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + profile.token
            },
        });
        const result = await response.json();
        console.log("Response:", result);
        window.location.reload();
    } catch (error) {
        console.error("Error:", error);
    }
}

