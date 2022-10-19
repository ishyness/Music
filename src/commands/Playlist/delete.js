const { MessageEmbed } = require('discord.js');
const db = require('../../schema/playlist');

module.exports = {
  name: 'delete',
  aliases: ['pldelete'],
  category: 'Playlist',
  description: 'Xóa danh sách phát đã lưu của bạn.',
  args: false,
  usage: '<playlist name>',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (message, args, client, prefix) => {
    const Name = args[0];
    const data = await db.findOne({ UserId: message.author.id, PlaylistName: Name });
    if (!data) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Bạn không có danh sách phát với tên **${Name}** này`),
        ],
      });
    }
    if (data.length == 0) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(` Bạn không có danh sách phát với tên **${Name}** này.`),
        ],
      });
    }
    await data.delete();
    const embed = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`Xoá thành công ${Name} danh sách phát.`);
    return message.channel.send({ embeds: [embed] });
  },
};
