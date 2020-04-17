const request = require('request');
const axios = require('axios');
const { IncomingWebhook } = require('@slack/webhook');
require('dotenv').config();

const url2 = '/search.json?query=type:ticket status:solved';
// const options2 = {
//         method: 'GET',
//         url: `${process.env.ZD_URL}/search.json?query=type:ticket status:solved `,
//         headers: {
//                 Authorization: `Basic ${process.env.ZD_API_KEY_SANDBOX}`,
//         },
//         json: true,
// };

//

const sendNotification = async ticketCount => {
        const url = process.env.SLACK_WEBHOOK_TESTING;
        const webhook = new IncomingWebhook(url);
        await webhook.send({
                text: `Ticket count is: ${ticketCount}`,
        });
};

const searchURL = async function(params) {
        try {
                const response = await axios.get(params, {
                        baseURL: process.env.ZD_URL,

                        headers: {
                                Authorization: `Basic ${process.env.ZD_API_KEY_SANDBOX}`,
                        },
                });
                const returnData = [];
                response.data.results.forEach(element => {
                        returnData.push(element.id);
                });
                console.log(response.data.count);
                return returnData;
        } catch (e) {
                return console.log(e);
        }
};

// const newSearch = searchURL().then(result => {
//         console.log(result);
// });

// const getTicketCount = async () => {
//         const thing = await request(options2, async function(error, response) {
//                 if (response.body.count > 1) {
//                         const { count } = response.body;
//                         sendNotification(response.body.count);
//                 }
//         });
//         return thing;
// };

module.exports = { sendNotification, searchURL };
