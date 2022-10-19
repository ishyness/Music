const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'shuffle',
  category: 'Music',
  description: 'Xáo trộn hàng đợi',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  dj: true,
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const player = client.manager.players.get(message.guild.id);

    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('Không có nhạc đang phát.');
      return message.reply({ embeds: [thing] });
    }
    const emojishuffle = client.emoji.shuffle;

    let thing = new MessageEmbed()
      .setDescription(`${emojishuffle} Xáo trộn hàng đợi`)
      .setColor(client.embedColor);
    await player.shuffle();
    return message.reply({ embeds: [thing] }).catch((error) => client.logger.log(error, 'error'));
  },
};
