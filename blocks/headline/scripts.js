const init = (element) => {
    const header = document.querySelector('.headline');

    const container = element.querySelector(':scope > div');
    container.classList.add('container');
};

export default init;
