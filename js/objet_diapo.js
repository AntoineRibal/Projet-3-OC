var diapoConstructor= {
		//method to construct one diapo
		blocDiapoConstruct: function(source, texte) {
			// i++ for add numb too each diapo
			i++;
			
			//create div
			var newBlocDiapo = document.createElement('div');
			newBlocDiapo.classList.add('diapo');
			newBlocDiapo.id = 'diaporama' + i ;
			tabI.push(i);
			document.getElementById('diaporama').appendChild(newBlocDiapo);
			
			//create img and add it on div
			var newImageDiapo = document.createElement('img');
			newImageDiapo.classList.add('imageDiapo');
			newImageDiapo.src = source;
			newImageDiapo.alt = 'Diapositive reservation velo';
			newBlocDiapo.appendChild(newImageDiapo);
			
			//create 'p' and add it on div
			var newParaDiapo = document.createElement('p');
			newParaDiapo.classList.add('texteDiapo');
			newParaDiapo.textContent = texte;
			newBlocDiapo.appendChild(newParaDiapo);
		}
};