const Discord = require('discord.js');

module.exports = {
	name: 'avatar',
	aliases: ['icon', 'pfp', 'av'],
	description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
	usage: '<user>',
	cooldown: 10,
	pCooldown: 6,
	execute(message, args) {
		if (!message.mentions.users.size) {
			const avatar1 = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle(`${message.author.tag}'s Avatar:`)
				.setImage(`${message.author.displayAvatarURL({ dynamic: true, format: 'png' })}`);

			message.channel.send(avatar1);
		} else {
			const dude = message.mentions.users.first();

			const dude1 = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle(`${dude.tag}'s Avatar:`)
				.setImage(`${dude.displayAvatarURL({ dynamic: true, format: 'png' })}`);

			message.channel.send(dude1);
		}
	},
};
