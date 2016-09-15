function playTheGame(stage, tanks, player) {

  // en veldig enkel måte å animere ting på
  // vi gjør det med et fast intervall på ~ 30ms
  window.setInterval(animate, 45);
  const keys = [];

  document.onkeyup = function (e) {                                                                                                           
    keys[e.code] = 0;
  };

  document.onkeydown = function (e) {
    keys[e.code] = 1;
  };
  
  let myself = player.navn;
  let justStarted = true;
  
  let keysT1 = "ArrowLeft,ArrowRight,ArrowUp,ArrowDown".split(",");
  

  function animate(e) {
    let t1 = tanks[0];             // min egen tank
    steerTank(t1, keysT1);         // styres med piltaster
    moveTank(t1);
    let idx = 1;
    for (let gamer of Object.keys(world)) {
      if (gamer !== myself && world[gamer].tank) {
        let posVecRot = world[gamer].tank;
        // world er verden slik serveren ser den, alle tanks er lagra her
        // for hver spiller sendes x,y,r(rot),v
        let tank = tanks[idx];
        tank.x = posVecRot.x;
        tank.y = posVecRot.y;
        tank.v = posVecRot.v;
        tank.rot = posVecRot.r;
        // nå er vår lokale kopi av andre spillers tank oppdatert
        // dermed kan den flyttes
        moveTank(tank);
        idx++;
      }
    }
  }

  function steerTank(tank, [left,right,up,down]) {
    // styring av tanks 1
    let change = false || justStarted;
    justStarted = false;
    if (keys[left]) {
      tank.turn(-tank.turnrate);
      change = true;
    }
    if (keys[right]) {
      tank.turn(tank.turnrate);
      change = true;
    }
    if (keys[up]) {
      tank.v = Math.min(tank.speed, tank.v + tank.a);
      change = true;
    }
    if (keys[down]) {
      tank.v = Math.max(-tank.speed * 0.3, tank.v - tank.a);
      change = true;
    }
    // gi beskjed til serveren om våres nye posisjon
    // fart + rot sendes også
    // bare send dersom tanks beveger seg eller snur
    if (Math.abs(tank.v) > 0.05 || change) {
      let posVelRot = { 
        x:tank.x, 
        y:tank.y, 
        v:tank.v, 
        r:tank.rot 
        };
      socket.emit('newpos',  {myself, posVelRot}); 
    }
  }

  function moveTank(tank) {
    // oppdater posisjon, retning og fart for tanks
    tank.move(tank.v);
    tank.direction(tank.rot);
    tank.v *= 0.98;   // rullemotstand
  }
  
  // serveren sender 'update' meldinger som fanges opp her
  // data inneholder verden slik serveren ser den
  // overskriver world med serverens syn på verden
  socket.on('update', function(data) {
      world = data;  // serveren er BOSS
      for (let gamer of Object.keys(world)) {
        if (gamer !== myself) {
          // dersom denne spilleren ikke er meg
          // da må det være en av de andre ...
          // merk at en klient kan jukse og teleportere tanken sin
          // ved å endre x,y - serveren stoler på spillerene ...
          if (world[gamer].tank) {
            let tank = world[gamer].tank;
            t2.v = tank.v;
            t2.a = tank.a;
            t2.x = tank.x;
            t2.y = tank.y;
            t2.rot = tank.r;
          }
        }
      }
    }); 

}