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








