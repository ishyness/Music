const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'lienhe',
  category: 'Information',
  aliases: [],
  description: 'Cung cấp cho bạn liên kết của máy chủ hỗ trợ của chúng tôi',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {
    var support = client.config.links.support;

    const row = new MessageActionRow().addComponents(
      new MessageButton().setLabel('Server Hỗ trợ').setStyle('LINK').setURL(support),
    );
    const embed = new MessageEmbed()
      .setDescription(`Nhấp [vào đây](${support}) Để tham gia máy chủ hỗ trợ hoặc nhấp vào bên dưới. `)
      .setColor(client.embedColor);
    await message.reply({ embeds: [embed], components: [row] });
  },
};
