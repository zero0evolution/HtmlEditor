function dropInFunc(elem){

	elem.addEventListener(
		"dragenter", function(event){
			event.stopPropagation();event.preventDefault();
		}, false
	);

	elem.addEventListener(
		"dragover", function(event){
			event.stopPropagation();event.preventDefault();
		}, false
	);

	elem.addEventListener(
		"drop", async function(event){
			event.stopPropagation();event.preventDefault();

			const elem = event.currentTarget;

			for (const file of event.dataTransfer.files) {
				console.log(file)

				let newElem;
				// console.log(file.type)
				if (file.type.match(/^image\//i)) {
					newElem = createImg(file);
				}

				if(newElem instanceof Element){
					$(newElem).css(
						{
							"position":"absolute",
							"top":String(event.clientY)+"px",
							"left":String(event.clientX)+"px",
						}
					)

					document.body.appendChild(newElem);
				}
			}
		}, false
	);
}