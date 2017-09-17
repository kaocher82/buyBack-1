CREATE TABLE `buyback_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `referenceID` varchar(10) NOT NULL,
  `typeID` int(11) NOT NULL,
  `itemName` varchar(100) NOT NULL,
  `volume` double NOT NULL,
  `buyBackTotal` decimal(20,2) NOT NULL,
  `marketHubTotal` decimal(20,2) NOT NULL,
  `profit` decimal(20,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='Stores buyback entries from the buyback site';

