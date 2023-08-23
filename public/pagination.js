const pagination = document.querySelector('.pagination.flex_row.center');
const datePicker = document.querySelectorAll('.date_picker.flex_row.space_between.center input');
const eye = document.querySelector('.eye');
const input = eye ? eye.previousElementSibling : undefined;
const notifications = document.querySelector('.notifications_wrapper.flex_column');
const languages = document.querySelector('#language');
const select = document.querySelectorAll('.select');

function changePage(e) {
    e.stopPropagation();
    
    // Array.from(e.currentTarget.children).forEach((button) => {
    //     button.classList.remove('active');
    // });

    e.target.classList.add('active');

    if (e.target.innerHTML === 'Prev' || e.target.innerHTML === 'Next') {
        setTimeout(() => {
            e.target.classList.remove('active');
        }, 500);

        let current = e.target;
        const pagination = document.querySelector('.pagination.flex_row.center');
        
        if (e.target.innerHTML === 'Prev') {
            Array.from(pagination.children).forEach(page => {
                if (page.classList.contains('active') && page.previousElementSibling.innerHTML !== 'Prev') current = page.previousElementSibling;
                page.classList.remove('active');
            });
        } else if (e.target.innerHTML === 'Next') {
            console.log('Next');
            Array.from(pagination.children).forEach(page => {
                console.log(page);
                if (page.classList.contains('active') && page.nextElementSibling.innerHTML !== 'Next') {
                    current = page.previousElementSibling;
                    console.log(page.nextElementSibling.innerHTML);
                }
                page.classList.remove('active');
            });
        }

        console.log(current);
    }
}

function showPassword(e) {
    if (eye && input) {
        if (input.getAttribute('type') === 'password') input.setAttribute('type', 'text');
        else input.setAttribute('type', 'password');
    }
}

if (datePicker) {
    Array.from(datePicker).forEach(picker => {
        picker.addEventListener('click', () => {
            // console.log(datePicker);
            picker.showPicker();
        });
    });
}

function showNotifications(e) {
    e.stopPropagation();
    notifications.style.display = 'flex';
    notifications.style.top = `${e.pageY - notifications.getBoundingClientRect().height}px`;
    notifications.style.left = `${ e.pageX }px`;
}

function showLanguage(e) {
    e.stopPropagation();
    languages.style.display = 'flex';
    languages.style.top = `${e.pageY - (languages.getBoundingClientRect().height + 100)}px`;
    languages.style.left = `${ e.pageX + 10 }px`;
    languages.style.transform = `scaleY(1)`;
}

function showPopup(e) {
    e.stopPropagation();
    console.log('Clicked');
    if (e.target.classList.contains('profile_img') || e.target.id === 'username' || e.target.tagName === 'IMG') {
        if (document.getElementById('menu').style.transform === 'scaleY(0)' || document.getElementById('menu').style.transform === '') document.getElementById('menu').style.transform = 'scaleY(1)';
        else document.getElementById('menu').style.transform = 'scaleY(0)';
    }
}

function showPage(event, selector) {
    const container = document.querySelector(selector);
    let page = parseInt(event.currentTarget.innerHTML);
    let currentPage;

    Array.from(event.currentTarget.parentElement.children).forEach(page => {
        if (page.classList.contains('active')) currentPage = page;
        page.classList.remove('active');
    });
    event.currentTarget.classList.add('active');

    if (event.currentTarget.innerHTML === 'Prev') {
        event.currentTarget.classList.remove('active');
        page = parseInt(currentPage.innerHTML) - 1;
        currentPage.previousElementSibling.classList.add('active');
    } else if (event.currentTarget.innerHTML === 'Next') {
        event.currentTarget.classList.remove('active');
        page = parseInt(currentPage.innerHTML) + 1;
        currentPage.nextElementSibling.classList.add('active');
    }
    
    Array.from(container.children).forEach(value => {
        if (value.tagName !== 'H1' && !value.classList.contains('appointments_header') && !value.classList.contains('header') && !value.classList.contains('pagination')) value.style.display = 'none';
    });
    
    if (page) {
        const start = ((page - 1) * 5) + 2;
        const end = (page * 5) + 1;

        Array.from(container.children).forEach((value, index) => {
            if (index >= start && index <= end) value.style.display = 'flex';
        });
    }
}

if (select) {
    Array.from(select).forEach(selectMenu => {
        const menu = selectMenu.querySelector('.select_menu.flex_column');
        selectMenu.addEventListener('click', () => {
            if (menu.style.display === '' || menu.style.display === 'none') {
                menu.style.display = 'flex';
                requestAnimationFrame(() => {
                    menu.style.transform = 'scale(1)';
                });
            } else {
                requestAnimationFrame(() => {
                    menu.style.transform = 'scale(0)';
                });
                setTimeout(() => {
                    menu.style.display = 'none';
                }, 500);
            }
        });
    })
}

function nextPrev(event, action) {
    const pagination = event.target.parentElement;
    let current;
    
    if (action === 'prev') {
        Array.from(pagination.children).forEach(page => {
            if (page.classList.contains('active') && page.previousElementSibling.innerHTML !== 'Prev') current = page.previousElementSibling;
            page.classList.remove('active');
        });
    } else if (action === 'next') {
        Array.from(pagination.children).forEach(page => {
            if (page.classList.contains('active') && page.nextElementSibling.innerHTML !== 'Next') current = page.previousElementSibling;
            page.classList.remove('active');
        });
    }

    console.log(current);
}

function navig() {
    // Login('User', "Email");
    // window.location.href = '../Dashboard/dashboard.html'
    console.log("LLLLLLLLLLLLLLLLLLLL");
}