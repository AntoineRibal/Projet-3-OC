
//creation of reservation object to save reservation data
/*
var reservation = new Object();
	reservation.reserver = false;
	reservation.stationName="";
	reservation.adresse = "";
	reservation.veloDispo= 0;
	reservation.emplacementVelo = 0;
	reservation.etat = "";
	reservation.id="";
	reservation.secondes = 01;
	reservation.minutes = 01;
*/

var reservation = {
	reserver : false,
	stationName:"",
	adresse : "",
	veloDispo: 0,
	emplacementVelo : 0,
	etat : "",
	id: "",
	secondes : 01,
	minutes : 01
};

var lancement = null;
	
	
// Declaration vital variables of function timer


var compteurEnCours = reservation.minutes + "mn " + reservation.secondes + "s";



//creation of timer function: chrono
function chrono() {

	reservation.secondes = reservation.secondes - 1;
	//condition to decrement, verify chrono is'nt finish.
	if (reservation.secondes == 0 && reservation.minutes > 0  ) {
		reservation.minutes --;
		reservation.secondes	= 59;	
	}
	//show new informations.	
	compteurEnCours = reservation.minutes + "mn " + reservation.secondes + "s";
	document.getElementById('texteResa').textContent = 'Velo reserve a cette station: ' + reservation.stationName + '. Temps restant: '+ compteurEnCours ;				
	//memo reservation is true
	reservation.reserver = true;
	//checkpoint
	var reservation_json = JSON.stringify(reservation);
	sessionStorage.setItem("objet", reservation_json);
	//if timer is finish, the timer stop and reservation was delete.
	 if (reservation.secondes == 0 && reservation.minutes == 0) {
		alert('fin de la reservation');
		reservation.reserver = false;
		reservation.stationName="";
		reservation.veloDispo= 0;
		reservation.id="";
		reservation.minutes = 01;
		reservation.secondes = 01;
		reservation.veloDispo = nombreVelo;
		document.getElementById('apparitionVeloDispo').textContent = reservation.veloDispo;
		document.getElementById('boutonReservation').style.display = 'block';
		document.getElementById('texteResa').textContent = 'Aucune reservation en cours';
		clearInterval(lancement);
		return;		
	}
};

