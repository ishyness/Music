const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'loop',
  aliases: ['l'],
  category: 'Music',
  description: 'Thiết lập vòng lặp',
  args: true,
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
      let thing = new MessageEmbed().setColor('RED').setDescription('Không có bài hát nào đang bật.');
      return message.reply({ embeds: [thing] });
    }
    const emojiloop = client.emoji.loop;

    if (['q', 'queue'].includes(args[0])) {
      await player.setLoop('queue');
      let thing = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`${emojiloop} Lặp lại bài hát đã **bật**`);
      return message.reply({ embeds: [thing] });
    } else if (['track', 't'].includes(args[0])) {
      await player.setLoop('track');

      let thing = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`${emojiloop} Lặp lại danh sách đã **bật**`);
      return message.reply({ embeds: [thing] });
    } else if (['off', 'c', 'clear'].includes(args[0])) {
      await player.setLoop('off');

      let thing = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`${emojiloop} lặp lại đã  **tắt**`);
      return message.reply({ embeds: [thing] });
    }
  },
};
