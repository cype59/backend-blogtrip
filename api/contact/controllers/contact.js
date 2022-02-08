const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async create(ctx) {
        let entity;
        if(ctx.is('multipart')) {
            const {data, files} = parseMultipartData(ctx);
            entity = await strapi.services.contact.create(data, {files});
        }else {
            entity = await strapi.services.contact.create(ctx.request.body);
        }

        // await strapi.plugins['email'].services.email.send({
        //     to: 'cype59@gmail.com',
        //     from: 'joelrobuchon@strapi.io',
        //     cc: 'helenedarroze@strapi.io',
        //     bcc: 'ghislainearabian@strapi.io',
        //     replyTo: 'annesophiepic@strapi.io',
        //     subject: 'Use strapi email provider successfully',
        //     text: 'Hello world!',
        //     html: 'Hello world!',
        //   });

        return sanitizeEntity(entity, {model: strapi.models.contact})
    }

};
