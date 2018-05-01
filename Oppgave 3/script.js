/*Kommentarer til løsningen:
- kontroll på at karakter for et fag ikke kan legges inn flere ganger er ikke bedt om, og må ikke gjøres; gjør slikt som det ikke er stilt krav, men som er fint, om BARE hvis du får tid
- endring av karakter gjort med bruk av windows-metoden prompt() som ikke skal overforbrukes, men som her gir den kontrollen vi trenger, på enkel måte
*/
// -----------------------   init   ----------------------

//Lager referanser til html-elementer
var lstFag = document.getElementById("lstFag");
var karListe = document.getElementById("karakterListe");
var txtKar = document.getElementById("txtKarakter");
var btnLeggTil = document.getElementById("btnLeggTil");
var btnBeregn = document.getElementById("btnBeregn");
var btnBeregn = document.getElementById("btnBeregn");
var txtTillegg = document.getElementById("txtTillegg");
var txtInfo = document.getElementById("txtInfo");

//arrayen som lagrer fag og karakterer
var karArray = [];

//registrerer lytterfunksjoner
btnLeggTil.onclick = leggTilRad;
btnBeregn.onclick = beregnInfo;

//legger inn innhold i select-lista
var fagArray = [
    "Engelsk", "Geografi", "Historie Vg3",
    "Kroppsøving Vg3", "Naturfag",
    "Matematikk Vg1, Vg2 (eller x fag)",
    "Norsk hovudmål, skriftleg Vg3",
    "Norsk sidemål, skriftleg Vg3",
    "Norsk munnleg Vg3", "Religion og etikk",
    "Samfunnsfag i vg. opplæring",
    "Programfag",
    "Eksamen"
];

for (var i = 0; i < fagArray.length; i++) { 
    var element = document.createElement("option");    
    element.innerHTML = fagArray[i];
    element.value = fagArray[i];    
    lstFag.appendChild(element);    
}

// --------------------   leggTilRad   -------------------
function leggTilRad() {
    
    //får tak i fag og karakter
    var valgtFag = lstFag.value;
    var kar = parseInt(txtKar.value);
    
	//avviser hvis karakter for faget er registrert tidligere ER IKKE KREVD
	var funnet = false;
	for (var i = 0; i < karArray.length; i++){
		if (karArray[i].fag === valgtFag) funnet = true;
	}
	
	if (funnet){
		txtInfo.innerHTML = ("Faget " + valgtFag + " er registrert før");
		txtInfo.style.color = "red";
		return;
	}
	
    //legger inn i arrayet
    karArray.push({fag:valgtFag, karakter:kar});
    
    //oppdaterer
    oppdaterTabell();    
}

// ------------------  oppdaterListe   -------------------
function oppdaterTabell() {
    
    //sorterer arrayet
    karArray.sort(function(a, b) {
        return b.karakter - a.karakter;
    });
    
    //lager tabellen
    lagTabell();
    
    //sletter gammel info
    txtInfo.innerHTML = "";
}

// ---------------------  lagListe   ---------------------
function lagTabell() {
    
    karListe.innerHTML = ""; //sletter gammelt innhold
    
    for (var i = 0; i < karArray.length; i++) {
        
        //lager en ny rad
        var rad = document.createElement("tr");
        
        //lager cellen med navn på fag/eksamen
        var cellFag = document.createElement("td");
        cellFag.innerHTML = karArray[i].fag;
        cellFag.className = "tdBred";        
        
        //lager cellen med karakteren
        var cellKar = document.createElement("td");
        cellKar.innerHTML = karArray[i].karakter;        
        
        //lager celler med endre- og slett-knapper
        var cellBtnEndre = document.createElement("td");
        var btnEndre = document.createElement("button");
        btnEndre.innerHTML = "Endre";
        btnEndre.value = i;
        btnEndre.onclick = onEndre;               
        
        var cellBtnSlett = document.createElement("td"); 
        var btnSlett = document.createElement("button");       
        btnSlett.innerHTML = "Slett";
        btnSlett.value = i;
        btnSlett.onclick = onSlett;                
        
        //linker sammen        
        cellBtnEndre.appendChild(btnEndre);
        cellBtnSlett.appendChild(btnSlett); 
        
        rad.appendChild(cellFag);
        rad.appendChild(cellKar);
        rad.appendChild(cellBtnEndre);
        rad.appendChild(cellBtnSlett);
        
        karListe.appendChild(rad); 
    }
}

// ---------------------  beregnInfo   ---------------------
function beregnInfo() {
	
    var tillegg = parseInt(txtTillegg.value);
    if (isNaN(tillegg) || karArray.length === 0){
         txtInfo.innerHTML = "Du må oppgi gyldige verdier";
		 txtInfo.style.color = "red";
		 return; 
    }	
	
    //beregner snitt
    var sum = 0;
    for (var i = 0; i < karArray.length; i++) {
        sum += karArray[i].karakter;
    }
    
    var snitt = sum / karArray.length;
    
    var poengsum = Math.round(snitt * 10 + tillegg);
    
    txtInfo.innerHTML = "Din poengsum for angitte fag er: " + poengsum;
	txtInfo.style.color = "black";
   
}

// -----------------------  onEndre   ----------------------
function onEndre(evt) {
    
    var index = parseInt(evt.target.value);
    
	var nyKar = prompt("Skriv ny karakter (1-6) for " + karArray[index].fag, karArray[index].karakter);
	
	if (nyKar >= 1 && nyKar <= 6){
		karArray[index].karakter = nyKar; 
	}
	else 
	{
		alert("Oppgi karakter mellom 1 og 6 hvis du vil endre")
	}
    
    oppdaterTabell();    
}

// -----------------------  onSlett   ----------------------

function onSlett(evt) {
    
    var index = parseInt(evt.target.value);    
    karArray.splice(index, 1);
    oppdaterTabell();    
    
}

   

