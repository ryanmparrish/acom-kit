const init = (el) => {


    let lastKnownScrollPosition = 0;
    let ticking = false;
    let elTop = el.offsetTop;

    function doSomething(scrollPos) {
        console.log('scrollPos', scrollPos, 'el', {el});
        // Do something with the scroll position
        if(scrollPos >= elTop){
            document.body.classList.add("fixed-nav");
            el.classList.add("fixed");
        }else {
            document.body.classList.remove("fixed-nav");
            el.classList.remove("fixed");
        }
    }

    document.addEventListener('scroll', function(e) {
        lastKnownScrollPosition = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(function() {
                // doSomething(lastKnownScrollPosition);
                ticking = false;
            });

            ticking = true;
        }
    });
};

export default init;
