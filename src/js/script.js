"use strict";


window.addEventListener('DOMContentLoaded', function() {
    const tabs =require('./modules/tabs'),
          modal = require('./modules/modals'),
          timer = require('./modules/timers'),
          calc = require('./modules/calc'),
          forms = require('./modules/forms'),
          sliders= require('./modules/sliders'),
          cards  = require('./modules/cards');

    tabs();
    modal();
    timer();
    calc();
    forms();
    sliders();
    cards();
});





