const popup = document.querySelector('.popup.flex_column');
const details = document.querySelector('.details.popup.flex_column');
const right_section = document.querySelector('.right_section.flex_column');

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