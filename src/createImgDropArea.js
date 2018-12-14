
$(document.head).append(
	`
		<style>
			.imgDropArea{
				border:4px dashed white;
				text-align: center;vertical-align: middle;
				font-size: 28px;
				height:50vh;width:50vw;
				user-select: none;-moz-user-select: none;
			}
			.imgDropArea>p{
				margin-top:calc(25vh - 22px);
			}
		</style>
	`
)

function createImgDropArea(){
	
	let imgDropArea = $(".imgDropArea")[0]
	if(imgDropArea instanceof Element){return(imgDropArea)}
	
	imgDropArea = $(`<div class="imgDropArea"><p>圖片拖曳至此</p></div>`)[0]

	imgDropArea.addEventListener(
		"click", function(event){
			event.stopPropagation();event.preventDefault();
		}, false
	);

	imgDropArea.addEventListener(
		"dragenter", function(event){
			event.stopPropagation();event.preventDefault();
		}, false
	);

	imgDropArea.addEventListener(
		"dragover", function(event){
			event.stopPropagation();event.preventDefault();
		}, false
	);

	imgDropArea.addEventListener(
		"drop", function(event){
			event.stopPropagation();event.preventDefault();

			const imgDropArea = event.currentTarget;

			for (const file of event.dataTransfer.files) {
				console.log(file)

				if (!file.type.match(/^image/)) {continue;}
				
				const imgBlock = createImg(file);

				$(imgBlock).css(
					{
						"position":"absolute",
						"top":$(imgDropArea).css("top"),
						"left":$(imgDropArea).css("left"),
					}
				)

				document.body.appendChild(imgBlock);
			}

			imgDropArea.remove()
		}, false
	);

	imgDropArea.appendChild(createCloseButton(imgDropArea))

	setElemMoveFunc(imgDropArea)

	return(imgDropArea)
}