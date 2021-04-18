let cartItem = JSON.parse(localStorage.getItem("product"));
console.log(cartItem);

// Afficher les produits du panier

const panierItem = document.querySelector(".panier");
let containerPanier = [];

// si le panier est vide
if (cartItem === null || cartItem == 0) {
    const panierVide = `
        <div class="panier_vide">
            <div> Oh non, tu n'as choisi aucun Teddy</div>
        </div>
    `;
    panierItem.innerHTML = panierVide;
    console.log("snif snif");
} else {
    // si le panier n'est pas vide  
    for (i = 0; i < cartItem.length; i++) {

        // changement de la valeur color pour celle n'existant pas via un opérateur ternaire
        cartItem[i].couleur_background = (cartItem[i].couleur_background == "Dark brown") ? "#654321" : cartItem[i].couleur_background;
        cartItem[i].couleur_background = (cartItem[i].couleur_background == "Pale brown") ? "#964B00" : cartItem[i].couleur_background;

        containerPanier = containerPanier + `        
        <div class="card col-8 mt-4 d-flex flex-column flex-md-row panier-teddy" style="border: 6px solid ${cartItem[i].couleur_background}; border-radius: 10px">            
                <img class="card-img-top col-4 rounded-circle panier-teddy-image" src="${cartItem[i].image}" alt="Card image cap" style="border: 3px solid ${cartItem[i].couleur_background}">            
            <div class="card-body panier-teddy-card">
                <h4 class="card-title">Quantité 1 - ${cartItem[i].nom} de couleur ${cartItem[i].couleur}</h4>
                <div class="card-text"> Pour seulement ${cartItem[i].price / 100} € - 
                    <button class="btn btn-primary btn-supprimer" onclick="removeFromCart(${JSON.stringify(cartItem)})"> Supprimer ${cartItem[i].nom} (${cartItem[i].couleur}) </button> 
                </div>
            </div>
        </div>        
        `;
    }
    if (i === cartItem.length) {
        panierItem.innerHTML = containerPanier;
    }
}

// Bouton "Supprimer l'article"
let btn_delete = document.querySelectorAll(".btn-supprimer");

// TODO --------------------------------------------------------------
// function removeFromCart(item) {
//     //TODO enlever l'objet item de panier
//     console.log(item);
// }

for (let j = 0; j < btn_delete.length; j++) {
    btn_delete[j].addEventListener("click", (event) => {
        event.preventDefault();

        // selection de l'article à enlever
        let id_to_delete = cartItem[j].id_product;

        // supprimer avec la methode filter
        cartItem = cartItem.filter(element => element.id_product !== id_to_delete);
        console.log(cartItem);

        // envoie de la variable dans le local storage pour le modifier
        localStorage.setItem("product", JSON.stringify(cartItem));

        //Avertir de la suppression du produit
        alert("Votre Teddy est retourné à la boutique");
        window.location.href = "panier.html";
    });

}

// bouton pour vider le panier
const btn_delete_basket_html = `
<div class="text-center">
    <button type="button" class="btn btn-primary btn-lg col-8 btn-delete-basket"> Si tu as changé d'avis et que tu ne veux plus aucun Teddy </button>
</div>
`;
panierItem.insertAdjacentHTML("afterend", btn_delete_basket_html);

const btn_delete_basket = document.querySelector(".btn-delete-basket");

// suprression de la key product du local storage
btn_delete_basket.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("product");

    // message d'alerte
    alert(" Votre panier est tout léger sans Teddy ");
    window.location.href = "panier.html";
});


// ------------------------------ TOTAL PANIER ---------------------------
// Montant Total du panier
const prixTotalPanier = [];

for (let k = 0; k < cartItem.length; k++) {
    let prixProduitPanier = cartItem[k].price / 100;

    prixTotalPanier.push(prixProduitPanier);
}


// TODO ----------------------------------------------------------------------
// const priceTotal = JSON.parse(localStorage.getItem('product'));

// priceTotal.forEach(price =>  {
//         const prixProduitPanier = price / 100;

        
//     prixTotalPanier.push(prixProduitPanier);
// });
 



// additionner les prix de tout les article avec la methode "reduce"
const reducer = (accumulator, currentValue) => accumulator + currentValue;
let prixTotal = prixTotalPanier.reduce(reducer, 0);     // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
console.log(prixTotal);

