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

    if (!jsonData || !jsonData.successful) {
      return null;
    }

    if (!jsonData.url || typeof jsonData.url !== "string") {
      return null;
    }

    waybackPage.url = jsonData.url;
  }
  return waybackPage;
}