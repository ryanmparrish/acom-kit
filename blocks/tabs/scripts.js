// Tabs JS
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Tab_Role

function initTabs() {
    const tabs = document.querySelectorAll('[role="tab"]');
    const tabLists = document.querySelectorAll('[role="tablist"]');

    tabLists.forEach( tabList => {

        let lastKnownScrollPosition = 0;
        let ticking = false;
        tabList.addEventListener('scroll', function(e) {
            lastKnownScrollPosition = tabList.scrollLeft;
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    doSomething(lastKnownScrollPosition, tabList.scrollWidth, tabList.offsetWidth);
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Enable arrow navigation between tabs in the tab list
        let tabFocus = 0;

        tabList.addEventListener("keydown", e => {
            // Move right
            if (e.keyCode === 39 || e.keyCode === 37) {
                tabs[tabFocus].setAttribute("tabindex", -1);
                if (e.keyCode === 39) {
                    tabFocus++;
                    // If we're at the end, go to the start
                    if (tabFocus >= tabs.length) {
                        tabFocus = 0;
                    }
                    // Move left
                } else if (e.keyCode === 37) {
                    tabFocus--;
                    // If we're at the start, move to the end
                    if (tabFocus < 0) {
                        tabFocus = tabs.length - 1;
                    }
                }

                tabs[tabFocus].setAttribute("tabindex", 0);
                tabs[tabFocus].focus();
            }
        });

    });


    // Add a click event handler to each tab
    tabs.forEach(tab => {
        tab.addEventListener("click", changeTabs);
    });


}

const doSomething = (scrollPos, scrollWidth, offsetWidth) => {


    // let tabListBound = horizontallyBound(tabsListContainer, tabIt);
    console.log('scrollPos, scrollWidth, offsetWidth');
    console.log(scrollPos, scrollWidth, offsetWidth);
    let offsetUnit = 28;
    let check = (offsetWidth + scrollPos) + offsetUnit;
    if(check >= scrollWidth) {
        console.log('End in [', scrollWidth-(offsetWidth + scrollPos), ']px');
    }

    if(scrollPos <= offsetUnit) {
        console.log('Start in [-',scrollPos,']px');
    }
    // scrolled to end of Y
    if(offsetWidth+scrollPos === scrollWidth) {
        console.log('END');
    }else if(scrollPos === 0) {
        console.log('BEGINNING');
    }else {
        console.log('MIDDLE');
    }
}

const isElementInContainerView = (targetEl) => {
    const rect = targetEl.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

const scrollTabIntoView = (e) => {
    const isElInView = isElementInContainerView(e);
    if (!isElInView) {
        e.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
};

const horizontallyBound = (parentDiv, childDiv) => {
    const parentRect = parentDiv.getBoundingClientRect();
    const childRect = childDiv.getBoundingClientRect();

    return parentRect.left <= childRect.left && parentRect.right >= childRect.right;
}

function changeTabs(e) {
    const target = e.target;
    const parent = target.parentNode;
    const grandparent = parent.parentNode;

    // Remove all current selected tabs
    parent
        .querySelectorAll('[aria-selected="true"]')
        .forEach(t => t.setAttribute("aria-selected", false));

    // Set this tab as selected
    target.setAttribute("aria-selected", true);
    scrollTabIntoView(target);

    // Hide all tab panels
    grandparent
        .querySelectorAll('[role="tabpanel"]')
        .forEach(p => p.setAttribute("hidden", true));

    // Show the selected panel
    grandparent.parentNode
        .querySelector(`#${target.getAttribute("aria-controls")}`)
        .removeAttribute("hidden");
}

const init = (element) => {
    const tabListBg = element.querySelector(':scope > div:first-of-type > div');
    tabListBg.classList.add('tabListBg');
    const bgImg = tabListBg.querySelector(':scope img');
    if (!bgImg) {
        const bgColor = tabListBg.textContent;
        tabListBg.style = `background: ${bgColor}`;
        tabListBg.innerHTML = '';
    }
    // create the tabs list container div
    const tabsTitle = element.querySelectorAll(':scope > div:nth-of-type(1) > div');
    const tabsListContainer = document.createElement('div');
    const tabsContentContainer = document.createElement('div');
    const tabs = element.querySelectorAll(':scope > div:nth-of-type(2) > div');
    const tabIds = element.querySelectorAll(':scope > div:nth-of-type(3) > div');

    tabs.forEach(function (tab, i) {
        tab.remove();
        let tabIndex = i === 0 ? 0 : -1;
        let tabItem = '<button role="tab" aria-selected="' + (i === 0) + '" aria-controls="panel-' + tabIds[i].textContent + '" id="tab-' + tabIds[i].textContent + '" tabindex="' + tabIndex + '" class="tab-item ' + tabIds[i].textContent + '">' + tab.textContent + '</button>'
        tabsListContainer.insertAdjacentHTML('beforeend', tabItem );
    });

    tabIds.forEach(function (id, i) {
        id.remove();
        let assocTabContent = document.getElementsByClassName('tab-id-' + id.textContent)[0];
        let accessCont = document.createElement('div');
        accessCont.setAttribute('id', 'panel-'+id.textContent);
        accessCont.setAttribute('role', 'tabpanel');
        accessCont.setAttribute('tabindex', '0');
        accessCont.setAttribute('aria-labelledby', 'tab-'+id.textContent);
        if( i !== 0 ){
            accessCont.setAttribute('hidden', '');
        }
        if(assocTabContent) {
            assocTabContent.classList.add('tab-content', 'tab-index-'+i);
            accessCont.append(assocTabContent);
            tabsContentContainer.append(accessCont);
        }
    });
    tabIds.innerHTML = '';

    // append the tabs list container after tabListBg
    tabsContentContainer.classList.add('container', 'content-container');
    tabsListContainer.classList.add('container', 'list-container');
    tabsListContainer.setAttribute('role', 'tablist');
    tabsListContainer.setAttribute('aria-label', element.previousElementSibling.outerText);
    tabListBg.after(tabsContentContainer);
    tabListBg.after(tabsListContainer);

    initTabs();
};

export default init;


