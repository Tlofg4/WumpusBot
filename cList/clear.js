const Discord = require("discord.js")
module.exports ={
    
    name:"clear",
    alias:["limpiar"],
    execute:(client, msg, args)=>{

    msg.delete();

    const cantidad = args.join(" ");

    var perms = msg.member.hasPermission("MANAGE_MESSAGES")
    if(!perms) return msg.channel.send("no tienes permisos suficientes")

    if(!cantidad) return msg.channel.send("Debes escribir una cantidad!")

    if(cantidad === '0') return msg.channel.send("Debes escribir un numero mayor que 0!")

    msg.channel.bulkDelete(cantidad).then(()=> {
        msg.channel.send(`**${cantidad}** mesajes borrados correctamente!`)
    })
    

    }

}