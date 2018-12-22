

// 記錄滑鼠位置
document.body.addEventListener(
	"mousemove",function(event){
		event.preventDefault();event.stopPropagation();
		document.body.dataset.mousePosX = event.clientX
		document.body.dataset.mousePosY = event.clientY
	}
)

function setElemMoveFunc(elem){

	function deleteAllData(elem){
		/*for(const key in elem.dataset){
			delete(elem.dataset[key])
		}*/
		delete(elem.dataset.mouseLeftDownFlag)
		delete(elem.dataset.mousePosX)
		delete(elem.dataset.mousePosY)
		delete(elem.dataset.moveFlag)
		delete(elem.dataset.resizeFlag)
		elem.style.cursor = "auto"
		document.body.removeEventListener("mousemove",moveEvent)
		document.body.removeEventListener("mouseup",mouseUpEvent)
	}

	// click
	elem.addEventListener(
		"mousedown", function(event){
			const elem = event.currentTarget

			event.stopPropagation();
			if(elem.classList.contains("img")){
				event.preventDefault();
			}

			// 確認是滑鼠左鍵
			if(
				(!elem.dataset.hasOwnProperty("mouseLeftDownFlag")) && 
				event.button === 0
			){
				
				//旗標
				elem.dataset.mouseLeftDownFlag = "1"
				
				document.body.addEventListener("mousemove",moveEvent)

				document.body.addEventListener("mouseup",mouseUpEvent)

				//紀錄 按下的滑鼠 與 elem 相對位置
				const relatePosY = event.clientY-elem.offsetTop
				const relatePosX = event.clientX-elem.offsetLeft
				elem.dataset.mousePosY = relatePosY
				elem.dataset.mousePosX = relatePosX

				if(Math.abs(relatePosY-elem.offsetHeight)<=10 && Math.abs(relatePosX-elem.offsetWidth)<=10){

					elem.style.cursor = "nw-resize"
					elem.dataset.resizeFlag = "1"
				}
				else{
					//游標顯示為移動狀態
					elem.style.cursor = "move"
					elem.dataset.moveFlag = "1"
				}
			}
			else{deleteAllData(elem)}
		}
	);

	/*elem.addEventListener(
		"mouseleave",(event)=>{
			const elem = event.currentTarget
			deleteAllData(elem)
		}
	)*/

	function mouseUpEvent(event){
		// const elem = event.currentTarget
		deleteAllData(elem)
	}

	function moveEvent(event){
		//確認按鍵有按下
		if(elem.dataset.hasOwnProperty("mouseLeftDownFlag")){

			//停止原來的功能
			event.preventDefault();event.stopPropagation();

			// 依滑鼠移動而移動
			// elem.style.top = (elem.offsetTop+event.clientY-Number(elem.dataset.mousePosY))+"px"
			// elem.style.left = (elem.offsetLeft+event.clientX-Number(elem.dataset.mousePosX))+"px"


			// mouse and element relative position
			// mouse position - element position

			// 
			if(elem.dataset.moveFlag){
				const top = 
					Number(document.body.dataset.mousePosY)
					-Number(elem.dataset.mousePosY);

				const left = 
					Number(document.body.dataset.mousePosX)
					-Number(elem.dataset.mousePosX);

				elem.style.top = top+"px"
				elem.style.left = left+"px"
			}
			else if(elem.dataset.resizeFlag){
				const height = 
					Number(document.body.dataset.mousePosY)
					// -Number(elem.dataset.mousePosY);
					-elem.offsetTop;

				const width = 
					Number(document.body.dataset.mousePosX)
					// -Number(elem.dataset.mousePosX);
					-elem.offsetLeft;

				if(width>10 && height>10){
					elem.style.height = height+"px"
					elem.style.width = width+"px"
				}
			}
		}
	}
	
}
