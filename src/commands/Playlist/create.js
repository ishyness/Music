const { MessageEmbed } = require('discord.js');
const db = require('../../schema/playlist');

module.exports = {
  name: 'create',
  aliases: ['plcreate'],
  category: 'Playlist',
  description: "Tạo danh sách phát của người dùng.",
  args: true,
  usage: '<playlist name>',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const Name = args[0];
    if (Name.length > 10) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription('Tên danh sách không được hơn 10 ký tự.'),
        ],
      });
    }
    let data = await db.find({
      UserId: message.author.id,
      PlaylistName: Name,
    });

    if (data.length > 0) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(
              `Danh sách này đã có. Vui lòng tạo tên khác: \`${prefix}\`delete \`${Name}\``,
            ),
        ],
      });
    }
    let userData = db.find({
      UserId: message.author.id,
    });
    if (userData.length >= 10) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Bạn chỉ có thể tạo \`10\` danh sách phát.`),
        ],
      });
    }

    const newData = new db({
      UserName: message.author.tag,
      UserId: message.author.id,
      PlaylistName: Name,
      CreatedOn: Math.round(Date.now() / 1000),
    });
    await newData.save();
    const embed = new MessageEmbed()
      .setDescription(`Tạo danh sách phát cho bạn thành công **${Name}**`)
      .setColor(client.embedColor);
    return message.channel.send({ embeds: [embed] });
  },
};
