
// Merch Block

const init = (element) => {
    const ribbon = element.querySelector(':scope > div:first-of-type > div');
    ribbon.classList.add('ribbon');
    const bgImg = ribbon.querySelector(':scope img');
    if (!bgImg) {
        const bgColor = ribbon.textContent;
        ribbon.style = `background: ${bgColor}`;
        ribbon.innerHTML = '';
        element.style.background = "#000000";
    }
    const title = element.querySelector(':scope > div:nth-of-type(2)');
    title.classList.add('title');

    // create the products container div
    const dv = document.createElement('div');
    dv.classList.add('container', 'products');
    const prods = element.querySelectorAll(':scope > div:nth-of-type(3) > div');
    prods.forEach(function (prod, index) {
        prod.classList.add('product-wrapper');
        dv.appendChild(prod);
    });
    // append the container div after title
    title.after(dv);

    const footer = element.querySelector(':scope > div:last-of-type');
    footer.classList.add('container', 'footer');

};

export default init;
