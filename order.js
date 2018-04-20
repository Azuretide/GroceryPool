

// Attaching events on document because then we can do it without waiting for
// the DOM to be ready (i.e. before DOMContentLoaded fires)
Util.events(document, {
	// Final initalization entry point: the Javascript code inside this block
	// runs at the end of start-up when the DOM is ready
	"DOMContentLoaded": function() {
		// Setup tasks


		Util.events(Util.one("#add-new-address"), {
			"mousedown": function (evt) {
				var newAddr = Util.one("#new-address-text").value;
				Util.one("#new-address-text").value = "";
				if(newAddr !== "") {
					var wholeBox = Util.one("#new-address-form");
					var nodeList = Array.from(wholeBox.childNodes);
					var newNode = Util.create("address", {
						class: "wireframe default-address-box col",
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
						}),
						newNode,
						Util.create("div", {
							class: "w-100"
						}),
					);
					console.log(nodeList);
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
				class: "saved-items",
			});
			newItem.innerText = saveVal;
			console.log(save_button.parentElement.childNodes[1]);
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
				class: "col-6",
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
			var text = link.parentElement.innerText;
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

			if(searchInput !== "" && deadline) {
				Util.one("#nextbutton_detail").disabled = false;
			} else {
				Util.one("#nextbutton_detail").disabled = true;
			}
			// Validate the items page

			var flag_isThereContent = false;
			Array.from(Util.one("#item-input").childNodes).forEach(function (node) {
				if(node.nodeName === "li" || node.nodeName === "LI") {
					if(node.childNodes[1].value !== "") {
						flag_isThereContent = true;
					}
				}
			});
			if(flag_isThereContent === true) {
				Util.one("#nextbutton_items").disabled = false;
			} else {
				Util.one("#nextbutton_items").disabled = true;
			}

		}, /* how often we validate */ 500);

		Util.events(Util.one("#nextbutton_detail"), {
			"mousedown": (evt) => {
				Util.one(".details-page").hidden = true;
				Util.one("#nextbutton_detail").hidden = true;
				Util.one(".items-page").hidden = false;
				Util.one("#nextbutton_items").hidden = false;
			}
		});

		Util.events(Util.one("#nextbutton_items"), {
			"mousedown": (evt) => {
				Util.one(".items-page").hidden = true;
				Util.one("#nextbutton_items").hidden = true;
				Util.one(".friends-page").hidden = false;
				Util.one("#nextbutton_friends").hidden = false;
			}
		});

		Util.events(Util.one("#nextbutton_friends"), {
			"mousedown": (evt) => {
				Util.one(".friends-page").hidden = true;
				Util.one("#nextbutton_friends").hidden = true;
				Util.one(".confirmation-page").hidden = false;
				Util.one("#confirmrequest").hidden = false;
			}
		});
	},

});
