import tabs from './modules/tabs';
import modal from './modules/modals';
import timer from './modules/timers';
import calc from './modules/calc';
import forms from './modules/forms';
import sliders from './modules/sliders';
import cards from './modules/cards';
import {openModal} from './modules/modals';




window.addEventListener('DOMContentLoaded', function() {
    
    const modalTimerId = setTimeout(()=> openModal('.modal', modalTimerId), 5000);
       
    tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2021-05-01');
    calc();
    forms('form',modalTimerId);
    sliders({
        container:'.offer__slider',
        slide:'.offer__slide',
        nextArrow :'.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter :'#total',
        currentCounter:'#current',
        wrapper :'.offer__slider-wrapper',
        field:'.offer__slider-inner'
    });
    cards();
});






