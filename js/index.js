//Todas las api son distintas y debes leer la documentacion.



document.addEventListener('DOMContentLoaded', () => {
    const random = getRandomInt(1, 151);
    fetchData(random);
})

//Numero aleatorio excluye el ultimo OJO
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}
//Obtengo los pokemons
const fetchData = async (id) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();

        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            nombre: data.name,
            hp: data.stats[0].base_stat,
            experiencia: data.base_experience,
            ataque: data.stats[1].base_stat
        }

        pintaCard(pokemon); //Se pinta con la info que se consume!!!!!
    } catch (error) {
        console.log(error)
    }
}

const pintaCard = (pokemon) => {
    console.log(pokemon);
    //Elementos principales para manipular la plantilla.
    const flex = document.querySelector('.flex');
    const template = document.getElementById('template-Card').content //Nunca olvidar el content
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();
    //Elemenos a cambiar.....
    clone.querySelector('.Card-body-img').setAttribute("src", pokemon.img); //El elemento a manipular y la propiedad que se va a cambiar.
    clone.querySelector('.Card-body-title').innerHTML = `${pokemon.nombre} <span>${pokemon.hp} hp</span>`
    clone.querySelector('.Card-body-text').innerHTML = `${pokemon.experiencia}` + " Exp"
    clone.querySelectorAll('.Card-footer-social h3')[0].textContent = pokemon.ataque
    fragment.appendChild(clone); //Guarde en el fragment nuestro clon
    flex.appendChild(fragment); //Mando el fragment al main(class="flex")
}


