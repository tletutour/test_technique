//  __   __  ___        ___
// |__) /  \  |  |__/ |  |  
// |__) \__/  |  |  \ |  |  

// This is the main file for the front bot.

// Import Botkit's core features
const { Botkit } = require('botkit');
const {  BotkitConversation } = require('botkit');
const axios = require('axios').default;

// Load process.env values from .env file
require('dotenv').config();

const controller = new Botkit({
    webhook_uri: '/api/messages',

    adapterConfig: {
        appId: process.env.APP_ID,
        appPassword: process.env.APP_PASSWORD,
    }
});
let convo_creer=new BotkitConversation('creer',controller);

convo_creer.vars={"titre":undefined,"descr":undefined};
convo_creer.addAction('creer');

convo_creer.addAction('creer');
convo_creer.addMessage('Créons !','creer');
convo_creer.addQuestion('Quel est le titre du ticket ?', async(response, convo_creer, bot) => {
    convo_creer.setVar('titre',response)
},'color', 'creer');


convo_creer.addQuestion('Quel est la description du ticket ?', async(response, convo_creer, bot) => {
    convo_creer.setVar('descr',response);
    console.log(convo_creer.vars)
},'color', 'creer');
convo_creer.addMessage('Donc si je résume : ','creer');
convo_creer.addMessage('Titre : {{vars.titre}}','creer');
convo_creer.addMessage('Description : {{vars.descr}}','creer');
convo_creer.addQuestion("C'est bien ça ?", [
    {
        pattern: 'non',
        handler: async(response, convo_creer, bot) => {
            // if user says no, go back to favorite color.
            await convo_creer.gotoThread('creer');
        }
    },
    {
        default: true,
        handler: async(response, convo_creer, bot) => {
            const titre=convo_creer.vars.titre;
            const description=convo_creer.vars.descr;
            axios.post('http://localhost:5000/tickets', {
                titre: titre,
                description: description
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    }
], 'confirm', 'creer');


let convo_voir=new BotkitConversation('voir',controller);

convo_voir.addAction('voir');


convo_voir.before('voir',async(convo_voir, bot) => {
    axios.get('http://localhost:5000/tickets')
        .then(function (response) {
            // handle succes
            console.log("handle success ");
            //console.log(response.data);
            convo_voir.setVar('res',response.data);

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

});

convo_voir.addMessage("J'ai trouvé ça !",'voir');
convo_voir.addMessage("{{#vars.res}}"+" titre : {{titre}}"+"description : {{description}}"+"{{/vars.res}}"+"{{^vars.res}}"+"Aucun ticket ou erreur de chargement"+"{{/vars.res}}",'voir');
//convo_voir.addMessage(convo_voir.vars.res,'voir');
convo_voir.after(async(results, bot) => {
    console.log("finished");
});

// create a thread that asks the user for their name.
// after collecting name, call gotoThread('completed') to display completion message

controller.addDialog(convo_voir);
controller.addDialog(convo_creer);
// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {

    // load traditional developer-created local custom feature modules
    //controller.loadModules(__dirname + '/features');
    controller.hears(['bonjour','salut','coucou'],'message', async(bot, message) => {
        console.log("bonjour");
        await bot.reply(message,'Bonjour !');
    });
    controller.hears(new RegExp(/(voir)|(ticket)/i),'message', async(bot, message) => {
        console.log("dialogue voir");
        await bot.beginDialog('voir');
    });
    controller.hears(new RegExp(/(cr.er)|(cr.ation)/i),'message', async(bot, message) => {
        console.log("dialogue creer");
        await bot.beginDialog('creer');
    });
});



controller.webserver.get('/', (req, res) => {

    res.send(`This app is running Botkit ${ controller.version }.`);

});





