const popup = document.querySelector('.popup.flex_column');
const details = document.querySelector('.details.popup.flex_column');
const right_section = document.querySelector('.right_section.flex_column');
var myInterval
var datas = JSON.parse(localStorage.getItem('Login'));
var data = []

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
        addAnimations();
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
            // saving: 'Orders'
        }
        ).then((res)=>{
            console.log(res, "OOOOOOOOOO")
            data = res
            for (var i = 0; i < data.mess.length; i++) {
                var imagess = JSON.parse(data.mess[i].product_details[0].image.replace(/'/g, '"'))
                var datess = new Date(data.mess[i].createdDate).getDate() + '/' + new Date(data.mess[i].createdDate).getMonth() + '/' + new Date(data.mess[i].createdDate).getFullYear()
                var hour
                if(parseInt(new Date(data.mess[i].createdDate).getHours())>12)
                {
                    hour = (parseInt(new Date(data.mess[i].createdDate).getHours()) - 12).toString() + ' : ' + new Date(data.mess[i].createdDate).getMinutes() + ' PM'
                }
                else
                {
                    hour = new Date(data.mess[i].createdDate).getHours() + ' : ' + new Date(data.mess[i].createdDate).getMinutes() + ' AM'
                }
                var timess = hour
                // console.log(imagess,"IIIIIIIIII")
                text = text + `<div class="values flex_row space_between center" id="table_stagger">
                <p>${data.mess[i].user_details[0].name}</p>
                <p>${data.mess[i]._id.slice(0, 5)}</p>
                <p>${data.mess[i].product_details[0].name}</p>
                <div class="image flex_row justify_center">
                    <img src="data:image/png;base64, ${imagess[0]}">
                </div>
                <p>${datess + ' ' + timess}</p>
                <p>${data.mess[i].price}</p>
                <p>${data.mess[i].status}</p>
                <div class="action flex_row space_between center">
                    <button value="${i}" onclick="showDetails(event, 'product_details'); setDatas(this)"><img src="../images/eye.png" alt=""></button>
                    <button><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
                </div>
                </div>`+ '\n'
                }
                console.log(text, "TTTTTTTTTTTTTTTT");
                document.getElementById("orderss").innerHTML = text;
        })
    // myInterval = setInterval(sets, 1000);
    // return myInterval
}

function sets() {
    var text = "";
    var data = JSON.parse(localStorage.getItem('Orders'));
    if (data.mess.length != 0) {
        for (var i = 0; i < data.mess.length; i++) {
            var imagess = JSON.parse(data.mess[i].product_details[0].image.replace(/'/g, '"'))
            var datess = new Date(data.mess[i].createdDate).getDate() + '/' + new Date(data.mess[i].createdDate).getMonth() + '/' + new Date(data.mess[i].createdDate).getFullYear()
            var hour
            if(parseInt(new Date(data.mess[i].createdDate).getHours())>12)
            {
                hour = (parseInt(new Date(data.mess[i].createdDate).getHours()) - 12).toString() + ' : ' + new Date(data.mess[i].createdDate).getMinutes() + ' PM'
            }
            else
            {
                hour = new Date(data.mess[i].createdDate).getHours() + ' : ' + new Date(data.mess[i].createdDate).getMinutes() + ' AM'
            }
            var timess = hour
            // console.log(imagess,"IIIIIIIIII")
            text = text + `<div class="values flex_row space_between center" id="table_stagger">
            <p>${data.mess[i].user_details[0].name}</p>
            <p>${data.mess[i]._id.slice(0, 5)}</p>
            <p>${data.mess[i].product_details[0].name}</p>
            <div class="image flex_row justify_center">
                <img src="data:image/png;base64, ${imagess[0]}">
            </div>
            <p>${datess + ' ' + timess}</p>
            <p>${data.mess[i].price}</p>
            <p>${data.mess[i].status}</p>
            <div class="action flex_row space_between center">
                <button value="${i}" onclick="showDetails(event, 'product_details'); setDatas(this)"><img src="../images/eye.png" alt=""></button>
                <button><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
            </div>
            </div>`+ '\n'
            }
            console.log(text, "TTTTTTTTTTTTTTTT");
            document.getElementById("orderss").innerHTML = text;
            clearInterval(myInterval);
    }
}

function setDatas(val) {
    console.log(val, val.value)
    var data = JSON.parse(localStorage.getItem('Orders'));
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
        <li class="active flex_column justify_center">
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

    document.getElementById('ord_rec').textContent = Langs.list_ord

    document.getElementById('cusnam').innerHTML = `<p>${Langs.cust_name}</p>
    <p>${Langs.order_id}</p>
    <p>${Langs.pro_name}</p>
    <p>${Langs.image}</p>
    <p>${Langs.date}</p>
    <p>${Langs.amount}</p>
    <p>S${Langs.status}tatus</p>
    <p>${Langs.action}</p>`

    console.log(Langs, "LLLLLLLLLLLLLLLL")
}


function goes1() {
    var prodss = [];
    var text = "";
    // console.log(data.token, "kkkkkkkkkkkk")
    Gets(
        {
            method: 'GET',
            urls: 'products/buynows',
            headerss: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+datas.token
            },
            actions: '',
            // saving: 'Orders'
        }
    ).then((res)=> {
        // console.log(res.mess,"GGGGGGGGGGGGGGGG")
            for (var i = 0; i < res.mess.length; i++) {
                // console.log(res.mess[i].products, "PPPPPPPPPPPPPPPPPp")
                var datess = new Date(res.mess[i].createdDate).getDate() + '/' + new Date(res.mess[i].createdDate).getMonth() + '/' + new Date(res.mess[i].createdDate).getFullYear()
                var hour
                if(parseInt(new Date(res.mess[i].createdDate).getHours())>12)
                {
                    hour = (parseInt(new Date(res.mess[i].createdDate).getHours()) - 12).toString() + ' : ' + new Date(res.mess[i].createdDate).getMinutes() + ' PM'
                }
                else
                {
                    hour = new Date(res.mess[i].createdDate).getHours() + ' : ' + new Date(res.mess[i].createdDate).getMinutes() + ' AM'
                }
                var timess = hour
                prodss.push({
                    address : res.mess[i].address,
                    coupon : res.mess[i].coupon,
                    createdDate : res.mess[i].createdDate,
                    id : res.mess[i].id,
                    products : res.mess[i].products,
                    status : res.mess[i].status,
                    uid : res.mess[i].uid,
                    user_details : res.mess[i].user_details,
                    __v : res.mess[i].__v,
                    _id : res.mess[i]._id
                })

                for(var j = 0; j<res.mess[i].products.length; j++)
                {
                text = text + `<div class="values flex_row space_between center" id="table_stagger">
                <p>${res.mess[i].user_details[0].name}</p>
                <p>${res.mess[i]._id.slice(0, 5)}</p>
                <p>${res.mess[i].products[j].product_details.product_name || res.mess[i].products[j].product_details.name}</p>
                <div class="image flex_row justify_center">
                    <img src="data:image/png;base64, ${res.mess[i].products[j].product_details.image.includes("[") ? JSON.parse(res.mess[i].products[j].product_details.image.replace(/'/g, '"'))[0] : res.mess[i].products[j].product_details.image}" style="height: 50px; width: 50px;">
                </div>
                <p>${datess + ' ' + timess}</p>
                <p>${res.mess[i].products[j].price}</p>
                <p>${res.mess[i].status}</p>
                <div class="action flex_row space_between center">
                    <button value="${i}" onclick="showDetails(event, 'product_details'); setDatas(this)"><img src="../images/eye.png" alt=""></button>
                    <!-- <button><img src="../images/delete_outline_black_24dp 1.png" alt=""></button> -->
                </div>
                </div>`
                }
                console.log(text, "TTTTTTTTTTTTTTTT");
            }
            // console.log(text, "TTTTTTTTTTTTTTTT");
            if (text === '') text = `<p style='font-size: 1.5rem; padding: 2rem 0; color: #E7B82A; font-weight: 600; text-align: center;'>No Data Found</p>`
            document.getElementById("orderss").innerHTML = text;
    })
}