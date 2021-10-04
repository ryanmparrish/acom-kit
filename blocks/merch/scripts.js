import { defaultHTML } from './defaultHTML.js';

const init = (element) => {
    const isDefault = element.classList.contains('default');
    if (isDefault) {
        element.innerHTML = defaultHTML;
    } else {

        // create the merch block container div
        const wrapper = element.querySelector(':scope > div:first-of-type');
        if(wrapper)
            wrapper.classList.add('wrapper');

        const ribbon = element.querySelector(':scope > div:first-of-type > div');
        if(ribbon) {
            ribbon.classList.add('ribbon');
            const bgImg = ribbon.querySelector(':scope img');
            if (!bgImg) {
                const bgColor = ribbon.textContent;
                ribbon.style = `background: ${bgColor}`;
                ribbon.innerHTML = '';
            }
        }

        const title = element.querySelector(':scope > div:nth-of-type(2)');
        title.classList.add('title');

        const rowIds = element.querySelectorAll(':scope > div:nth-of-type(3) > div');
        // create the blocks container div
        const container = document.createElement('div');
        container.classList.add('container', 'blocks');

        rowIds.forEach(function (id, i) {
            id.remove();
            let assocIdContent = document.getElementsByClassName(id.textContent)[0];
            if(assocIdContent && wrapper) {
                let rowClassList = (i % 2 == 0) ? 'even' : 'odd';
                assocIdContent.classList.add('block', rowClassList);
                container.append(assocIdContent);
            }
        });
        wrapper.append(container);
        title.after(container);

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

        // prods.forEach(function (prod, index) {
        //
        //     prod.classList.add('product-wrapper');
        //     // RP: some code duplication from product/scripts.js
        //     let nodeZeroHasImg = prod.childNodes[0].querySelector(':scope img') ? true : false;
        //     if(nodeZeroHasImg) {
        //         prod.childNodes['0'].classList.add('inline-icon');
        //         prod.childNodes['1'].classList.add('inline-label');
        //         prod.childNodes['2'].classList.add('price');
        //         prod.childNodes['3'].classList.add('desc');
        //         prod.childNodes['4'].classList.add('cta');
        //         const ctaLinks = prod.childNodes['4'].querySelectorAll( ':scope a');
        //         if (ctaLinks) {
        //             decorateButtons(ctaLinks);
        //         }
        //         if(prod.childNodes['5']){
        //             prod.childNodes['5'].classList.add('badge');
        //             prod.classList.add('has-badge');
        //         }
        //     }else{
        //         prod.childNodes['0'].classList.add('label');
        //         prod.childNodes['1'].classList.add('price');
        //         prod.childNodes['2'].classList.add('desc');
        //         prod.childNodes['3'].classList.add('cta');
        //         const ctaLinks = prod.childNodes['3'].querySelectorAll( ':scope a');
        //         if (ctaLinks) {
        //             decorateButtons(ctaLinks);
        //         }
        //         if(prod.childNodes['4']){
        //             prod.childNodes['4'].classList.add('badge');
        //             prod.classList.add('has-badge');
        //         }
        //     }
        //     dv.appendChild(prod);
        // });
        // append the container div after title

        const footer = element.querySelector(':scope > div:last-of-type');
        footer.classList.add('container', 'footer');
    }
};

export default init;
