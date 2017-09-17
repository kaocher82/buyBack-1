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
            [18, 38, 39, 40, 41, 43, 46, 47, 48, 49, 52, 53, 54, 55, 56, 57, 59, 60, 61, 62, 63, 65, 67, 68, 71, 72, 74, 76, 77, 78, 80, 82, 83, 85, 86,
                87, 88, 89, 90, 92, 96, 98, 100, 101, 201, 202, 203, 205, 208, 209, 210, 211, 212, 213, 225, 285, 289, 290, 291, 295, 299, 302, 308,
                309, 315, 316, 317, 321, 325, 326, 328, 329, 330, 338, 339, 341, 353, 357, 367, 372, 373, 374, 375, 376, 377, 378, 379, 384, 385,
                386, 387, 394, 395, 396, 405, 406, 407, 423, 425, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 464, 465, 467,
                468, 469, 470, 472, 475, 476, 479, 481, 482, 483, 492, 497, 498, 499, 500, 501, 506, 507, 508, 509, 510, 511, 512, 514, 515, 518,
                524, 538, 544, 545, 546, 548, 549, 585, 586, 588, 589, 590, 638, 639, 640, 641, 642, 644, 645, 646, 647, 648, 650, 653, 654, 655,
                656, 657, 658, 660, 663, 737, 753, 754, 762, 763, 764, 765, 766, 767, 768, 769, 770, 771, 772, 773, 774, 775, 776, 777, 778, 779,
                781, 782, 786, 815, 842, 862, 863, 864, 878, 892, 896, 899, 901, 904, 905, 907, 908, 909, 910, 911, 916, 972, 1010, 1019, 1032,
                1034, 1040, 1041, 1042, 1122, 1150, 1153, 1154, 1156, 1158, 1159, 1189, 1199, 1223, 1226, 1232, 1233, 1234, 1238, 1245, 1289,
                1292, 1299, 1306, 1308, 1313, 1395, 1396, 1400, 1533, 1546, 1547, 1548, 1549, 1550, 1551, 1559, 1569, 1672, 1673, 1674, 1677,
                1678, 1697, 1698, 1699, 1700, 1701, 1702, 1706, 1769, 1770, 1771, 1772, 1773, 1774, 1815];

        // Path to itemData PHP script
        $rootScope.ITEM_DATA_URL = '/buyBack/PHP/itemData.php';

        // Path to submit PHP script
        $rootScope.SUBMIT_URL = '/buyBack/PHP/submit.php';

    }]);
