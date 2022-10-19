const { MessageEmbed } = require('discord.js');
const db = require("../../schema/autoReconnect");

module.exports = {
    name: '247',
    category: 'Music',
    description: 'Để bỏ qua bài hát đang phát hiện tại.',
    args: false,
    usage: '',
    userPrams: [],
    botPrams: ['EMBED_LINKS'],
    owner: false,
    player: true,
    dj: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {

        const player = client.manager.players.get(message.guild.id);

        let data = await db.findOne({Guild: message.guild.id})
        if (data) {
            await data.delete();
            let thing = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(` Chế độ 247 đã tắt`);
            message.reply({ embeds: [thing] })
        } else {
            data = new db({
                Guild: player.guild,
                TextId: player.text,
                VoiceId: player.voice
            })
            await data.save();
            let thing = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(`Chế độ 247 đã bật`);
            message.reply({ embeds: [thing] })
        }
    }
} 
