let isLog = false;

const getAllPokemons = async () => {
    try {
        let response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=150&offset=0");

        for (let pokemon of response.data.results) {
            getSinglePokemon(pokemon.url);
        }
    }
    catch (err) { }
}

const getSinglePokemon = async (url) => {
    try {
        let { data } = await axios.get(url);
        let typeArr = [];
        if (!isLog) {
            isLog = true;
        }
        for (let type of data.types) {
            typeArr = [...typeArr, type.type.name]
        }
        setCard(data.name, data.sprites.other.home.front_default, typeArr);
    }
    catch (err) { }
}

const setCard = (name, img, typeArr) => {
    let container = document.querySelector(".container");
    let cardElm = document.createElement("div");
    if (typeArr.length < 2) {
        cardElm.innerHTML = `
        <div class="card">
            <div class="card-front">
                <h3>${name}</h3>
                <div><img src="${img}" /></div>
            </div>
            <div class="card-back">
                <div>${typeArr[0]}</div>
                <p>base stats</p>
                <ul>
                    <li>HP:</li>
                    <li>ATK:</li>
                    <li>DEF:</li>
                    <li>STAK:</li>
                    <li>SDEF:</li>
                    <li>SPD:</li>
                </ul>
            </div>
        </div>`
    }
    else {
        cardElm.innerHTML = `
        <div class="card">
            <div class="card-front">
                <h3>${name}</h3>
                <div><img src="${img}" /></div>
            </div>
            <div class="card-back">
                <div>${typeArr[0]}</div>
                <div>${typeArr[1]}</div>
                <p>base stats</p>
                <ul>
                    <li>HP:</li>
                    <li>ATK:</li>
                    <li>DEF:</li>
                    <li>STAK:</li>
                    <li>SDEF:</li>
                    <li>SPD:</li>
                </ul>
            </div>
        </div>`
    }

    if (container) {
        container.appendChild(cardElm);
    }
}

const createCardElm = (name, img, typeArr) => {
    let divCardElm = document.createElement("div");
    let divFrontElm = document.createElement("div");
    let divBackElm = document.createElement("div");
    let h3Elm = document.createElement("h3");
    let imgElm = document.createElement("img");
    let divTypeElm1 = document.createElement("div");
    let divTypeElm2 = document.createElement("div");
    cardElm.classList.add("card");

}

window.addEventListener("load", () => {
    getAllPokemons();
})