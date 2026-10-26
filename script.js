// Al pasar el mouse por una tecnología del stack, resalta las cards de los proyectos
// que la usan y opaca el resto. Un click (o tap en el celular) la deja fija hasta el
// próximo click. Las tecnologías de cada card salen de las etiquetas de su proyecto.
const buttons = document.querySelectorAll('.tags button');
const cards = document.querySelectorAll('.card');
let pinned = null;

function uses(card, tech) {
    const item = document.querySelector(card.getAttribute('href'));
    return [...item.querySelectorAll('.stack span')].some(s => s.textContent === tech);
}

// Cada card muestra las mismas etiquetas que su proyecto, copiadas de abajo
cards.forEach(card => {
    const stack = document.querySelector(card.getAttribute('href') + ' .stack');
    card.querySelector('.meta').before(stack.cloneNode(true));
});

function highlight(tech) {
    cards.forEach(card => card.classList.toggle('dim', tech !== null && !uses(card, tech)));
    document.querySelectorAll('.tags button, .card .stack span').forEach(el => {
        el.classList.toggle('on', el.textContent === tech);
    });
}

buttons.forEach(button => {
    const tech = button.textContent;
    button.addEventListener('mouseenter', () => highlight(tech));
    button.addEventListener('mouseleave', () => highlight(pinned));
    button.addEventListener('click', () => {
        pinned = pinned === tech ? null : tech;
        highlight(pinned);
    });
});
