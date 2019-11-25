/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "./assert.js";

// Queries Wayback Machine's Availability API for a URL to a capture of the given website
// (e.g. "microsoft.com") in the given year (e.g. 2004). The return value will be a URL to
// the Wayback Machine capture of that website, e.g. for "microsoft.com" in the year 2004:
// "http://web.archive.org/web/20040614160604/http://www.microsoft.com:80/". Returns null
// if no capture of the given website in the given year could be found (e.g. because it
// doesn't exist in the Wayback Machine, because there was a network error, or the like).
export async function get_wayback_url(websiteUrl, year)
{
    panic_if_not_type("string", websiteUrl);
    panic_if_not_type("number", year);

    // The API returns the closest matching capture for the given timestamp, which thus
    // isn't necessarily in the requested year. To maximize our chances of getting a
    // capture in the desired year, let's ask for it in the middle of that year (i.e.
    // in June).
    const response = await fetch(`./.src/get-wayback-url.php?website=${websiteUrl}&year=${year}`);

    if (!response.ok)
    {
        return null;
    }

    const jsonData = await response.json();

    if (!jsonData ||
        !jsonData.successful)
    {
        return null;
    }

    if (!jsonData.url || (typeof jsonData.url !== "string"))
    {
        return null;
    }

    return jsonData.url;
}
