const Discord = require("discord.js")
module.exports ={
    
    name:"ban",
    alias:["banear"],
    execute:(client, msg, args)=>{

    if(!msg.guild.me.hasPermission("BAN_MEMBERS")) return msg.channel.send("no tengo suficientes permisos necesito el permiso **Banear usuarios**!")

    let user = msg.mentions.members.first();

    let banReason = args.join(' ').slice(22);

    if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send("no tienes permiso de usar esta comando!")
 
    if(!user) return msg.channel.send("Debes mencionar a alguien")

    if(msg.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) return msg.channel.send("no puedes banear a un usario de igual o mayor poder que tu")

    if (user === msg.author) return msg.channel.send("Wtf bruh no te puedes autobanear xd")
    
    if(!banReason) return msg.channel.send("Debes escribir una razon!")

    user.ban({ reason: banReason})

 }

}