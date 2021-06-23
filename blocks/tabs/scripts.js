
const init = (element) => {
    const ribbon = element.querySelector(':scope > div:first-of-type > div');
    ribbon.classList.add('ribbon');
    const bgImg = ribbon.querySelector(':scope img');
    if (!bgImg) {
        const bgColor = ribbon.textContent;
        ribbon.style = `background: ${bgColor}`;
        ribbon.innerHTML = '';
    }
    const title = element.querySelector(':scope > div:nth-of-type(2)');
    title.classList.add('title');

    // create the tabs list container div
    const tabsListContainer = document.createElement('div');
    const tabs = element.querySelectorAll(':scope > div:nth-of-type(3) > div');
    const tabsContent = element.querySelectorAll(':scope > div:nth-of-type(4) > div');
    const tabsStuff = element.querySelectorAll(':scope > div:nth-of-type(5) > div');
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

    // append the tabs list container after title
    tabsListContainer.classList.add('container', 'list-container');
    title.after(tabsListContainer);
    tabsStuff.innerHTML = '';
};

export default init;


