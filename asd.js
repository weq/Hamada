const Discord = require("discord.js");
const bot = new Discord.Client();
const MongoClient = require('mongodb').MongoClient;
const config = require('./config.json');
var debugMode = config.debugMode;

bot.login(config.botToken);

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  console.log(`debugMode: ${debugMode}`);
});

function returnCommand(msg) {
  let command
  if (msg.startsWith(`<@${bot.user.id}`)) {
    console.log(`Matched the start of the message with <@${bot.user.id}>`);
    command = msg.replace(`<@${bot.user.id}>`,"");
    command = command.trim();
  }
   else if (msg.startsWith(config.commandPrefix)) {
    console.log(`Matched the start of the message with ${config.commandPrefix}`)
    command = (msg.substring(1)).trim();
  } else {
    command = false;
  }
  return command;
}

bot.on('message', msg => {
  /*var commandPrefix = bot.user.id
  /*if (msg.content.substring(0,1) === "_") { // commandPrefix
    //var command = msg.content.substring(1); //  command

  /*  // PING
    if (command === 'ping') {
      msg.channel.send('Pøng!');
      msg.reply('Pøng!');
    }
  }*/
  command = returnCommand(msg.content);
  console.log(command);
  //console.log(``);
/*
  if (msg.content.startsWith(`<@${bot.user.id}>`) || msg.content.startsWith(config.commandPrefix)) { // @hamada ID startWith or !
    if (debugMode) { console.log(`Matched: ${bot.user.tag} or "${config.commandPrefix}"`); }
    command = msg.content.replace(`<@${bot.user.id}>`,""); //string
    command = command.trim();
  }
  else if (msg.content.startsWith(config.commandPrefix)) {
    if (debugMode) { console.log(`Matched: ${bot.user.tag} or "${config.commandPrefix}"`); }
    command = msg.replace(config.commandPrefix,""); //string
    command = command.trim();
  }*/

    if (debugMode) { console.log(msg.content); }
  //  command = command.trim();
    //if (debugMode) { console.log(bot.user.id.length); }
    //if (debugMode) { console.log(command); }

    // PING
    if (command === 'ping') {
      msg.reply('Pong!');
      
    }

    // teamRandomizer
    if (command === 'randomTeam') {
      var numberOfTeams = 2;
      var maxNumberOfMembersPerTeam = 5;
      
      var teamA, teamB, teamC, teamD, teamE, teamF

      if (msg.member.voiceChannel === undefined) {
        console.log(`userID: ${msg.member.id} is not in any voiceChannel.`)
        // Enter which users should be in teams.
      } else { // User who entered command is in voiceChannel, using channel to build teams.
        var numberOfMembersInVoiceChannel = msg.member.voiceChannel.members.size;
        if (debugMode) { console.log(msg.member.voiceChannel); }
        //console.log(msg.member.voiceChannel.members.size);
        remainder = numberOfMembersInVoiceChannel % numberOfTeams
        if (remainder != 0) {
          var numberOfAiAdded = Math.abs(numberOfTeams - remainder); // Making sure it is a positive number with Math.abs
          msg.channel.send(`${numberOfMembersInVoiceChannel} users won't fit neatly into ${numberOfTeams} teams so we added some AIs. ${numberOfAiAdded} to be exact.`)
          // Add missing number of AIs
          // 5%3 = 2
          if (debugMode) { console.log(`We need to add: ${numberOfAiAdded} users.`); }


        }
        numberOfMembersInVoiceChannel / numberOfTeams
      }
      msg.channel.send(msg.member.id);
    }
  //} 

  /* 
  console.log(msg.content);
  console.log(bot.user.id);
  console.log(bot.user);
  */

});