// Le code HTML du Total Panier
const affichePrixPanier = `
<div class="text-center justify-content-center mt-4 mb-4 affichage-prix-panier" id="panierTotal">Pour recevoir ta commande, <b>les frais de dossier sont de ${prixTotal} €</b> </div>
`;

panierItem.insertAdjacentHTML("afterend", affichePrixPanier);


// Générer un numéro de commande aléatoire
let commandNumber = Math.round(Math.random() * 587496 * prixTotal);
console.log(commandNumber);


// Récuperation des données du formulaire (hors carte crédit) pour local storage

const btnCheckout = document.querySelector("#envoyer-formulaire");

btnCheckout.addEventListener("click", (e) => {
    e.preventDefault();

    const formulaireValues = {
        prenom: document.querySelector("#prenom").value,
        nom: document.querySelector("#nom").value,
        email: document.querySelector("#email").value,
        adresse: document.querySelector("#adresse").value,
        ville: document.querySelector("#ville").value,
        pays: document.querySelector("#pays").value,
        codePostal: document.querySelector("#code-postal").value,
        panierTotal: prixTotal,
        numeroCommande: commandNumber,
    }

    //---------------- Verifier que les valeurs du formulaire sont bonnes----------------
    const textAlert = (value) => {
        return ` Pour votre ${value} les symboles et chiffres ne sont pas autorisés \n Merci de le refaire `
    };
    const regExPrenomNomVille = (value) => {
        return /^[a-zA-Z]{1}[a-zA-Z -]*$/.test(value);
    };
    const regExCodePostal = (value) => {
        return /^[0-9]{5}(-[0-9]{4})?|(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/.test(value);
    };
    const regExEmail = (value) => {
        return /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(value);
    };
    const regExAdresse = (value) => {
        return /^[A-Za-z0-9\s]{5,50}$/.test(value);
    };

    // fonction pour afficher message d'erreur (dans le formulaire) lors d'un input vide 
    function inputVideFormulaire(inputVide) {
        document.querySelector(`#${inputVide}`).textContent = "Oups il y a un problème";
    }

    function prenomControl() {
        // controle des données prénom
        const lePrenom = formulaireValues.prenom;
        if (regExPrenomNomVille(lePrenom)) {
            return true;
        } else {
            inputVideFormulaire("prenomManquant");
            alert(textAlert("prénom"));
            return false;
        }
    }

    function nomControl() {
        // controle des données nom
        const leNom = formulaireValues.nom;
        if (regExPrenomNomVille(leNom)) {
            return true;
        } else {
            inputVideFormulaire("nomManquant");
            alert(textAlert("nom"));
            return false;
        }
    }

    function codePostalControl() {
        // controle des données code postal
        const leCodePostal = formulaireValues.codePostal;
        if (regExCodePostal(leCodePostal)) {
            return true;
        } else {
            inputVideFormulaire("codePostalManquant");
            alert("Le code postal n'est pas valide, merci de réessayer");
            return false;
        }
    }

    function EmailControl() {
        // controle des données de l'email
        const lEmail = formulaireValues.email;
        if (regExEmail(lEmail)) {
            return true;
        } else {
            inputVideFormulaire("emailManquant");
            alert("L'email n'est pas valide, merci de réessayer");
            return false;
        }
    }

    function AdresseControl() {
        // controle des données de l'adresse
        const lAdresse = formulaireValues.adresse;
        if (regExAdresse(lAdresse)) {
            return true;
        } else {
            inputVideFormulaire("adresseManquant");
            alert("L'adresse n'est pas valide, merci de réessayer");
            return false;
        }
    }

    function villeControl() {
        // controle des données ville
        const laVille = formulaireValues.ville;
        if (regExPrenomNomVille(laVille)) {
            return true;
        } else {
            inputVideFormulaire("villeManquant");
            alert(textAlert("ville"));
            return false;
        }
    }

    // confirmation de la validation de la commande

    // controle de la validité du formulaire 
    if (prenomControl() && nomControl() && codePostalControl() && EmailControl() && AdresseControl() && villeControl() &&
        (window.confirm(`    Votre Teddy arrive bientôt chez vous.
    Confirmer le panier avec OK ou annuler le avec ANNULER`)
        )) {
        // ------------ confirmer l'achat ------------
        window.location.href = "confirmation.html";
        // envoi dans le local storage des données du formulaire
        localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));
    } else {
        alert("Le formulaire n'est pas rempli correctement");
    }
});

