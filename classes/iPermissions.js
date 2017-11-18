const classHelper = require('./classHelper.js');
const iBase = require('./iBase.js');
const PERMISSIONS = classHelper.constants().PERMISSIONS;
const CHANNELS = classHelper.constants().CHANNELS;

// i don't know how to handle permission bits
// so some of this might looks familiar

var typicalChannel = function(a) {
	// ManageRoles appears to be ManagePermissions
	a.KickMembers = true;
	a.BanMembers = true;
	a.Administrator = true;
	a.ManageServer = true;
	a.ChangeNickname = true;
	a.ManageNicknames = true;
	a.ManageEmojis = true;
	a.ViewAuditLog = true;
}
	

class iPermissions extends iBase {
	constructor(raw, superType) {
		super(raw);
		classHelper.setHiddenProperty(this, 'raw', raw || 0);
		
		var bigX = "";
		var littleX = {};
		
		if (superType == CHANNELS.TEXT) {
			bigX = 'VOICE';
			typicalChannel(littleX);
		} else if (superType == CHANNELS.VOICE) {
			bigX = 'TEXT';
			typicalChannel(littleX);
		}
		
		
		
		
		
		
		for (let type in PERMISSIONS) {
			if (type != bigX) {
				this[type] = {}
				for (let permission in PERMISSIONS[type]) {
					if (littleX[permission] != true) {
						const bit = PERMISSIONS[type][permission];
						Object.defineProperty(this[type], permission, {
							enumerable: true,
							get: () => (this.raw & bit) === bit,
							set: (v) => v ? (this.raw |= bit) : (this.raw &= ~bit)
						});
					}
				}
			}
		}
		
		/*
		for (let type in PERMISSIONS) {
			this[type] = {}
			for (let permission in PERMISSIONS[type]) {
				const bit = PERMISSIONS[type][permission];
				Object.defineProperty(this[type], permission, {
					enumerable: true,
					get: () => (this.raw & bit) === bit,
					set: (v) => v ? (this.raw |= bit) : (this.raw &= ~bit)
				});
			}
		}
		*/
	}
	
	inspect() { return JSON.parse(JSON.stringify(this)); }
}


module.exports = iPermissions;






// permission thing at: https://discordapp.com/developers/docs/topics/permissions



/*
Bitwise Permission 	Flags
Permission				Value		Description
CREATE_INSTANT_INVITE	0x00000001	Allows creation of instant invites
KICK_MEMBERS *			0x00000002	Allows kicking members
BAN_MEMBERS *			0x00000004	Allows banning members
ADMINISTRATOR *			0x00000008	Allows all permissions and bypasses channel permission overwrites
MANAGE_CHANNELS *		0x00000010	Allows management and editing of channels
MANAGE_GUILD *			0x00000020	Allows management and editing of the guild
ADD_REACTIONS			0x00000040	Allows for the addition of reactions to messages
VIEW_AUDIT_LOG			0x00000080	Allows for viewing of audit logs
READ_MESSAGES			0x00000400	Allows reading messages in a channel. The channel will not appear for users without this permission
SEND_MESSAGES			0x00000800	Allows for sending messages in a channel
SEND_TTS_MESSAGES		0x00001000	Allows for sending of /tts messages
MANAGE_MESSAGES *		0x00002000	Allows for deletion of other users messages
EMBED_LINKS				0x00004000	Links sent by this user will be auto-embedded
ATTACH_FILES			0x00008000	Allows for uploading images and files
READ_MESSAGE_HISTORY	0x00010000	Allows for reading of message history
MENTION_EVERYONE		0x00020000	Allows for using the @everyone tag to notify all users in a channel, and the @here tag to notify all online users in a channel
USE_EXTERNAL_EMOJIS		0x00040000	Allows the usage of custom emojis from other servers
CONNECT					0x00100000	Allows for joining of a voice channel
SPEAK					0x00200000	Allows for speaking in a voice channel
MUTE_MEMBERS			0x00400000	Allows for muting members in a voice channel
DEAFEN_MEMBERS			0x00800000	Allows for deafening of members in a voice channel
MOVE_MEMBERS			0x01000000	Allows for moving of members between voice channels
USE_VAD					0x02000000	Allows for using voice-activity-detection in a voice channel
CHANGE_NICKNAME			0x04000000	Allows for modification of own nickname
MANAGE_NICKNAMES		0x08000000	Allows for modification of other users nicknames
MANAGE_ROLES *			0x10000000	Allows management and editing of roles
MANAGE_WEBHOOKS *		0x20000000	Allows management and editing of webhooks
MANAGE_EMOJIS *			0x40000000	Allows management and editing of emojis
*/







