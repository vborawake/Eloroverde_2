const popup = document.querySelector('.edit_category.flex_column');
const details = document.querySelector('.details.popup.flex_column');
const right_section = document.querySelector('.right_section.flex_column');
const popup2 = document.querySelector('.popup.flex_column');

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
        element.querySelector('.input.flex_column:nth-child(2) input').placeholder = e.currentTarget.parentElement.parentElement.querySelector('p:nth-child(2)').innerHTML;
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