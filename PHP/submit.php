<?php
require_once "config.php";

// Disable error reporting in prod
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(-1);

header('Access-Control-Allow-Origin: *');

$s = file_get_contents('php://input');
$s = json_decode($s, true);

$con = mysqli_connect($hostName, $userName, $password, 'buyback');

if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
};

foreach ($s['items'] as $item) {
    $typeName = mysqli_real_escape_string($con, $item['typeName']);
    $referenceID = mysqli_real_escape_string($con, $s['referenceID']);
    $profit = $item['marketHubTotal'] - $item['buyBackTotal'];

    $sql = "
  INSERT INTO
    buyback_history
      (date, referenceID, typeID, itemName, volume, buyBackTotal, marketHubTotal, profit)
  VALUES
      (NOW(), '$referenceID', {$item['typeID']}, '$typeName', {$item['volume']}, {$item['buyBackTotal']}, {$item['marketHubTotal']}, {$profit})";

    if (!mysqli_query($con, $sql)) {
      echo "Error: " . $sql . "<br>" . mysqli_error($con);
    }
}

mysqli_close($con);
