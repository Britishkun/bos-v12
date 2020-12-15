module.exports = async(client, message) => {
  
 let prefix = await client.db.get(`prefix_${message.guild.id}`)
 if(prefix === null) prefix = client.config.prefix
  
  if(!message.guild || message.author.bot) return;
  
  if(!message.content.toLowerCase().startsWith(prefix)) return;
  
  let args = message.content.slice(prefix.length).trim().split(/ +/g)
  let cmd = args.shift().toLowerCase()
  
  let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
  
  if(command) command.run(client, message, args).catch(console.log)
  if(!command) return message.channel.send(`${command} command not found!`)
  
} 
