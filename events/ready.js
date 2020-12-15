module.exports = async (client) => {

  console.log(`${client.user.tag} is ready!`)

  client.user.setPresence({activity: {name : "Shinoa"}, status: "idle"})

}
