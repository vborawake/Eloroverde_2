const popup = document.querySelector('.popup.flex_column');
var myInterval
var Langs = {}
var data = []
var datas = JSON.parse(localStorage.getItem('Login'));

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

function showDetails(e) {
    popup.style.display = 'flex';
    popup.style.top = `${ window.scrollY + 50 }px`;
    requestAnimationFrame(() => {
        popup.style.transform = 'scale(1)';
    });
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
    var text = "";
    Gets(
        {
            method: 'GET',
            urls: 'cms/support',
            headerss: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+datas.token
            },
            actions: '',
            saving: 'Supports'
        }
    ).then((res)=> {
        data = res
        for (var i = 0; i < data.length; i++) {
            dates = new Date(data[i].createdDate)
            text = text + `<div class="values flex_row space_between center" id="table_stagger">
            <p>${i+1}</p>
            <p>${data[i].name}</p>
            <p>${i+1}</p>
            <p onmouseenter="showTooltip(event)" onmouseleave="hideTooltip(event)">${data[i].email}</p>
            <p onmouseenter="showTooltip(event)" onmouseleave="hideTooltip(event)">${data[i].message}</p>
            <p>${dates.getFullYear()+'-' + (dates.getMonth()+1) + '-'+dates.getDate()}</p>
            <div class="action flex_row space_between center">
                <button value="${i}" onclick="showDetails(event);setDatas(this);"><img src="../images/visibility_black_24dp 5.png" alt=""></button>
                <button value="${i}" onclick="deleteData(this)"><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
            </div>
            </div>`+ '\n'
            }
            console.log(text, "TTTTTTTTTTTTTTTT");
            document.getElementById("datass").innerHTML = text;
    })

    // myInterval = setInterval(sets, 1000);
    // return myInterval
}

function sets() {
    var text = "";
    var data = JSON.parse(localStorage.getItem('Supports'));
    if (data.length != 0) {
        for (var i = 0; i < data.length; i++) {
            dates = new Date(data[i].createdDate)
            text = text + `<div class="values flex_row space_between center" id="table_stagger">
            <p>${i+1}</p>
            <p>${data[i].name}</p>
            <p>${i+1}</p>
            <p>${data[i].email}</p>
            <p>${data[i].message}</p>
            <p>${dates.getFullYear()+'-' + (dates.getMonth()+1) + '-'+dates.getDate()}</p>
            <div class="action flex_row space_between center">
                <button value="${i}" onclick="showDetails(event);setDatas(this);"><img src="../images/visibility_black_24dp 5.png" alt=""></button>
                <button><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
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
    var data = JSON.parse(localStorage.getItem('Supports'));
    dates = new Date(data[parseInt(val.value)].createdDate)
    document.getElementById('names').value = data[parseInt(val.value)].name
    document.getElementById('emails').value = data[parseInt(val.value)].email
    document.getElementById('status').value = data[parseInt(val.value)].status
    document.getElementById('messages').value = data[parseInt(val.value)].message
    document.getElementById('reqid').value = parseInt(val.value)+1
    document.getElementById('contacts').value = data[parseInt(val.value)].contact
    document.getElementById('dates').value = dates.getFullYear()+'-' + (dates.getMonth()+1) + '-'+dates.getDate()
    // parseInt(val.value);
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
        <li class="flex_column justify_center">
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
        <li class="active flex_column justify_center">
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
    
    document.getElementById('transnam').innerHTML = `<p>#</p>
    <p>${Langs.name}</p>
    <p>${Langs.req_id}</p>
    <p>${Langs.email}</p>
    <p>${Langs.mess}</p>
    <p>${Langs.date}</p>
    <p>${Langs.action}</p>`

    document.getElementById('supp').innerHTML = `<h1>${Langs.sup_man}</h1>`

}

async function deleteData(val) {
    var ind = parseInt(val.value);
    var id = data[ind].id
    try {
        const response = await fetch(BASE_URL + 'cms/support/'+id, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer '+datas.token
          },
        });
        const result = await response.json();
        console.log("Response:", result);
        window.location.reload();
    } catch (error) {
        console.error("Error:", error);
    }
}

async function EditData() {
    var ind = parseInt(document.getElementById('reqid').value) - 1
    var profile = JSON.parse(localStorage.getItem('Login'));
    var id = data[ind].id
    var sets = {}
    
    data[ind].contact ==  document.getElementById('contacts').value ? null : sets.contact =  document.getElementById('contacts').value
    data[ind].name == document.getElementById('names').value ? null : sets.name = document.getElementById('names').value
    data[ind].email == document.getElementById('emails').value ? null : sets.email = document.getElementById('emails').value
    data[ind].status == document.getElementById('status').value ? null : sets.status = document.getElementById('status').value
    data[ind].message == document.getElementById('messages').value ? null : sets.message = document.getElementById('messages').value
    
    console.log(Object.keys(sets).length === 0 && sets.constructor === Object, ind, profile, data, id)
    if(!(Object.keys(sets).length === 0 && sets.constructor === Object))
    {
    var bod = {
        "id": id,
        "new": sets
    }
    try {
        const response = await fetch(BASE_URL + 'cms/updatesupport', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer '+profile.token
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

const showTooltip = (e) => {
    tooltip.innerText = e.currentTarget.innerText;
    tooltip.style.top = (e.currentTarget.getBoundingClientRect().top + window.scrollY - 20) + 'px';
    tooltip.style.left = e.currentTarget.getBoundingClientRect().left + 'px';
    tooltip.style.opacity = '1';
}

const hideTooltip = () => {
    tooltip.style.opacity = '0';
}