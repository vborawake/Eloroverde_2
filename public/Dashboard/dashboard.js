const area = document.getElementById('area');
const areaCtx = area ? area.getContext('2d') : null;
const doughnut = document.getElementById('doughnut');
const doughnutCtx = doughnut ? doughnut.getContext('2d') : null;
const line = document.getElementById('line');
const lineCtx = line ? line.getContext('2d') : null;
const bar = document.getElementById('bar');
const barCtx = bar ? bar.getContext('2d') : null;
const summary = document.getElementById('summary');
const popup = document.querySelector('.popup.flex_column');
var myInterval, myInterval1;
var datas
var data = JSON.parse(localStorage.getItem('Login'));

var Langs = {}

async function change() {
    console.log(LANG, "LLLLLLLLLLLLLLLLLLLLL")
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
            <li class="active flex_column justify_center">
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

        document.getElementById('menus').innerHTML = `<div class="menu flex_column" id="menu">
        <div class="item flex_row center" onclick="window.location.href = '../Profile/profile.html'">
            <img src="../images/account_circle_green.png" alt="">
            <p>Profile</p>
        </div>
        <!-- <div class="item flex_row center" onclick="window.location.href = '../Profile/profile.html'; localStorage.setItem('password', 'true')">
            <img src="../images/password_green.png" alt="">
            <p>Change Password</p>
        </div>
        <div class="item flex_row center" onclick="window.location.href = '../Notification Settings/settingsAdmin.html'">
            <img src="../images/notifications_green.png" alt="">
            <p>Notification Settings</p>
        </div> -->
        <div class="item flex_row center" onclick="window.location.href = '../Login/login.html'">
            <img src="../images/logout_green.png" alt="">
            <p>Logout</p>
        </div>
        </div>`

        document.getElementById('catnam').innerHTML = `<p>#</p>
        <p>${Langs.name}</p>
        <p>${Langs.address}</p>
        <p>${Langs.quantity}</p>
        <p>${Langs.order_amount}</p>
        <p>${Langs.status}</p>
        <p>${Langs.action}</p>`

        document.getElementById('conv').innerHTML = `<div class="header flex_row space_between center width_full">
        <h1>${Langs.conversions}</h1>
        <div class="date_picker flex_row space_between center">
            <p>May 2023</p>
            <svg width="24" height="24" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.0417 2H12.25V0H10.6667V2H4.33333V0H2.75V2H1.95833C1.07958 2 0.382917 2.9 0.382917 4L0.375 18C0.375 19.1 1.07958 20 1.95833 20H13.0417C13.9125 20 14.625 19.1 14.625 18V4C14.625 2.9 13.9125 2 13.0417 2ZM13.0417 18H1.95833V8H13.0417V18ZM5.125 12H3.54167V10H5.125V12ZM8.29167 12H6.70833V10H8.29167V12ZM11.4583 12H9.875V10H11.4583V12ZM5.125 16H3.54167V14H5.125V16ZM8.29167 16H6.70833V14H8.29167V16ZM11.4583 16H9.875V14H11.4583V16Z" fill="#9699A0"/>
            </svg>
            <input type="date" name="" id="">
        </div>
        </div>`

        document.getElementById('raff').textContent = Langs.raffel

        document.getElementById('renv').innerHTML = `<h1>${Langs.revenue}</h1>
        <div class="date_picker flex_row space_between center">
            <p>2023</p>
            <svg width="24" height="24" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.0417 2H12.25V0H10.6667V2H4.33333V0H2.75V2H1.95833C1.07958 2 0.382917 2.9 0.382917 4L0.375 18C0.375 19.1 1.07958 20 1.95833 20H13.0417C13.9125 20 14.625 19.1 14.625 18V4C14.625 2.9 13.9125 2 13.0417 2ZM13.0417 18H1.95833V8H13.0417V18ZM5.125 12H3.54167V10H5.125V12ZM8.29167 12H6.70833V10H8.29167V12ZM11.4583 12H9.875V10H11.4583V12ZM5.125 16H3.54167V14H5.125V16ZM8.29167 16H6.70833V14H8.29167V16ZM11.4583 16H9.875V14H11.4583V16Z" fill="#9699A0"/>
            </svg>
            <input type="date" name="" id="">
        </div>`

        document.getElementById('welc').innerHTML = `<h1>${Langs.welcome}, <span id="username">Admin</span></h1>
        <p>${Langs.here}</p>`

        document.getElementsByName('tot').innerHTML = `<div class="stat flex_column space_evenly" id="stat_stagger">
        <div class="top_row flex_row center">
            <img src="../images/sales.png" alt="sales">
            <p>${Langs.total}</p>
        </div>
        <div class="bottom_row flex_row space_between center">
            <p>€ 2224.90</p>
            <img src="../images/sales_icon.png" alt="">
        </div>
        </div>
        <div class="stat flex_column space_evenly" id="stat_stagger">
            <div class="top_row flex_row center">
                <img src="../images/unique_visitor.png" alt="sales">
                <p>${Langs.visitors}</p>
            </div>
            <div class="bottom_row flex_row space_between center">
                <p>25632</p>
                <img src="../images/sales_icon.png" alt="">
            </div>
        </div>
        <div class="stat flex_column space_evenly" id="stat_stagger">
            <div class="top_row flex_row center">
                <img src="../images/box.png" alt="sales">
                <p>${Langs.orders}</p>
            </div>
            <div class="bottom_row flex_row space_between center">
                <p>2000</p>
                <img src="../images/sales_icon.png" alt="">
            </div>
        </div>
        <div class="stat flex_column space_evenly" id="stat_stagger">
            <div class="top_row flex_row center">
                <img src="../images/unit.png" alt="sales">
                <p>${Langs.unit}</p>
            </div>
            <div class="bottom_row flex_row space_between center">
                <p>1236</p>
                <img src="../images/sales_icon.png" alt="">
            </div>
        </div>`

        document.getElementById('sal').textContent = Langs.sales

}

