// start med å definere en del variable
let app      = require('express')();
let server   = require('http').Server(app);
let io       = require('socket.io')(server);
let gameport = process.env.PORT || 4004;

let antallSpillere = 0;
let world = {};   // empty world

server.listen( gameport );

console.log('Spillet kjøres fra http://localhost:' + gameport );

// dersom du ikke spesifiserer en fil, da sender vi game.html
app.get( '/', function( req, res ){ 
     res.sendFile( __dirname + '/game.html' );
});


// alle andre filer
app.get( '/*' , function( req, res, next ) {
   // filnavnet de har bestillt
   var file = req.params[0]; 
   // send filen
   res.sendFile( __dirname + '/' + file );
});

// samtaler med klientene
io.on('connection', function(socket) {  
   antallSpillere++;
   io.emit('stats', { antallSpillere });
   
   socket.on('disconnect', function() {
     antallSpillere--;
     io.emit('stats', { antallSpillere });
   });
   
   socket.on('newpos', function(data) {
     let {myself, posVelAcRot} = data;
     let tank = world[myself].tank || {};
     tank.x = posVelAcRot.x;
     tank.y = posVelAcRot.y;
     tank.v = posVelAcRot.v;
     tank.a = posVelAcRot.a;
     tank.r = posVelAcRot.r
     world[myself].tank = tank;
     io.emit('update', world);
   });
   
   socket.on('start', function(data) {
     let player = data;
     if (player.navn) {
       world[player.navn] = player;
     }
     io.emit('startgame', world);
   })
});