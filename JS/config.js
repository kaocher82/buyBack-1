angular
    .module('app')
    .service('buyBackConfigService', ['$rootScope', function ($rootScope) {
        // Global usage of lodash
        $rootScope._ = _;

        // Name of service
        $rootScope.buyBackName = 'buyBack Skeleton';

        // Name of user to contract loot to
        $rootScope.contactName = 'Test user';


        // Array of buyback systems and their rate.
        // Each system should be its own object.
        // If you wanted Jita - 10% rate would be 0.9
        $rootScope.BUYBACK_DATA = [
            {
                'name': 'Jita',
                'rate': 0.9
            },
            {
                'name': 'Amarr',
                'rate': 0.5
            }
        ];


        // Array of accepted group IDs, items not with a group ID not in this list get set to 0 buyback value
        $rootScope.ACCEPTED_GROUPS =
            [18, 423, 754, 450, 451, 452,453,454,455,456,457,458,459,460,461,462,465,467,468,469];

        // Path to itemData PHP script
        $rootScope.ITEM_DATA_URL = '/buyBack/PHP/itemData.php';

        // Path to submit PHP script
        $rootScope.SUBMIT_URL = '/buyBack/PHP/submit.php';

    }]);
