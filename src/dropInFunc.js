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
		"drop", function(event){
			event.stopPropagation();event.preventDefault();

			const elem = event.currentTarget;

			for (const file of event.dataTransfer.files) {
				console.log(file)

				if (!file.type.match(/^image/)) {continue;}
				
				const imgBlock = createImg(file);

				$(imgBlock).css(
					{
						"position":"absolute",
						"top":String(event.clientY)+"px",
						"left":String(event.clientX)+"px",
					}
				)

				document.body.appendChild(imgBlock);
			}
		}, false
	);
}