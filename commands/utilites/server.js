const Discord = require('discord.js');
const servers = require('../../models/users/serverPremium');

module.exports = {
	name: 'server',
	aliases: ['server-info', 'serverinfo'],
	description: 'Display info about this server.',
	guildOnly: true,
	cooldown: 30,
	pCooldown: 25,
	async execute(message, args, client) {
		servers.findOne({ id: message.guild.id }, async (err, data) => {
			const no = client.emojis.cache.find(e => e.name === 'voteno');
			const yes = client.emojis.cache.find(e => e.name === 'voteyes');
			const vc = client.emojis.cache.find(e => e.name === 'vc');
			const text = client.emojis.cache.find(e => e.name === 'textchannel');
			const boost = client.emojis.cache.find(e => e.name === 'cbboost');
			const bans = client.emojis.cache.find(e => e.name === 'cbban');
			const roles = client.emojis.cache.find(e => e.name === 'roles');
			const humanemoji = client.emojis.cache.find(e => e.name === 'cbhuman');
			const members = client.emojis.cache.find(e => e.name === 'cbmembers');
			const botsemoji = client.emojis.cache.find(e => e.name === 'cbbots');
			const smile = client.emojis.cache.find(e => e.name === 'cbsmile');
			const textcount = message.guild.channels.cache.filter((c) => c.type === 'text').size;
			const vccount = message.guild.channels.cache.filter((c) => c.type === 'voice').size;
			let verificationlevel;
			verificationlevel = message.guild.verificationLevel.toLowerCase();
			verificationlevel = verificationlevel.includes('_') ? verificationlevel.replace('_', ' ') : verificationlevel;
			const memberCount = message.guild.memberCount;
			const human = message.guild.members.cache.filter(member => !member.user.bot).size;
			const bots = memberCount - human;
			let level = message.guild.premiumTier;
			let outof;
			const boostcount = message.guild.premiumSubscriptionCount;
			if (level === 0) {
				// eslint-disable-next-line no-mixed-spaces-and-tabs
				level = 'Tier 0';
			} else if (level === 1) {
				// eslint-disable-next-line no-mixed-spaces-and-tabs
				level = 'Tier 1';
			} else if (level === 2) {
				level = 'Tier 2';
			} else if (level === 3) {
				level = 'Tier 3';
			}
			outof = boostcount < 2 ? 2 : outof = boostcount >= 2 && boostcount < 15 ? 15 : 30;
			const banned = (await message.guild.fetchBans()).size;
			let cbpremium;
			if (data) cbpremium = `${yes}\nAdded by <@${data.userid}>!`;
			if (!data) cbpremium = no;

			const serverinfo = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle(`${message.guild.name} Info!`)
				.setDescription(`All the details on ${message.guild.name}!`)
				.setThumbnail(`${message.guild.iconURL({ dynamic: true })}`)
				.addField('Owner', message.guild.owner.toString(), true)
				.addField('CyberBug Premium', cbpremium, true)
				.addField('Channels', `${text} ${textcount}\n${vc} ${vccount}`, true)
				.addField('Info', `Verification Level: **${verificationlevel}**\nVoice Region: **${message.guild.region.toLowerCase()}**\n[Server Icon Link](${message.guild.iconURL({ dynamic: true })})`, true)
				.addField('Prefix', `\`${await client.prefix(message)}\``, true)
				.addField('Members', `${members} ${memberCount}\n${humanemoji} ${human}\n${botsemoji} ${bots}`, true)
				.addField('Roles', `${roles} ${message.guild.roles.cache.size}`, true)
				.addField('Emojis', `${smile} ${message.guild.emojis.cache.size}`, true)
				.addField('Boosts', `${boost} ${boostcount}/${outof} (${level})`, true)
				.addField('Ban Count', `${bans} ${banned}`, true)
				.setTimestamp(message.guild.createdTimestamp)
				.setFooter(`ID: ${message.guild.id}, Created`, message.guild.iconURL());
			message.channel.send(serverinfo);
		});
	},
};
