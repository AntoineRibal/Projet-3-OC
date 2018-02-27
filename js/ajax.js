function ajaxGet(url, callback) {

	var req = new XMLHttpRequest();
	req.open("GET",url);
	req.addEventListener("load", function() { 
		if(req.status>= 200 && req.status < 400){
			callback(req.responseText);
		} else {
			console.error(req.status + " " + req.statusText + " " + url);
		}
	});
	req.addEventListener("error", function(){
		console.error("ERREUR RESEAU AVEC L'URL " + url);
	});
	req.send(null);
}

// Execute un appel AJAX POST 
// Prend en parametre l'url cible,
// La donnee a envoyer et la fonction callback appeler en cas de succes 

function ajaxPost(url, data, callback){

	var req = new XMLHttpRequest();
	req.open("POST", url);
	req.addEventListener("load", function(){
		if(req.status >= 200 && req.status < 400){
		//Appelle la fonction callback en lui laissant la reponse de la requete
		callback(req.responseText);
		var compteur = 0;
		compteur++;
		if (compteur > 0) {
	var resultatX = document.createElement("p")
	resultatX.textContent = "Votre message a bien ete envoye";
	document.getElementById('resultat').appendChild(resultatX);
}
		}
		else{
		console.error(req.status + " " + req.statusText + " " + url);
		}
	});
	req.addEventListener("error", function(){
		console.error("erreur reseau avec l'url " + url);
	});
	req.send(data);
}


