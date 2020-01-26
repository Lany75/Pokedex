
fetch('https://pokeapi.co/api/v2/pokemon/')
.then(function(reponse) {
    return reponse.json();
})
.then (function(data) {
    for (let i=0; i<data.results.length; i++)
    {
        listePokemon(data.results[i]);  
    }
    return data.results;
})
.then(function(data) {
    let searchButton = document.getElementById('search');
    searchButton.addEventListener('click', () => recherchePokemon(data));
})

function recherchePokemon(data) {
    let input = document.getElementById('input');
    let divsName = document.getElementsByClassName('name');
    let existe = false;

    for (let i=0; i<divsName.length; i++) {
        if (divsName[i].textContent === input.value) {
            existe = true;
        }
    }
    if (existe === false) {
        alert('ce pokemon n\'est pas dans la liste');
        return;
    }

    for (let i=0; i<divsName.length; i++) {
        divsName[i].classList.remove('nameActive');
        if(divsName[i].textContent === input.value) {
            divsName[i].classList.add('nameActive');
        }
    }

    if (input.value === '') {
        alert('ce pokemon n\'est pas dans la liste');
    } else {
        for (let i=0; i<data.length; i++) {
            if (data[i].name === input.value) {
                afficheName(data[i].name);
                afficheImage(data[i].url);
                afficheType(data[i].url);
            }
        }
    }
    input.value = '';
}

function listePokemon (data) {
    let listePoke = document.getElementById('listePokemon');

    let divName = document.createElement('div');
    divName.setAttribute('class', 'name');
    divName.textContent = data.name;

    listePoke.appendChild(divName);

    divName.addEventListener('click', () => {
        afficheName(data.name);
        afficheImage(data.url);
        afficheType(data.url);

        let divsName = document.getElementsByClassName('name');

        for(let i=0; i<divsName.length; i++) {
            divsName[i].classList.remove('nameActive');
        }

        divName.classList.add('nameActive');
    });
}

function afficheName (name) {
    let pokeName = document.getElementById('pokeName');
    pokeName.textContent = name;

    pokeName.classList.add('nameActive');
}

function afficheImage(url) {
    fetch (url)
    .then(function(reponse) {
        return reponse.json();
    })
    .then (function(data) {
        creationImagePokemon(data.sprites);
    })
}

function creationImagePokemon(urlsImage) {
    let imagePoke = document.getElementById('image');
    let label = document.getElementById('labelImg');
    
    while(imagePoke.firstChild) {
        imagePoke.removeChild(imagePoke.firstChild);
    }

    let img = document.createElement('img');
    img.setAttribute('src', urlsImage.front_default);
    img.setAttribute('width', '100%');

    imagePoke.appendChild(img);
}

function afficheType(url) {
    fetch (url)
    .then(function(reponse) {
        return reponse.json();
    })
    .then (function(data) {
        creationTypePokemon(data.types);
    })
}

function creationTypePokemon(tabTypes) {
    let typePoke = document.getElementById('types');
    let label = document.getElementById('labelTyp');
    label.style.display = 'block';
    
    while(typePoke.firstChild) {
        typePoke.removeChild(typePoke.firstChild);
    }

    for (let i=0; i<tabTypes.length;i++) {
        let type = document.createElement('div');
        type.setAttribute('class', 'type');
        type.textContent = tabTypes[i].type.name;

        let typeColor;
        switch(tabTypes[i].type.name) {
            case 'normal':
                typeColor = 'white';
                break;
            case 'poison':
                typeColor = 'violet';
                break;
            case 'grass':
                typeColor = 'green';
                break;
            case 'fire':
                typeColor = 'orange';
                break;
            case 'flying':
                typeColor = 'grey';
                break;
            case 'water':
                typeColor = 'blue';
                break; 
            case 'bug':
                typeColor = 'greenyellow';
                break;
            default:
                typeColor = 'white';
        }

        type.style.backgroundColor = typeColor;
        typePoke.appendChild(type);
    }
}