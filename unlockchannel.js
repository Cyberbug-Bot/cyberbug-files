module.exports = {
	name: 'unlockchannel',
	aliases: ['unlock'],
	description: 'Locks the channel!',
	cooldown: 60,
	guildOnly: true,
	permissions: 'MANAGE_CHANNELS',
	async execute(message) {
		const chnl = message.mentions.channels.first() || message.channel;
		chnl.updateOverwrite(chnl.guild.roles.everyone, { SEND_MESSAGES: true });
		message.channel.send(`🔓 Unlocked ${chnl}!`);
	},
};