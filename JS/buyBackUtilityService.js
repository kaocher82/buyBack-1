angular
    .module('app')
    .service('buyBackUtilityService', ['$http', function ($http) {

        this.parseName = function (item) {
            var qty = item.split("\t")[1];
            var itemName = item.split("\t")[0];
            itemName = itemName.split(",")[0];

            if (!qty) {
                qty = 1;
            } else {
                qty = parseInt(qty.replace(/[,.\s]+/g, ""));
            }
            return [itemName, qty];
        };

        this.makeID = function () {
            var text = "";
            var possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            for (var i = 0; i < 10; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        };

    }]);