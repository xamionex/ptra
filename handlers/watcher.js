const chokidar = require("chokidar");
const { basename } = require("path");
const fs = require("fs");

// TODO: Fix not working lmao
module.exports = (client) => {
    const prefix_categories = fs.readdirSync("./commands/prefix");
    const slash_categories = fs.readdirSync("./commands/prefix");

    prefix_categories.forEach(prefix_category => {
        chokidar.watch(`./commands/prefix/${prefix_category}`, { awaitWriteFinish: true }).on("change", (file) => {
            const commandName = basename(file, ".js")
            console.log(`[HANDLER - RELOADER] Reloading: ${commandName}.js`.brightRed)
            delete require.cache[require.resolve(`../commands/prefix/${prefix_category}/${commandName}.js`)];
            client.commands.delete(`../commands/prefix/${prefix_category}/${commandName}.js`);
            const props = require(`../commands/prefix/${prefix_category}/${commandName}.js`);
            client.commands.set(commandName, props);
            console.log(`[HANDLER - RELOADER] Reloaded: ${commandName}.js`.brightGreen)
        });
    });
    slash_categories.forEach(slash_category => {
        chokidar.watch(`./commands/slash/${slash_category}`, { awaitWriteFinish: true }).on("change", (file) => {
            const commandName = basename(file, ".js")
            console.log(`[HANDLER - RELOADER] Reloading: ${commandName}.js`.brightRed)
            delete require.cache[require.resolve(`../commands/slash/${slash_category}/${commandName}.js`)];
            client.commands.delete(`../commands/slash/${slash_category}/${commandName}.js`);
            const props = require(`../commands/slash/${slash_category}/${commandName}.js`);
            client.commands.set(commandName, props);
            console.log(`[HANDLER - RELOADER] Reloaded: ${commandName}.js`.brightGreen)
        });
    });
};