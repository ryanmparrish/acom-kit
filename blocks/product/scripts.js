const decorateButtons = function(ctaLinks) {
    const singleLink = ctaLinks.length == 1;
    ctaLinks.forEach(function (link, i) {
        if (singleLink)
            link.classList.add('button');
        else
        if ( i === ctaLinks.length-1 )
            link.classList.add('button');
        else
            link.classList.add('button', 'button--secondary');
    });
}

// returns the a parsed string into array, expects:' --'
// ex. Best Deal --dark
const getLabelClass = function(elm) {
    const index = elm.textContent.lastIndexOf(' --');
    const ctaInitStyle = elm.textContent.slice(index);
    const ctaUpdatedText = elm.textContent.replace(`${ctaInitStyle}`, '');
    const ctaStyle = ctaInitStyle.replace(' --', '');
    return [ctaUpdatedText, ctaStyle];
}

const init = (element) => {
    const icon = element.querySelector(':scope > div:nth-of-type(1)');
    const label = element.querySelector(':scope > div:nth-child(2)');
    let iconHasImg = icon.querySelector(':scope img') ? true : false;
    if(iconHasImg) {
        icon.classList.add('inline-icon');
        label.classList.add('inline-label');
    } else {
        icon.classList.add('icon');
        label.classList.add('label');
    }
    const price = element.querySelector(':scope > div:nth-child(3)');
    price.classList.add('price');
    const desc = element.querySelector(':scope > div:nth-child(4)');
    desc.classList.add('desc');
    const cta = element.querySelector(':scope > div:nth-child(5)');
    cta.classList.add('cta');
    const ctaWrap = cta.querySelector(':scope > div');
    ctaWrap.classList.add('cta-wrap');
    const ctaLinks = cta.querySelectorAll( ':scope a');
    if (ctaLinks.length)
        decorateButtons(ctaLinks);
    const badge = element.querySelector(':scope > div:nth-child(6)');
    if(badge.textContent) {
        badge.classList.add('badge');
        element.classList.add('has-badge');
        const ctaStyleCheck = badge.textContent.includes(' --');
        if(ctaStyleCheck) {
            let labelClass = getLabelClass(badge);
            badge.innerHTML = labelClass[0];
            badge.classList.add(labelClass[1]);
            element.classList.add(labelClass[1]);
        }
    }
};

export default init;
