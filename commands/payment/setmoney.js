const commando = require('discord.js-commando');
const Discord = require('discord.js');
var mysql = require('promise-mysql');

var dataBase = new Discord.Collection();

var connection;

 con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Removed",
    database: "economyv1"
  });

class moneyPayment extends commando.Command
{
    constructor(client)
    {
        super(client, {
            name: 'setmoney',
            group: 'payment',
            memberName: 'setmoney',
            description: '(Admin only) Set the total amount of money on an account: e!money [recipient\'s ID] [amount] '
        });
    }

        
    async run(message, args)
    {
        var usr;
        var split;
        var accId;
        var amount;
        var name;

            var chnl =  message.guild.channels.find("name", "econ-bot-log");
            var isDM = message.member.roles.exists("name","Dungeon Master");
            var isAdmin = message.member.hasPermission("ADMINISTRATOR");
            if(isDM || isAdmin)
            {
                con.then(function(conn){

                    connection = conn;
                    usr = message.author.id;
                    split = args.split(" ");
                    accId = split[0];
                    amount = split[1];
                    amount = parseInt(amount, 10);
                            
                    }).then(function(){
                        return connection.query("SELECT * FROM accounts WHERE accountId = '"+ accId+"'");
                    }).then(function(result){
                        if(result < 1)
                        {
                            message.reply("There is no account with that ID");
                            return 0;
                        }
                        else
                        { 
                                name = result[0].accountName;
                                return 1;
                        }
                    }).then(function(y){
                        if(y == 1)
                        {
                            connection.query("UPDATE accounts SET accountbalance = '"+ amount+"' WHERE accountId = '" + accId+"'");
                            chnl.send(message.author.username +" set "+name +"ID["+accId+"] to "+amount+" gp.");
                            connection.query("INSERT INTO log (name1, account1, action, name2, amount, date) VALUES ('"+name+"', '"+accId+"', 'Set money' ,'" +message.author.username +"', '"+ amount+"', '"+new Date().toISOString().slice(0, 19).replace('T', ' ')+"')");
                        }
                    });   
            }
            else
            {
                message.reply("You do not have permission to use this command.");
            }

            //message.reply(message.member.highestRole.name);


    }
}

module.exports = moneyPayment;