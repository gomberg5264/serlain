/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "./assert.js";

// Queries Wayback Machine's Availability API for a URL to a capture of the given website
// (e.g. "microsoft.com") in the given year (e.g. 2004), and returns it. In case of error,
// null is returned.
export async function get_wayback_page(websiteUrl, year)
{
    panic_if_not_type("string", websiteUrl);
    panic_if_not_type("number", year);

    const response = await fetch(`./get-wayback-url.php?website=${websiteUrl}&year=${year}`);

    if (!response.ok)
    {
        return null;
    }

    let jsonData = undefined;

    try
    {
        jsonData = await response.json();
    }
    catch (error)
    {
        console.error(`A request to the Wayback API failed. Reason: ${error}`);
        return null;
    }

    if (jsonData &&
        !jsonData.successful)
    {
        console.error(`A request to the Wayback API failed. Reason: ${jsonData.error}`);
        return null;
    }

    if (!jsonData ||
        !jsonData.url ||
        (typeof jsonData.url !== "string"))
    {
        console.error("A request to Serlain's back-end returned with a malformed response.");
        return null;
    }

    return {
        url: jsonData.url
    };
}
