const { Client, Message } = require('discord.js');
const Discord = require('discord.js');
require('dotenv').config();

module.exports = {
    name : 'new',
    /**
     * @param {Client} client
     * @param {Message} message
     */
    run : async(client, message) => {
      const role = message.guild.roles.cache.find(role => role.name == process.env.supportrole)
        const ch = message.guild.channels.cache.find(ch => ch.name === message.author.id)
        if(ch) return message.channel.send('You already have a ticket open.')
        message.guild.channels.create(`ticket-${message.author.username}`, {
            type : 'text',
            parent : process.env.parentId,
            permissionOverwrites : [
                {
                    id : message.guild.id,
                    deny : ['VIEW_CHANNEL']
                },
                {
                    id : message.author.id,
                    allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'ATTACH_FILES']
                },
                {
                  id : role.id,
                  allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'ATTACH_FILES']
                }
            ]
        }).then(async channel=> {
                        message.reply(`Ticket has been created! Check out <#${channel.id}> to view your ticket`)
                        channel.send(`<@${message.author.id}>, @here`, new Discord.MessageEmbed()
                        .setTitle("Welcome to your ticket!")
                        .setDescription(`Hello! Please send all the information you need to know so we can answer your inquiries.`)
                        .setColor("00ff00"))
                    })
    }
}