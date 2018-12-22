document.head.append(`
	<style>
		.resize{
			position:absolute;
			top:100%;
			left:100%;
			background-color:red;
			width:10px;height:10px;
			// opacity:0;
			cursor:nw-resize;
		}
		.resize:hover{

		}
	</style>
`)
function createResizeElem(target){
	// 最右下角
	// target.offsetHeight+target.offsetTop
	// target.offsetWidth+target.offsetLeft

	const resizeElem = $(`
		<div class="resize">
			
		</div>
	`)[0]

	return(resizeElem)
}