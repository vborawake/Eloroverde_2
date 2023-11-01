const popup = document.querySelector('.popup.flex_column');
const details = document.querySelector('.details.popup.flex_column');
const right_section = document.querySelector('.right_section.flex_column');
var myInterval, myInterval1
var datas
var data = JSON.parse(localStorage.getItem('Login'));
var ind = 0

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

function validate (e) {
    const lettersOnly = /^[a-zA-Z]+$/.test(e.target.value);
    if (!lettersOnly) console.log(e.target.value.splice(0, -1));
}

document.getElementById('name').addEventListener('keyup', validate);

function addRow(e) {
    const html = `
        <div class="half_input flex_row center space_between">
            <div class="input flex_row center">
                <input type="text" onchange="validate(event)" placeholder="Name" disabled>
            </div>
            <div class="input flex_row center">
                <input type="text" placeholder="Email" disabled>
            </div>
            <button onclick='event.currentTarget.parentElement.remove()'><img src="../images/close_black.png" alt=""></button>
        </div>
    `;

    e.currentTarget.parentElement.previousElementSibling.insertAdjacentHTML('afterend', html);
}

// function showPopup(e) {
//     e.stopPropagation();
//     if (e.target.classList.contains('profile_img') || e.target.classList.contains('username')) {
//         if (e.currentTarget.nextElementSibling.style.transform === 'scaleY(0)' || e.currentTarget.nextElementSibling.style.transform === '') e.currentTarget.nextElementSibling.style.transform = 'scaleY(1)';
//         else e.currentTarget.nextElementSibling.style.transform = 'scaleY(0)';
//     }
// }

function showAddCouponCode(e, title) {
    if (title === 'edit') popup.querySelector('.header.flex_row.space_between.center p').innerHTML = 'Edit Coupon Code';
    else popup.querySelector('.header.flex_row.space_between.center p').innerHTML = 'Add Coupon Code';
    popup.style.display = 'flex';
    popup.style.top = `${window.scrollY + 50}px`;
    requestAnimationFrame(() => {
        popup.style.transform = 'scale(1)';
    });
}

