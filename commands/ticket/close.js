const { Message, Client } = require('discord.js')
const Discord = require('discord.js')
require('dotenv').config()

module.exports = {
    name : 'close',
    /**
     * @param {Client} client
     * @param {Message} message
     */
    run : async(client, message) => {
        const logEmbed = new Discord.MessageEmbed()
        .setColor('#2e83c0')
        .setTitle('Ticket Deletion Logs')
        .setDescription('')
        .addFields(
		{ name: 'Ticket Supporter', value: `<@${message.author.id}>` },
		{ name: 'Ticket', value: `${message.channel.name}` },
        { name: 'Action', value: `Closed` },
	)
        .setFooter('Support System')

        if(message.channel.parentID !== process.env.parentId) return message.channel.send('You can only use this command in a ticket!');
        const transcriptChannel = message.guild.channels.cache.get(process.env.logchannels)
        message.channel.send('Ticket will be deleted...')
        setTimeout(() => {
            message.channel.delete().then(async ch=> {
                        transcriptChannel.send(logEmbed)
                })
            })
        }, 
    }