function iOS() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

let iosCheck = iOS();
if (iosCheck) {
    let fixedBackground = document.querySelectorAll('._ios');
    fixedBackground.forEach(element => {
        element.classList.add('notFixedBg');
    });
}

let burger = document.querySelector('.header__burger');
let menu = document.querySelector('.header__nav');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('lock');
});

let links = document.querySelectorAll('.scrollLink');
for (let i = 0; i < links.length; i++) {
    const button = links[i];
    button.addEventListener('click', (e) => {
        e.preventDefault();
        for (let i = 0; i < links.length; i++) {
            if (links[i].classList.contains('scrolled')) {
                links[i].classList.remove('scrolled')
            }
        }
        if (burger.classList.contains('active')) {
            menu.classList.remove('active');
            burger.classList.remove('active');
            document.body.classList.remove('lock');
        }
        if (button.getAttribute('data-selector')) {
            let selector = button.dataset.selector;
            let el = document.querySelector(selector);
            let headerHeight = document.querySelector('header.header')?.offsetHeight || 0;
            let coordinate = el.getBoundingClientRect().top + pageYOffset - headerHeight;
            button.classList.add('scrolled');
            window.scrollTo({
                top: coordinate,
                behavior: 'smooth',
            });
        }
    });
}

window.addEventListener('scroll', (e) => {
    for (let i = 0; i < links.length; i++) {
        if (links[i].getAttribute('data-selector')) {
            let selector = links[i].dataset.selector;
            let el = document.querySelector(selector);
            let headerHeight = document.querySelector('header.header')?.offsetHeight || 0;
            let scrolledHeight = window.innerHeight + pageYOffset;
            let coordinate = el.getBoundingClientRect().top + pageYOffset;
            if (el.getBoundingClientRect().top < headerHeight + 10 && el.getBoundingClientRect().bottom > headerHeight + 10) {
                links[i].classList.add('scrolled');
            }
            else {
                links[i].classList.remove('scrolled');
            }
        }
    }
});

window.addEventListener('scroll', (e) => {
    const header = document.querySelector('header.header');
    if (pageYOffset > 50) {
        header.classList.add("active");
    }
});