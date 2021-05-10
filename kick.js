module.exports = {
	name: 'kick',
	description: 'Tag a member and kick them!',
	guildOnly: true,
	permissions: 'KICK_MEMBERS',
	usage: '<user>',
	args: true,
	execute(message, args) {
		const hi = args[0];
		if (!hi.includes('@')) {
			message.reply('You never mentioned a user to kick!');
		} else {
			const member = message.mentions.members.first();
			const executor = message.member;
			const highrole = executor.roles.highest;
			const highrole2 = member.roles.highest;
			if (!message.mentions.users.size) {
				return message.reply('You need to tag a user in order to kick them!');
			}
			if (highrole.position > highrole2.position || message.author.id === '608758675183501315') {
				const user = message.mentions.members.first();
				user.kick();
				message.channel.send(`Successfully kicked ${user}!`);
			} else {
				message.reply('You cannot use this command due to role hierarchy!');
			}
		}
	},
};
