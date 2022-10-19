const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
  name: 'join',
  aliases: ['j'],
  category: 'Music',
  description: 'Tham gia kênh thoại.',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: false,
  execute: async (message, args, client, prefix) => {
    const { channel } = message.member.voice;
    const player = client.manager.players.get(message.guild.id);
    if (player) {
      return await message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Tôi đã kết nối <#${player.voice}> room thoại rồi!`),
        ],
      });
    } else {
      if (!message.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK]))
        return message.channel.send({
          embeds: [
            new MessageEmbed()
              .setColor(client.embedColor)
              .setDescription(
                `Tôi không có quyền để thực hiện lệnh, vui lòng trao quyền cho tôi \`CONNECT\` or \`SPEAK\`.`,
              ),
          ],
        });

      if (
        !message.guild.me
          .permissionsIn(channel)
          .has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])
      )
        return message.channel.send({
          embeds: [
            new MessageEmbed()
              .setColor(client.embedColor)
              .setDescription(
                `Tôi không có quyền để tham gia room thoại, vui lòng trao quyền \`CONNECT\` or \`SPEAK\`.`,
              ),
          ],
        });

      const emojiJoin = message.client.emoji.join;

      await client.manager.createPlayer({
        guildId: message.guild.id,
        voiceId: message.member.voice.channel.id,
        textId: message.channel.id,
        deaf: true,
      });

      let thing = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(
          `${emojiJoin} **Tham gia kênh thoại**\nĐã tham gia <#${channel.id}> và được khoá ở kênh <#${message.channel.id}>`,
        );
      return message.reply({ embeds: [thing] });
    }
  },
};
