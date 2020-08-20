/*
 * 2019 Tarpeeksi Hyvae Soft
 *
 * Software: Serlain
 * 
 */

"use strict";

import {panic_if_not_type} from "./assert.js";

// Queries Wayback Machine's Availability API for a URL to a capture of the given website
// (e.g. "microsoft.com") in the given year (e.g. 2004), and downloads its HTML.
//
// If no error was encountered, the return value will be an object of the following kind:
//
//   {
//       url: "",
//       html: "",
//   }
// 
// If no capture of the given website in the given year could be obtained, null is returned.
//
export async function get_wayback_page(websiteUrl, year)
{
    panic_if_not_type("string", websiteUrl);
    panic_if_not_type("number", year);

    const waybackPage = {url:"", html:""};

    // Simulate the lag of a slow network in making this request.
    await async_delay_ms(500 + (1000 * Math.random()));

    // Sanity-check and sanitize the input parameters.
    {
        if ((typeof year !== "number") ||
            (year < 1990) ||
            (year > (new Date().getFullYear())))
        {
            return null;
        }

        if ((typeof websiteUrl !== "string") ||
            (websiteUrl.length > 300))
        {
            return null;
        }

        // Only allow a-z, A-Z, 0-9, and a couple of additional symbols in URLs.
        if (websiteUrl.match(/[^\w-_~\.:\/]+/))
        {
            console.log("Invalid");
            return null;
        }
    }

    // Get the Wayback Machine URL for the given website.
    {
        // The Wayback Machine API response doesn't seem to set Access-Control-Allow-Origin,
        // so we'll use a CORS proxy to allow querying the API via client-side code.
        const corsProxyUrl = "//cors-anywhere.herokuapp.com";

        const response = await fetch(`${corsProxyUrl}///archive.org/wayback/available?url=${websiteUrl}&timestamp=${year}0615`);

        if (!response.ok)
        {
            return null;
        }

        const jsonData = await response.json();

        if (!jsonData ||
            (typeof jsonData["archived_snapshots"] !== "object") ||
            (typeof jsonData["archived_snapshots"]["closest"] !== "object") ||
            (typeof jsonData["archived_snapshots"]["closest"]["status"] !== "string") ||
            (typeof jsonData["archived_snapshots"]["closest"]["available"] !== "boolean") ||
            (typeof jsonData["archived_snapshots"]["closest"]["timestamp"] !== "string") ||
            (typeof jsonData["archived_snapshots"]["closest"]["url"] !== "string"))
        {
            return null;
        }

        if ((jsonData["archived_snapshots"]["closest"]["status"] != 200) ||
            !jsonData["archived_snapshots"]["closest"]["timestamp"].startsWith(year) ||
            !jsonData["archived_snapshots"]["closest"]["available"])
        {
            return null;
        }

        waybackPage.url = jsonData["archived_snapshots"]["closest"]["url"];
    }

    return waybackPage;
}

function async_delay_ms(ms)
{
    return new Promise((resolve)=>
    {
        setTimeout(resolve, ms);
    });
}
