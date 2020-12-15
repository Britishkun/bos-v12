const discord = require("discord.js")
const client = new discord.Client()
config = require ("./config.json")
const fs = require("fs")


let modules = ["Register"] // add , "new category" if you want to add more categories

client.commands = new discord.Collection()
client.aliases = new discord.Collection()

modules.forEach(module => {
    fs.readdir(`./commands/${module}/`, (err, files) => { //we need to install fs
        if(err) console.log(err)
        files.forEach(f => {
            if(!f.endsWith(".js")) return;
            if(f.length <= 0) console.log("No commands found!")
            console.log(`[ Command ${f} Loaded! ]`)
            let command = require(`./commands/${module}/${f}`)
            client.commands.set(command.help.name, command)
            command.help.aliases.forEach(alias => {
                client.aliases.set(alias, command.help.name)
            })
        })
    })
})

fs.readdir("./events/", (err, files) => {
    if(err) return console.log(err)
    files.forEach(file => {
        const event = require(`./events/${file}`)
        let eventName = file.split(".")[0];
        console.log(`[ Event Loaded: ${file} ]`)
        client.on(eventName, event.bind(null, client))
    })
})

client.login(config.token)
