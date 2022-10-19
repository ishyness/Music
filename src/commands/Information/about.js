const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
  name: 'thongtin',
  category: 'Information',
  aliases: ['botinfo'],
  description: 'Thông tin về FEAR-Music',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {
    const row = new MessageActionRow().addComponents(
      new MessageButton().setLabel('Invite').setStyle('LINK').setURL(client.config.links.invite),
      new MessageButton()
        .setLabel('Discord')
        .setStyle('LINK')
        .setURL('https://discord.gg/JmUug2RGKJ'),
      new MessageButton().setLabel('Hỗ trợ').setStyle('LINK').setURL(client.config.links.support),
    );
    const mainPage = new MessageEmbed()
      .setAuthor({
        name: 'FEAR-Music',
        iconURL:
          'https://i.imgur.com/7oKYTa0.png',
      })
      .setThumbnail(
        'https://i.imgur.com/7oKYTa0.png',
      )
      .setColor('#303236')
      .addField(
        'Sáng lập',
        '[SrymC](https://discord.gg/63A5DSP5ZZ), [iSaber](https://discord.gg/63A5DSP5ZZ)',
        true,
      )
      .addField('Chủ sở hữu', '[SrymC](https://discord.gg/63A5DSP5ZZ)', true)
      .addField('Liên hệ', '[Here](https://discord.gg/JmUug2RGKJ)', true)
      .addField(
        '\u200b',
        `[FEAR Music](https://discord.gg/JmUug2RGKJ) là sản phẩm do  [SrymC](https://discord.gg/63A5DSP5ZZ) lập trình. \nMong các bạn dùng và trải nghiệm . \nMọi đóng góp ý kiến xin nhận.        \n💲 VCB 9842977200 VU NGUYEN CAT 💲 `,
      );
    return message.reply({ embeds: [mainPage], components: [row] });
  },
};