const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "pause",
    category: "Music",
    description: "Tạm dừng bản nhạc hiện đang phát",
    args: false,
    usage: "",
    userPrams: [],
    botPrams: ["EMBED_LINKS"],
    dj: true,
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {
        const player = client.manager.players.get(message.guild.id);

        if (!player.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("Không có bản nhạc nào đang phát.");
            return message.reply({ embeds: [thing] });
        }

        const emojipause = client.emoji.pause;

        if (player.player.paused) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${emojipause} Trình phát đã bị tạm dừng.`);
            return message.reply({ embeds: [thing] });
        }

        await player.setPaused(true);

        const song = player.current;

        let thing = new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`${emojipause} **Paused**\n[${song.title}](${song.uri})`);
        return message.reply({ embeds: [thing] });
    },
};
