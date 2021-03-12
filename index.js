
const express = require('express');
const app = express();

app.get('/', (request, response) => {
     response.sendStatus(200);
});

let listener = app.listen(process.env.PORT, () => {
     console.log('Your app is currently listening on port: ' + listener.address().port);
});

const {Collection, Client, Discord} = require('discord.js');
const fs = require('fs');
const roblox = require('noblox.js');
const client = new Client({
    disableEveryone: true
})
const config = require('./config.json');
const prefix = config.prefix
const token = config.token
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 
client.on('ready', () => {

  client.user.setActivity(`tickets!`, { type: `LISTENING` }).catch(console.error);
    console.log(`${client.user.username} is online!`)
})

client.on('message', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) {
         command.run(client, message, args) 
    } else {
       message.reply("No commands found, please execute `b!help` command for all the command list.")
    }
})

client.login(token);