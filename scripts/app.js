const links = document.querySelectorAll('a[data-goto]'),
    nav = document.getElementById('nav'),
    burger = document.getElementById('burger'),
    popupClose = document.querySelector('.popup-close'),
    popupOpen = document.querySelectorAll('.open-buy-popup'),
    forms = document.querySelectorAll('form'),
    inputs = document.querySelectorAll('input');


if (links.length > 0) {
    links.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick)
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();

            document.body.classList.remove('lock');
            nav.classList.remove('active');
            burger.classList.remove('active');
        }
    }
}

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.classList.toggle('lock');
});

popupOpen.forEach((open) => {
    open.addEventListener('click', () => {
        document.querySelector('.popup').classList.add('active');
        document.body.classList.add('lock');
    })
});

popupClose.addEventListener('click', () => {
    document.querySelector('.popup').classList.remove('active');
    document.body.classList.remove('lock');
});

const postData = async (url, data) => {
    let res = await fetch(url, {
        method: 'POST',
        body: data,
    });

    return await res.text();
};


const clearInputs = () => {
    inputs.forEach((item) => (item.value = ''));
};


forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let phone = 'неизвестно',
            name = 'неизвестно',
            email = form.querySelector('input[name="email"]').value;


        if (form.querySelector('input[name="tel"]')) {
            if (form.querySelector('input[name="tel"]').value.includes('_')) {
                document.querySelector('form').querySelector('input[name="tel"]').style.borderColor = 'red';
                return;
            } else {
                phone = form.querySelector('input[name="tel"]').value;
            }
        }

        if (form.querySelector('input[name="name"]')) {
            name = document.querySelector('input[name="name"]').value;
        }

        var xhr = new XMLHttpRequest();
        // Определяем метод и URL для отправки данных на сервер
        xhr.open("POST", "/mail.php", true);

        // Определяем заголовки запроса
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");


        xhr.send("phone=" + encodeURIComponent(phone)
            + "&name=" + encodeURIComponent(name) + "&email=" + encodeURIComponent(email));

        // Обработчик события изменения состояния запроса
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    form.reset();
                    document.querySelector('.popup').classList.remove('active');
                    document.body.classList.remove('lock');
                    window.location.href = '../thanks.html'
                } else {
                    alert("Произошла ошибка при отправке данных. Попробуйте позднее");
                }
            }
        };
    });
});

const selector = document.querySelectorAll('input[type="tel"]');

const im = new Inputmask("+7 (999) 999-99-99");
selector.forEach((phone) => im.mask(phone));