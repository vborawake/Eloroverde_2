const popup = document.querySelector('.popup.flex_column');
const details = document.querySelector('.details.popup.flex_column');
const right_section = document.querySelector('.right_section.flex_column');
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
    e.stopPropagation();
    if (e.currentTarget.children[0].innerHTML === 'Back &gt; Order Details') {
        // If user clicks on back
        // Hide table and pagination
        right_section.children[1].style.display = 'flex';
        right_section.children[2].style.display = 'flex';
        // Show User details
        setTimeout(() => {
            right_section.children[3].style.display = 'none';
        });
        requestAnimationFrame(() => {
            details.style.transform = 'scale(0)';
        });
    } else {
        // If user clicks on eye
        // Hide table and pagination
        right_section.children[1].style.display = 'none';
        right_section.children[2].style.display = 'none';
        // Show User details
        setTimeout(() => {
            right_section.children[3].style.display = 'flex';
        });
        requestAnimationFrame(() => {
            details.style.transform = 'scale(1)';
        });
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
    var text = ""
    Gets(
        {
            method: 'GET',
            urls: 'products/buynows',
            headerss: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+datas.token
            },
            actions: '',
            // saving: 'Payments'
        }
        ).then((res)=> {
            data = res
            for (var i = 0; i < data.mess.length; i++) {
                var prices = 0.00
                for(var j = 0; j < data.mess[i].products.length; j++)
                {
                    prices = prices + parseFloat(data.mess[i].products[j].price.slice(1))
                }
                var datess = new Date(data.mess[i].createdDate).getDate() + '/' + new Date(data.mess[i].createdDate).getMonth() + '/' + new Date(data.mess[i].createdDate).getFullYear()
                text = text + `<div class="values flex_row space_between center" id="table_stagger">
                <p>${i+1}</p>
                <p>${data.mess[i].user_details[0].name}</p>
                <p>${data.mess[i].user_details[0].email}</p>
                <p>${datess}</p>
                <p>$ ${parseInt(prices)}</p>
                <p id="success">${data.mess[i].status}</p>
                <div class="action flex_row space_between center">
                    <button><img src="../images/file_download_black.png" alt=""></button>
                    <button value="${i}" onclick="deleteProfile(this)"><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
                </div>
                </div>`+ '\n'
                }
                console.log(text, "TTTTTTTTTTTTTTTT");
                document.getElementById("orderss").innerHTML = text;
        })
}

function sets() {
    var text = "";
    var data = JSON.parse(localStorage.getItem('Orders'));
    if (data.mess.length != 0) {
        for (var i = 0; i < data.mess.length; i++) {
            var datess = new Date(data.mess[i].createdDate).getDate() + '/' + new Date(data.mess[i].createdDate).getMonth() + '/' + new Date(data.mess[i].createdDate).getFullYear()

            text = text + `<div class="values flex_row space_between center" id="table_stagger">
            <p>${i+1}</p>
            <p>${data.mess[i].user_details[0].name}</p>
            <p>${data.mess[i].user_details[0].email}</p>
            <p>${datess}</p>
            <p>${data.mess[i].price}</p>
            <p id="success">${data.mess[i].status}</p>
            <div class="action flex_row space_between center">
                <button><img src="../images/file_download_black.png" alt=""></button>
                <button><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
            </div>
            </div>`+ '\n'
            }
            console.log(text, "TTTTTTTTTTTTTTTT");
            document.getElementById("orderss").innerHTML = text;
            clearInterval(myInterval);
    }
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
        <li class="active flex_column justify_center">
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

    document.getElementById('manpay').innerHTML = `<h1>${Langs.man_pay}</h1>`

    document.getElementById('ordnam').innerHTML = `<p>#</p>
    <p>${Langs.userna}</p>
    <p>${Langs.email}</p>
    <p>${Langs.date}</p>
    <p>${Langs.amount}</p>
    <p>${Langs.status}</p>
    <p>${Langs.action}</p>`

    document.getElementById('ordlist').innerHTML = `<h1>${Langs.list_ord}</h1>`

}

async function deleteProfile(val) {
    var ind = parseInt(val.value);
    var profile = JSON.parse(localStorage.getItem('Login'));
    var id = data[ind].id
    try {
        const response = await fetch(BASE_URL + 'products/buynow/'+id, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer '+profile.token
          },
        });
        const result = await response.json();
        console.log("Response:", result);
        window.location.reload();
    } catch (error) {
        console.error("Error:", error);
    }
}