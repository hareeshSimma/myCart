"use strict";
var nodemailer = require("nodemailer");
var mailConfig = require("../config/config.json").mailer;
var mailObj = "";
var MailerConf = { service : mailConfig.service, 
					auth: { 
						user : mailConfig.username,
						pass : mailConfig.password
					}
				};

var Mailer = function() {

};

Mailer.prototype.Transport = function(options,req)
{
console.log(req.body);
	console.log(options)
	let mailOption = {
	        from: mailConfig.username, // sender address
	        to: req.body.email, // list of receivers
	        subject : options.subject,
	        text: '', // plain text body
	        html : options.html
	   };
	var mailObj = nodemailer.createTransport(MailerConf);	
	return mailObj.sendMail(mailOption, (error, info) => {
		if(error) {   
			console.log(error)      
			return false;
		}	else	{
			console.log("Mail Send Successfully..")
			return true;
		}
	});

}

 module.exports = Mailer;