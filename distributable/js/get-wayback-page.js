"use strict";

import { panic_if_not_type } from "./assert.js";
export async function get_wayback_page(websiteUrl, year) {
  panic_if_not_type("string", websiteUrl);
  panic_if_not_type("number", year);
  const waybackPage = {
    url: "",
    html: ""
  };
  await async_delay_ms(500 + 1000 * Math.random());
  {
    if (typeof year !== "number" || year < 1990 || year > new Date().getFullYear()) {
      return null;
    }

    if (typeof websiteUrl !== "string" || websiteUrl.length > 300) {
      return null;
    }

    if (websiteUrl.match(/[^\w-_~\.:\/]+/)) {
      console.log("Invalid");
      return null;
    }
  }
  {
    const corsProxyUrl = "//cors-anywhere.herokuapp.com";
    const response = await fetch(`${corsProxyUrl}///archive.org/wayback/available?url=${websiteUrl}&timestamp=${year}0615`);

    if (!response.ok) {
      return null;
    }

    const jsonData = await response.json();

    if (!jsonData || typeof jsonData["archived_snapshots"] !== "object" || typeof jsonData["archived_snapshots"]["closest"] !== "object" || typeof jsonData["archived_snapshots"]["closest"]["status"] !== "string" || typeof jsonData["archived_snapshots"]["closest"]["available"] !== "boolean" || typeof jsonData["archived_snapshots"]["closest"]["timestamp"] !== "string" || typeof jsonData["archived_snapshots"]["closest"]["url"] !== "string") {
      return null;
    }

    if (jsonData["archived_snapshots"]["closest"]["status"] != 200 || !jsonData["archived_snapshots"]["closest"]["timestamp"].startsWith(year) || !jsonData["archived_snapshots"]["closest"]["available"]) {
      return null;
    }

    waybackPage.url = jsonData["archived_snapshots"]["closest"]["url"];
  }
  return waybackPage;
}

function async_delay_ms(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}