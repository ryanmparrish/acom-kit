const init = (element) => {
    // create the tabs list container div
    const container = element.querySelector(':scope > div:first-of-type');
    container.classList.add('m-container');
    const image = container.querySelector(':scope > div:first-of-type');
    const text = container.querySelector(':scope > div:last-of-type');
    image.classList.add('image');
    text.classList.add('text');
    const ctaType = element.classList.contains('dark') ? 'cta dark' : 'cta';
    const cta = text.querySelectorAll('a');
    let i;
    for (i = 0; i < cta.length; i++) {
        console.log(cta[i])
        cta[i].classList.add(ctaType);
    }

    const content = document.createElement('div');
    content.classList.add('m-content');
    content.append(image);
    content.append(text);
    container.appendChild(content);
};

export default init;
