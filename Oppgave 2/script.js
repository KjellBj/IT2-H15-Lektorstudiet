var txtSnitt = document.getElementById("txtSnitt");
var txtTillegg = document.getElementById("txtTillegg");
var txtGrense = document.getElementById("txtGrense");
var txtResultat = document.getElementById("txtResultat");

var btnBeregn = document.getElementById("btnBeregn");


btnBeregn.onclick = beregn;

function beregn() {
    
    var snitt = parseFloat(txtSnitt.value);
    var tillegg = parseFloat(txtTillegg.value);
    var grense = parseFloat(txtGrense.value);
    
    var brukerpoeng = snitt * 10 + tillegg;   
    
    if (isNaN(brukerpoeng) || isNaN(grense)) {
        txtResultat.innerHTML = "Du må angi gyldige tall!"
    }
	else {
		if (brukerpoeng >= grense) {
            txtResultat.innerHTML = "Med " + brukerpoeng + " poeng kommer du inn på studiet, gratulerer!"
        }
        else {
            txtResultat.innerHTML = "Med " + brukerpoeng + " poeng kommer du dessverre ikke inn på studiet."
        }
    }    
    
}

