'use strict';
window.onload = function () {
    if (JSON.parse(localStorage.getItem('userdata')) == null) {
        window.location.href = 'registration.html'
    } else { document.getElementById("username_header").textContent = JSON.parse(localStorage.getItem('userdata'))['username'] }
};
//показ покемонов из хранилища
document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('htmlinner') !== null) {
    const htmlarr = JSON.parse(localStorage.getItem('htmlinner'));
    let str = htmlarr.join('');
    tableAppendChild.innerHTML = str;
    }
    })
//добавление покемонов
const btn = document.querySelector('.button');
const pokemonUser = document.getElementById('pokemonName');
const tableAppendChild = document.getElementById('tableAppendChild');
let pokemonMassive = [];
let htmlinner = [];
btn.addEventListener('click', function () {
    const pokemon = pokemonUser.value.toLowerCase();
    if (!pokemonUser.value) {
        alert('Поле пустое')
        return
    } else {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then((response) => response.json())
            .then((data) => {
                //сохранение в хранилище покемонов с данными
                const pokemonUserSave = {pokemonName: pokemon, height: data.height, weight: data.weight, ability:
                data.abilities[0].ability.name, photo: data.sprites.front_default};
                pokemonMassive.push(pokemonUserSave);
                localStorage.setItem('pokemonUserSave', JSON.stringify(pokemonMassive));
                //вывод строки
                const createElTr = document.createElement('tr');
                createElTr.classList.add('grey_tr');
                tableAppendChild.appendChild(createElTr);
                //имя покемона
                const createTdName = document.createElement('td');
                const createTdNameText = document.createTextNode(`${pokemon}`);
                createTdName.appendChild(createTdNameText);
                createElTr.appendChild(createTdName);
                //рост покемона
                const createTdHeight = document.createElement('td');
                const createTdHeightText = document.createTextNode(`${data.height}`);
                createTdHeight.appendChild(createTdHeightText);
                createElTr.appendChild(createTdHeight);
                //вес покемона
                const createTdWeight = document.createElement('td');
                const createTdWeightText = document.createTextNode(`${data.weight}`);
                createTdWeight.appendChild(createTdWeightText);
                createElTr.appendChild(createTdWeight);
                //способность покемона
                const createTdAb = document.createElement('td');
                const createTdAbText = document.createTextNode(`${data.abilities[0].ability.name}`);
                createTdAb.appendChild(createTdAbText);
                createElTr.appendChild(createTdAb);
                //картинка покемона
                const createTdPic = document.createElement('td');
                const createPic = document.createElement('img');
                createPic.src = `${data.sprites.front_default}`;
                createTdPic.appendChild(createPic);
                createTdPic.classList.add('pokemon_pic');
                createElTr.appendChild(createTdPic);
                //сохранение кода в хранилище
                htmlinner = [];
                localStorage.removeItem('htmlinner');
                htmlinner.push(tableAppendChild.innerHTML);
                localStorage.setItem('htmlinner', JSON.stringify(htmlinner));
                })
            .catch((err) => {
                alert('Покемон не найден или неправильно набрано имя');
                console.log(err);
            })
    }
    pokemonUser.value = '';
})
function clearStorage() {
    if (localStorage.getItem('userdata') !== null) {
        localStorage.removeItem('userdata');
        localStorage.removeItem(`pokemonUserSave`);
        localStorage.removeItem(`htmlinner`);
        location.href = location.href;
    }
}
document
    .getElementById("exit_button")
    .addEventListener("click", () => clearStorage());