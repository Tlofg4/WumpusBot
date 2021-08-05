const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {

name:"8ball",
alias:["8b"],

async execute(client, msg, args){

    let pregunta = args.join(" ")
    if(!pregunta) return msg.channel.send("**Debes poner tu pregunta!** El bot contestara con `|Si|No|Nunca|Probablemente|No lo se|` ")

    let respuestas = [
        "Si",
        "No",
        "Nunca",
        "Probablemente",
        "No se"
]
let respuesta = respuestas[Math.floor(Math.random() * respuestas.length)]

const embed = new Discord.MessageEmbed()

.setTitle("8BALL respuesta")
.setColor("AQUA")
.setDescription(`** Pregunta: ¿${pregunta}?\nRespuesta ${respuesta}**`)
.setThumbnail("https://cdn.discordapp.com/attachments/871624764261793872/872260002629431368/tenor_1.gif")
.setTimestamp();

msg.channel.send(embed)

}

}