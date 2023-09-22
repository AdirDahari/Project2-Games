let lastElm;

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
        let statsArr = [];

        for (let type of data.types) {
            typeArr = [...typeArr, type.type.name];
        }
        for (let stat of data.stats) {
            statsArr = [...statsArr, stat.base_stat];
        }
        setCard(data.name, data.sprites.other.home.front_default, typeArr, statsArr);
    }
    catch (err) { }
}

const setCard = (name, img, typeArr, statsArr) => {
    let container = document.querySelector(".container");
    let cardElm = document.createElement("div");
    if (typeArr.length < 2) {
        cardElm.innerHTML = `
        <div class="card">
            <div class="card-front">
                <h3>${name}</h3>
                <img src="${img}" />
            </div>
            <div class="card-back">
            <h3>${name}</h3>
                <div class="card-type">
                <div style="background-color:${setColor(typeArr[0])}">${typeArr[0]}</div>
                </div>
                <div class="card-stats">
                <p>base stats</p>
                <ul>
                    <li>HP: ${statsArr[0]}</li>
                    <li>ATK: ${statsArr[1]}</li>
                    <li>DEF: ${statsArr[2]}</li>
                    <li>STAK: ${statsArr[3]}</li>
                    <li>SDEF: ${statsArr[4]}</li>
                    <li>SPD: ${statsArr[5]}</li>
                </ul>
                </div>
            </div>
        </div>`
    }
    else {
        cardElm.innerHTML = `
        <div class="card">
            <div class="card-front">
                <h3>${name}</h3>
                <img src="${img}" />
            </div>
            <div class="card-back">
            <h3>${name}</h3>
            <div class="card-type">
                <div style="background-color:${setColor(typeArr[0])}">${typeArr[0]}</div>
                <div style="background-color:${setColor(typeArr[1])}">${typeArr[1]}</div>
                </div>
                <div class="card-stats">
                <p>base stats</p>
                <ul>
                    <li>HP: ${statsArr[0]}</li>
                    <li>ATK: ${statsArr[1]}</li>
                    <li>DEF: ${statsArr[2]}</li>
                    <li>STAK: ${statsArr[3]}</li>
                    <li>SDEF: ${statsArr[4]}</li>
                    <li>SPD: ${statsArr[5]}</li>
                </ul>
                </div>
            </div>
        </div>`
    }
    if (container) {
        container.appendChild(cardElm);
    }
    cardElm.firstElementChild.addEventListener("click", () => {
        rotateCard(cardElm.firstElementChild);
    })
}

const setColor = (name) => {
    switch (name) {
        case "grass":
            return "#b5e7a0";
        case "poison":
            return "#405d27";
        case "fire":
            return "#f7786b";
        case "flying":
            return "#d5f4e6";
        case "water":
            return "#80ced6";
        case "bug":
            return "#d9ecd0";
        case "normal":
            return "#deeaee";
        case "electric":
            return "#ffef96";
        case "ground":
            return "#8b6f47";
        case "fairy":
            return "#f9d5e5";
        case "fighting":
            return "#c1502e";
        case "psychic":
            return "#563f46";
        case "rock":
            return "#625750";
        case "steel":
            return "#9fa9a3";
        case "ice":
            return "#b7d7e8";
        case "dragon":
            return "#c83349";
        case "ghost":
            return "#d6d4e0";
    }
}

const rotateCard = (elm) => {
    if (!lastElm) {
        elm.style.transform = "rotateY(180deg)";
        lastElm = elm;
    }
    else if (lastElm && lastElm !== elm) {
        lastElm.style.transform = "rotateY(0deg)";
        elm.style.transform = "rotateY(180deg)";
        lastElm = elm;
    } else if (lastElm === elm) {
        elm.style.transform = "rotateY(0deg)";
        lastElm = null;
    }
}

window.addEventListener("load", () => {
    getAllPokemons();
})