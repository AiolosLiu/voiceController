//@author : Lucius

var Alexa      = require("alexa-sdk");
var http       = require("http");
var findAction = require("./findByNameAction.js");
var moveAction = require("./moveAction.js");

var APP_ID = '';
exports.handler = function(event, context, callback){
    var alexa   = Alexa.handler(event,context);
    alexa.appId = APP_ID;
    //alexa.registerHandlers(newSessionHandlers,startSystemHandlers,operateSystemHandlers);
    alexa.registerHandlers(newSessionHandlers,operateSystemHandlers);
    alexa.execute();
};

var states = {
    //STARTMODE: '_START', // START system
    OPERAMODE: '_OPERA', // Operate the robot after the verify the identity
};

var newSessionHandlers = {
    'LoginSystem':function(){
        this.handler.state = states.OPERAMODE;
       // this.emit(':ask', 'Welcome to Kobe robot control system,please tell me the security number.');
        this.emit(':ask', 'Welcome to I T U robot control system.');
    },
    'Unhandled':function(){
        var message = 'What is a nice day.';
        this.emit(':tell',message);
    }
};

//var startSystemHandlers = Alexa.CreateStateHandler(states.STARTMODE,{
//    'LoginSystem':function(){
//        this.emit('LoginSystem');
//    },
//    'VerifySN':function(){
//        var inputSN = parseInt(this.event.request.intent.slots.password.value);
//        if (45 == inputSN){
//                this.handler.state = states.OPERAMODE;
//                this.emit(':ask','Welcome.');
//        } else {
//                this.emit(':ask', 'The security number is wrong, please try again or exit the system.');
//
//        }
//    },
//    'ExitSystem':function(){
//        this.emit(':tell','OK, see you next time.');
//    },
//    'Unhandled':function(){
//        var message = 'Please tell a command, say exit the system to exit.';
//        this.emit(':ask',message);
//    }
//});


var operateSystemHandlers = Alexa.CreateStateHandler(states.OPERAMODE,{
    'GoForward':function(){
        moveAction.doAction("0");
        console.log("forward");
        this.emit(':ask','Robot is moving.');    
    },
    'Stop':function(){
        moveAction.doAction("1");
        console.log("stop");
        this.emit(':ask','Robot stops.');    
    },
    'TurnLeft':function(){
        moveAction.doAction("2");
        this.emit(':ask','Robot is turnning left.');    
    },
    'TurnRight':function(){
        moveAction.doAction("3");
        this.emit(':ask','Robot is turnning right.');    
    },
    'TurnBack':function(){
        moveAction.doAction("4");
        this.emit('ask','Robot is turnning back.');    
    },
    'TakePhoto':function(){
        moveAction.doAction("5");
        this.emit('ask','Robot is taking picture.');
    },
    'Find':function(){
        var inputSN = parseInt(this.event.request.intent.slots.pname.value);
        if (1 == inputSN){ 
        findAction.find("1");
        }else if (2 == inputSN){   
        findAction.find("2");  
        }else if (3 == inputSN){
        findAction.find("3");
        }
        this.emit(':ask','Robot is finding.');    
    },
    'ExitSystem':function(){
        this.emit(':tell','OK, see you next time.');
    },
    'Unhandled':function(){
        var message = 'Please tell a command, say exit the system to exit.';
        this.emit(':ask',message);
    }
});



