'use strict';

/**
 * scraper router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::scraper.scraper');
