<?php

// Test that we've been given the required input parameters.
if (!isset($_GET["waybackUrl"]))
{
    exit(return_fail());
}

$waybackUrl = $_GET["waybackUrl"];

// Sanity-check and sanitize the input parameters.
{
    if (strlen($waybackUrl) > 400)
    {
        exit(return_fail());
    }

    if (!preg_match("/^(http|https):\/\/web.archive.org\/web\//", $waybackUrl))
    {
        exit(return_fail());
    }
}

$html = file_get_contents($waybackUrl);

exit(return_success($html));

function return_fail()
{
    echo json_encode(["successful"=>false]);
}

function return_success(string $html)
{
    echo json_encode([
        "successful"=>true,
        "html"=>$html,
    ], JSON_UNESCAPED_SLASHES);
}

?>
