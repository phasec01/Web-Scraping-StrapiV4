"use strict";

const parser = require("cron-parser");

const scraperCanRun = async (scraper) => {
  const frequency = parser.parseExpression(scraper.frequency);
  const current_date = parseInt(new Date().getTime() / 1000);
  let next_execution_at = "";

  if (scraper.next_execution_at) {
    next_execution_at = scraper.next_execution_at;
  } else {
    next_execution_at = (frequency.next().getTime() / 1000).toString();
    await strapi.entityService.update("api::scraper.scraper", scraper.id, {
      data: {
        next_execution_at: next_execution_at,
      },
    });
  }

  try {
    if (next_execution_at <= current_date) {
      await strapi.entityService.update("api::scraper.scraper", scraper.id, {
        data: {
          next_execution_at: (frequency.next().getTime() / 1000).toString(),
        },
      });
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};

const getAllSG = async (scraper) => {
  const existingSG = await strapi.db
    .query("api::site-generator.site-generator")
    .findMany(
      {
        _limit: 1000,
        scraper: scraper.id,
      },
      ["name"]
    );

  const allSG = existingSG.map((x) => x.name);
  console.log(`Site generators in database: \t${allSG.length}`);

  return allSG;
};

const getDate = async () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date + " " + time;
};

const getReport = async (newSG) => {
  return { newSG: newSG, date: await getDate() };
};

module.exports = { getAllSG, scraperCanRun, getDate, getReport };
