var Client = require('mpp-client-xt')
var gClient = new Client('ws://www.multiplayerpiano.com:443')
gClient.setChannel('test/PartnerMaker')
gClient.start()
var partners = []
setInterval(function (){gClient.setName('Partner')})
setTimeout(function (){gClient.sendArray([{m:"+ls"}])},2000)
setTimeout(function (){
     gClientmaker = new Client('ws://www.multiplayerpiano.com:443');
     gClientmaker.setChannel('Partner Maker')
     gClientmaker.start()
     gClientmaker.on('participant added',function (part) {
       if (part._id !== gClientmaker.user._id) {
           gClientmaker.say('hello '+part.name+', you can use >partner [message] to make users enter in the world')
       }
     })
     gClientmaker.on('a',function (msg){
       if (msg.a.toLowerCase().split(' ')[0] == ">partner") {
         if (!msg.a.split(' ')[1]) return gClientmaker.say('please inculde your message')
         if (!msg.a.split(' ')[1].indexOf('http://') < 0) return gClientmaker.say('message must inculde url')
         if (!msg.a.split(' ')[1].indexOf('https://') < 0) return gClientmaker.say('message must inculde url')
         partners.push({user:msg.p,message:msg.a.split(' ').slice(1).join(' ')})
         gClientmaker.say('done')
       }
     })
},6000)

var channels = []
var count = 0

gClient.on("ls", function(ls) {
  
		for(var i in ls.u) {
			if(!ls.u.hasOwnProperty(i)) continue;
			var room = ls.u[i];
      if (channels.indexOf(room._id) < 0) {channels.push(room._id)}
      
      
      
			
		}

	});

  setInterval(function (){
    if (partners.length > 0) {
      gClient.setChannel(channels[Math.floor(Math.random()*channels.length)])
       var randompartner = partners[Math.floor(Math.random()*partners.length)]
      gClient.say(randompartner.user.name+': '+randompartner.message)
      
    }
      
  },5000)
  
 
