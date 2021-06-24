
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
    const tabIds = element.querySelectorAll(':scope > div:nth-of-type(4) > div');
    const uniqueId = Date.now();
    tabs.forEach(function (tab, i) {
        tab.remove();
        let isChecked = i === 0 ? ' checked' : '';
        let radioLabel = '<input class="radiotab" name="tabs" tabindex="1" type="radio" id="tab-' + i + '-' + uniqueId + '"' + isChecked + ' />'
        + '<label class="label" for="tab-' + i + '-' + uniqueId + '">' + tab.textContent + '</label>';
        tabsListContainer.insertAdjacentHTML('beforeend', radioLabel );
    });

    tabIds.forEach(function (id, i) {
        let assocTabContent = element.querySelector('.tabid-' + id.textContent);
        let tabList = tabsListContainer.querySelector('label[for="tab-' + i + '-' + uniqueId + '"]');
//        console.log(assocTabContent, tabList, '.tabid-'+id.textContent);
//        if(assocTabContent && tabList) {
//            assocTabContent.classList.add('tab-content', 'tab-content-'+i, 'tab-content--assoc');
//            assocTabContent.setAttribute('tabindex', 1);
//            tabList.parentNode.insertBefore(assocTabContent, tabList.nextSibling);
//        }
    });

    tabsContent.forEach(function (content, i) {
        content.classList.add('tab-content', 'tab-content-'+i);
        content.setAttribute('tabindex', 1);
        var tabList = tabsListContainer.querySelector('label[for="tab-' + i + '-' + uniqueId + '"]');
        tabList.parentNode.insertBefore(content, tabList.nextSibling);
    });

    // append the tabs list container after tabListBg
    tabsListContainer.classList.add('container', 'list-container');
    tabListBg.after(tabsListContainer);
    tabIds.innerHTML = '';
};

export default init;


