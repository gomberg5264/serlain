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

    // Get the Wayback Machine URL for the given website.
    {
        const response = await fetch(`./get-wayback-url.php?website=${websiteUrl}&year=${year}`);

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

        // Append "if_" to the URL's timestamp to request that the Wayback Machine toolbar
        // not be part of the page.
        jsonData.url = jsonData.url.replace(`${jsonData.timestamp}`, `${jsonData.timestamp}if_`);

        waybackPage.url = jsonData.url;
    }

    /* Disabled for now, while proper client-side support is implemented (if ever).
    // Download the Wayback Machine page's HTML.
    {
        const response = await fetch(`./dist/server/get-wayback-html.php?waybackUrl=${waybackPage.url}`);

        if (!response.ok)
        {
            return null;
        }

        const htmlData = await response.json();

        if (!htmlData ||
            !htmlData.successful)
        {
            return null;
        }

        if (!htmlData.html || (typeof htmlData.html !== "string"))
        {
            return null;
        }

        waybackPage.html = htmlData.html;
    }
    */

    return waybackPage;
}