function showDetails(e) {
    popup.style.display = 'flex';
    popup.style.top = `${ window.scrollY }px`;
    requestAnimationFrame(() => {
        popup.style.transform = 'scale(1)';
    });
}


const placeText = {
    id: 'centerText',
    afterDatasetsDraw(chart, args, pluginOptions) {
        const {ctx} = chart;
        const text = 'Total 212';
        ctx.save();

        const x = chart.getDatasetMeta(0).data[0].x;
        const y = chart.getDatasetMeta(0).data[0].y;

        ctx.textAlign = 'center';

        ctx.font = 'bold 16px sans-serif';

        ctx.fillText(text, x, y);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (areaCtx) {
        new Chart(areaCtx, {
            type: 'line',
            data: {
                labels: ['4/05', '8/05', '12/05', '16/05', '20/05', '24/05', '28/05'],
                datasets: [
                    {
                        label: 'Orders',
                        data: [40, 54, 58, 42, 56, 40, 56, 35, 42],
                        fill: true,
                        backgroundColor: '#19214F'
                    },
                    // {
                    //     label: 'Female',
                    //     data: [50, 64, 68, 52, 66, 50, 66, 45, 52],
                    //     fill: true,
                    //     backgroundColor: '#00A962'
                    // }
                ]
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                            boxWidth: 10
                        }
                    }
                }
            }
        });
    }

    if (doughnutCtx) {

            var text = [];
            var values = [];
            Gets(
                {
                    method: 'GET',
                    urls: 'products/category/'+data._id,
                    headerss: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer '+data.token
                    },
                    actions: '',
                    // saving: 'Category'
                }
                ).then((res)=>{
                    console.log(res, "RRRRRRRRRRR");
                    // data = res.data
                    for (var i = 0; i < res.data.length; i++) {
                        text.push(res.data[i].name)
                        values.push(res.data[i].name);
                    }
                    console.log(text, "TTTTTTTTTTTTTTTTTTTT")

        new Chart(doughnutCtx, {
            type: 'pie',
            data: {
                // labels: ['Others', 'Toxin Cleaners', 'Vaporizers', 'Vaporizers', 'Seeds'],
                labels: text,
                datasets: [
                    {
                        data: [20, 18, 15, 15, 16, 16],
                        backgroundColor: ['#2F7099', '#CD0508', '#33A142', '#172074', '#E7B82A', 'brown'],
                        cutout: 60,
                        borderColor: 'transparent'
                    }
                ]
            },
            options: {
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                responsive: false,
                maintainAspectRatio: false
            }
        });
        // setSummary();
        })
    }

    if (lineCtx) {
        new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: ['4/05', '8/05', '12/05', '16/05', '20/05', '24/05', '28/05'],
                datasets: [
                    {
                        label: 'Orders',
                        data: [40, 54, 58, 42, 56, 40, 56, 35, 42],
                        borderColor: '#33A142',
                        cubicInterpolationMode: 'monotone'
                    },
                    // {
                    //     label: 'Female',
                    //     data: [50, 64, 68, 52, 66, 50, 66, 45, 52],
                    //     borderColor: '#CD0508',
                    //     cubicInterpolationMode: 'monotone'
                    // }
                ]
            },
            options: {
                plugins: [{
                    legend: {
                        labels: {
                            usePointStyle: true,
                            boxWidth: 10
                        }
                    }
                }, placeText],
                responsive: true,
                maintainAspectRatio: true
            }
        });
    }

    if (barCtx) {
        const gradient = barCtx.createLinearGradient(bar.width / 2, 0, bar.width / 2, bar.height * 2);
        gradient.addColorStop(0, '#E7B82A');
        gradient.addColorStop(1, '#33A142');
        
        const data = {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
            datasets: [{
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40, 81, 65, 80, 59, 40, 56, 55],
                backgroundColor: [
                gradient
                ],
                borderRadius: ['50'],
                borderWidth: 1,
                barThickness: 20
            }],
        };
    
        new Chart(barCtx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                fontColor: '#FFF'
                            }
                        }
                    ]
                }
            }
        });
    }
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

    gsap.from('#stat_stagger', {
        y: '-2rem',
        opacity: 0,
        delay: 0.5,
        stagger: 0.3
    });

    gsap.from('#chart_stagger', {
        y: '-2rem',
        opacity: 0,
        delay: 1,
        stagger: 0.3
    });

    gsap.from('.order_details', {
        y: '-2rem',
        opacity: 0,
        duration: 0.5
    });
}

