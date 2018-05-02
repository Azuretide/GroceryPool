

// Toggle user info block in menu
function toggleInfo() {
    $('body').find('.user_info_header').toggleClass('active');
};


Util.events(document, {
	"DOMContentLoaded": function() {
		// console.log(localStorage.getItem('store'));
		// localStorage.setItem('store', 'Wawa');

		// Cancel Request Button
		if (Util.one('#cancel-request')) {
			Util.one('#cancel-request').addEventListener('click', (evt) => {
				if (!confirm('Are you sure you want to delete this request?')) {
        			evt.preventDefault();
      			}
			});
		}
		


	},
});