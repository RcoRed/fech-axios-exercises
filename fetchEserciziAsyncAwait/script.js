"use strict";   //modalità di controllo del codice

//let counter = 0;
const starships = [];
const saveAllShips = ({data}) => {
    for(let ship of data.results){
        starships.push(ship);
    }
    return data.next;
};

const divedeShipByManufacterer2 = function(){
    const groupedShips = new Map();
    let control = [];
    for(let ship of starships){
        if(!groupedShips.has(ship.manufacturer)){
            for(let s of starships){
                if(s.manufacturer==ship.manufacturer){
                    control.push(s);
                }
            }
            groupedShips.set(ship.manufacturer,control);
            control = [];
        }
    }
    return groupedShips;
}
const divedeShipByManufacterer = function(){
    const groupedShips = new Map();
    for(let ship of starships){
        if(!groupedShips.has(ship.manufacturer)){
            groupedShips.set(ship.manufacturer,[ship]);
        }else{
            groupedShips.get(ship.manufacturer).push(ship);
        }
    }
    return groupedShips;
}

const printGroupedStarship = (groupedShips) => {
    let fieldsetPadre = document.querySelector("#primoEs");
    for(let manufac of groupedShips){
        let fieldset = document.createElement("fieldset");
        let legend = document.createElement("legend");
        legend.innerHTML = manufac[0];
        fieldset.appendChild(legend);
        for(let ship of manufac[1]){
            let p = document.createElement("p");
            p.innerHTML = `Name: ${ship.name} | Model: ${ship.model}`;
            fieldset.appendChild(p);
        }
        fieldsetPadre.appendChild(fieldset);
    }
}

const eseguiGrupingBymanufacturer2 = async () => {
    try{
        let response = await axios.get("https://swapi.dev/api/starships/");
        let url = saveAllShips(response);
        response = await axios.get(url);
        url = saveAllShips(response);
        response = await axios.get(url);
        url = saveAllShips(response);
        response = await axios.get(url);
        url = saveAllShips(response);
        let map = divedeShipByManufacterer();
        printGroupedStarship(map);
    }catch (err){
        console.log("SOMETHING WENT WRONG WITH FETCH!");
        console.log(err);
    }
}

const eseguiGrupingBymanufacturer = async () => {
    try{
        let address = "https://swapi.dev/api/starships/";
        do{
            let response = await axios.get(address);
            address = saveAllShips(response);
        }while(address);
        let map = divedeShipByManufacterer();
        printGroupedStarship(map);
    }catch (err){
        console.log("SOMETHING WENT WRONG WITH FETCH!");
        console.log(err);
    }
}
//controllare le treeMap
eseguiGrupingBymanufacturer();      //primo esercizio
//fine primo esercizio
/*
const viablePlanets = [];
const SavePlanets2Films = (data) => {
    for(let planet of data.results){
        if(planet.films.length >= 2){
            viablePlanets.push(planet);
        }
    }
    return data.next;
}

let map = new Map();
const SaveResidents = (next) => {
    for(let planet of viablePlanets){
        console.log(planet);
        let control = [];
        for(let resident of planet.residents){
            fetch(resident)
            .then((response) => {
                if(!response.ok) throw new Error("Fetch request failed!");
                return response.json();
            })
            .then((data) => {
                if(data.species.length == 0){
                    control.push(`Nome: ${data.name} Razza: Non Specificata`);
                }else{
                    fetch(`${data.species[0]}`)
                    .then((response) => {
                        if(!response.ok) throw new Error("Fetch request of species name failed");
                        return response.json();
                    })
                    .then((data2) => {
                        control.push(`Nome: ${data.name} Razza: ${data2.name}`);
                    });
                }
            })
            .catch((err) => {
                console.log('SOMETHING WENT WRONG WITH FETCH!');
                console.log(err);
            });
        }
        map.set(planet.name,control);
    }
    console.log(map);
    return next;
}


fetchStarchips("https://swapi.dev/api/planets/")
.then(checkStatusAndParse)
.then(SavePlanets2Films)
.then(SaveResidents)
.then(fetchStarchips)
.then(checkStatusAndParse)
.then(SavePlanets2Films)
.then(SaveResidents)
.then(fetchStarchips)
.then(checkStatusAndParse)
.then(SavePlanets2Films)
.then(SaveResidents)
.then(fetchStarchips)
.then(checkStatusAndParse)
.then(SavePlanets2Films)
.then(SaveResidents)
.then(fetchStarchips)
.then(checkStatusAndParse)
.then(SavePlanets2Films)
.then(SaveResidents)
.then(fetchStarchips)
.then(checkStatusAndParse)
.then(SavePlanets2Films)
.then(SaveResidents)
.catch((err) => {
    console.log('SOMETHING WENT WRONG WITH FETCH!');
    console.log(err);
});
*/


/*Esercizio:
Creare una fetch che mostri:
1. Nome e modello di tutte le navi di Star Wars raggruppate per manufacturer
2. Tutti i pianeti, con nome e qualcos'altro, che sono apparsi in almeno due film, con il titolo
    dei film in cui sono apparsi e nome e razza dei residenti di quel pianeta
    2a. Tutti i personaggi per cui quel pianeta è designato come "homeworld" (nome, razza)
*/