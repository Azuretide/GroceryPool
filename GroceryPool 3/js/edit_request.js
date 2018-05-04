// Code for edit requests page

Util.events(document, {
	"DOMContentLoaded": function() {
		// Setup Tasks
		
		// Customize Edit Requests Page based on localStorage
		Util.one('#er-store').value = localStorage.getItem('store');
		Util.one('#er-address').innerHTML = localStorage.getItem('address');
		Util.one('#er-time').value = localStorage.getItem('time');

		Util.one('#er-items').value = '';
		localStorage.getItem('items').split(',').forEach((item) => {
			Util.one('#er-items').value += item + '\n';
		});

		localStorage.getItem('friends').split(',').forEach((f) => {
			Array.from(Util.one("#er-friends").children).forEach((c) => {
				if (c.children[1].innerHTML == f) {
					c.children[0].checked = true;
				}
			});
		});

		// Cancel Request Button
		Util.one('#cancel-request').addEventListener('click', (evt) => {
			if (!confirm('Are you sure you want to delete this request?')) {
    			evt.preventDefault();
  			} else {
  				localStorage.clear();
  			}
		});

		
		// Edit Requests Confirm Button
		Util.one('#er-confirm').addEventListener('click', (evt) => {
			// Details
			localStorage.setItem('store', Util.one('#er-store').value);
			localStorage.setItem('address', Util.one('#er-address').innerHTML);
			localStorage.setItem('time', Util.one('#er-time').value);

			// Items
			var editedItems = Util.one('#er-items').value.split(/\r?\n/).filter(String);
			localStorage.setItem('items', editedItems);

			// Friends
			var editedFriends = [];
			Array.from(Util.one("#er-friends").children).forEach((c) => {
				if (c.children[0].checked == true) {
					editedFriends.push(c.children[1].innerHTML);
				}
			});
			localStorage.setItem('friends', editedFriends);

			// Navigate back to My Requests
			location.href = 'my_requests.html';
		});

	},
});