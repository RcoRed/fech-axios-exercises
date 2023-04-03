"use strict";   //modalità di controllo del codice

let searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", event => {
    this.loadData();
})

let result = document.createElement("div");
searchBtn.after(result);
function loadData(){
    let input = document.querySelector("#input").value;

    fetch(`https://swapi.dev/api/people?search=${input}`)
    .then((response) => {
        if(!response.ok) throw new Error("Fetch request failed!");
        return response.json();
    })
    .then((data) => {
        result.innerHTML = `<p>I personaggi che contengono ${input} nel nome sono ${data.count}</p>`;
        for(let p of data.results){
            if(p.species.length == 0){
                let pData = document.createElement("p");
                pData.innerHTML = `Nome: ${p.name}, Razza: Non Specificata`;
                result.after(pData);
            }
            else{
                fetch(`${p.species[0]}`)
                .then((response) => {
                    if(!response.ok) throw new Error("Fetch request of species name failed");
                    return response.json();
                })
                .then((data) => {
                    let pData = document.createElement("p");
                    pData.innerHTML = `Nome: ${p.name}, Razza: ${data.name}`;
                    result.after(pData);
                });
            }
        }
    });

}
