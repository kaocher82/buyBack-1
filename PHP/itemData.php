<?php
require_once "config.php";

// Disable error reporting in prod
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(-1);

header('Access-Control-Allow-Origin: *');

$q = file_get_contents('php://input');
$q = json_decode($q, true);
$items = explode(',', $q['items']);

$con = mysqli_connect($hostName, $userName, $password, $schema);

if (!$con) {
    echo die('Could not connect: ' . mysqli_error($con));
};

array_walk($items, 'addWrapper', "'");

$sql = "SELECT typeID, typeName, volume, groupID FROM invTypes WHERE typeName IN (" . implode(',', $items) . ") AND published = 1 ";

$result = mysqli_query($con, $sql);

if ($result === false) {
    printf("Error: %s\n", mysqli_sqlstate($con));
    die();
}

$ids = array();

while ($row = mysqli_fetch_assoc($result)) {
    $typeID = $row['typeID'];
    $priceData = getPriceData($typeID, $url);
    $data = json_decode($priceData, true)[$typeID];

    $ids[] = array(
        'typeID' => intval($row['typeID']),
        'typeName' => $row['typeName'],
        'volume' => floatval($row['volume']),
        'groupID' => intval($row['groupID']),
        'buyPrice' => floatval($data['buy']['max']),
        'sellPrice' => floatval($data['sell']['min'])
    );
}

echo json_encode($ids);

mysqli_close($con);

function addWrapper(&$value, $key, $wrapper)
{
    global $con;
    $value = $wrapper . mysqli_real_escape_string($con, $value) . $wrapper;
    //no return, passed by reference
}

function getPriceData($typeID, $url)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url . $typeID);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);


// Work around for PHP Storm issue
// https://youtrack.jetbrains.com/issue/WI-30168
    if ($_SERVER['HTTP_HOST'] === 'localhost:63342') {
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    }

    $server_output = curl_exec($ch);

    curl_close($ch);

    return $server_output;
}
