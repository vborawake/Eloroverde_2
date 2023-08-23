const area = document.getElementById('area');
const areaCtx = area ? area.getContext('2d') : null;
const doughnut = document.getElementById('doughnut');
const doughnutCtx = doughnut ? doughnut.getContext('2d') : null;
const line = document.getElementById('line');
const lineCtx = line ? line.getContext('2d') : null;
const bar = document.getElementById('bar');
const barCtx = bar ? bar.getContext('2d') : null;
const summary = document.getElementById('summary');
const popup = document.querySelector('.menu.flex_column');

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
                        label: 'Male',
                        data: [40, 54, 58, 42, 56, 40, 56, 35, 42],
                        fill: true,
                        backgroundColor: '#19214F'
                    },
                    {
                        label: 'Female',
                        data: [50, 64, 68, 52, 66, 50, 66, 45, 52],
                        fill: true,
                        backgroundColor: '#00A962'
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        suggestedMax: 100
                    }
                },
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
        new Chart(doughnutCtx, {
            type: 'pie',
            data: {
                labels: ['Others', 'Toxin Cleaners', 'Vaporizers', 'Vaporizers', 'Seeds'],
                datasets: [
                    {
                        data: [20, 18, 15, 15, 32],
                        backgroundColor: ['#2F7099', '#CD0508', '#33A142', '#172074', '#E7B82A'],
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
    }

    if (lineCtx) {
        new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: ['4/05', '8/05', '12/05', '16/05', '20/05', '24/05', '28/05'],
                datasets: [
                    {
                        label: 'Male',
                        data: [40, 54, 58, 42, 56, 40, 56, 35, 42],
                        borderColor: '#33A142',
                        cubicInterpolationMode: 'monotone'
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        suggestedMax: 100
                    }
                },
                plugins: [{
                    legend: {
                        labels: {
                            usePointStyle: true,
                            boxWidth: 10
                        }
                    }
                }, placeText]
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
                maintainAspectRatio: false,
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