const classHelper = require('./classHelper.js');
const iBase = require("./iBase.js");
const iPermissions = require("./iPermissions.js");


class iChannel extends iBase {
	constructor(discord, data, guild_id) {
		super(discord, data);
		
		var permo = data.permission_overwrites;
		if (permo) {
			permo.forEach((perm) => {
				perm.deny = new iPermissions(discord, perm.deny, this.constructor.name)
				perm.allow = new iPermissions(discord, perm.allow, this.constructor.name)
			})
		}
		
		for (var index in data) {
			var value = data[index]
			this[index] = value
		}
		
		this.guild_id = guild_id;
	}
	
	get guild() {
		return this.discord.guilds[this.guild_id]
	}
	
	get isDMChannel() {
		return this.type == classHelper.constants().CHANNELS.DM || this.type == classHelper.constants().CHANNELS.GROUP_DM
	}
	
	delete() {
		var discord = this.discord;
		return new Promise((resolve, reject) => {
			var url = classHelper.formatURL(discord.endpoints.updateChannel, {"channel.id": this.id})
			discord.http.delete(
				url,
				function(err, res, raw) {
					if (err) reject(err);
					if (res.statusCode==200) return resolve(raw);
					reject(raw);
				}
			)
		})
	}
	
	modify(changes) {
		var discord = this.discord;
		return new Promise((resolve, reject) => {
			var url = classHelper.formatURL(discord.endpoints.updateChannel, {"channel.id": this.id})
			discord.http.patch(
				url,
				JSON.stringify(changes),
				function(err, res, raw) {
					if (err) reject(err);
					if (res.statusCode==200) return resolve(raw);
					reject(raw);
				}
			)
		})
	}
}




module.exports = iChannel;





// dm
		/*
		{
			type: 1,
			recipients: [
				{
					username: '',
					id: '',
					discriminator: '',
					avatar: ''
				}
			],
			last_message_id: '',
			id: ''
		}
		*/
		
		// group dm
		/*
		{
			type: 3,
			recipients: [
				{
					username: '',
					id: '',
					discriminator: '',
					avatar: ''
				}
			],
			owner_id: '',
			name: null,
			last_message_id: '',
			id: '',
			icon: null
		}
		*/