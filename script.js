let tachesInput = document.getElementById("tachesInput");
let ajouterBtn  = document.getElementById("ajouterBtn");
let listeTaches = document.getElementById("listeTaches");
let compteurTaches = document.getElementById("compteurTaches");
let toutesBtn = document.getElementById("toutesBtn");
let enCoursBtn = document.getElementById("enCoursBtn");
let termineesBtn = document.getElementById("termineesBtn");
let taches = [];

// mettre a jour le compteur
function mettreAjourCompteur(){
    if(taches.length === 0){
        compteurTaches.textContent = "aucune tâche"
    }else if (taches.length === 1){
        compteurTaches.textContent = taches.length + "  tâche"
    }else {
        compteurTaches.textContent = taches.length + ": taches"
    }
}

function  afficherTache(tache) {
        let nouvelleLigne = document.createElement("li");

        // pour supprimer une taches lors de sa creation
        let boutonTerminer = document.createElement("button");
        boutonTerminer.textContent = "Terminer";

        // pour supprimer une taches lors de sa creation
        let boutonSupprimer = document.createElement("button");
        boutonSupprimer.textContent = "Supprimer";

        // pour modifier une tache lors de sa création
        let boutonModifier = document.createElement("button");
        boutonModifier.textContent ="Modifier";

        // pour le span permettant de barrer que le texte
        let textTache = document.createElement("span");
        textTache.textContent = tache.texte;

        if (tache.terminee === true){
            textTache.style.textDecoration = "line-through";
            boutonTerminer.textContent = "Annuler"
        }


        // l'evenement du click pour le bouton supprimer
            boutonSupprimer.addEventListener("click", function(){
            let position = taches.indexOf(tache);
            taches.splice (position,1);
            nouvelleLigne.remove();
            mettreAjourCompteur ()
          
            // pour enregistrer lors de son actualisation
             let tachesTexte = JSON.stringify(taches);
            localStorage.setItem ("mesTaches",tachesTexte);
        
        });

        // l'evenement du click pour le bouton terminer lors de sa creation

        boutonTerminer.addEventListener("click", function(){
    
            if (tache.terminee === false){
                textTache.style.textDecoration = "line-through";
                boutonTerminer.textContent = "annuler";
                tache.terminee = true;
            }else{
                textTache.style.textDecoration = "none";
                boutonTerminer.textContent = "Terminer" ;
                tache.terminee = false;
            }


            let tachesTexte = JSON.stringify(taches);
            localStorage.setItem ("mesTaches",tachesTexte);

        });

         //l'evenement du click pour le bouton modifier lors de sa creation
            boutonModifier.addEventListener("click", function(){
                let boutonEnregistrer = document.createElement("button");
                boutonEnregistrer.textContent = "Enregistrer"
                let modifieInput = document.createElement("input");
                nouvelleLigne.appendChild(modifieInput);
                nouvelleLigne.appendChild(boutonEnregistrer)
                modifieInput.value = tache.texte;

                 // //l'evenement du click pour le bouton enregistrer lors de sa creation

                boutonEnregistrer.addEventListener("click", function(){
                 // Je remplace le texte de la tâche par ce que l’utilisateur vient d’écrire dans l’input.
                 tache.texte = modifieInput.value
                textTache.textContent = tache.texte

                let tachesTexte = JSON.stringify(taches);
                localStorage.setItem ("mesTaches",tachesTexte);
                modifieInput.remove();
                boutonEnregistrer.remove();
             });

            });

       

        nouvelleLigne.appendChild(textTache);
        nouvelleLigne.appendChild(boutonSupprimer);
        nouvelleLigne.appendChild(boutonTerminer);
        nouvelleLigne.appendChild(boutonModifier);
        listeTaches.appendChild(nouvelleLigne);
};

ajouterBtn.addEventListener("click",function(){
    let nouvelleTache = tachesInput.value;
    if(nouvelleTache === ""){
        alert("veuillez remplir le champs")
    }else{
       let tacheObjet ={
            texte:nouvelleTache ,
            terminee:false
        };

        taches.push(tacheObjet);
        afficherTache (tacheObjet);
        
        mettreAjourCompteur()
        let tachesTexte = JSON.stringify(taches);
        localStorage.setItem ("mesTaches",tachesTexte);
        tachesInput.value = "";
    }
})

// pour recuperer les données  sauvegardées
let recupereMesTaches = localStorage.getItem ("mesTaches");
if (recupereMesTaches !== null){
    taches = JSON.parse(recupereMesTaches);
    taches.forEach(tache => {
        afficherTache(tache);
    });

    mettreAjourCompteur();
};

//pour tous les boutons 
toutesBtn.addEventListener("click", function (){
    listeTaches.textContent = "";
//Pour chaque objet présent dans mon tableau taches, prends-le et demande à ma fonction afficherTache() de créer son affichage.
    taches.forEach (function(tache){
        afficherTache(tache);
    });

    mettreAjourCompteur();
});

// pour les boutons en cours 
enCoursBtn. addEventListener("click",function(){
    listeTaches.textContent="";
    let tachesEnCours = taches.filter(function(tache){
        return tache.terminee === false;
    });

    tachesEnCours.forEach(function(tache){
        afficherTache(tache);
    });
    if(tachesEnCours.length === 0 ){
        compteurTaches.textContent = "Aucune tâche en cours";
    }else if (tachesEnCours.length === 1 ){
        compteurTaches.textContent = tachesEnCours.length + "tache";
    } else {
        compteurTaches.textContent = tachesEnCours.length + "taches";
    };
});

termineesBtn.addEventListener("click", function(){
    listeTaches.textContent = "";
    let tachesTermines = taches.filter(function(tache){
        return tache.terminee === true
    });

    tachesTermines.forEach(function(tache){
        afficherTache(tache);
    });

    if(tachesTermines.length === 0 ){
        compteurTaches.textContent = "Aucune tâche en terminé";
    }else if (tachesTermines.length === 1 ){
        compteurTaches.textContent = tachesTermines.length + " tache terminée";
    } else {
        compteurTaches.textContent = tachesTermines.length + " taches terminées";
    };
});

