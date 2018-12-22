
$(document.head).append(
	`
		<style>
			.img{
				width:50vw;height:50vh;
			}
			.img:hover{
				outline:2px solid white;
			}
			.img>img{
				width:100%;
				// height:auto;
				// max-width:100%;
				// max-height:100%;
			}
			.img>img:hover{
				
			}
			
		</style>
	`
)


function createImg(imgFile){
	const imgBlock = $(
		`
			<div class="img" align="center"><img></div>
		`
	)[0];

	// img
	const imgElem = imgBlock.querySelector("img");
	imgElem.file = imgFile;

	const reader = new FileReader();
	reader.onload = (
		function(aImg) {
			return function(e) { 
				aImg.src = e.target.result; 
			}; 
		}
	)(imgElem);
	reader.readAsDataURL(imgFile);


	// close button
	imgBlock.appendChild(createCloseButton(imgBlock));

	// move
	setElemMoveFunc(imgBlock)

	// 
	imgBlock.addEventListener(
		"click", function(event){
			event.stopPropagation();event.preventDefault();
		}
	)

	// 調整長寬
	imgElem.addEventListener(
		"load",function(){
			imgResize()
			imgBlockResize()
		}
	)
	new ResizeSensor(imgBlock, function(){ 
    imgResize()
    imgBlockResize()
	});

	function imgBlockResize(){
		$(imgBlock).css(
			{
				width:(imgElem.width)+"px",
				height:(imgElem.height)+"px",
			}
		)
	}
	function imgResize(){
		imgElem.width = imgBlock.offsetWidth
		if(imgElem.height>=imgBlock.offsetHeight){
			delete(imgElem.width)
		}
	}

	return(imgBlock)
}
