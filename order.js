

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
				if(newAddr !== "") {
					var wholeBox = Util.one("#new-address-form");
					var nodeList = Array.from(wholeBox.childNodes);
					var newNode = Util.create("address", {
						class: "wireframe default-address-box col",
					});
					console.log(nodeList);
					nodeList.splice(
						wholeBox.childNodes.length - 8,
						0,
						Util.create("input", {
							type: "radio",
							name: "Radio",
							id: "Secondary-address",
							class: "col-1",
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

				}
			},
		});
	},
});
