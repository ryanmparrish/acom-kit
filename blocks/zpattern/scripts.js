const init = (element) => {
    // create the tabs list container div
    const container = element.querySelector(':scope > div:first-of-type');
    container.classList.add('container');
    const rowIds = element.querySelectorAll(':scope > div:first-of-type > div');
    // create the products container div
    const dv = document.createElement('div');
    dv.classList.add('river-flow');

    rowIds.forEach(function (id, i) {
        id.remove();
        let assocIdContent = document.getElementsByClassName(id.textContent)[0];
        if(assocIdContent && container) {
            let toggleClass = (i % 2 == 0) ? 'even' : 'odd';
            assocIdContent.classList.add('flow-content', toggleClass);
            dv.append(assocIdContent);
        }
       console.log('row', id.textContent);
    });

    container.append(dv);

    // const bg = element.querySelector(':scope > div:first-of-type > div');
    // bg.classList.add('background');
    // const bgImg = bg.querySelector(':scope img');
    // if (!bgImg) {
    //     bg.style.display = 'none';
    //     const bgColor = bg.textContent;
    //     element.style.background = bgColor;
    // }
    // const content = element.querySelector(':scope > div:last-of-type');
    // content.classList.add('container');
    // content.querySelector(':scope > div:first-of-type').classList.add('text');
    // content.querySelector(':scope > div:last-of-type').classList.add('image');
    //
    // const cta = content.querySelector(':scope > div:first-of-type a');
    // const ctaType = element.classList.contains('dark') ? 'over-background' : 'cta';
    // cta.classList.add('button', ctaType);
};

export default init;
