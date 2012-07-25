(function($) {
Drupal.behaviors.aelslideshow = {
		attach : function(context) {
		
		// Script JS pour l'affichage du slideshow
		// Arnaud DUSSURGET pour Aeliance.com
			
			
			
		// On recupère les elements div ( vignettes ) de classe previs
		var previs = jQuery(".previs div");
		var carrousel = {
				
				nbSlide : 0, // Stocke le nombre total de slides
				nbCurrent : 0, // stocke le nombre courant ( numero slide en cours )
				elemCurrent : null, // Stocke l'élement en cours ( slide en cours )
				timer : null, // Timer pour le setInterval ( appel en boucle )
				
				
				
				// Fonction init appelée au lancement
				init : function(elemdiv){
					
					this.nbSlide = jQuery(".slide").length; // Recupération du nombre de slide
				
					jQuery(".slide").hide();	// On cache tous les slide
					jQuery(".slide:first").show(); // On affiche le premier
					elemCurrent=jQuery(".slide:first");
					jQuery(".previs div:eq(0)").addClass("active"); // On grise la vignette de navigation
					carrousel.play();	// On lance la boucle
					div = jQuery(elemdiv);	
					
					div.mouseover(function(){	// Quand la souris passe sur le slideshow
						carrousel.stop();		// On met l'animation en pause
					});
					div.mouseout(function(){	// Quand la souris ressort
						carrousel.play();		// On relance l'animation
					});
					
					
				},
				
				// Fonction qui permet d'afficher un slide
				gotoSlide : function(num){
					
					// Si on clique sur la vignette en cours, on ne fait rien
					if(num==this.nbCurrent){ return false;}
					
					// Sinon on affiche en fondu la nouvelle
					
					elemCurrent.fadeOut("slow");
					// On masque en fondu l'ancienne
					jQuery(".slide:eq("+num+")").fadeIn("slow");		
						
						
						
				
										
					// On enleve la classe active à toutes les vignette ( on dégrise )
					jQuery(".previs div").removeClass("active");
					// On ajoute la classe active à la nouvelle vignette ( grise )
					jQuery(".previs div:eq("+num+")").addClass("active")
					
					this.nbCurrent=num;							// On redéfinit nos variables
					elemCurrent=jQuery(".slide:eq("+num+")");
					
				},
				
				// Fonction qui permet d'afficher la vignette suivante
				// Elle est appelée en boucle grace au setInterval
				next : function(){
					
					var number=this.nbCurrent+1;	// On incrémente
					
					if(number == this.nbSlide){		// Si nous sommes à la dernière vignette
						number=0;				
					}
					this.gotoSlide(number);			// Affiche la prochaine vignette
				},
				
				// Fonction qui permet de mettre en pause l'animation
				stop : function(){
					
					window.clearInterval(carrousel.timer);
				},
				// Fonction qui permet de lancer l'animation
				play : function(){
					window.clearInterval(carrousel.timer);
					this.timer = setInterval(function(){
						carrousel.next();
					}, 4000);
				},
				
		}
		
				
		$(function(){
			
			carrousel.init(".aelslideshow");	// On lance l'initalisation du carrousel
		
		});
		
		// Appel de fonctions lors du clic sur les vignettes
		previs[0].onclick = function(){
			carrousel.gotoSlide(0);
		};
		previs[1].onclick = function(){
			carrousel.gotoSlide(1);
		};
		previs[2].onclick = function(){
			carrousel.gotoSlide(2);
		};
		
}
};
}(jQuery));
