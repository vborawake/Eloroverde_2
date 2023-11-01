const defaultSection = document.querySelector('.content.flex_column');
const splashScreen = document.querySelector('.splash_screen.flex_column');
const introductionScreen = document.querySelector('.introduction_screen.flex_column');
const termsConditions = document.querySelector('.terms_conditions.flex_column');
const categoryScreen = document.querySelector('.faq');
const helpCenter = document.querySelector('.help_center.flex_column');
var myInterval
var datas = JSON.parse(localStorage.getItem('Login'));
var data = []

function showEditScreen(e, which) {
    console.log('Triggered');
    
    if (which === 'header') {
        console.log();
        if (e.currentTarget.querySelector('p').innerHTML === 'Content Management System (CMS)') return;
        if (e.currentTarget.querySelector('p').innerHTML === 'Back &lt; FAQ &lt; Sign Up &amp; Login') {
            categoryScreen.style.display = 'block';
            splashScreen.style.display = 'none';
            introductionScreen.style.display = 'none';
            termsConditions.style.display = 'none';
            defaultSection.style.display = 'none';
            categoryScreen.querySelector('.screen_1.width_full').style.display = 'block';
            categoryScreen.querySelector('.screen_2.width_full').style.display = 'none';
            categoryScreen.querySelector('.screen_3.width_full').style.display = 'none';
            document.querySelector('.content_header.flex_row.space_between.center p').innerHTML = 'Back &lt; FAQ';
            document.querySelector('.content_header.flex_row.space_between.center button').innerHTML = 'Add New Category';
            return;
        }
        helpCenter.style.display = 'none';
        splashScreen.style.display = 'none';
        introductionScreen.style.display = 'none';
        termsConditions.style.display = 'none';
        defaultSection.style.display = 'flex';
        categoryScreen.style.display = 'none';
        e.currentTarget.querySelector('p').innerHTML = 'Content Management System (CMS)';
        e.currentTarget.querySelector('button').style.display = 'none';
        addAnimations();
    } else if (which === 'splash') {
        splashScreen.style.display = 'flex';
        introductionScreen.style.display = 'none';
        termsConditions.style.display = 'none';
        defaultSection.style.display = 'none';
        categoryScreen.style.display = 'none';
        // Change the heading value
        e.currentTarget.parentElement.parentElement.parentElement.previousElementSibling.querySelector('p').innerHTML = 'Back &lt; Edit Splash Screen';
        e.currentTarget.parentElement.parentElement.parentElement.previousElementSibling.querySelector('button').style.display = 'none';
        gsap.from('#screen', {
            y: '-2rem',
            opacity: 0,
            duration: 0.5
        });
    } else if (which === 'terms') {
        splashScreen.style.display = 'none';
        introductionScreen.style.display = 'none';
        termsConditions.style.display = 'flex';
        defaultSection.style.display = 'none';
        categoryScreen.style.display = 'none';
        // Change the heading value
        e.currentTarget.parentElement.parentElement.parentElement.previousElementSibling.querySelector('p').innerHTML = 'Back &lt; Edit Terms & Conditions';
        e.currentTarget.parentElement.parentElement.parentElement.previousElementSibling.querySelector('button').style.display = 'none';
        gsap.from('#screen', {
            y: '-2rem',
            opacity: 0,
            duration: 0.5
        });
    } else if (which === 'faq') {
        categoryScreen.style.display = 'block';
        splashScreen.style.display = 'none';
        introductionScreen.style.display = 'none';
        termsConditions.style.display = 'none';
        defaultSection.style.display = 'none';
        categoryScreen.querySelector('.screen_1.width_full').style.display = 'block';
        categoryScreen.querySelector('.screen_2.width_full').style.display = 'none';
        document.querySelector('.content_header.flex_row.space_between.center p').innerHTML = 'Back &lt; FAQ';
        document.querySelector('.content_header.flex_row.space_between.center button').style.display = 'block';
        gsap.from('#screen', {
            y: '-2rem',
            opacity: 0,
            duration: 0.5
        });
    } else if (which === 'signup') {
        categoryScreen.querySelector('.screen_1.width_full').style.display = 'none';
        categoryScreen.querySelector('.screen_2.width_full').style.display = 'block';
        document.querySelector('.content_header.flex_row.space_between.center p').innerHTML = 'Back &lt; FAQ &lt; Sign Up & Login';
        document.querySelector('.content_header.flex_row.space_between.center button').style.display = 'block';
        document.querySelector('.content_header.flex_row.space_between.center button').innerHTML = 'Add New Query';
        gsap.from('#screen', {
            y: '-2rem',
            opacity: 0,
            duration: 0.5
        });
    } else if (which === 'help_center') {
        defaultSection.style.display = 'none';
        helpCenter.style.display = 'flex';
        document.querySelector('.content_header.flex_row.space_between.center p').innerHTML = 'Back &gt; Help Center';
        gsap.from('#screen', {
            y: '-2rem',
            opacity: 0,
            duration: 0.5
        });
    } else {
        splashScreen.style.display = 'none';
        introductionScreen.style.display = 'flex';
        termsConditions.style.display = 'none';
        defaultSection.style.display = 'none';
        categoryScreen.style.display = 'none';
        // Change the heading value
        e.currentTarget.parentElement.parentElement.parentElement.previousElementSibling.querySelector('p').innerHTML = `Back &lt; Edit Introduction Screen ${ which === 'intro1' ? 1: which === 'intro2' ? 2 : 3 }`;
        e.currentTarget.parentElement.parentElement.parentElement.previousElementSibling.querySelector('button').style.display = 'none';
    }
}

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

