const popup = document.querySelector('.popup.flex_column');
const details = document.querySelector('.details.popup.flex_column');
const right_section = document.querySelector('.right_section.flex_column');
var myInterval
var data = []
var Langs = {}

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

async function showDetails(e, val) {
    console.log(e, val, "VVVVVVVVVVVVVVVVVVVVV")
    console.log(val.value,"VVVVVVVVVVVVV");
    // var data = JSON.parse(localStorage.getItem('Users'));

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
        document.querySelector('.appointments').style.display = 'flex';
        document.querySelector('.footer').style.display = 'flex';
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
    var text = "";
    var datas = JSON.parse(localStorage.getItem('Login'));
    Gets(
        {
            method: 'GET',
            urls: 'user',
            headerss: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+datas.token
            },
            actions: '',
            // saving: 'Users'
        }
    ).then((res)=> {
        console.log(res, "RRRRRRRRRRRR")
        data = res.data
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
            <p onmouseenter="showTooltip(event)" onmouseleave="hideTooltip(event)">${data[i].email}</p>
            <p>${dates+' '+times}</p>
            <p>${data[i].active ? 'Active' : 'Inactive'}</p>
            <div class="action flex_row space_between center">
                <button value="${i}" onclick="showDetails(event, this, ${i})"><img src="../images/eye.png" alt=""></button>
                <button class='delete' value="${i}" onclick="{
                    showDetails(event, this, ${i})
                    }"><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
            </div>
            </div>`+ '\n'
            }
            console.log(text, "TTTTTTTTTTTTTTTT");
            document.getElementById("datass").innerHTML = text;
    })

    // myInterval = setInterval(sets, 1000);
    // return myInterval
}

// function sets() {
//     var text = "";
//     var data = JSON.parse(localStorage.getItem('Users'));
//     if (data.length != 0) {
//         for (var i = 0; i < data.length; i++) {
//             let date = new Date(data[i].createdDate);
//             let times = date.toLocaleString([], {
//                 hour: '2-digit',
//                 minute: '2-digit'
//             });
//             let dates = new Date(data[i].createdDate).toISOString().substring(0, 10)

//             text = text + `<div class="values flex_row space_between center" id="table_stagger">
//             <div class="user flex_row center">
//                 <span></span>
//                 <p>${data[i].name}</p>
//             </div>
//             <p>-</p>
//             <p>${data[i].email}</p>
//             <p>${dates+' '+times}</p>
//             <p>${data[i].active ? 'Active' : 'Inactive'}</p>
//             <div class="action flex_row space_between center">
//                 <button value="${i}" onclick="showDetails(event, this, ${i})"><img src="../images/eye.png" alt=""></button>
//                 <button value="${i}" onclick="{
//                     deleteProfile(event, this, ${i})
//                     }"><img src="../images/delete_outline_black_24dp 1.png" alt=""></button>
//             </div>
//             </div>`+ '\n'
//             }
//             console.log(text, "TTTTTTTTTTTTTTTT");
//             document.getElementById("datass").innerHTML = text;
//             clearInterval(myInterval);
//     }
// }

async function deleteProfile(event, val, i) {
    var ind = parseInt(val.value);
    var profile = JSON.parse(localStorage.getItem('Login'));
    // var data = JSON.parse(localStorage.getItem('Users'));
    var id = data[ind].id
    document.querySelector('.delete_popup').style.display = 'flex';
    gsap.from('.delete_popup', {
        y: '-2rem',
        opacity: 0,
        duration: 0.5
    });
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

    var text = `<p>${Langs.name}</p>
    <p>${Langs.loc}</p>
    <p>${Langs.email}</p>
    <p>${Langs.logedin}</p>
    <p>${Langs.status}</p>
    <p>${Langs.action}</p>`

    document.getElementById('user_head').innerHTML = text

    document.getElementById('sides').innerHTML = `<div class="sidebar flex_column">
    <img src="../images/logo.png">
    <ul>
        <li class="flex_column justify_center">
            <a href="../Dashboard/dashboard.html" class="flex_row center">
                <img src="../images/dashboard.png" alt="dashboard">
                <p>${Langs.dashboard}</p>
            </a>
        </li>
        <li class="active flex_column justify_center">
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
    
    document.getElementById('lis').textContent = Langs.logged

    document.getElementById('use_man').textContent = Langs.user_management

    document.getElementById('popps').innerHTML = `<div class="form flex_row">
    <div class="form_left_section flex_column center">
        <div class="image">
            <input type="file" disabled>
        </div>
        <!-- <button>${Langs.delete}</button>
        <button>${Langs.block}</button> -->
    </div>
    <div class="form_right_section flex_column">
        <div class="half_input flex_row center space_between">
            <div class="input flex_row center">
                <p>${Langs.name}</p>
                <input type="text" placeholder="Dr. Astrid Helena" disabled id="nam">
            </div>
            <div class="input flex_row center">
                <p>${Langs.loc}</p>
                <input type="text" placeholder="-" disabled id="loc">
            </div>
        </div>
        <div class="half_input flex_row center space_between">
            <div class="input flex_row center">
                <p>${Langs.email}</p>
                <input type="text" placeholder="astid@gmail.com" disabled id="ema">
            </div>
            <div class="input flex_row center">
                <p>${Langs.cont}</p>
                <div class="contact flex_row space_between center">
                    <div class="country_code">
                        <input type="text" placeholder="+81" disabled>
                    </div>
                    <div class="number">
                        <input type="text" placeholder="25489662256" disabled id="phon">
                    </div>
                </div>
            </div>
        </div>
        <div class="half_input flex_row center space_between">
            <div class="input flex_row center">
                <p>${Langs.email}</p>
                <input type="date" id="logg" disabled>
            </div>
            <div class="input flex_row center">
                <p>${Langs.logtim}</p>
                <input type="time" id="loggtime" disabled>
            </div>
        </div>
        <div class="half_input flex_row center space_between">
            <div class="input flex_row center">
                <p>${Langs.status}</p>
                <input type="text" placeholder="Active" id="stat">
            </div>
            <div class="input flex_row center">
                <p>${Langs.prev_ord}</p>
                <div class="select">
                    <p class="selected_item flex_column justify_center">Yes</p>
                    <div class="select_menu flex_column">
                        <p class="item flex_column justify_center">Yes</p>
                        <p class="item flex_column justify_center">No</p>
                    </div>
                </div>
                <!-- <input type="text" placeholder="Male"> -->
            </div>
        </div>
        <!-- <div class="order_details flex_column">
            <div class="table_header flex_row space_between center">
                <p>#</p>
                <p>${Langs.pro_name}</p>
                <p>${Langs.address}</p>
                <p>${Langs.quantity}</p>
                <p>${Langs.orders} ${Langs.amount}</p>
                <p>${Langs.status}</p>
            </div>
            <div class="value flex_row space_between center">
                <div class="image">
                    <span></span>
                </div>
                <p>Lorem, ipsum.</p>
                <p>Avda. 1º de Mayo...,Spain</p>
                <p>2</p>
                <p>$ 2548</p>
                <div class="text flex_column center">
                    <p id="success">Paid</p>
                    <p id="success">Delivered</p>
                </div>
            </div>
            <div class="value flex_row space_between center">
                <div class="image">
                    <span></span>
                </div>
                <p>Lorem, ipsum.</p>
                <p>Avda. 1º de Mayo...,Spain</p>
                <p>2</p>
                <p>$ 2548</p>
                <div class="text flex_column center">
                    <p id="pending">In Process</p>
                </div>
            </div>
        </div> -->
    </div>
    </div>`

    console.log(Langs, "LLLLLLLLLLLLLLLL")
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