module.exports = {
	name: 'lockchannel',
	aliases: ['lock'],
	description: 'Locks the channel!',
	cooldown: 60,
	guildOnly: true,
	permissions: 'MANAGE_CHANNELS',
	async execute(message) {
		const chnl = message.mentions.channels.first() || message.channel;
		chnl.updateOverwrite(chnl.guild.roles.everyone, { SEND_MESSAGES: false });
		message.channel.send(`🔒 Locked ${chnl}!`);
	},
};