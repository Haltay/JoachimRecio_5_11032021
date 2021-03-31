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
                <p class="card-text">Pour seulement ${cartItem[i].price} € - <a href="#" class="btn btn-primary btn-supprimer"> Supprimer le Teddy </a> </p>
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




