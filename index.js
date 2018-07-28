// VARIABLES ///////////////////////////////////////////////////
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const moment = require('moment');


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
  let prefix = "$"

  if (bot.user.id === message.author.id) {return}


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
