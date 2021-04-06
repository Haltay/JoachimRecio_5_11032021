let cartItem = JSON.parse(localStorage.getItem("product"));
let formulaireValues = JSON.parse(localStorage.getItem("formulaireValues"));
console.log(cartItem);
console.log(formulaireValues);

const confirmation = document.querySelector(".confirmation");

for (l = 0; l < cartItem.length; l++) {
const confirmationDetails = `
<div class="px-4 py-5">
    <h5 class="text">${formulaireValues.prenom} ${formulaireValues.nom}</h5>
    <h4 class="mt-5 theme-color mb-5">Merci pour votre achat</h4> 
    <span class="theme-color">Voici un resumé pour être sûr que tout c'est bien passé </span>
    <div class="mb-3">
        <hr class="new1">
    </div>
    <div class="d-flex justify-content-between"> <span class="font-weight-bold">Bientôt arrivera chez vous, ${cartItem[l].nom}</span> <span class="text-muted">0 euros</span> </div>
    <div class="d-flex justify-content-between"> <small>Frais de dossier</small> <small>${formulaireValues.panierTotal} euros</small> </div>
    <div class="d-flex justify-content-between"> <small>Taxes</small> <small>Aucune<br>l'amour n'est pas une question d'argent</small> </div>
    <div class="d-flex justify-content-between mt-3"> <span class="font-weight-bold">Total à payer</span> <span class="font-weight-bold theme-color">${formulaireValues.panierTotal} euros</span> </div>
    <div class="text-center mt-5"> <button class="btn btn-primary">Track your order</button> </div>
</div>`;

confirmation.innerHTML = confirmationDetails;
console.log(cartItem[l].nom);
//ToDO voir pourquoi un seul nom de Teddy et pas tous.
};
