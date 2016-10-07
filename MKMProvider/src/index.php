<?php
namespace MKMProvider;

require_once __DIR__.'/../vendor/autoload.php';

use MKMProvider\Helpers\Response;
use MKMProvider\Helpers\MKMApi;

$response = new Response();

$request_uri = explode("?", $_SERVER['REQUEST_URI']);

if($request_uri[0] !== '/price') {
    echo $response->Json(["message" => "not found"], 404);
    exit();
}

if($_SERVER['REQUEST_METHOD'] !== "GET") {
    echo $response->Json(["message" => "method not allowed"], 405);
    exit();
}

if(count($_GET) === 0 || !$_GET['name']) {
    echo $response->Json(["message" => "missing name params"], 400);
    exit();
}

$API = new MKMApi("wBSY3MMS12SoPdBX", "zkMru510ij98raVbEPI53iywwe4bGKHy", "57dLtLhduOPdXrv3rTcAk1SN9oVaJKsG", "eSh1OjIH2vhEv4NJbLfP2OefQSUbGh2L");
$data = $API->getSignedRequest("GET", "https://www.mkmapi.eu/ws/v1.1/products/" . $_GET['name'] . "/1/1/false");

if(!$data) {
    echo $response->Json(["message" => "not found"], 404);
    exit();
}

$data_xml = simplexml_load_string($data);

$dataproducts = (array) $data_xml;

echo $response->Json(array_map(function($product) {
    return [
        "name" => (string) $product->name[0]->productName[0],
        "price" => (float)$product->priceGuide->LOW
    ];
}, $dataproducts['product']), 200);
