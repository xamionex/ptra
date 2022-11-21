// Require Sequelize
const Sequelize = require("sequelize");
const dotenv = require('dotenv');
dotenv.config();
// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require("discord.js");

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;
    // ...
});

// Login to Discord with your client's token
client.login(process.env.token);
