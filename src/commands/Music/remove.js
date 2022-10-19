const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'remove',
  category: 'Music',
  description: 'Xóa bài hát khỏi hàng đợi',
  args: true,
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

    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('Không có nhạc đang phát.');
      return message.reply({ embeds: [thing] });
    }

    const position = Number(args[0]) - 1;
    if (position > player.queue.length) {
      const number = position + 1;
      let thing = new MessageEmbed()
        .setColor('RED')
        .setDescription(`No songs at number ${number}.\nTotal Songs: ${player.queue.length}`);
      return message.reply({ embeds: [thing] });
    }

    const song = player.queue[position];

    await player.queue.splice(position);

    const emojieject = client.emoji.remove;

    let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`${emojieject} Removed\n[${song.title}](${song.uri})`);
    return message.reply({ embeds: [thing] });
  },
};
