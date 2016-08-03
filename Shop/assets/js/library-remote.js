(function ($) {
    'use strict';
    var remote = $.namespace('remote');

    if (typeof  library === 'undefined') {
        throw new Error('Core module not found');
    }

    function noop() {
    }

    function prepareSettings(config) {
        return $.mix(config, {
            method: 'GET',
            url: '',
            data: {},
            onSuccess: noop,
            onFailure: noop
        });
    }

    function request(settings) {
        var xhr = new XMLHttpRequest();
        xhr.open(settings.method, settings.url);
        xhr.onreadystatechange = function () {
            var data = {};
            if (xhr.readyState === 4) {
                if (xhr.status > 199 && xhr.status < 300) {
                    data = JSON.parse(xhr.responseText);
                    settings.onSuccess(data, xhr);
                } else {
                    settings.onFailure(xhr);
                }
            }
        };
        xhr.send(settings.data);
    }

    remote.ajax = function (config) {
        var settings = prepareSettings(config);
        request(settings);
    };
})(library);