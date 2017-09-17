# Simple BuyBack
Simple web based skeleton for corp/alliance buyback programs.  Nearly plug in play.

https://imgur.com/XcC1meU

Issues and PRs welcomed.  

## Contact Info
In-game: Blacksmoke16

Discord: Blacksmoke16#1684

## Requirements
 * MySQL database, or edit to work with database of your choice.
 * EVE SDE invTypes table.
 * Server with PHP.
 * (Reccomended) EVE SDE invGroups/invCategories to make deciding on groupIDs easier.


## Features
 * Copy/Paste functionality from item detail/list view.
 * Item whitelisting based on groupID.  Able to set an array of groupIDs that are accepted.  If an item isnt in one of those groups buyBack price gets set to 0.
 * Multiple locations with variable buyback rates.  Location A (Jita - 10%), Location B (Jita - 20%), etc.
 * Ability to change market hub station.  Defaults to Jita 4-4.
 * Generated referenceID string to identify items in a particular contract.
 * Saves buyBack submitions to MySQL database.  Stores date, referenceID, typeID, itemName, volume, buybackTotal, marketHubTotal and profit.
 
 ## Setup
 The skeleton is setup by altering the two config files in both the PHP and JS directories.  Once these are configured and the database is setup with the required table you are good to go.
 * config.php Two config options.
   * StationID - Station ID of the market hub to use, default is Jita 4-4.
   * Database Settings - Details on what database to connect to.
     * Be sure to run the buyBack.sql script to add the buyBack table to your database.  Of course can edit this to create the table to fit your needs.
 * config.js
   * buyBackName - Sets name of service.
   * contactName - User people should contract stuff to
   * buyback_data - List of accepted stations and their rates
   * accepted_groups - Array of accepted group IDs, items not with a group ID not in this list get set to 0 buyback value.
     * See list below to what defaults are.
   * item_data_url - Path to the itemData.php script
   * submit_url - Path to the submit.php script
   
For added security change the `Access-Control-Allow-Origin` headers in both submit.php and itemData.php based on your setup to prevent other froms submiting outside of your host.
   
Note:  This is just a skeleton, as such there is not much of a style included.  Will have to setup/import/use your own classes to style it to taste.
 
 ## Default Group IDs
|group\_id|group\_name|
|--------|----------|
|18|Mineral|
|423|Ice Product|
|450|Arkonor|
|451|Bistot|
|452|Crokite|
|453|Dark Ochre|
|454|Hedbergite|
|455|Hemorphite|
|456|Jaspet|
|457|Kernite|
|458|Plagioclase|
|459|Pyroxeres|
|460|Scordite|
|461|Spodumain|
|462|Veldspar|
|465|Ice|
|467|Gneiss|
|468|Mercoxit|
|469|Omber|
|754|Salvaged Materials| 
