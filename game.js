'use strict';

function setup() {
    const MAXSKUDD = 20;
    let poeng = 0;

    let divBoard = document.getElementById("board");
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


    let btnStart = document.createElement("button");
    btnStart.className = "startbutton";
    btnStart.id = "start";
    btnStart.innerHTML = "Start spillet";
  
    // legg start-knappen ut på stagen (på board)
    divBoard.appendChild(btnStart); 
    btnStart.addEventListener("click",registrer);
    
    function registrer(e) {
      
      let inpNavn = document.getElementById("navn")
      let inpAlder = document.getElementById("alder");
      let inpDato = document.getElementById("dato");
            
      // først skjuler vi spillebrettet
      divBoard.classList.add("go_away");
      // css klassen go_away animerer spillebrettet
      // ut til siden
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
        let navn = inpNavn.value;
        let alder = inpAlder.valueAsNumber;
        let dato = inpDato.value;
        
        let playerInfo = JSON.stringify({navn,alder,dato});
        localStorage.setItem("player", playerInfo )
      }
      
    }
}