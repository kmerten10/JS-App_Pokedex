//Iife + defines variables
let pokemonRepository = (function () {
    let pokemonList = [];
    let modalContainer=document.querySelector('#modal-container');

//Link to access Pokemon API
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//Determines if data qualifies as a pokemon
    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon 
        ){
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        };
    };

//Sorts pokemon names alphabetically using an api
    function compareByName(a, b) {
        const nameA = a.name;
        const nameB = b.name;
        
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    }

    function getAll() {
        return pokemonList.toSorted(compareByName);
    }
    

//Creates a list of Pokemon buttons from the pokemonList
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listPokemon = document.createElement('li');
        listPokemon.classList.add('list-group-item');
        let button = document.createElement('button');
        button.classList.add('btn', 'btn-primary');
        button.addEventListener('submit', function (event) {
            event.preventDefault();
        });
        button.innerText = pokemon.name;
        button.setAttribute("data-target", "#modal-container");
        button.setAttribute("data-toggle", "modal");
        button.classList.add("button-class");
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        button.addEventListener("click", function(){
            showModal (pokemon);
        });
    }


//defines pokemon variable & ???
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        });
    }


//fetches pokemon data from api
    function loadDetails(item) { //why does this need to be named something other than pokemon?
        let url = item.detailsUrl;
        return fetch(url).then(function(response){
            return response.json();
        }).then(function(details){

            item.imageUrl = details.sprites.front_default;
            item.imageUrl2 =  details.sprites.back_default; 
            item.height = details.height;

            item.abilities = details.abilities.map((ability)=>ability.ability.name);

            item.types = details.types.map((type)=>type.type.name);

                } 
                ).catch(function (e) {
                console.error(e);
             });      
    }


    //Creates and displays the Modal with Pokemon details
    function showModal (pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function(){
            let modalTitle = document.querySelector('.modal-title');
            let modalContent = document.querySelector('.modal-body');

            modalContent.innerHTML ='';

            modalTitle.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

            let pokemonImage = document.createElement('img');
            pokemonImage.src = pokemon.imageUrl;

            let pokemonImage2 = document.createElement('img');
            pokemonImage2.src = pokemon.imageUrl2;
            

            let contentElement = document.createElement('p');
            contentElement.innerText = "Height: " + pokemon.height;

            let typeElement = document.createElement ('div');
            typeElement.innerText = "Type: " + pokemon.types;

            let abilityElement = document.createElement ('div');
            abilityElement.innerText = "Ability: " + pokemon.abilities;

       
        modalContent.appendChild(pokemonImage);
        modalContent.appendChild(pokemonImage2);

        modalContent.appendChild(contentElement);
        modalContent.appendChild(typeElement);
        modalContent.appendChild(abilityElement);
      
        // modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    });
}

    // function to hide Modal
    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e)=>{
        if(e.key==='Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e)=>{
        let target = e.target;
        if (target===modalContainer){
            hideModal();
        }
    });

       
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };

})();

pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});


