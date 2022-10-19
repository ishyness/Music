const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'resume',
  aliases: ['r'],
  category: 'Music',
  description: 'Tiếp tục phát nhạc hiện đang phát',
  args: false,
  usage: '<Number of song in queue>',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  dj: true,
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const player = client.manager.players.get(message.guild.id);
    const song = player.current;

    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('Không có nhạc đang phát');
      return message.reply({ embeds: [thing] });
    }

    const emojiresume = client.emoji.resume;

    if (!player.player.paused) {
      let thing = new MessageEmbed()
        .setColor('RED')
        .setDescription(`${emojiresume} Bản nhạc đã được **resumed**.`);
      return message.reply({ embeds: [thing] });
    }

    await player.setPaused(false);

    let thing = new MessageEmbed()
      .setDescription(`${emojiresume} **Resumed**\n[${song.title}](${song.uri})`)
      .setColor(client.embedColor);
    return message.reply({ embeds: [thing] });
  },
};
