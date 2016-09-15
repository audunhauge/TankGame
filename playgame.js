function playTheGame(stage, tanks, player) {
  
  // gi beskjed til server at spiller har startet
  socket.emit('start',  player);

  // en veldig enkel måte å animere ting på
  // vi gjør det med et fast intervall på 30ms
  window.setInterval(animate, 35);
  const keys = [];

  document.onkeyup = function (e) {                                                                                                           
    keys[e.code] = 0;
  };

  document.onkeydown = function (e) {
    keys[e.code] = 1;
  };
  
  // Merk denne måten å gi verdi til to variable.
  // Alternativet er:
  //   let t1 = tanks[0];
  //   let t2 = tanks[1];
  let [t1,t2] = tanks;
  
  let myself = player.navn;
  let other = null;
  
  let keysT1 = "ArrowLeft,ArrowRight,ArrowUp,ArrowDown".split(",");
  

  function animate(e) {
    steerTank(t1,keysT1);
    moveTank(t1);
    moveTank(t2);
  }

  function steerTank(tank, [left,right,up,down]) {
    // styring av tanks 1
    let change = false;
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
    // aks + fart + rot sendes også
    // bare send dersom tanks beveger seg eller snur
    if (Math.abs(tank.v) > 0.05 || change) {
      let posVelAcRot = { 
        x:tank.x, 
        y:tank.y, 
        v:tank.v, 
        a:tank.a,
        r:tank.rot 
        };
      socket.emit('newpos',  {myself, posVelAcRot}); 
    }
  }

  function moveTank(tank) {
    // oppdater posisjon, retning og fart for tanks
    tank.move(tank.v);
    tank.direction(tank.rot);
    tank.v *= 0.98;   // rullemotstand
  }
  
  socket.on('update', function(data) {
      world = data;
      if (other === null) {
        // dette skjer første gang vi får
        // en oppdatert posisjon for fienden
        for (let spiller of Object.keys(world)) {
          if (spiller !== myself) {
            // dersom denne spilleren ikke er meg
            // da må det være den andre ...
            other = spiller;
          }
        }
      } else {
        // vi kjenner oss selv og vet om den andre
        // egen posisjon er allerede i orden
        // oppdater den andre spillers posisjon
        if (world[other].tank) {
          let tank = world[other].tank;
          t2.v = tank.v;
          t2.a = tank.a;
          t2.x = tank.x;
          t2.y = tank.y;
          t2.rot = tank.r;
        }
      }
      
    }); 

}