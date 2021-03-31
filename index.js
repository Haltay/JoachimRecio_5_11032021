
const getTeddiesData = (callback) => {

    const request = new XMLHttpRequest() ;
    request.open ('GET', 'http://localhost:3000/api/teddies') ;
    request.send();

    //console.log(request.readyState); // Pour vérifier l'état de "request"

    request.addEventListener('readystatechange', () => {
        if(request.readyState === 4 && request.status === 200) {
           const dataTeddies = JSON.parse(request.responseText)
           callback(undefined, dataTeddies);
        } else if(request.readyState === 4) {
           callback('Oups les données sont inaccessibles', undefined);
        }
    });
}

// const teddyName = document.getElementsByClassName('nameours');
// const teddyPrice = document.getElementsByClassName("priceours");
// const teddyDescription = document.getElementsByClassName("descriptionours");

const container = document.querySelector(".container");

// const src = document.createAttribute("src");
// const imageTeddy = document.getElementsByClassName("imageours");


getTeddiesData((err, dataTeddies) => {
    if(err){
        console.log(err);
    }else{
        // afficher les infos du Teddy
        dataTeddies.forEach(element => {
            
            // teddyName.innerHTML = element.name;
            // teddyPrice.innerHTML = element.price;
            // teddyDescription.innerHTML = element.description;

            const content =  `
            <div class="col-3 card cardTeddy" id="${element._id}">
                <img class="card-img-top imageours" src="${element.imageUrl}" alt="${element.name}">
                <div class="card-body">
                    <h4 class="card-title nameours">Salut, moi c'est<br><b>${element.name}</b></h4>
                    <p class="card-text descriptionours"><center>J'attends que tu m'adoptes.</center><font size="2.5em">${element.description}</font></p>
                    <p class="card-text priceours">A présent, il ne te reste plus qu'à <b>payer les frais de dossier</b> (${element.price} euros) et <b>choisir dans quelle couleur tu veux que je vienne</b>.</p>
                    <a href="teddyDescription.html?id=${element._id}" class="btn btn-lg btn-block btnadoptemoi">Adopte moi</a>
                </div>
            </div>`;            

            container.innerHTML += content;            
        });
    }
});


// Card Details

// const containerDetails = document.querySelector(".containerTeddie");

// getTeddiesData((err, dataTeddies) => {
//     if(err){
//         console.log(err);
//     }else{
//         dataTeddies.forEach(element => {
         
//             const containerDetails = `
//             <div class="col-3 card cardTeddyDetails">
//                 <img class="card-img-top imageoursDetails" src="${element.imageUrl}" alt="${element.name}">
//                 <div class="card-body">
//                     <h4 class="card-title nameourDetailss">Salut, moi c'est<br><b>${element.name}</b></h4>
//                     <p class="card-text descriptionoursDetails"><center>J'attends que tu m'adoptes.</center><font size="2.5em">${element.description}</font></p>
//                     <p class="card-text priceoursDetails">A présent, il ne te reste plus qu'à <b>payer les frais de dossier</b> (${element.price} euros) et <b>choisir dans quelle couleur tu veux que je vienne</b>.</p>
//                     <a href="#" class="btn btn-lg btn-block btnadoptemoi">Adopte moi</a>
//                 </div>
//             </div>`;   
                     
//         });
//     }
// });





    




