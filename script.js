// Al pasar el mouse por una tecnología del stack, resalta los proyectos que la usan y
// opaca el resto. Un click (o tap en el celular) la deja fija hasta el próximo click.
const buttons = document.querySelectorAll('.tags button');
const items = document.querySelectorAll('.item');
let pinned = null;

function uses(item, tech) {
    return [...item.querySelectorAll('.stack span')].some(s => s.textContent === tech);
}

function highlight(tech) {
    items.forEach(item => item.classList.toggle('dim', tech !== null && !uses(item, tech)));
    document.querySelectorAll('.tags button, .item .stack span').forEach(el => {
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

// El botón del encabezado alterna entre claro y oscuro y recuerda la elección.
// Sin elección guardada, la página sigue el modo del sistema.
document.querySelector('.theme').addEventListener('click', () => {
    const root = document.documentElement;
    const systemDark = matchMedia('(prefers-color-scheme: dark)').matches;
    const current = root.dataset.theme || (systemDark ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
});

// Los proyectos arrancan plegados, mostrando solo lo principal. Se pliegan desde acá
// y no en el HTML para que, sin JavaScript, se vea todo.
document.querySelectorAll('.more button').forEach(button => {
    const item = button.closest('.item');
    item.classList.add('collapsed');
    button.addEventListener('click', () => {
        const collapsed = item.classList.toggle('collapsed');
        button.textContent = collapsed ? button.dataset.more : 'Show less';
    });
});
