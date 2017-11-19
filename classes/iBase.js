const classHelper = require('./classHelper.js');


class iBase {
	constructor(discord, rawData) {
		classHelper.setHiddenProperty(this, '_raw', rawData);
		classHelper.setHiddenProperty(this, '_isDiscordClass', true);
		classHelper.setHiddenProperty(this, 'discord', discord);
		classHelper.setHiddenProperty(this, 'class', this.constructor.name);
		
		//console.log(Object.getPrototypeOf(this).name)
	}
}



module.exports = iBase;