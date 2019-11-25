<?php

// Test that we've been given the required input parameters.
if (!isset($_GET["website"]) ||
    !isset($_GET["year"]))
{
    exit(return_fail());
}

$websiteUrl = $_GET["website"];
$year = $_GET["year"];

// Sanity-check and sanitize the input parameters.
{
    if (($year < 1990) || ($year > date("Y")))
    {
        exit(return_fail());
    }

    if (strlen($websiteUrl) > 400)
    {
        exit(return_fail());
    }
}

$responseJson = json_decode(file_get_contents("http://archive.org/wayback/available?url={$websiteUrl}&timestamp={$year}0615"), true);
if (!$responseJson)
{
    exit(return_fail());
}

// Test for required parameters in the response.
if (!isset($responseJson["archived_snapshots"]["closest"]["available"]) ||
    !isset($responseJson["archived_snapshots"]["closest"]["timestamp"]) ||
    !isset($responseJson["archived_snapshots"]["closest"]["url"]))
{
    exit(return_fail());
}

if (!preg_match("/^{$year}/", $responseJson["archived_snapshots"]["closest"]["timestamp"]))
{
    exit(return_fail());
}

if (!$responseJson["archived_snapshots"]["closest"]["available"])
{
    exit(return_fail());
}

exit(return_success($responseJson["archived_snapshots"]["closest"]));

function return_fail()
{
    echo json_encode(["successful"=>false]);
}

function return_success(array $responseData)
{
    echo json_encode([
        "successful"=>true,
        "timestamp"=>$responseData["timestamp"],
        "url"=>$responseData["url"],
    ], JSON_UNESCAPED_SLASHES);
}

?>
