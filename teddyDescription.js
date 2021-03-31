
let params = (new URL(document.location)).searchParams;
let idTeddy = params.get('id');


console.log(idTeddy);

const getTeddy = (callback) => {

    const request = new XMLHttpRequest() ;
    request.open ('GET', 'http://localhost:3000/api/teddies/' + idTeddy) ;
    request.send();

    request.addEventListener('readystatechange', () => {
        if(request.readyState === 4 && request.status === 200) {
           const dataTeddy = JSON.parse(request.responseText)
           callback(undefined, dataTeddy);
        } else if(request.readyState === 4) {
           callback('Oups les données sont inaccessibles', undefined);
        }
    });
}

const containerDetails = document.querySelector(".containerTeddy");


getTeddy((err, data) => {
    if(err){
        console.log(err);
    }else{       

        // afficher les infos du Teddy                 
        const contentDetails = `
        <div class="col-5 card cardTeddyDetails">
            <img class="card-img-top imageoursDetails" src="${data.imageUrl}" alt="${data.name}">
            <div class="card-body">
                <h4 class="card-title nameourDetails">Salut, moi c'est<br><b>${data.name}</b></h4>
                <p class="card-text descriptionoursDetails"><center>J'attends que tu m'adoptes.</center><font size="2.5em">${data.description}</font></p>
                <p class="card-text priceoursDetails">A présent, il ne te reste plus qu'à <b>payer les frais de dossier</b> (${data.price} euros) et <b>choisir dans quelle couleur tu veux que je vienne</b>.</p>
                
                <label for="exampleFormControlSelect2">Choisi moi comme tu m'aimes</label>
                <select class="form-control colorsTeddy" id="couleur_Produit">
                </select>
                </div>     

                <button class="btn btn-lg btn-block addCart">Pour avoir bientôt ${data.name} </button>
            </div>
        </div>`;
        
        containerDetails.innerHTML = contentDetails; 
        
        const choiceColor = document.querySelector(".colorsTeddy");

        // TODO: Changer le Data (l.92) pour mettre nom couleur pour Arnold
        data.colors.forEach(data => {
            (data == "Pale brown")? data="#964B00" : data ;     //pour Pale Brown
            data = (data == "Dark brown")? "#654321" : data ;
            const teddyColor =  `
            <option value="${data}" class="colorTeddy" style="background-color:${data}">${data}</option>
            `;         
            
        choiceColor.innerHTML += teddyColor;  

        });  
    }
});



//LOCAL STORAGE  

    // for button add cart "click"
getTeddy((err, data) => {
    if(err){
        console.log(err);
    }else{ 
        const cartBtn = document.querySelector(".addCart");

        cartBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const idForm = document.querySelector(".colorsTeddy");
        const choixColor = idForm.value;

        let optionsProduit = {
            id: data._id,
            nom: data.name,
            price: data.price,
            image: data.imageUrl,
            description: data.description,
            quantite: 1,
            couleur: choixColor,
        }
console.log(optionsProduit);

// ---------------------------LOCAL STORAGE-----------------------

// Stocker la récuperation des valeurs dans le localStorage
let cartItem = JSON.parse(localStorage.getItem("product"));

// Pop Up
const confirmationPopup = () => {
    if(window.confirm(`    ${data.name} arrive bientôt chez vous
    Confirmer le panier avec OK ou revenir à l'accueil avec ANNULER`)){
        window.location.href = "panier.html";
    }else{
        window.location.href = "index.html";
    }
}


// fonction ajouter un produit dans le Local Storage
const ajoutLocalStorage = () => {
    cartItem.push(optionsProduit);    
    localStorage.setItem("product", JSON.stringify(cartItem));
};

//si il y a des produits dans le localStorage
if (cartItem) {
    ajoutLocalStorage();
    confirmationPopup();
}
// si il n'y a pas de produit dans le localStorage
else{
    cartItem = [];
    ajoutLocalStorage();
    confirmationPopup();
}
    });
    }
});





//         //  // bouton ajouter article au panier
//        
//         //   const btnPourPanier = document.querySelector(".addCart");

//   // Ecouter le bouton d'envoi dans le panier
//         //   btnPourPanier.addEventListener("click", (event)=>{
//         //       event.preventDefault();
//         //   })
       
//         cartBtn.addEventListener('click', (event) => {
//             event.preventDefault();
//         })        
//         };


 
// // Stocker la récuperation des valeurs dans le localStorage
// let saveItemCart = {
//     id: data._id,
//     nom: data.name,
//     price: data.price,
//     image: data.imageUrl,
//     description: data.description,
//     quantite: 1,
//     couleur: choixColor,    // pbl console log car juste "" pas la valeur
// }
// console.log(saveItemCart);



// // // //Fenetre pop-up opur confirmation
// // const confirmationPopup = () => {
// //     if(window.confirm(` ${data.name} arrive bientôt chez vous 
// //     Consulter le panier pour CONFIRMER ou bien revenir à l'accueil pour ANNULER`)){
// //         window.location.href = "panier.html";
// //     }else{
// //         window.location.href = "index.html";
// //     }
// // }

// // //si il y a des produits dans le localStorage
// // if (cartItem) {
// //     cartItem.push(saveItemCart);    
// //     localStorage.setItem("product",JSON.stringify(cartItem));
// //     confirmationPopup();
// // }
// // // si il n'y a pas de produit dans le localStorage
// // else{
// //     cartItem = [];
// //     cartItem.push(saveItemCart);    
// //     localStorage.setItem("product",JSON.stringify(cartItem));
// //     confirmationPopup();

// // }

// });





//     // Cart and to add
// function addItemCart (item) {
//     let cartItem =[]

//     let saveItemCart = (data);    



//     // let otherItem = true;
//     // if (localStorage.getItem('anyItem') === null) {
//          cartItem.push(saveItemCart);
//     //     localStorage.setItem('anyItem', JSON.stringify(cartItem));
//     // }

//     // else {
//     //     cartItem= JSON.parse(localStorage.getItem('anyItem'));

//     //     cartItem.forEach((prod) => {
//     //         if (item._id === prod && item.colors === prod.colors) {
//     //         prod.quantity++;
//     //         otherItem = false;
//     //     }

//     // })

//     // if (otherItem) cartItem.push(saveItemCart);
//     // localStorage.setItem('anyItem', JSON.stringify(cartItem));
//     // }

//     // itemConfirmation();
//     // alert("J'arrives bientôt à la maison");
// };
