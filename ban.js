module.exports = {
	name: 'ban',
	aliases: ['silence'],
	description: 'Bans a user!',
	guildOnly: true,
	usage: '<user>',
	permissions: 'BAN_MEMBERS',
	args: true,
	execute(message, args) {
		const hi = args[0];
		if (!hi.includes('@')) {
			message.reply('You didn\'t mention a member!');
		} else {
			const member = message.mentions.members.first();
			if (!member) return message.reply('I could not find that member! They may have left or already been banned.');
			const reason = args.slice(1).join(' ');
			const executor = message.member;
			const highrole = executor.roles.highest;
			const highrole2 = member.roles.highest;
			if (!message.mentions.members.size) {
				return message.reply('You need to tag a user in order to ban them!');
			}
			if (highrole.position > highrole2.position) {
				member.ban({ days: 0, reason: reason ? `${reason} - Executed by ${message.author.username}` : `Executed by ${message.author.username}` });
				message.channel.send(`Successfully banned ${member}!`);
				message.channel.send('https://cdn.discordapp.com/attachments/748934237624729710/816762524237299772/ban.gif');
			}
			else if (highrole.position <= highrole2.position) {
				message.reply('You cannot use this command due to role hierarchy!');
			}
		}
	},
};
