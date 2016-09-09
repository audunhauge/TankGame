'use strict';

function setup() {
    const MAXSKUDD = 20;
    let poeng = 0;

    let divBoard = document.getElementById("board");
    let divMelding = document.getElementById("melding");
    let frmRegistrer = document.getElementById("registrer");
    
    // sjekk om denne brukeren er registrert
    let playerInfo = localStorage.getItem('player');

    // vi skal legge en tanks ut på skjermen
    // første versjon er bare en div med class="tank"
    let divTank1 = document.createElement("div");
    divTank1.className = "tanks intro1";
  
    // legg tanken ut på stagen (på board)
    divBoard.appendChild(divTank1);  

    let divTank2 = document.createElement("div");
    divTank2.className = "tanks intro2";
  
    // legg tanken ut på stagen (på board)
    divBoard.appendChild(divTank2); 
    
    let btnReg = document.createElement("button");
    btnReg.className = "startbutton";
    btnReg.id = "reg";
    
    let btnStart = document.createElement("button");
    btnStart.className = "startbutton hidden";
    btnStart.innerHTML = "Start Spillet";
    btnStart.id = "start";
    
    if (playerInfo !== undefined) {
        let playerObject = JSON.parse(playerInfo);
        divMelding.innerHTML = `Hei ${playerObject.navn}`;
        btnReg.innerHTML = "Rediger info";
        btnStart.classList.remove("hidden");    
    } else {
        btnReg.innerHTML = "Registrer deg";  
    }   
  
    btnStart.addEventListener("click",startGame);
    btnReg.addEventListener("click",registrer);
    // legg start-knappen ut på stagen (på board)
    divBoard.appendChild(btnReg); 
    divBoard.appendChild(btnStart);      
    
    
    function registrer(e) { 
      let inpNavn = document.getElementById("navn")
      let inpAlder = document.getElementById("alder");
      let inpDato = document.getElementById("dato");
            
      // først skjuler vi spillebrettet
      divBoard.classList.remove("come_here");
      void divBoard.offsetWidth;
      divBoard.classList.add("go_away");
      // css klassen go_away animerer spillebrettet
      // ut til siden
      frmRegistrer.classList.remove("go_away");
      void frmRegistrer.offsetWidth;
      frmRegistrer.classList.add("come_here");
      // animerer registrerings-skjema inn på stagen
      
      let btnLagre = document.getElementById("lagre");
      btnLagre.addEventListener("click", lagreInfo);
      
      if (playerInfo !== undefined) {
        let playerObject = JSON.parse(playerInfo);
        inpNavn.value = playerObject.navn;
        inpAlder.value = playerObject.alder;
        inpDato.value = playerObject.dato;
      }
      
      function lagreInfo(e) {
        let navn = capAll(inpNavn.value);
        let alder = inpAlder.valueAsNumber;
        let dato = inpDato.value;
        
        let playerInfo = JSON.stringify({navn,alder,dato});
        localStorage.setItem("player", playerInfo );
        divBoard.classList.remove("go_away");
        void divBoard.offsetWidth;
        divBoard.classList.add("come_here");
        frmRegistrer.classList.remove("come_here");
        void frmRegistrer.offsetWidth;
        frmRegistrer.classList.add("go_away");
        btnStart.classList.remove("hidden");
      }
    }
    
    function startGame() {
      divTank1.classList.remove("intro1");
      divTank2.classList.remove("intro2");
      divTank1.classList.add("active");
      divTank2.classList.add("active");
      btnReg.className = "hidden";
      btnStart.className = "hidden";
      divMelding.className = "hidden";
    }
}

/**
 *  @param {string} s
 *  @returns {string} Capitalized
 */
function cap(s) {
  return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
}

/**
 *  @param {string} s
 *  @returns {string} Capitalized Names
 */
function capAll(s) {
  return ((s.split(' ')).map(cap)).join(' ');
}