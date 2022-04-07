module.exports = {
  routes: [
    {
      method: "GET",
      path: "/scraper/:slug",
      handler: "scraper.findOne",
      config: {
        policies: [],
      },
    },
  ],
};
