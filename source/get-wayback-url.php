<?php

/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 * Provides a way for the Serlain frontend client to communicate with the Wayback
 * Availability JSON API (http://archive.org/wayback/available). This API is used
 * to request specific URLs to the Wayback Machine's captures of given websites.
 * 
 * Expects to receive two parameters: "website", and "year". The "website" parameter
 * gives the URL of the site to query from the Wayback API, and "year" sets the year
 * from which the API is asked for captures of the given website.
 * 
 * For instance, /get-wayback-url.php?website=www.microsoft.com&year=2004 will return
 * the URL of a Wayback Machine capture of www.microsoft.com from the year 2004.
 * 
 * The return data is provided as a JSON object of the following form:
 * 
 *   {
 *       successful: true|false,
 *       timestamp: "xxx",
 *       url: "xxx",
 *   }
 * 
 * If the request cannot be carried out successfully, only the "successful" property
 * will be included in the response object, and it will be set to false. Otherwise,
 * this property will be true, and the "url" property will give the address of a
 * Wayback Machine capture of the given website. The "timestamp" property gives the
 * capture's timestamp, i.e. the time at which the Wayback Machine captured this
 * version of the website.
 * 
 * The request is considered successful if a capture of the given website in the
 * given year was found. Otherwise, the request is considered to have failed.
 * 
 */

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

    // Only allow a-z, A-Z, 0-9, and a couple of other symbols in URLs.
    if (preg_match("/[^\w-.:\/]+/", $websiteUrl))
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

        usleep(800000);
    }

    // The API returns the closest matching capture for the given timestamp, which thus
    // isn't necessarily in the requested year. To maximize our chances of getting a
    // capture in the desired year, let's ask for it in the middle of that year (i.e.
    // around June).
    $responseJson = json_decode(file_get_contents("http://archive.org/wayback/available?url={$websiteUrl}&timestamp={$year}0615"), true);

    if (!$responseJson)
    {
        exit(return_fail("The Wayback API didn't respond."));
    }
}

// Test for required parameters in the response.
{
    if (!isset($responseJson["archived_snapshots"]["closest"]["available"]) ||
        !isset($responseJson["archived_snapshots"]["closest"]["timestamp"]) ||
        !isset($responseJson["archived_snapshots"]["closest"]["url"]))
    {
        exit(return_fail("There is no Wayback capture of the site available for the given date."));
    }

    if ($responseJson["archived_snapshots"]["closest"]["status"] != 200)
    {
        exit(return_fail("The Wayback Machine had attempted but failed to archive the site on the given date."));
    }

    if (!$responseJson["archived_snapshots"]["closest"]["available"])
    {
        exit(return_fail("The requested archived copy of the site exists but is not currently available."));
    }

    if (!preg_match("/^{$year}/", $responseJson["archived_snapshots"]["closest"]["timestamp"]))
    {
        exit(return_fail("There is no archived copy of the site in the given year."));
    }
}

if (isset($_SERVER["HTTPS"]))
{
    $responseJson["archived_snapshots"]["closest"]["url"] = preg_replace("/^http:\/\//", "https://", $responseJson["archived_snapshots"]["closest"]["url"]);
}
else
{
    $responseJson["archived_snapshots"]["closest"]["url"] = preg_replace("/^https:\/\//", "http://", $responseJson["archived_snapshots"]["closest"]["url"]);
}

exit(return_success($responseJson["archived_snapshots"]["closest"]));

function return_fail($reason = "Unknown reason")
{
    echo json_encode(["successful"=>false, "error"=>$reason]);
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
