// VARIABLES ///////////////////////////////////////////////////

const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const moment = require('moment');
const modRole = '# 𝙁𝙤𝙣𝙙𝙖𝙩𝙚𝙪𝙧 #';

// STORAGE ///////////////////////////////////////////////////

let userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));

// CONNEXION ///////////////////////////////////////////////////

bot.login(process.env.BOT_TOKEN);

bot.on("ready", () => {
    console.log("Online")
    bot.user.setGame("$cmd");
});





// VARIABLES ///////////////////////////////////////////////////


bot.on('message', message => {
  let sender = message.author;
  let msg = message.content;
  let msgu = message.content.toUpperCase();
  let cmd = messageArray[0];


  let prefix = "$"

  if (bot.user.id === message.author.id) {return}





  if(cmd === `${prefix}kick`){


     let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
     if(!kUser) return message.channel.send("Can't find user!");
     let kReason = args.join(" ").slice(22);
     if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
     if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

     let kickEmbed = new Discord.RichEmbed()
     .setDescription("~Kick~")
     .setColor("#e56b00")
     .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
     .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
     .addField("Kicked In", message.channel)
     .addField("Tiime", message.createdAt)
     .addField("Reason", kReason);

     let kickChannel = message.guild.channels.find(`name`, "incidents");
     if(!kickChannel) return message.channel.send("Can't find incidents channel.");

     message.guild.member(kUser).kick(kReason);
     kickChannel.send(kickEmbed);

     return;
   }

   if(cmd === `${prefix}ban`){

     let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
     if(!bUser) return message.channel.send("Can't find user!");
     let bReason = args.join(" ").slice(22);
     if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
     if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

     let banEmbed = new Discord.RichEmbed()
     .setDescription("~Ban~")
     .setColor("#bc0000")
     .addField("Banned User", `${bUser} with ID ${bUser.id}`)
     .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
     .addField("Banned In", message.channel)
     .addField("Time", message.createdAt)
     .addField("Reason", bReason);

     let incidentchannel = message.guild.channels.find(`name`, "incidents");
     if(!incidentchannel) return message.channel.send("Can't find incidents channel.");

     message.guild.member(bUser).ban(bReason);
     incidentchannel.send(banEmbed);


     return;
 }

















// EVENT ///////////////////////////////////////////////////


if (!userData[sender.id + message.guild.id]) userData[sender.id + message.guild.id] = {}
if (!userData[sender.id + message.guild.id].money) userData[sender.id + message.guild.id].money = 1000;
if (!userData[sender.id + message.guild.id].lastDaily) userData[sender.id + message.guild.id].lastDaily = 'Not Collected';
if (!userData[sender.id + message.guild.id].username) userData[sender.id + message.guild.id].username = message.author.username;


fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
  if (err) console.error(err);
})


// MONEY ///////////////////////////////////////////////////

if (msgu === prefix + 'MONEY' || msgu === prefix + 'BALANCE') {
  message.channel.send({embed:{
    title: "Bank",
    color: 0xfbff00,
    fields:[{
      name:"Account Holder",
      value:message.author.username,
      inline:true
    },
  {
    name:"Account Balance",
    value:userData[sender.id + message.guild.id].money,
    inline:true
  }]
  }})
 }

if (msg === prefix + 'DAILY') {
  if (userData[sender.id + message.guild.id].lastDaily != moment().format('L')) {
      userData[sender.id + message.guild.id].lastDaily = moment().format('L')
      userData[sender.id + message.guild.id].money += 500;
      message.channel.send({embed:{
        title:"Daily Reward",
        color: 0x4dff00,
        description:"You got 500$ added to your account"
      }})

  }else{
    message.channel.send({embed:{
      title:"Daily Reward",
      color: 0x4dff00,
      description:"You already claim daily reward. You can collect your next reward " + moment().endOf('day').fromNow() + '.'
  }})
}
}


















if (msg === prefix + 'GLOBAL') {

var globalMoney = 0;
var globalUsers = 0;
var globalRichest = '';
var globalRichest$ = 0;

for (var i in userData) {
    globalMoney += userData[i].money;
    globalUsers += 1;
    if (userData[i].money > globalRichest$) {
      globalRichest$ = userData[i].money;
      globalRichest = userData[i].username;
    }
}

message.channel.send({embed:{
  title: "Global Stats",
  color: 0xff0000,
  fields:[{
    name:"Accounts",
    value:globalUsers,
    inline:true
  },
{
  name:"Total Money",
  value:globalMoney,
  inline:true
},
{
  name: "Richest Account",
  value:`${globalRichest} with ${globalRichest$}`
}]
}})
}



if (msg === prefix + 'GUILD') {

var guildMoney = 0;
var guildUsers = 0;
var guildRichest = '';
var guildRichest$ = 0;

for (var i in userData) {
  if (i.endsWith(message.guild.id)) {
    guildMoney += userData[i].money;
    guildUsers += 1;
    if (userData[i].money > guildRichest$) {
      guildRichest$ = userData[i].money;
      guildRichest = userData[i].username;

    }
  }
}

message.channel.send({embed:{
  title: "Guild Stats",
  color: 0xff0000,
  fields:[{
    name:"Accounts",
    value:guildUsers,
    inline:true
  },
{
  name:"Total Money",
  value:guildMoney,
  inline:true
},
{
  name: "Richest Account",
  value:`${guildRichest} with ${guildRichest$}`
}]
}})
}














fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
  if (err) console.error(err);
})


































  if(msg === prefix + "cmd"){
      var help_embed = new Discord.RichEmbed()
      .setColor("#FF0000")
      .setTitle("Commands list : ")
      .addField("$cmd", "Show bot commands")
      .addField("$money", "Show your money")
      .addField("$DAILY", "Get your daily reward")
      .addField("$GUILD", "Show stats about Discord's king")
      .addField("$GLOBAL", "Show stats about Discord's king in all severs")
      .setFooter("End of the list")
      message.channel.sendMessage(help_embed);
      console.log("Commands")
  }

});
