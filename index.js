const commando = require('discord.js-commando');
const Discord = require('discord.js');
var mysql = require('mysql');

const bot = new commando.Client();

bot.commandPrefix = 'e!';
bot.registry.registerGroup('random', 'Random');
bot.registry.registerGroup('profile', 'Profile');
bot.registry.registerGroup('payment', 'Payment');
bot.registry.registerGroup('log', 'Log');
bot.registry.registerGroup('time', 'Time');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.login('NzIyOTA0OTAwODk1MjQ0Mjkw.XuqIEQ.0NmKBoc6zbzy35630yWrdTpPwE4');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Removed",
  database: "economyv1"
});