function showPopup2 (e) {
    e.stopPropagation();
    if (e.currentTarget.innerHTML === 'Add New Category') {
        document.querySelector('.edit_category.flex_column').style.display = 'flex';
        document.querySelector('.edit_category.flex_column h1').innerHTML = 'Add Category';
    } else if (e.currentTarget.innerHTML === 'Add New Query') {
        document.querySelector('.edit_query.flex_column').style.display = 'flex';
        document.querySelector('.edit_query.flex_column h1').innerHTML = 'Add Query';
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

    // gsap.from('.order_details', {
    //     y: '-2rem',
    //     opacity: 0,
    //     duration: 0.5
    // });
}

function goes() {
    Gets(
        {
            method: 'GET',
            urls: 'cms/cms',
            headerss: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+datas.token
            },
            actions: '',
            // saving: 'CMS'
        }
        ).then((res)=> {
            console.log(res, "CRM")
            data = res
            document.getElementById('splashimg').src = `data:image/png;base64, ${data[0].image}`
            document.getElementById('splashtags').value = data[0].name
            document.getElementById('logos').value = `data:image/png;base64, ${data[0].image}`
            document.getElementById('intro1title').value = data[1].name
            document.getElementById('logogo').src = `data:image/png;base64, ${data[0].image}`
            document.getElementById('termstitle').value = data[5].name
            document.getElementById('termsdesc').value = data[5].description
            document.getElementById('termsemail').value = data[6].email
            document.getElementById('termsnum').value = data[6].mobile
        })
    // myInterval = setInterval(sets, 1000);
    // return myInterval
}

function sets() {
    var text = "";
    var data = JSON.parse(localStorage.getItem('CMS'));
    console.log(data, data[1].image, "DDDDDDDDDDDDDDDD");
    document.getElementById('splashimg').src = `data:image/png;base64, ${data[0].image}`
    document.getElementById('splashtags').value = data[0].name
    document.getElementById('logos').src = `data:image/png;base64, ${data[1].image}`
    document.getElementById('logos').value = data[1].image
    document.getElementById('intro1title').value = data[1].name
    document.getElementById('logogo').src = `data:image/png;base64, ${data[0].image}`
    document.getElementById('termstitle').value = data[5].name
    document.getElementById('termsdesc').value = data[5].description
    document.getElementById('termsemail').value = data[6].email
    document.getElementById('termsnum').value = data[6].mobile
    // intro1title
    clearInterval(myInterval);
}