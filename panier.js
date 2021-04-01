let cartItem = JSON.parse(localStorage.getItem("product"));
console.log(cartItem);

// Afficher les produits du panier

const panierItem = document.querySelector(".panier");
let containerPanier = [];

// si le panier est vide
if(cartItem === null || cartItem == 0) {
    const panierVide = `
        <div class="panier_vide">
            <div> Oh non, tu n'as choisi aucun Teddy</div>
        </div>
    `;
    panierItem.innerHTML = panierVide;
    console.log("snif snif");
} else{
    // si le panier n'est pas vide  
    for(i = 0; i < cartItem.length; i++ ){
        containerPanier = containerPanier + `
        
        <div class="card col-8 panier-teddy">            
                <img class="card-img-top col-4 image-panier-teddy" src="${cartItem[i].image}" alt="Card image cap">            
            <div class="card-body">
                <h4 class="card-title">Quantité 1 - ${cartItem[i].nom} de couleur ${cartItem[i].couleur}</h4>
                <p class="card-text">Pour seulement ${cartItem[i].price / 100} € - <a href="#" class="btn btn-primary btn-supprimer"> Supprimer le Teddy </a> </p>
            </div>
        </div>        
        `;
    }
        if(i === cartItem.length){
        panierItem.innerHTML = containerPanier;
        }    
}

// Bouton "Supprimer l'article"
let btn_delete = document.querySelectorAll(".btn-supprimer");


