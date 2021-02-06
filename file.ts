console.log(`
                      ${version} [ ${this.client.user.username} ]
			         ├ - Loaded  - ${this.client.commandHandler.modules.size}  - Commands
			         ├ - Loaded  - ${this.client.listenerHandler.modules.size}   - Listeners                              
			         ├ - Loaded  - ${this.client.inhibitorHandler.modules.size}   - Inhibitors                            
			         ├ - Loaded  - ${this.client.guilds.cache.size}   - Servers                                           
			         ├ - Loaded  - ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}  - People           
			         ├ - Loaded  - ${this.client.guilds.cache.reduce((a, b) => a + b.channels.cache.size, 0)} - Channels 
			         ├ - Version - ${akairov}    - Akairo                                                           
			         ├ - Version - ${djsversion}   - Discord.js                                                     
			         ╰ - Version - ${process.version} - Node.js
            `);
