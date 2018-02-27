$(function() {
	
	//hide all
	$('.diapo').hide();
	//let appears one of them
	$('#diaporama'+i).show();
	
	function appDisp(index) {
		$('.diapo').hide();
		$('#diaporama' + i).show();
		
	}	
	//Creation of listener to controls
	$('#flecheGauche').on('click', function () {
		i--;
		if (i == 0) {i = tabI.length;}
		appDisp(i);
	});

	$('#flecheDroite').on('click', function () {
		i++;
		if (i == tabI.length+1) {i = 1;}
		appDisp(i);
	});

	document.addEventListener('keypress', function (e) {
			var touche = e.keyCode;
			if (touche == 37) {
				i--;
				if (i == 0) {i = tabI.length;} 
				appDisp(i);		
			}		
	});

	document.addEventListener('keypress', function (e) {
		var touche = e.keyCode;
		if (touche == 39) {
			i++;
			if (i == tabI.length+1) {i = 1;}
			appDisp(i);	
			
		}		
	});
});