// Declaration de l'objet application qui va regrouper le coeur de l'application
var application = {
	
//creation of markers on gmap with openData Paris DATA.
	marqueur: function(){
		ajaxGet("https://opendata.paris.fr/api/records/1.0/search/?dataset=stations-velib-disponibilites-en-temps-reel&lang=fr&rows=-1&sort=-number&facet=banking&facet=bonus&facet=status&facet=contract_name&facet=position", function (reponse) {
			var retour = JSON.parse(reponse);
			var marqueurs = [];
			
			for (var num in retour.records) {
				//each marker is an object 
			   var marqueur= new google.maps.Marker({
					map: map,
					position: new google.maps.LatLng(retour.records[num].geometry.coordinates[1], retour.records[num].geometry.coordinates[0])
					
			    });
 			    //creation of property on our object to give their informations from database
			    marqueur.id = 'idMarqueur' + num;
			    marqueur.adresse = retour.records[num].fields.address;
			    marqueur.veloDispo = retour.records[num].fields.available_bikes;
			    marqueur.nomStation = retour.records[num].fields.name;
			    marqueur.emplacementVelo = retour.records[num].fields.available_bike_stands;
			    marqueur.etat = retour.records[num].fields.status;
			    marqueur.setMap(map);
			    marqueur.reserver = false;
			    marqueur.newVeloDispo = 0;
			    
			    
			    //Add (e) on each marker object.
				 marqueur.addListener('click', function () {
				 	document.getElementById('boutonReservation').style.display = 'block';
				 	
				 	//Erase CANVAS onclick on marker. 
				 	var el = document.getElementById('c');
					var ctx = el.getContext('2d');
					ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
					
					//Show informations of the station in the info area		
					document.getElementById('apparitionAdresse').textContent = this.adresse;
					document.getElementById('apparitionVeloDispo').textContent = this.veloDispo;
					document.getElementById('apparitionEtat').textContent = this.etat;
					document.getElementById('apparitionNom').textContent = this.nomStation;
					document.getElementById('apparitionEmpDispo').textContent = this.emplacementVelo;
					
					//Save in globals variables the infos of station what we'll need
					nombreVelo = this.veloDispo;
					idResa = this.id;
				   nomStation2 = this.nomStation;
				   etatResa = this.etat;
				   emplacementResa = this.emplacementVelo;
				   adresseResa = this.adresse;
						
					//Condition to block the reservation or to authorized it.
					if (this.veloDispo == 0 || this.etat == 'CLOSED' || reservation.id == this.id) {
						document.getElementById('boutonReservation').style.display = 'none';
						document.getElementById('apparitionVeloDispo').textContent = reservation.veloDispo;
					}
					else if (this.veloDispo > 0) {
						document.getElementById('boutonReservation').style.display = 'block';
					}
					
				});
				//Send marker object in an array to create clusters
				marqueurs.push(marqueur);
				finMarqueur = true;
							
			}
			//create the marker cluster, thx google and his docs. 
			var markerCluster = new MarkerClusterer(map, marqueurs, {imagePath: '../image/m'});	
		});
	},  
	
	//method of construct the 'blocInfos' elements. methods call in main.js
	blocInfosConstruct: function(type,contenu,cible,id){
		
		var newElement = document.createElement(type);
		newElement.textContent = contenu;
		newElement.id = id;
		document.getElementById(cible).appendChild(newElement);
	},
	
	//method wich purpose the reservation of bike
	cliqueResa: function(){
		document.getElementById('boutonReservation').addEventListener('click',function () {
					document.getElementById('boutonReservation').style.display = 'none';
					//Appartion of canvas
					document.getElementById('blocSignature').style.display = 'block';
		
		});
	},
	//method wich start timer and valid reservation
	valideResa: function(){
		//Make listener on reservation button to begin the timer and save tjhe resa
		document.getElementById('validationResa').addEventListener('click',function () {
			if (detectCanvas==true) {
				
				
				//if reservation exist 
				if (reservation.reserver == true && confirm('Voulez vous ecrasez la reservation precedente ?')) {
					
					//Recording of informations in reservation object.
					reservation.minutes = 01;
					reservation.secondes = 01;
					reservation.veloDispo = nombreVelo - 1;
					reservation.id = idResa;
					reservation.stationName = nomStation2;
					
					//Modification of information of 'blocInfos', disparition of canvas + button, and creation of timer.
					document.getElementById('apparitionVeloDispo').textContent = reservation.veloDispo;
					document.getElementById('blocSignature').style.display = 'none';
					alert('Vous avez reserve un velo a la station '+ reservation.stationName + ' il est disponible pendant 20 minutes.');
					document.getElementById('texteResa').textContent = 'Velo reserve a: ' + reservation.stationName + '. Temps restant: ' ;
					
					//First Timer is stopped and new Timer begin.
					clearInterval(lancement);
						reservation.secondes = 01;
						reservation.minutes = 01;
					lancement = setInterval(chrono,1000);
					
					var reservation_json = JSON.stringify(reservation);
					sessionStorage.setItem("objet", reservation_json);

				}
				//if reservation doesn't exist
				else if (reservation.reserver == false) {
					
					//Recording of informations in reservation object.
					reservation.reserver = 	true;
					reservation.veloDispo = nombreVelo - 1;
					reservation.id = idResa;
					reservation.stationName = nomStation2;
					reservation.etat = etatResa;
					reservation.emplacementVelo = emplacementResa;
					reservation.adresse = adresseResa;
					
					//Modification of information of 'blocInfos', disparition of canvas + button, and creation of timer.
					document.getElementById('apparitionVeloDispo').textContent = reservation.veloDispo;
					document.getElementById('blocSignature').style.display = 'none';
					alert('Vous avez reserve un velo a la station '+ reservation.stationName + ' il est disponible pendant 20 minutes.');
					
					//checkpoint
					var reservation_json = JSON.stringify(reservation);
					sessionStorage.setItem("objet", reservation_json);
					//Begin of first Timer.
					lancement = setInterval(chrono,1000);
				}				
			}
			//If detectCanvas == false, if canvas has no signature, make an alert.
			else {
				alert('Veuillez signer dans le champ "Signature"');			
			}		
		});			
	},	
	//Function wich load sessionStorage and send info to our object. 
	rappelResa: function(){
		var resaEnCours_json = sessionStorage.getItem("objet");
		var resaEnCours = JSON.parse(resaEnCours_json);
		//condition to start
		if (resaEnCours !== null && resaEnCours.reserver == true && resaEnCours.minutes >= 0 && resaEnCours.secondes > 0) {
			//transfert of information between object
			alert("Un velo est reserve a la station: " + resaEnCours.stationName + " il est disponible pendant encore: " + resaEnCours.minutes + "mn " + resaEnCours.secondes + "sec.")
			reservation.secondes = resaEnCours.secondes;
			reservation.minutes = resaEnCours.minutes;
			reservation.stationName = 	resaEnCours.stationName;
			reservation.id = resaEnCours.id;
			reservation.veloDispo = resaEnCours.veloDispo;
			reservation.emplacementVelo = resaEnCours.emplacementVelo;
			reservation.etat = resaEnCours.etat;
			reservation.adresse = resaEnCours.adresse;
			//write the infos in da bloc
			document.getElementById('apparitionAdresse').textContent = reservation.adresse;
			document.getElementById('apparitionVeloDispo').textContent = reservation.veloDispo;
			document.getElementById('apparitionEtat').textContent = reservation.etat;
			document.getElementById('apparitionNom').textContent = reservation.stationName;
			document.getElementById('apparitionEmpDispo').textContent = reservation.emplacementVelo;
			//display button 
			document.getElementById('blocSignature').style.display = 'none';
			document.getElementById('boutonReservation').style.display = 'none';
			//restart the chrono
			lancement = setInterval(chrono,1000);
		}	
	}
};



