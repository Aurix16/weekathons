$(document).ready(function() {
    let viewPortHeight = $(window).innerHeight();
    let titleOnePos = $('#one').offset().top - viewPortHeight;
    let titleTwoPos = $('#two').offset().top - viewPortHeight;
    let titleThreePos = $('#three').offset().top - viewPortHeight;
    let titleFourPos = $('#four').offset().top - viewPortHeight;
    let titleFivePos = $('#five').offset().top - viewPortHeight;
    let titleSixPos = $('#six').offset().top - viewPortHeight;

    $(window).scroll(function () {
        let docPos = $(document).scrollTop();

        if (docPos >= titleOnePos && docPos < titleTwoPos) {
            toggleClass('one');
        }else if (docPos >= titleTwoPos && docPos < titleThreePos) {
            toggleClass('two');
        }else if (docPos >= titleThreePos && docPos < titleFourPos) {
            toggleClass('three');
        }else if (docPos >= titleFourPos && docPos < titleFivePos) {
            toggleClass('four');
        }else if (docPos >= titleFivePos && docPos < titleSixPos) {
            toggleClass('five');
        }else if (docPos >= titleSixPos) {
            toggleClass('six');
        }
    });

    function toggleClass(nextElem) {
        let activeElem = $('.is-active')[0];
        $(activeElem).removeClass('is-active');
        $('#link-'+nextElem).addClass('is-active');
    }
});