"use strict";

import { panic_if_not_type } from "./assert.js";
export async function get_wayback_page(websiteUrl, year) {
  panic_if_not_type("string", websiteUrl);
  panic_if_not_type("number", year);
  const waybackPage = {
    url: "",
    html: ""
  };
  {
    const response = await fetch(`./get-wayback-url.php?website=${websiteUrl}&year=${year}`);

    if (!response.ok) {
      return null;
    }

    const jsonData = await response.json();

    if (jsonData && !jsonData.successful) {
      console.error(`A request to the Wayback API failed. Reason: ${jsonData.error}`);
      return null;
    }

    if (!jsonData || !jsonData.url || typeof jsonData.url !== "string") {
      console.error("A request to Serlain's back-end returned with a malformed response.");
      return null;
    }

    jsonData.url = jsonData.url.replace(`${jsonData.timestamp}`, `${jsonData.timestamp}if_`);
    waybackPage.url = jsonData.url;
  }
  return waybackPage;
}