// function setSummary() {
//     summary.style.top = `${ doughnut.getBoundingClientRect().height / 2 + 10 }px`;
//     summary.style.left = `${ doughnut.getBoundingClientRect().width / 2 - doughnut.getBoundingClientRect().width * 0.165 }px`;
//     summary.style.textAlign = 'center';
// }

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

function showPopup(e) {
    e.stopPropagation();
    if (e.target.classList.contains('profile_img') || e.target.classList.contains('username')) {
        gsap.to(e.currentTarget.nextElementSibling, {
            display: 'flex',
            transform: 'scaleY(1)'
        });
        if (e.currentTarget.nextElementSibling.style.transform === 'scaleY(0)' || e.currentTarget.nextElementSibling.style.transform === '') {
            // e.currentTarget.nextElementSibling.style.transform = 'scaleY(1)';
        }
        else e.currentTarget.nextElementSibling.style.transform = 'scaleY(0)';
    }
}

function getProfile(data) {
    document.getElementById('username').innerText = data.name;
    document.getElementById('name').innerText = data.name;
}

function grace() {
    var text = "";
    Gets(
        {
            method: 'GET',
            urls: 'games/gamewinner',
            headerss: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+data.token
            },
            actions: '',
            // saving: 'GameWinners'
        }
    ).then((res)=> {
        datas = res
        console.log(res, "RRRRRRRRRRRRRRRRr")
            for (var i = 0; i < res.length; i++) {
                text = text + `<div class="value flex_row center space_between">
                <div class="left_section flex_row center">
                    <div class="image"></div>
                    <div class="text flex_column">
                        <p>${res[i].name.slice(0, 5)}</p>
                        <div class="reward flex_row center">
                            <p>Prize Won <span id="prize">${res[i].prize.slice(0, 5)}</span></p>
                        </div>
                    </div>
                </div>
                <div class="right_section">
                    <div class="text flex_column space_between">
                        <p id="date">${res[i].createdDate.toString().slice(0, 5)}</p>
                        <a href="#">
                            <p>More --&gt;</p>
                        </a>
                    </div>
                </div>`+ '\n'
                }
                // console.log(text, "TTTTTTTTTTTTTTTT");
                if (text === '') text = `<p style='font-size: 1.5rem; padding: 2rem 0; color: #E7B82A; font-weight: 600; text-align: center;'>No Data Found</p>`
                document.getElementById("datass").innerHTML = text;
    })
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
                'authorization': 'Bearer '+data.token
            },
            actions: '',
            // saving: 'Orders'
        }
    ).then((res)=> {
        console.log(res.mess,"GGGGGGGGGGGGGGGG")
            for (var i = 0; i < res.mess.length; i++) {
                // console.log(res.mess[i].products, "PPPPPPPPPPPPPPPPPp")
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
                text = text + `<div class="value flex_row space_between center">
                <div class="image">
                    <img src="data:image/png;base64, ${res.mess[i].products[j].product_details.image}" style="width: 50px;  height: 50px;">
                </div>
                <p>${res.mess[i].products[j].product_details.product_name || res.mess[i].products[j].product_details.name}</p>
                <p>${res.mess[i].address}</p>
                <p>${i+1}</p>
                <p>$ ${res.mess[i].products[j].price}</p>
                <div class="text flex_column center">
                    <p id="success">Paid</p>
                    <p id="success">Delivered</p>
                </div>
                <div class="action flex_row space_between center">
                    <button><img src="../images/file_download_black.png" alt=""></button>
                    <!-- <button><img src="../images/delete_outline_black_24dp 1.png" alt=""></button> -->
                </div>
                </div>`
                }
                console.log(text, "TTTTTTTTTTTTTTTT");
            }
            // console.log(text, "TTTTTTTTTTTTTTTT");
            document.getElementById("orderss").innerHTML = text;
    })
}
