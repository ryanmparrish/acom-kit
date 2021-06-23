
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
    const tabsListContainer = document.createElement('div');
    const tabs = element.querySelectorAll(':scope > div:nth-of-type(2) > div');
    const tabsContent = element.querySelectorAll(':scope > div:nth-of-type(3) > div');
    const tabsStuff = element.querySelectorAll(':scope > div:nth-of-type(4) > div');
    tabs.forEach(function (tab, i) {
        tab.remove();
        let isChecked = i === 0 ? ' checked' : '';
        let radioLabel = '<input class="radiotab" name="tabs" tabindex="1" type="radio" id="tab-' + i + '"' + isChecked +' />'
        + '<label class="label" for="tab-' + i + '">' + tab.textContent + '</label>';
        tabsListContainer.insertAdjacentHTML('beforeend', radioLabel );
    });
    tabsContent.forEach(function (content, i) {
        content.classList.add('tab-content', 'tab-content-'+i);
        content.setAttribute('tabindex', 1);
        var tabList = tabsListContainer.querySelector('label[for="tab-' + i + '"]');
        tabList.parentNode.insertBefore(content, tabList.nextSibling);
    });

    // append the tabs list container after tabListBg
    tabsListContainer.classList.add('container', 'list-container');
    tabListBg.after(tabsListContainer);
    tabsStuff.innerHTML = '';
};

export default init;


