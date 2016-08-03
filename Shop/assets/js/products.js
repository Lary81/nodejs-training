(function () {
    'use strict';

    library.onReady(function () {
        var dom = this.namespace('dom'),
            remote = this.namespace('remote'),
            myDiv = dom.get('#myDiv');

        function print(data) {
            console.log(data);
        }

        function refreshProductsData() {
            remote.ajax({url: 'products.json', onSuccess: print})
        }

        this.on(myDiv, 'click', refreshProductsData);
    });
})();