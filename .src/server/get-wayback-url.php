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

    if (strlen($websiteUrl) > 300)
    {
        exit(return_fail());
    }

    // Only allow a-z, A-Z, 0-9, ., _, and - in URLs.
    if (preg_match("/[^\w-.]+/", $websiteUrl))
    {
        exit(return_fail());
    }
} 

// Poll the Wayback Machine API for the most recent matching capture of the
// given website.
{
    // Rudimentary global API request rate limiter. But not a great implementation:
    // a bad actor sending constant requests could choke the script and prevent
    // other users from accessing the content - but for now, as long as this keeps
    // the script from flooding the API at least, it does the job.
    {
        $lockFile = fopen("wayback.lock", "w");

        if (!flock($lockFile, LOCK_EX))
        {
            exit(return_fail());
        }

        usleep(500000);
    }

    // The API returns the closest matching capture for the given timestamp, which thus
    // isn't necessarily in the requested year. To maximize our chances of getting a
    // capture in the desired year, let's ask for it in the middle of that year (i.e.
    // around June).
    $responseJson = json_decode(file_get_contents("http://archive.org/wayback/available?url={$websiteUrl}&timestamp={$year}0615"), true);

    if (!$responseJson)
    {
        exit(return_fail());
    }
}

// Test for required parameters in the response.
{
    if (!isset($responseJson["archived_snapshots"]["closest"]["available"]) ||
        !isset($responseJson["archived_snapshots"]["closest"]["available"]) ||
        !isset($responseJson["archived_snapshots"]["closest"]["timestamp"]) ||
        !isset($responseJson["archived_snapshots"]["closest"]["url"]))
    {
        exit(return_fail());
    }

    if ($responseJson["archived_snapshots"]["closest"]["status"] != 200)
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
