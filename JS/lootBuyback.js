var app = angular
    .module('app', []);

app.controller('AppCtrl', ['$scope', '$rootScope', 'buyBackUtilityService', 'buyBackConfigService', '$http', function ($scope, $rootScope, buyBackUtilityService, buyBackConfigService, $http) {
    // Array to hold the values in the text area
    $scope.items = [];

    // Array to hold names parsed from text area
    $scope.parsedItems = {};

    // Array to hold data to display
    $scope.displayItems = [];

    // Reference ID
    $scope.REFERENCE_ID = buyBackUtilityService.makeID();

    // // Holds the index of currently selected location
    $scope.location = '0';

    // Holds total value of items
    $scope.totalBuyback = 0;

    // Holds total volume of items
    $scope.totalVolume = 0;

    $scope.submit = function () {
        // Make the call to submit script to enter items into the DB
        $http.post($rootScope.SUBMIT_URL, {
            'items': $scope.displayItems,
            'referenceID': $scope.REFERENCE_ID
        }).then(function (response) {
            switch (response.status) {
                case 200:
                    alert('Thank you for your submission');
                    window.location.href = 'index.html';
                    break;
                default:
                    alert('There was an error processing your submission.  Try again later');
            }
        });
    };

    $scope.calculateTotals = function () {
        // When location of loot is changed, update buyback totals of loot without re-querying the data.
        angular.forEach($scope.displayItems, function (item) {
            item.buyBackPricePerUnit = item.buyPrice * $rootScope.BUYBACK_DATA[$scope.location].rate;
            item.buyBackTotal = item.buyPrice * $rootScope.BUYBACK_DATA[$scope.location].rate * item.quantity;
        });
        $scope.totalBuyback = _.sumBy($scope.displayItems, 'buyBackTotal');
    };

    // Function to be run when items are pasted into text area
    $scope.update = function () {
        // Clear the previous parsedItems arrays and data
        $scope.buyBackTotal = 0;
        $scope.totalVolume = 0;
        $scope.parsedItems = [];
        $scope.displayItems = [];

        angular.forEach($scope.items, function (item) {

            // Parse name and quantity from string
            var itemData = buyBackUtilityService.parseName(item);

            // Group items by name
            if ($scope.parsedItems[itemData[0]]) {
                $scope.parsedItems[itemData[0]] += itemData[1];
            } else {
                $scope.parsedItems[itemData[0]] = itemData[1];
            }
        });

        // Only continue if there are items in the text area
        if ($scope.items.length === 0) {
            alert('You must include at least 1 item.');
            return;
        }

        // Make the call to itemData script to get item data and price info
        $http.post($rootScope.ITEM_DATA_URL, {items: Object.keys($scope.parsedItems).join(',')}).then(function (response) {
            angular.forEach(response.data, function (responseItem) {
                var quantity = $scope.parsedItems[responseItem.typeName];

                // If item groupID isn't in the accepted list, set buyPrice to 0
                if (!(_.includes($rootScope.ACCEPTED_GROUPS, responseItem.groupID))) {
                    responseItem.buyPrice = 0.00
                }

                // Construct display items array object
                $scope.displayItems.push({
                    typeName: responseItem.typeName,
                    typeID: responseItem.typeID,
                    quantity: quantity,
                    volume: responseItem.volume * quantity,
                    buyPrice: responseItem.buyPrice,
                    buyBackPricePerUnit: responseItem.buyPrice * $rootScope.BUYBACK_DATA[$scope.location].rate,
                    marketHubTotal: responseItem.buyPrice * quantity,
                    buyBackTotal: responseItem.buyPrice * $rootScope.BUYBACK_DATA[$scope.location].rate * quantity
                });

            });
            // Calculate total volume and cost amounts
            $scope.totalBuyback = _.sumBy($scope.displayItems, 'buyBackTotal');
            $scope.totalVolume = _.sumBy($scope.displayItems, 'volume');
        });
    };
}]);