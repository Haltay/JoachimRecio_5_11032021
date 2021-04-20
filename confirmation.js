let cartItem = JSON.parse(localStorage.getItem("product"));
let formulaireValues = JSON.parse(localStorage.getItem("formulaireValues"));

const confirmation = document.querySelector(".confirmation");

   // ToDO voir pourquoi un seul nom de Teddy et pas tous.
cartItem.forEach((item) => {
    confirmation.innerHTML = `
        <div class="col-md-5 mt-5 confirmation-achat">
            <h3 class="text pt-4 nom-prenom">${formulaireValues.prenom} ${formulaireValues.nom}</h3>
            <h4 class="mt-5 theme-color mb-5">Merci pour votre achat n°${formulaireValues.numeroCommande}</h4> 
            <span class="theme-color">Voici un resumé pour être sûr que tout c'est bien passé </span>
            <div class="mb-3">
                <hr class="new1">
            </div>
            <div class="d-flex justify-content-between"> <span class="font-weight-bold">Bientôt arrivera chez vous: ${item.nom}</span> <span class="text-muted">0 €</span> </div>
            <div class="d-flex justify-content-between"> <small>Frais de dossier</small> <small>${formulaireValues.panierTotal} €</small> </div>
            <div class="d-flex justify-content-between"> <small>Taxes</small> <small>Aucune l'amitié n'a pas de prix</small> </div>
            <div class="d-flex justify-content-between mt-3"> <span class="font-weight-bold">Total à payer</span> <span class="font-weight-bold theme-color">${formulaireValues.panierTotal} €</span> </div>
            <div class="card-adress mt-5">
                <div class="d-flex justify-content-between"> <span class="font-weight-bold"><u>Votre colis arrivera à :</u></span> </div>
                <div class="align-middle adresse-confirmation"> <span class="font-weight-bold theme-color">${formulaireValues.adresse}</span> </div>
                <div class="align-middle adresse-confirmation"> <span class="font-weight-bold theme-color">${formulaireValues.codePostal} ${formulaireValues.ville}</span> </div>
                <div class="align-middle adresse-confirmation"> <span class="font-weight-bold theme-color">${formulaireValues.pays}</span> </div>
            </div>

            <div class="text-center mt-5 pb-4"> <button class="btn btn-primary" id="retourAccueil">Revoir tous les Teddys</button> </div>
        </div>`;

 console.log(item.nom);
})


// Retour à l'accueil et suppression du panier
const retourAccueil = document.querySelector("#retourAccueil");
retourAccueil.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("product");

    window.location.href = "index.html";
});