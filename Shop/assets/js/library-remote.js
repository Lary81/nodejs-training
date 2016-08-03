(function ($) {
    'use strict';
    var remote = $.namespace('remote');

    if (typeof  library === 'undefined') {
        throw new Error('Core module not found');
    }

    function noop() {
    }

    function readFromCache(settings) {
        var cachedData;
        if (settings.useCache && localStorage !== undefined) {
            cachedData = localStorage.getItem(settings.url);
            if (cachedData !== null) {
                return JSON.parse(localStorage.getItem(settings.url));
            }
        }
    }

    function writeToCache(key, value) {
        if (localStorage !== undefined) {
            localStorage.setItem(key, value);
        }
    }

    function prepareSettings(config) {
        return $.mix(config, {
            method: 'GET',
            url: '',
            data: {},
            onSuccess: noop,
            onFailure: noop,
            useCache: false
        });
    }

    function onSuccess(xhr, settings, resolve) {
        var data = JSON.parse(xhr.responseText);
        writeToCache(settings.url, xhr.responseText);
        settings.onSuccess(data, xhr);
        resolve(data, xhr);
    }

    function onFailure(xhr, settings, reject) {
        settings.onFailure(xhr);
        reject(xhr);
    }

    function onComplete(xhr, settings, resolve, reject) {
        if (xhr.status > 199 && xhr.status < 300) {
            onSuccess(xhr, settings, resolve);
        } else {
            onFailure(xhr, settings, reject)
        }
    }

    function request(settings) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(settings.method, settings.url);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                   onComplete(xhr, settings, resolve, reject);
                }
            };
            xhr.send(settings.data);
        });
    }

    remote.ajax = function (config) {
        var settings = prepareSettings(config),
            cachedData = {};

        if (settings.useCache) {
            cachedData = readFromCache(settings);
            if (cachedData !== undefined) {
                return new Promise(function (resolve) {
                    resolve(cachedData);
                });
            }
        }
        return request(settings);
    };
})(library);