function showDetails(e, element) {
    e.stopPropagation();
    // User clicks on manage coupon code button
    if (element === 'screen_2') {
        right_section.children[1].style.display = 'none';
        right_section.children[2].style.display = 'none';
        right_section.children[3].style.display = 'none';
        right_section.children[4].style.display = 'none';
        right_section.children[5].style.display = 'flex';
    } else if (element === 'screen_1') {
        right_section.children[1].style.display = 'flex';
        right_section.children[2].style.display = 'flex';
        right_section.children[3].style.display = 'flex';
        right_section.children[4].style.display = 'flex';
        right_section.children[5].style.display = 'none';
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

function goes() {
    var text = "";
    Gets(
        {
            method: 'GET',
            urls: 'products/coupon',
            headerss: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + data.token
            },
            actions: '',
            saving: 'Coupons'
        }
    ).then((res) => {
        datas = res
        for (var i = 0; i < datas.length; i++) {

            text = text + `<div class="value flex_row space_between center">
                <p>${datas[i].code}</p>
                <p>${datas[i].value}</p>
                <p>${datas[i].expire}</p>
                <p>25</p>
                <p>20</p>
                <p id="success">Active</p>
                <div class="action flex_row space_between center">
                    <button value="${i}" onclick="showAddCouponCode(event, 'edit'); setDatas(this);"><img src="../images/edit_yellow.png" alt=""></button>
                    <button value="${i}" onclick="deleteProfile(this)"><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
                </div>
                </div>`+ '\n'
        }
        console.log(text, "TTTTTTTTTTTTTTTT");
        document.getElementById("couponss").innerHTML = text;
    })
}

// function sets() {
//     var text = "";
//     var data = JSON.parse(localStorage.getItem('Coupons'));
//     if (data.length != 0) {
//         for (var i = 0; i < data.length; i++) {

//             text = text + `<div class="value flex_row space_between center">
//             <p>${data[i].code}</p>
//             <p>${data[i].value}</p>
//             <p>${data[i].expire}</p>
//             <p>25</p>
//             <p>20</p>
//             <p id="success">Active</p>
//             <div class="action flex_row space_between center">
//                 <button value="${i}" onclick="showAddCouponCode(event, 'edit'); setDatas(this);"><img src="../images/edit_yellow.png" alt=""></button>
//                 <button><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
//             </div>
//             </div>`+ '\n'
//             }
//             console.log(text, "TTTTTTTTTTTTTTTT");
//             document.getElementById("couponss").innerHTML = text;
//             // document.getElementById("coupons").innerHTML = text;
//             clearInterval(myInterval);
//     }
// }

function setDatas(val) {
    console.log(val.value, "PPPPPPPPP");
    document.getElementById('co').value = datas[val.value].code
    document.getElementById('dv').value = datas[val.value].value
    document.getElementById('exps').value = datas[val.value].expire
    document.getElementById('usglim').value = datas[val.value].limit
    document.getElementById('bug').value = datas[val.value].amount
    document.getElementById('minn').value = datas[val.value].min_amount
    ind = val.value
}

function goes1() {
    var text = "";
    Gets(
        {
            method: 'GET',
            urls: 'sends/sendings',
            headerss: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + data.token
            },
            actions: '',
            // saving: 'Sends'
        }
    ).then((res) => {
        for (var i = 0; i < res.length; i++) {
            var dates = new Date(res[i].createdDate).getDate() + '/' + new Date(res[i].createdDate).getMonth() + '/' + new Date(res[i].createdDate).getFullYear()
            text = text + `<div class="value flex_row space_between center">
                <p>${res[i].title}</p>
                <p>${res[i].email}</p>
                <p>${dates}</p>
                <p id="success">Sent</p>
                </div>`+ '\n'
        }
        console.log(text, "TTTTTTTTTTTTTTTT");
        document.getElementById("sendss").innerHTML = text;
    })
    myInterval1 = setInterval(sets1, 1000);
    return myInterval1
}

function sets1() {
    var text = "";
    var data = JSON.parse(localStorage.getItem('Sends'));
    if (data.length != 0) {
        for (var i = 0; i < data.length; i++) {
            var dates = new Date(data[i].createdDate).getDate() + '/' + new Date(data[i].createdDate).getMonth() + '/' + new Date(data[i].createdDate).getFullYear()
            text = text + `<div class="value flex_row space_between center">
            <p>${data[i].title}</p>
            <p>${data[i].email}</p>
            <p>${dates}</p>
            <p id="success">Sent</p>
            </div>`+ '\n'
        }
        console.log(text, "TTTTTTTTTTTTTTTT");
        document.getElementById("sendss").innerHTML = text;
        clearInterval(myInterval1);
    }
}

