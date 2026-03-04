"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const publicRole = await strapi
      .query("plugin::users-permissions.role")
      .findOne({ where: { type: "public" } });

    if (!publicRole) return;

    const permissions = [
      "api::article.article.find",
      "api::article.article.findOne",
      "api::attraction.attraction.find",
      "api::attraction.attraction.findOne",
      "api::homepage.homepage.find",
      "api::global.global.find",
      "api::market-piece.market-piece.find",
      "api::market-piece.market-piece.findOne",
    ];

    for (const action of permissions) {
      const existing = await strapi
        .query("plugin::users-permissions.permission")
        .findOne({ where: { role: publicRole.id, action } });

      if (!existing) {
        await strapi.query("plugin::users-permissions.permission").create({
          data: {
            action,
            role: publicRole.id,
          },
        });
      }
    }
  },
};
