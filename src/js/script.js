"use strict";

window.addEventListener('DOMContentLoaded', function() {
   
    
//tabs
const tabsContent = document.querySelectorAll('.tabcontent'),
tabs = document.querySelectorAll('.tabheader__item'),
tabsParent = document.querySelector('.tabheader__items');

function hideTabContent(){
    tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show','fade');
       
    });
    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');
    });
   
}

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show','fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click',(event) => {
        const target = event.target;
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item ,i)=>{
                if( target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });



    
    

    
    
    
    // Timer

    const deadline = '2021-04-22';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    //Modal
    
    const modalTrigger = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector('.modal'),
            modalCloseBtn = document.querySelector('[data-close]');

    function openModal (){
        modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow= 'hidden';
            // clearInterval(modalTimerId);
    }
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow= '';
    }

    modalTrigger.forEach(btn =>{
        btn.addEventListener('click',openModal);
    });

    modalCloseBtn.addEventListener('click',closeModal);

    modal.addEventListener('click',(e) =>{
        if(e.target === modal){
            closeModal();
        }
    });
   
    document.addEventListener('keydown',(e) => {
       if(e.code === 'Escape'){
        closeModal();
       } 
    });
    // const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll',showModalByScroll);
        } 
    }

    window.addEventListener('scroll',showModalByScroll);

    // Использовать классы для карточек
   class MenuCard {
       constructor(src, alt,title, descr,price,parentSelector,...classes){
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr= descr;
        this.price = price;
        this.classes = classes;
        this.parent=document.querySelector(parentSelector);
        this.transfer =27;
        this.changeToUAH();
       }
       changeToUAH(){
           this.price = this.price * this.transfer;
       }
       render(){
           const element = document.createElement('div');
           if(this.classes.length=== 0){
               this.element = 'menu__item';
               element.classList.add(this.element);
           }
           element.innerHTML =`
           <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
           `;

           this.parent.append(element);
       }
   }
   new MenuCard(  
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container',

   ).render();
   new MenuCard(
    "img/tabs/elite.jpg" ,
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    14,
    '.menu .container',
   ).render();
   new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    21,
    '.menu .container',
   ).render();
    
    // Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.appendChild(statusMessage);
        
            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });
        });
    }

  
});



  
    // const log = function(a, b, ...rest){
    //     console.log(a, b, rest);
    // };

    // log('basic', 'rest', 'operator','usage');

    // function clacOrDouble(number, basis = 2){

    //     console.log(number *basis);
    // }

    // clacOrDouble(3);



   

// function User(name, id){
//     this.name = name;
//     this.id = id;
//     this.human = true;
//     this.hello = function(){
//         console.log(`Hello ${this.name}`);
//     };
// }

// User.prototype.exit = function(){
//     console.log(`пользователь ${this.name} ушел`);
// };

// const ivan = new User('Ivan', 28);
// const alex= new User('Alex', 28);

// ivan.exit();
// ivan.hello();
// alex.hello();
// console.log(ivan);
// console.log(alex);
// });


// function showThis (a, b){
//     console.log(this);
//     function sum(){
//         console.log(this);
//         return a + b;
//     }
//     console.log(sum());
// }
// showThis(4, 5);


// const obj = {
//     a:20,
//     b:15,
//     sum:function(){
//         console.log(this);
//     }
// };

// obj.sum();

// function User (name,id){
//     this.name = name;
//     this.id = id;
//     this.human = true;
//     this.hello = function(){
//         console.log('hello' + this.name);
//     };
// }
// let ivan = new User('Ivan', 23);

// function sayName (){
//     console.log(this);
//     console.log(this.name);
// }
// const user = {
//     name:'John'
// };

// sayName.call(user, 'Smith');
// sayName.apply(user, ['Smith']);

// function count(num){
//     return this*num;
// }

// const double = count.bind(2);
// console.log(double(3));

// 1) Обычная функцию:this- window, но если стоит use strict- то будет undefined
// 2)Контекст у методов обьекта = сам объект
// 3) this в конструкторах и классах это новый экзермпляр объекта
// 4)Ручная привязка this:call,apply,bind

// class Rectangle {
//     constructor(height, width){
//         this.width = width;
//         this.height = height;
//     }
//     calcArea(){
//         return this.height * this.width; 
//     }
// }

// class ColoredRectangleWithText extends Rectangle{
//     constructor(height, width, text , bgColor){
//         super(height, width);
//         this.text = text;
//         this.bgColor = bgColor;
//     }
    
//     showMyProps(){
//         console.log(`Текст: ${this.text} , цвет ${this.bgColor}`);
//     }
// }

// const div = new ColoredRectangleWithText(25, 10 ,'hELLO', 'red');

// div.showMyProps();
// console.log(div.calcArea());

// const square = new Rectangle(10, 10); 
// const long = new Rectangle(20, 100);

// console.log(square.calcArea());
// console.log(long.calcArea());