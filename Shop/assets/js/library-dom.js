(function ($) {
    'use strict';
    var dom = $.namespace('dom');

    if (typeof  library === 'undefined') {
        throw new Error('Core module not found');
    }
    if (typeof  Mustache === 'undefined') {
        throw new Error('Mustache library not found');
    }

    dom.render = function (viewSelector, templateSelector, data) {
        var view = document.querySelector(viewSelector),
            template = document.querySelector(templateSelector).innerHTML;

        view.innerHTML = Mustache.render(template, data);
    };

    dom.get = function (selector) {
        return document.querySelector(selector);
    };

    dom.getValue = function (selector) {
        return dom.get(selector).value;
    };
})(library);

