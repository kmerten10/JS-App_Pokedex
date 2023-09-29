let pokemonRepository = (function () { //creates an Iife to "protect" variables from global use
    let pokemonList = []; //creates an empty array/place for pokemon list to be populated
    let modalContainer = document.querySelector('#modal-container'); //defines a variable based on the html#

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; //defines variable to pull in pokemon api
    let typesUrl = 'https://pokeapi.co/api/v2/type/?limit=150'; //defines variable that pulls in pokemon type api
    let abilityUrl = 'https://pokeapi.co/api/v2/ability/?limit=150';
    let generationUrl = 'https://pokeapi.co/api/v2/generation/?limit=150';




    //Determines if data qualifies as a pokemon; if yes, pokemon will be pushed onto the list
    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        };
    };

    function compareByName(a, b) {  //Alphabetically sorts a dynamically populated list of pokemon names  
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

    function getAll() { //returns the sorted pokemon list
        return pokemonList.toSorted(compareByName);
    }

    function addListItem(pokemon) { //Creates a list of Pokemon buttons
        let pokemonList = document.querySelector(".pokemon-list"); //creates variable based on the pokemon-list
        let listPokemon = document.createElement('li'); //creates a list element
        listPokemon.classList.add('list-group-item'); //adds the 'list-group-item' class to the listPokemon variable 
        let button = document.createElement('button');  //creates a button element
        button.classList.add('btn', 'btn-primary'); // adds the 'btn' 'btm-primary' class to the button variable that was just created because it's created in JS "it doesn't exist in html"

        button.innerText = pokemon.name; //adds text to button
        button.setAttribute("data-target", "#modal-container"); //add the 'data-target' class to the modal-container
        button.setAttribute("data-toggle", "modal"); //add the 'data-toggle' class to the modal-container
        button.classList.add("button-class"); //adds the button-class to the button variable
        listPokemon.appendChild(button); //appends the listPokemon to the button element
        pokemonList.appendChild(listPokemon); //appends the pokemonList to the listPokemon element that was just created
        button.addEventListener("click", function (event) { //adds an events listener to the buttons to open the modal on click
            event.preventDefault();
            showModal(pokemon);
        });
    }

    function addTypeOption(type) { // 
        let selectType = document.querySelector("#types-select"); //finds the first types-select and defines the selectType variable
        let typeOption = document.createElement('option'); //creates an option element for the dropdown 
        typeOption.setAttribute("value", type.url); // adds the type options to the dropdown 
        typeOption.innerText = type.name.charAt(0).toUpperCase() + type.name.slice(1); //adds inner text to the dropdown

        selectType.appendChild(typeOption); //appends the typeOption to the selectType element
    }

    function addAbilityOption(ability) { // 
        let selectAbility = document.querySelector("#ability-select"); //**finds the first types-select and defines the selectType variable
        let abilityOption = document.createElement('option'); //creates an option element for the dropdown 
        abilityOption.setAttribute("value", ability.url); // adds the type options to the dropdown 
        abilityOption.innerText = ability.name.charAt(0).toUpperCase() + ability.name.slice(1); //adds inner text to the dropdown

        selectAbility.appendChild(abilityOption); //appends the typeOption to the selectType element
    }

    function addGenerationOption(generation) { // 
        let selectGeneration = document.querySelector("#evolution"); //**finds the first types-select and defines the selectType variable
        let generationOption = document.createElement('span'); //creates an option element for the dropdown 
        let link = document.createElement("a");

        link.setAttribute("href", generation.url); // adds the type options to the dropdown 
        link.innerText = generation.name; //adds inner text to the dropdown

        link.addEventListener('click', function (event) {
            event.preventDefault();
            console.log(event.target.href)
        });

        generationOption.appendChild(link);

        selectGeneration.appendChild(generationOption); //appends the typeOption to the selectType element
    }



    function loadList() { //
        return fetch(apiUrl).then(function (response) { //fetches the apiUrl and returns a json response
            return response.json(); //json response being returned
        }).then(function (json) { //parses json
            json.results.forEach(function (item) { // creates a loop for the json results that iterates over each item and defines a variable
                let pokemon = { //defines pokemon based on the name and detailsUrl properties 
                    name: item.name, //associates pokemon name to pokemon variable just created
                    detailsUrl: item.url //associates item url with pokemon variable
                };
                add(pokemon); //adds pokemon to the list
                console.log(pokemon); //console logs pokemon details
            });
        }).catch(function (e) { //throws an error if item does not have the details
            console.error(e); //console logs the error
        });
    }
    /** Function definitions before function */
    function loadTypesList() { //loads the list of types from the type api
        let selectType = document.querySelector("#types-select"); //creates an element out of the  types-select id
        selectType.addEventListener('change', function (select) { //adds an event listener that changes upon select
            loadPokemonTypes(select.target.value); //still unsure of why this is select.target.value and how this maps...
        });

        return fetch(typesUrl).then(function (response) { //fetches the typesUrl and returns a json response
            return response.json(); //json response being returned
        }).then(function (json) { //parses json
            json.results.forEach(function (item) {  // creates a loop for the json results that iterates over each item and defines a variable
                let type = { //defines type based on the name and url properties 
                    name: item.name, //associates pokemon name to pokemon variable just created
                    url: item.url //associates item url with pokemon variable
                };
                addTypeOption(type); //adds the type to the dropdown list
                console.log(type); //console logs type details
            });
        }).catch(function (e) { //throws an error if item does not have the details
            console.error(e); //console logs the error
        });
    }

    function loadAbilityList() { //loads the list of types from the type api
        let selectAbility = document.querySelector("#ability-select"); //**creates an element out of the  types-select id
        selectAbility.addEventListener('change', function (select) { //adds an event listener that changes upon select
            loadPokemonAbility(select.target.value); //still unsure of why this is select.target.value and how this maps...
        });

        return fetch(abilityUrl).then(function (response) { //fetches the typesUrl and returns a json response
            return response.json(); //json response being returned
        }).then(function (json) { //parses json
            json.results.forEach(function (item) {  // creates a loop for the json results that iterates over each item and defines a variable
                let ability = { //defines type based on the name and url properties 
                    name: item.name, //associates pokemon name to pokemon variable just created
                    url: item.url //associates item url with pokemon variable
                };
                addAbilityOption(ability); //adds the type to the dropdown list
                console.log(ability); //console logs type details
            });
        }).catch(function (e) { //throws an error if item does not have the details
            console.error(e); //console logs the error
        });
    }

    function loadGenerationList() { //loads the list of types from the type api
        let selectGeneration = document.querySelector("#evolution");
        selectGeneration.addEventListener('span', function (div) {
            loadPokemonGeneration(div.target.value);
        });

        return fetch(generationUrl).then(function (response) { //fetches the typesUrl and returns a json response
            return response.json(); //json response being returned
        }).then(function (json) { //parses json
            json.results.forEach(function (item) {  // creates a loop for the json results that iterates over each item and defines a variable
                let generation = { //defines type based on the name and url properties 
                    name: item.name, //associates pokemon name to pokemon variable just created
                    url: item.url //associates item url with pokemon variable
                };
                addGenerationOption(generation); //adds the type to the dropdown list
                console.log(generation); //console logs type details
            });
        }).catch(function (e) { //throws an error if item does not have the details
            console.error(e); //console logs the error
        });
    }


    function loadDetails(item) { // 
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {

            item.imageUrl = details.sprites.front_default;
            item.imageUrl2 = details.sprites.back_default;
            item.height = details.height;

            item.abilities = details.abilities.map((ability) => ability.ability.name);

            item.types = details.types.map((type) => type.type.name);

        }
        ).catch(function (e) {
            console.error(e);
        });


    }

    function loadPokemonTypes(typeurl) { //loads the pokemon names that fall within each applicable type
        pokemonList = [];
        let pokemonListHTML = document.querySelector(".pokemon-list");
        pokemonListHTML.innerHTML = ''; //clears the html / removes the descendants of the element pokemonlistHTML (i.e. pokemon-list) so that a new option can be selected each time
        return fetch(typeurl).then(function (response) {  //fetches the typesUrl and returns a json response
            return response.json(); //json response being returned
        }).then(function (json) { //parses json
            json.pokemon.forEach(function (item) { //creates a loop for the json results that iterates over each item and defines a variable
                let pokemon = { //defines pokemon based on the name and url properties from typesurl
                    name: item.pokemon.name, //associates pokemon name to pokemon variable just created
                    detailsUrl: item.pokemon.url //associates item url with pokemon variable
                };
                add(pokemon); //adds the pokemon to selected type
                console.log(pokemon); //console logs pokemon details
            });
            pokemonRepository.getAll().forEach(function (type) { //adds types to the pokemonRespository 
                pokemonRepository.addListItem(type); //
            });

        }).catch(function (e) { //throws an error if item does not have the details
            console.error(e); //console logs the error
        });
    }

    function loadPokemonAbility(abilityurl) { //loads the pokemon names that fall within each applicable type
        pokemonList = [];
        let pokemonListHTML = document.querySelector(".pokemon-list");
        pokemonListHTML.innerHTML = ''; //clears the html / removes the descendants of the element pokemonlistHTML (i.e. pokemon-list) so that a new option can be selected each time
        return fetch(abilityurl).then(function (response) {  //fetches the typesUrl and returns a json response
            return response.json(); //json response being returned
        }).then(function (json) { //parses json
            json.pokemon.forEach(function (item) { //creates a loop for the json results that iterates over each item and defines a variable
                let pokemon = { //defines pokemon based on the name and url properties from typesurl
                    name: item.pokemon.name, //associates pokemon name to pokemon variable just created
                    detailsUrl: item.pokemon.url //associates item url with pokemon variable
                };
                add(pokemon); //adds the pokemon to selected type
                console.log(pokemon); //console logs pokemon details
            });
            pokemonRepository.getAll().forEach(function (ability) { //adds types to the pokemonRespository 
                pokemonRepository.addListItem(ability); //
            });

        }).catch(function (e) { //throws an error if item does not have the details
            console.error(e); //console logs the error
        });
    }

    function loadPokemonGeneration(generationUrl) { //loads the pokemon names that fall within each applicable type
        pokemonList = [];
        let pokemonListHTML = document.querySelector(".pokemon-list");
        pokemonListHTML.innerHTML = ''; //clears the html / removes the descendants of the element pokemonlistHTML (i.e. pokemon-list) so that a new option can be selected each time
        return fetch(generationUrl).then(function (response) {  //fetches the typesUrl and returns a json response
            return response.json(); //json response being returned
        }).then(function (json) { //parses json
            json.pokemon.forEach(function (item) { //creates a loop for the json results that iterates over each item and defines a variable
                let pokemon = { //defines pokemon based on the name and url properties from typesurl
                    name: item.pokemon_species.name, //associates pokemon name to pokemon variable just created
                    detailsUrl: item.pokemon_species.url //associates item url with pokemon variable
                };
                add(pokemon); //adds the pokemon to selected type
                console.log(pokemon); //console logs pokemon details
            });
            pokemonRepository.getAll().forEach(function (generation) { //adds types to the pokemonRespository 
                pokemonRepository.addListItem(generation); //
            });

        }).catch(function (e) { //throws an error if item does not have the details
            console.error(e); //console logs the error
        });
    }


    function showModal(pokemon) { //creates a modal to display pokemon details on click of button
        pokemonRepository.loadDetails(pokemon).then(function () { //loads pokemon details into the modal
            let modalTitle = document.querySelector('.modal-title'); //creates a title element for the modal title
            let modalContent = document.querySelector('.modal-body'); //creates a body element for the modal content

            modalContent.innerHTML = ''; //clears the innerhtml of the modal 

            modalTitle.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); //uppercases the pokemon name

            let pokemonImage = document.createElement('img'); //creates a pokemonimage element 
            pokemonImage.src = pokemon.imageUrl; //defines the src for the pokemon image

            let pokemonImage2 = document.createElement('img'); //creates 2nd image element
            pokemonImage2.src = pokemon.imageUrl2; //defines the src for the 2nd image


            let contentElement = document.createElement('p'); //creates a p element for the height details
            contentElement.innerText = "Height: " + pokemon.height; //defines inner text for the height element

            let typeElement = document.createElement('div'); //defines the type element and creates a div for the type element
            typeElement.innerText = "Type: " + pokemon.types; //defines inner text for the type  element

            let abilityElement = document.createElement('div');
            abilityElement.innerText = "Ability: " + pokemon.abilities;


            modalContent.appendChild(pokemonImage); //appends images to the content (modal body)
            modalContent.appendChild(pokemonImage2);

            modalContent.appendChild(contentElement); //appends the height element to the modal body
            modalContent.appendChild(typeElement); //appends the type element to themodal body
            modalContent.appendChild(abilityElement); //appends the ability element ot the modal body

            modalContainer.classList.add('is-visible'); //adds the is visbile attribute to the modal container element
        });
    }

    function hideModal() { //removes is visible from the modal container so the modal can be closed
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => { //adds an event listener to the modal so it can be closed using the esc key
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) => { //closes the modal on click
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    // search for a pokemon
    const searchbar = document.querySelector("#search-bar");
    searchbar.addEventListener("input", function () {
        pokemonRepository.filterSearch(searchbar);
    });

    //filter search to find pokemon
    function filterSearch(searchbar) {
        const filterValue = searchbar.value.toLowerCase();

        // filter the pokemonList array based on the filterValue
        const filteredPokemon = pokemonList.filter(function (pokemon) {
            return pokemon.name.toLowerCase().indexOf(filterValue) > -1;
        });

        // update the displayed list of Pokemon based on the filtered results
        const pokemonListElement = document.querySelector(".pokemon-list");
        pokemonListElement.innerHTML = "";
        filteredPokemon.forEach(function (pokemon) {
            pokemonRepository.addListItem(pokemon);
        });
    }

    // let searchForm = document.querySelector('#search-form');

    // searchForm.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     let searchBox = document.querySelector('#search-box');
    //     let searchTerm = searchBox.value;
    //     pokemonList=pokemonList.filter(
    //         (pokemon) => {

    //         }
    //     )
    // });

    return { //returns the data of the functions// why is this necessary again?
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        loadTypesList: loadTypesList,
        loadPokemonTypes: loadPokemonTypes,
        loadAbilityList: loadAbilityList,
        loadPokemonAbility: loadPokemonAbility,
        loadGenerationList: loadGenerationList,
        loadPokemonGeneration: loadPokemonGeneration,
        filterSearch: filterSearch,

    };

})();
