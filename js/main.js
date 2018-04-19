// Toggle user info block in menu
function toggleInfo() {
    $('body').find('.user_info_header').toggleClass('active');
};

//Toggle disabled form on Edit page
function toggleEdit(e) {
    $(e.target).parent().parent().find('fieldset').removeAttr('disabled');
}