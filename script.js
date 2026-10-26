// Al pasar el mouse por una tecnología del stack, resalta los proyectos que la usan
// y opaca el resto. Un click (o tap en el celular) la deja fija hasta el próximo click.
const buttons = document.querySelectorAll('.tags button');
const items = document.querySelectorAll('.item');
let pinned = null;

function highlight(tech) {
    items.forEach(item => {
        const uses = [...item.querySelectorAll('.stack span')].some(s => s.textContent === tech);
        item.classList.toggle('dim', tech !== null && !uses);
    });
    document.querySelectorAll('.stack span, .tags button').forEach(el => {
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
