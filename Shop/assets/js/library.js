var library = (function () {
    'use strict';
    var api = {
        forEach: forEach,
        filter: filter,
        filterByKeyValue: filterByKeyValue,
        namespace:  namespace,
        mix: mix,
        on: function (element, event, callback, context) {
            element.addEventListener(event, bind(context || element, callback));
        },
        onReady: function (callback) {
            this.on(window, 'load', callback, library);
        }
    },
    baseNamespace = {};

    function forEach(arr, callback) {
        for (var index = 0; index < arr.length; index++) {
            callback(arr[index], index);
        }
    }

    function filter(arr, predicate) {
        var result = [];

        forEach(arr, function (value) {
            if (predicate(value)) {
                result.push(value);
            }
        });
        return result;
    }

    function filterByKeyValue(arr, key, text) {
        var expression = new RegExp(text, 'ig');

        function isRowMatching(row) {
            var value = row[key];
            return expression.test(value);
        }

        return filter(arr, isRowMatching);
    }

    function namespace(path) {
        var segment = baseNamespace;
        forEach(path.split('.'), function (pathElement) {
            if (segment[pathElement] === undefined) {
                segment[pathElement] = {};
            }
            segment = segment[pathElement];
        });
        return segment;
    }

    function mix(source, target) {
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] =  source[key];
            }
        }
        return target;
    }

    function bind(context, func) {
        return function () {
            return func.apply(context, arguments);
        }
    }

    if (typeof window.addEventListener === 'undefined') {
        api.on = function (element, event, callback, context) {
            element.attachEvent('on' + event,  bind(context || element, callback));
        }
    }

    return api;
})();