for (let j = 0; j < btn_delete.length; j++){
    btn_delete[j].addEventListener("click", (event) =>{
        event.preventDefault();

        // selection de l'article à enlever
        let id_to_delete = cartItem[j].id_product;
        
        // supprimer avec la methode filter
        cartItem = cartItem.filter( element => element.id_product !== id_to_delete); 
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

// additionner les prix de tout les article avec la methode "reduce"
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixTotalPanier.reduce(reducer, 0);
console.log(prixTotal);

// Le code HTML du Total Panier
const affichePrixPanier = `
<div class="text-center justify-content-center affichage-prix-panier">Pour recevoir ta commande, les frais de dossier sont de ${prixTotal} € </div>
`;

panierItem.insertAdjacentHTML("afterend", affichePrixPanier);


// ----------------------------- Formulaire de commande --------------------------

const affiherFormulaireHtml = () => {

    const FormulaireCommande = document.querySelector(".formulaire");

    const structureFormulaire = `
    <div class="col-md-8 order-md-1">
        <h4 class="mb-3">Adresse de facturation</h4>
        <form class="needs-validation" novalidate>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="firstName">Prénom</label>
                    <input type="text" class="form-control" id="prenom" placeholder="" value="" required>
                    <div class="invalid-feedback">
                        Merci d'indiquer ton prénom
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="lastName">Nom de famille</label>
                    <input type="text" class="form-control" id="nom" placeholder="" value="" required>
                    <div class="invalid-feedback">
                    Merci d'indiquer ton nom de famille
                    </div>
                </div>
            </div>

            <div class="mb-3">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" placeholder="you@example.com">
                <div class="invalid-feedback">
                Merci d'entrer une adresse email valide
                </div>
            </div>

            <div class="mb-3">
                <label for="address">Adresse</label>
                <input type="text" class="form-control" id="adresse" placeholder="1234 Main St" required>
                <div class="invalid-feedback">
                Merci d'indiquer ton adresse de livraison
                </div>
            </div>

            <div class="mb-3">
                <label for="address2">Complément d'adresse <span class="text-muted">(Optionel)</span></label>
                <input type="text" class="form-control" id="adresse2" placeholder="Apartment or suite">
            </div>

            <div class="row">
                <div class="col-md-5 mb-3">
                <label for="country">Pays</label>
                <select class="custom-select d-block w-100" id="pays" required>
                    <option value="">C'est ...</option>
                    <option>France</option>
                    <option>Royaume-Uni</option>
                    <option>Belgique</option>
                    <option>Wakanda</option>
                </select>
                <div class="invalid-feedback">
                    Merci de sélectionner ton pays
                </div>
                </div>
            
                <div class="col-md-3 mb-3">
                <label for="zip">Code postal</label>
                <input type="text" class="form-control" id="code-postal" placeholder="" required>
                <div class="invalid-feedback">
                    J'ai besoin de ton code postal
                </div>
                </div>
            </div>
            <hr class="mb-4">
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="same-address">
                <label class="custom-control-label" for="same-address">L'adresse de livraison est la même que l'adresse de facturation</label>
            </div>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="save-info">
                <label class="custom-control-label" for="save-info">Sauvegarder mes infos pour la prochaine fois</label>
            </div>
            <hr class="mb-4">

            <h4 class="mb-3">Paiement</h4>

            <div class="d-block my-3">
                <div class="custom-control custom-radio">
                <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked required>
                <label class="custom-control-label" for="credit">Credit card</label>
                </div>
                <div class="custom-control custom-radio">
                <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required>
                <label class="custom-control-label" for="debit">Debit card</label>
                </div>
                <div class="custom-control custom-radio">
                <input id="paypal" name="paymentMethod" type="radio" class="custom-control-input" required>
                <label class="custom-control-label" for="paypal">PayPal</label>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                <label for="cc-name">Nom sur la carte</label>
                <input type="text" class="form-control" id="cc-name" placeholder="" required>
                <small class="text-muted">Recopie le nom entier sur ta carte</small>
                <div class="invalid-feedback">
                    Name on card is required
                </div>
                </div>
                <div class="col-md-6 mb-3">
                <label for="cc-number">Numéro de la carte</label>
                <input type="text" class="form-control" id="cc-number" placeholder="" required>
                <div class="invalid-feedback">
                    Pas de numérao de carte, pas de Teddy
                </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 mb-3">
                <label for="cc-expiration">Expiration</label>
                <input type="text" class="form-control" id="cc-expiration" placeholder="" required>
                <div class="invalid-feedback">
                    La date d'expiration est demandée
                </div>
                </div>
                <div class="col-md-3 mb-3">
                <label for="cc-cvv">CVV</label>
                <input type="text" class="form-control" id="cc-cvv" placeholder="" required>
                <div class="invalid-feedback">
                    Plus que le CVV est c'est fini
                </div>
                </div>
            </div>
            <hr class="mb-4">
            <button class="btn btn-primary btn-lg btn-block" id="envoyer-formulaire" type="submit">Continue to checkout</button>
            </form>
        </div>
    </div>
    `;

    FormulaireCommande.insertAdjacentHTML("afterend", structureFormulaire);
};

affiherFormulaireHtml ();


// Récuperation des données du formulaire (hors carte crédit) pour local storage

const btnCheckout = document.querySelector("#envoyer-formulaire");

btnCheckout.addEventListener("click", (e) => {
e.preventDefault();

const formulaireValues = {
    prenom: document.querySelector("#prenom").value,
    nom: document.querySelector("#nom").value,
    email: document.querySelector("#email").value,
    adresse: document.querySelector("#adresse").value,
    adresse2: document.querySelector("#adresse2").value,
    pays: document.querySelector("#pays").value,
    codePostal:document.querySelector("#code-postal").value,
}

localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));

// Pour envoyer au serveur
const aEnvoyerServeur = {
    cartItem,
    formulaireValues,
}

});


//------------ Garder les valeurs du formulaires dans les champs via le local storage--------
const dataLocalStorage = localStorage.getItem("formulaireValues");
const dataLocalStorageObject = JSON.parse(dataLocalStorage);

// function remplirChampFormulaire (input){
//     document.querySelector(`#${input}`).value = dataLocalStorageObject[input];
// };
// remplirChampFormulaire("prenom");
// remplirChampFormulaire("nom");
// remplirChampFormulaire("email");
// remplirChampFormulaire("adresse");
// remplirChampFormulaire("adresse2");
// remplirChampFormulaire("pays");
// remplirChampFormulaire("codePostal");

document.querySelector("#prenom").value = dataLocalStorageObject.prenom;
document.querySelector("#nom").value = dataLocalStorageObject.nom;
document.querySelector("#email").value = dataLocalStorageObject.email;
document.querySelector("#adresse").value = dataLocalStorageObject.adresse;
document.querySelector("#adresse2").value = dataLocalStorageObject.adresse2;
document.querySelector("#pays").value = dataLocalStorageObject.pays;
document.querySelector("#code-postal").value = dataLocalStorageObject.codePostal;




