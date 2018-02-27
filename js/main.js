//cle API openData paris : 6dc016ce9bd56626f13fc42b85bd2e061701e3d9
// &apiKey={api_key}
//&apiKey={6dc016ce9bd56626f13fc42b85bd2e061701e3d9}

//Initialization of global variables

//Initialization of gmap
function initMap() {
  map = new google.maps.Map(document.getElementById('appMap'), {
    center: {lat: 48.866667, lng: 2.333333},
    zoom: 18
  });
  document.getElementById('boutonReservation').style.display = 'none';
}
var infos = document.getElementById('blocInfos');
var map;
var nombreVelo;
var nomStation2;
var idResa;
var adresseResa;
var emplacementResa;
var etatResa;
var compteurclick = 0;
var detectCanvas = false;
var arrerChrono = false;
var finMarqueur = false;
var i = 0;
var tabI = [];

//Construction of carousel
diapoConstructor.blocDiapoConstruct('../image/diapo2.png', 'Signez directement dans l\'app\' pour valider !');
diapoConstructor.blocDiapoConstruct('../image/diapo3.png', 'Vous avez 20 min pour prendre votre vélo !');
diapoConstructor.blocDiapoConstruct('../image/diapo1.png', 'Réserver votre velib en 2 clic !!');

application.marqueur();

//Construction of blocInfos with the blocInfosConstruct method.
application.blocInfosConstruct('h1','Informations ','infos');

application.blocInfosConstruct('h2','Nom de la station: ','infos','infosNom');
application.blocInfosConstruct('span','','infosNom','apparitionNom' );

application.blocInfosConstruct('h2','Etat de la station: ','infos','infosVeloEtat');
application.blocInfosConstruct('span','','infosVeloEtat','apparitionEtat' );

application.blocInfosConstruct('h2','Adresse: ','infos','infosAdresse');
application.blocInfosConstruct('span','','infosAdresse','apparitionAdresse' );

application.blocInfosConstruct('h2','Vélo disponible: ','infos','infosVeloDispo');
application.blocInfosConstruct('span','','infosVeloDispo','apparitionVeloDispo' );

application.blocInfosConstruct('h2','Emplacement disponible: ','infos','infosVeloStand');
application.blocInfosConstruct('span','','infosVeloStand','apparitionEmpDispo' );

//initialization of canvas
canvas.dessiner();

//app's function callin'
application.cliqueResa();
application.valideResa();

setTimeout(function(){application.rappelResa()}, 1);





