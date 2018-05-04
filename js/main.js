
// Toggle user info block in menu
function toggleInfo() {
    $('body').find('.user_info_header').toggleClass('active');
};

$(document).mouseup(function(e)
{
    var container = $(".user_info_header.active");
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
        container.toggleClass('active');
    }
});
