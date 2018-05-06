//Code for My Requests Page

Util.events(document, {
	"DOMContentLoaded": function() {
		// Setup Tasks
		
		// Customize My Requests Page based on localStorage
		if (localStorage.getItem('req') == null) {
			Util.one('#mr-container').removeChild(Util.one('#mr-container').children[0]);
		} else {
			var delivery = 'Delivery: ';
			if (localStorage.getItem('time').includes('deadlines')) {
				delivery += 'to ' + localStorage.getItem('address').split(/\r?\n/)[0];
			} else {
				delivery += localStorage.getItem('time') + ' to ' + localStorage.getItem('address').split(/\r?\n/)[0];
			}
			Util.one('#mr-delivery').innerHTML = delivery;

			var shortList = 'Shopping List: ' + localStorage.getItem('items');
			Util.one('#mr-items').innerHTML = shortList;

			Util.one('#mr-req').innerHTML = 'Requested: ' + localStorage.getItem('req');
		}

	},
});