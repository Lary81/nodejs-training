(function () {
    'use strict';
    library.onReady(function () {
        var dom = this.namespace('dom'),
            remote = this.namespace('remote'),
            url = 'products.json',
            $ = this;

        function refreshProductsView(products) {
            dom.render('#products tbody', '#productsTemplate', products);
        }

        function filterProducts(data) {
            return new Promise(function (resolve) {
                resolve({
                    products: $.filterByKeyValue(data.products, dom.getValue('#filterBy'), dom.getValue('#filterValue'))
                })
            });
        }

        function getProductsData() {
            return remote.ajax({url: url, useCache: false});
        }

        function onError(xhr) {
            console.log(xhr);
        }

        $.on(dom.get('#filterBtn'), 'click', function () {
            getProductsData().then(filterProducts, onError).then(refreshProductsView);
        });

        $.on(dom.get('#refreshBtn'), 'click', function () {
            getProductsData().then(refreshProductsView, onError);
        });

        dom.get('#filterValue').focus();
    });
})();