async function change() {
    // Langs = await English().then((res)=> {
    //     return res
    // })

    var lang = await localStorage.getItem('lang')

    if (lang) {
        if (lang == 'english') {
            Langs = await English().then((res) => {
                return res
            })
        }
        else {
            Langs = await Spanish().then((res) => {
                return res
            })
        }
    }
    else {
        if (await LANG == 'english') {
            Langs = await English().then((res) => {
                return res
            })
        }
        else {
            Langs = await Spanish().then((res) => {
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
        <li class="flex_column justify_center">
            <a href="../Wheel And Games/wheel_games.html" class="flex_row center">
                <img src="../images/wheel.png" alt="dashboard">
                <p>${Langs.raffel}</p>
            </a>
        </li>
        <li class="active flex_column justify_center">
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

    document.getElementById('add_cou').innerHTML = `<p id="add_cou">${Langs.add_coupon}</p>
    <button onclick="closeDetails(event)"><img src="../images/close_black.png" alt=""></button>`

    document.getElementById('manmar').textContent = Langs.man_mar

    document.getElementById('manemail').innerHTML = `<p>${Langs.send_mail}</p>
    <button onclick="showDetails(event, 'screen_2')">${Langs.manage} ${Langs.coupon_code}</button>`

    document.getElementById('add_cust').innerHTML = `
    <!-- <button onclick="addRow(event)">${Langs.add_customer}</button> -->
    
    <button style="width: auto;" onclick="sendings()">${Langs.send_inv}</button>`

    document.getElementById('inv_nam').innerHTML = `<p>${Langs.name}</p>
    <p>${Langs.email}</p>
    <p>${Langs.date}</p>
    <p>${Langs.status}</p>`

    document.getElementById('cou_nam').innerHTML = `<p>${Langs.status}</p>
    <p>${Langs.disc} %</p>
    <p>${Langs.exp} ${Langs.date}</p>
    <p>${Langs.usage_limit}</p>
    <p>${Langs.usg_tot}</p>
    <p>${Langs.status}</p>
    <p>${Langs.action}</p>`

    document.getElementById('coup_prom').innerHTML = `<p>${Langs.coup_pro}</p>
    <button onclick="showAddCouponCode(event, 'add')">${Langs.add_coupon}</button>`

    document.getElementById('stat').innerHTML = `<p>${Langs.stat_inv}</p>`

    document.getElementById('mancou').innerHTML = `<p>${Langs.coupon_code}</p>
    <p>${Langs.bud_allo}</p>
    <p>${Langs.bud_used}</p>
    <p>${Langs.balanced}</p>
    <p></p>`

    document.getElementById('cou').innerHTML = `<p>${Langs.manage} ${Langs.coupon_code}</p>`

    console.log(Langs, "LLLLLLLLLLLLLLLL")
}

async function sendings() {
    var profile = JSON.parse(localStorage.getItem('Login'));
    Posts(
        {
            email: document.getElementById('mail').value,
            name: document.getElementById('name').value,
            title: 'Your coupon code is : SEED12',
            method: 'POST',
            urls: 'sends',
            headerss: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + profile.token
            },
            actions: '',
            // saving: 'SendMail'
        }
    ).then((res)=>{
        console.log(res, "PPPPPPPPPPPPPPP")
        if(res.success)
        {
            window.location.reload();
        }
    })
}

async function AddCou() {
    if(popup.querySelector('.header.flex_row.space_between.center p').innerHTML=='Edit Coupon')
    {
        EditData()
    }
    else
    {
    Posts(
        {
            code: document.getElementById('co').value,
            value: document.getElementById('dv').value,
            expire: document.getElementById('exps').value,
            limit: document.getElementById('usglim').value,
            amount: document.getElementById('bug').value,
            min_amount: document.getElementById('minn').value,
            method: 'POST',
            urls: 'products/coupon',
            headerss: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + data.token
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
    var ind = ind
    var profile = JSON.parse(localStorage.getItem('Login'));
    var id = data[ind].id
    var sets = {}

    document.getElementById('co').value == datas[val.value].code ? null : sets.code = document.getElementById('co').value
    document.getElementById('dv').value == datas[val.value].value ? null : sets.value = document.getElementById('dv').value
    document.getElementById('exps').value == datas[val.value].expire ? null : sets.expire = document.getElementById('exps').value
    document.getElementById('usglim').value == datas[val.value].limit ? null : sets.limit = document.getElementById('usglim').value
    document.getElementById('bug').value == datas[val.value].amount ? null : sets.amount = document.getElementById('bug').value
    document.getElementById('minn').value == datas[val.value].min_amount ? null : sets.min_amount = document.getElementById('minn').value

    console.log(Object.keys(sets).length === 0 && sets.constructor === Object, ind, profile, data, id)
    if (!(Object.keys(sets).length === 0 && sets.constructor === Object)) {
        var bod = {
            "id": id,
            "new": sets
        }
        try {
            const response = await fetch(BASE_URL + 'cms/updatesupport', {
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
    var id = datas[ind].id
    try {
        const response = await fetch(BASE_URL + 'products/coupon/' + id, {
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