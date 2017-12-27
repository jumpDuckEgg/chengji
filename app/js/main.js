$(function () {
    ruleBtn();
});
function ruleBtn() {
    $('.close-btn').click(function () {
        $('.rule').hide();

    });
    $('.prompt-message').click(function () {

        $('.rule').show();

    })
}



