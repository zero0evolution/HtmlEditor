
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
				width:auto;height:auto;
				max-width:100%;max-height:100%;
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

	// 
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
			$(imgBlock).css(
				{
					width:String(imgElem.width)+"px",
					height:String(imgElem.height)+"px",
				}
			)
		}
	)

	return(imgBlock)
}