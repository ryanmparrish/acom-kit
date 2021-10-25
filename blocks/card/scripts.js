// import iconBook = './icons/bookmark.js';


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

const getType = function(e) {
    console.log("getType", {e});
    let cls = e.classList;
    switch( true ){
        case cls.contains('card-event'):
            return 'event';
            break;
        case cls.contains('card-lesson'):
            return 'lesson';
            break;
    }
}

const getProgressBar = () => {
    let pb = `<div class="progress"><div class="progress-grey" style="height:24px;width:20%"></div></div>`;
    return pb;
}

const prependEl = (type, el) => {
    // const date = el.innerHTML;
   if(type === 'bookmark') {
        const btn = document.createElement('button');
        btn.classList.add('card-bookmark')
        const iconBookmark = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 23"><path fill="#fff" class="bg" d="M.72.73v21l7.35-6.05 7.19 6.05v-21z"/><path fill="#747474" d="M14.4 1.36V20l-5.22-4.46-1.13-.95-1.13.95L1.6 20V1.36zM15.2 0H.81A.75.75 0 0 0 0 .68v22c0 .2.08.3.21.3a.41.41 0 0 0 .26-.11l7.58-6.37 7.5 6.35a.41.41 0 0 0 .25.11c.12 0 .2-.1.2-.29v-22a.75.75 0 0 0-.8-.67z"/></svg>';
        btn.setAttribute('title', 'save bookmark')
        btn.insertAdjacentHTML('beforeend', iconBookmark);
        el.prepend(btn);
    }
    if(type === 'progress') {

        const label = el.querySelector(':scope > div > p:nth-child(1)');
        const value = el.querySelector(':scope > div > p:nth-child(2)');
        let substrings = value.textContent.split('/');
        let percent = (substrings[0] / substrings[1] * 100);
        console.log('substrings', substrings, percent);
        const d = document.createElement('div');
        const mm = `<div class="progress-title"><span>${label.textContent}</span><span>${value.textContent}</span></div><div class="progress"><div class="progress-blue" style="height:4px;width:${percent}%"></div></div>`;
        d.insertAdjacentHTML('beforeend', mm);
        label.remove(); value.remove();
        el.prepend(d);
    }
}
const init = (element) => {

    const head = element.querySelector(':scope > div:nth-child(1)');
    const body = element.querySelector(':scope > div:nth-child(2)');
    const content = body.querySelector(':scope > div:nth-child(1)');
    const data = element.querySelector(':scope > div:nth-child(3)');
    const cta = element.querySelector(':scope > div:nth-child(4)');
    const banner = element.querySelector(':scope > div:nth-child(5)');
    const bannerTxt = banner.textContent;
    const cardType = getType(element);
    if(head)
        head.classList.add('card-head');
    if(body)
        body.classList.add('card-body');
    if(content)
        content.classList.add('card-content');
    if(data) {
        data.classList.add('card-data');
        if(cardType == 'event') {
            element.classList.add('card--event');
            prependEl('bookmark', data);
        }
        if(cardType == 'lesson') {
            element.classList.add('card--lesson');
            prependEl('progress', data);
        }
    }
    if(cta)
        cta.classList.add('card-cta');
    if(data && cta) {
        const foot = document.createElement('div');
        foot.classList.add('card-foot');
        foot.appendChild(data);
        foot.appendChild(cta);
        body.appendChild(foot);
    }
    if(banner && bannerTxt) {
        banner.classList.add('card-banner', 'card-banner--'+bannerTxt.toLowerCase());
        head.appendChild(banner);
    }

    const headBG = head.querySelector(':scope > div');
    headBG.classList.add('card-head-bg');
    const bgImg = headBG.querySelector(':scope img');
    if (!bgImg) {
        headBG.style.display = 'none';
        const bgColor = headBG.textContent;
        head.style.background = bgColor;
    }else{
        bgImg.classList.add('card-image')
    }

    const ctas = cta.querySelectorAll(':scope a');
    if (ctas) {
        [...ctas].forEach((cta) => {
            // console.log("spread forEach worked");
            cta.addEventListener('click', () => {
                // console.log("spread forEach worked");
            });
            const ctaStyleCheck = cta.textContent.includes(' --');
            if(ctaStyleCheck) {
                let labelClass = getLabelClass(cta);
                cta.innerHTML = labelClass[0];
                cta.classList.add(labelClass[1]);
            }

        });

    }

};

export default init;
