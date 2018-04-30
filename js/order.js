// Create a dom variable so we don't update things too often
var dom = {};

// Attaching events on document because then we can do it without waiting for
// the DOM to be ready (i.e. before DOMContentLoaded fires)
Util.events(document, {
	// Final initalization entry point: the Javascript code inside this block
	// runs at the end of start-up when the DOM is ready
	"DOMContentLoaded": function() {
		// Setup tasks

		// Make accidental navigation away unlikely
		Util.all(".real-link").forEach((e) => {
			Util.events(e, {
				"click": function (evt) {
					evt.preventDefault();
					if(window.confirm("Your request hasn't been saved. Are you sure you want to leave?")) {
						window.location.replace(e.href);
					}
				}
			});
		});

		Util.events(Util.one("#add-new-address"), {
			"mousedown": function (evt) {
				var newAddr = Util.one("#new-address-text").value;
				Util.one("#new-address-text").value = "";
				if(newAddr !== "") {
					var wholeBox = Util.one("#new-address-form");
					var nodeList = Array.from(wholeBox.childNodes);
					var newNode = Util.create("address", {
						class: "default-address-box col",
					});
					nodeList.splice(
						wholeBox.childNodes.length - 8,
						0,
						Util.create("input", {
							type: "radio",
							name: "Radio",
							id: "new-address",
							class: "col-1 mt-2",
							checked: true,
							value: newAddr,
						}),
						newNode,
						Util.create("div", {
							class: "w-100"
						}),
					);
					while(wholeBox.childNodes.length > 0)
						wholeBox.removeChild(wholeBox.childNodes[0]);
					for(x in nodeList) {
						wholeBox.appendChild(nodeList[x]);
					}
					newNode.innerText = newAddr;
					Util.one("#confirm-address").innerText = newAddr;
				}
			},
		});

		function saveButton (evt, save_button) {
			var saveVal = save_button.parentElement.childNodes[1].value || save_button.parentElement.childNodes[0].value;
			var newItem = Util.create("li", {
				class: "saved-items list-group-item",
			});
			var textSpan = Util.create("span", {
				class: "saved-item-name",
			});
			textSpan.innerText = saveVal;
			var link = Util.create("a", {
					class: "float-right",
					href: "#",
				});
			link.innerText = "+ Add item";
			Util.events(link, {
				"mousedown": function(evt) {
					addSavedItem(evt, saveVal);
				}
			});
			newItem.appendChild(textSpan);
			newItem.appendChild(link);
			if(saveVal !== "") {
				Util.one("#saved-items-ul").appendChild(newItem);
			}
		}

		Util.all(".input-group-append").forEach(function(save_button) {
			Util.events(save_button, {
				"mousedown": (evt) => {
					saveButton(evt, save_button);
				},
			});
		});

		// Function to add item to the shopping list
		function addSavedItem(evt, text) {
			// Replicate this item
			// <li class="my-2 input-group">
			// 	<input type="text" class="col-6">
			// 	<div class="input-group-append">
			// 		<div class="input-group-text"><i class="material-icons">save</i></div>
			// 	</div>
			// </li>
			var saveIcon = Util.create("i", {
				class: "material-icons",
			});
			saveIcon.innerText = "save";

			var div1 = Util.create("div", {
				class: "input-group-text",
			});
			div1.appendChild(saveIcon);
			var div2 = Util.create("div", {
				class: "input-group-append",
			});
			div2.appendChild(div1);
			var liItem = Util.create("li", {
				class: "my-2 input-group",
			});
			var inputCell = Util.create("input", {
				type: "text",
				class: "col-10",
			});
			inputCell.value = text;
			liItem.appendChild(inputCell);
			liItem.appendChild(div2);
			Util.events(div2, {
				"mousedown": (evt) => {
					saveButton(evt, div2);
				},
			})
			var item_input = Util.one("#item-input");
			var allNodes = [];
			var flag = false;
			var addFlag = false;
			console.log(item_input);
			Array.from(Util.one("#item-input").childNodes).forEach(function (node) {
				if(node.nodeName === "li" || node.nodeName === "LI") {
					if(node.childNodes[1].value !== "") {
						allNodes.push(node);
					} else {
						addFlag = true;
						if((flag === false) && (text !== "")) {
							flag = true;
							allNodes.push(liItem);
						}
						allNodes.push(node);
					}
					console.log(addFlag);
				}
			});
			if((text === "") && (addFlag === false)) {
				console.log("hi", flag);
				allNodes.push(liItem);
			}
			while(item_input.childNodes.length > 0)
				item_input.removeChild(item_input.childNodes[0]);
			for(x in allNodes) {
				item_input.appendChild(allNodes[x]);
			}
		}
		Util.all(".add-item-link").forEach( (link) => {
			var text = link.previousSibling.previousSibling.innerText;
			Util.events(link, {
				"mousedown": function (evt) {
					addSavedItem(evt, text);
				}
			})
		});

		//  Regular input evaluation
		window.setInterval(function() {
			var searchInput = Util.one("#search-bar").value;
			var deadline = (Util.one("#deadline-to").value !== "") || Util.one("#no-deadline").checked;

			if(Util.one("#confirm-section-details-stores-name").innerText != searchInput) {
				Util.one("#confirm-section-details-stores-name").innerText = searchInput;
			}

			if(Util.one("#no-deadline").checked) {
				Util.one("#deadline-to").disabled = true;
				Util.one("#confirm-section-details-deadline-in").innerText = "No deadlines!";
			} else {
				Util.one("#deadline-to").disabled = false;
				var dropdown = Util.one("#time-period");
				Util.one("#confirm-section-details-deadline-in").innerText = "In about " + Util.one("#deadline-to").value + " " + dropdown.options[dropdown.selectedIndex].value;
			}

			if(searchInput !== "" && deadline) {
				Util.one("#nextbutton_detail").disabled = false;
			} else {
				Util.one("#nextbutton_detail").disabled = true;
			}
			// Validate the items page

			var flag_isThereContent = false;
			var allItems = [];
			Array.from(Util.one("#item-input").childNodes).forEach(function (node) {
				if(node.nodeName === "li" || node.nodeName === "LI") {
					if(node.childNodes[1].value !== "" && node.childNodes[1].value !== null && node.childNodes[1].value !== undefined) {
						flag_isThereContent = true;
						allItems.push(node.childNodes[1].value);
					}

					if(node.childNodes[0].value !== "" && node.childNodes[0].value !== null && node.childNodes[0].value !== undefined) {
						flag_isThereContent = true;
						allItems.push(node.childNodes[0].value);
					}
				}
			});
			while(Util.one("#confirm-section-details-items-list").childNodes.length > 0) {
				Util.one("#confirm-section-details-items-list").removeChild(Util.one("#confirm-section-details-items-list").childNodes[0]);
			}
			allItems.forEach(function (text) {
				var liItem = Util.create("li", {});
				liItem.innerText = text;
				Util.one("#confirm-section-details-items-list").appendChild(liItem);
			});
			if(flag_isThereContent === true) {
				Util.one("#nextbutton_items").disabled = false;
			} else {
				Util.one("#nextbutton_items").disabled = true;
			}

			var isFriendChecked = false;

			while(Util.one("#confirm-section-details-friends-list").childNodes.length > 0) {
				Util.one("#confirm-section-details-friends-list").removeChild(Util.one("#confirm-section-details-friends-list").childNodes[0]);
			}

			Util.all(".friend-check").forEach((check) => {
				isFriendChecked = isFriendChecked || check.checked;
				if(check.checked) {
					var liItem = Util.create("li", {
					});
					liItem.innerText = check.nextSibling.nextSibling.nextSibling.nextSibling.innerText;
					Util.one("#confirm-section-details-friends-list").appendChild(liItem);
				}
			});

			if(isFriendChecked === true) {
				Util.one("#nextbutton_friends").disabled = false;
			} else {
				Util.one("#nextbutton_friends").disabled = true;
			}

		}, /* how often we validate */ 500);

		Util.events(Util.one("#nextbutton_detail"), {
			"mousedown": (evt) => {
				Util.one("#citems").disabled = false;
			}
		});

		Util.events(Util.one("#nextbutton_items"), {
			"mousedown": (evt) => {
				Util.one("#cfriends").disabled = false;
			}
		});

		Util.events(Util.one("#nextbutton_friends"), {
			"mousedown": (evt) => {
				Util.one("#cconfirm").disabled = false;
			}
		});

		// Helper function to hide all pages
		function hideAllPages() {
			Util.all(".opage").forEach((page) => {page.hidden = true;});
		}

		// Deactivate all crumbs 
		function deactivateCrumbs() {
			Util.all(".crumb").forEach((crumb) => {crumb.classList.remove("crumb-active");});
		}

		// Hide all footer buttons
		function hideFooterButtons() {
			Util.one("#nextbutton_detail").hidden = true;
			Util.one("#nextbutton_items").hidden = true;
			Util.one("#nextbutton_friends").hidden = true;
			
			Util.one("#prevbutton_items").hidden = true;
			Util.one("#prevbutton_friends").hidden = true;
			Util.one("#prevbutton_confirm").hidden = true;

			Util.one("#confirmrequest").hidden = true;
		}

		// Clicking on any crumb will hide all pages and deactivate all crumbs
		// Then only the right crumb will be activated and right page shown
		Util.all(".crumb").forEach((crumb) => {
			Util.events(crumb , {
				"mousedown": (evt) => {
					hideAllPages();
					deactivateCrumbs();
				}
			});
		});

		["#cinfo", "#edit-details", "#prevbutton_items"].forEach((id) => {
			Util.events(Util.one(id), {
				"mousedown": (evt) => {
					hideAllPages();
					deactivateCrumbs();
					Util.one("#cinfo").classList.add("crumb-active");
					Util.one(".details-page").hidden = false;

					hideFooterButtons();
					Util.one("#nextbutton_detail").hidden = false;
				}
			});
		});

		["#citems", "#edit-items", "#nextbutton_detail", "#prevbutton_friends"].forEach((id) => {
			Util.events(Util.one(id), {
				"mousedown": (evt) => {
					hideAllPages();
					deactivateCrumbs();
					Util.one("#citems").classList.add("crumb-active");
					Util.one(".items-page").hidden = false;

					hideFooterButtons();
					Util.one("#nextbutton_items").hidden = false;
					Util.one("#prevbutton_items").hidden = false;
				}
			});
		});

		["#cfriends", "#edit-friends", "#nextbutton_items", "#prevbutton_confirm"].forEach((id) => {
			Util.events(Util.one(id), {
				"mousedown": (evt) => {
					hideAllPages();
					deactivateCrumbs();
					Util.one("#cfriends").classList.add("crumb-active");
					Util.one(".friends-page").hidden = false;

					hideFooterButtons();
					Util.one("#nextbutton_friends").hidden = false;
					Util.one("#prevbutton_friends").hidden = false;
				}
			});
		});

		["#cconfirm", "#nextbutton_friends"].forEach((id) => {
			Util.events(Util.one(id), {
				"mousedown": (evt) => {
					hideAllPages();
					deactivateCrumbs();
					Util.one("#cconfirm").classList.add("crumb-active");
					Util.one(".confirmation-page").hidden = false;

					hideFooterButtons();
					Util.one("#confirmrequest").hidden = false;
					Util.one("#prevbutton_confirm").hidden = false;
				}
			});
		});
	},

});
