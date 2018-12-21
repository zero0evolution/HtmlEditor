

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
		elem.style.cursor = "auto"
		document.body.removeEventListener("mousemove",moveEvent)
	}

	// click
	elem.addEventListener(
		"mousedown", function(event){
			event.stopPropagation();
			// event.preventDefault();

			// 確認是滑鼠左鍵
			const elem = event.currentTarget
			if(
				(!elem.dataset.hasOwnProperty("mouseLeftDownFlag")) && 
				event.button === 0
			){
				//游標顯示為移動狀態
				elem.style.cursor = "move"
				//旗標
				elem.dataset.mouseLeftDownFlag = "1"
				//紀錄按下的滑鼠 網頁位置
				
				elem.dataset.mousePosY = event.clientY-elem.offsetTop
				elem.dataset.mousePosX = event.clientX-elem.offsetLeft
				
				document.body.addEventListener("mousemove",moveEvent)
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

	elem.addEventListener(
		"mouseup",(event)=>{
			// 確認是滑鼠左鍵
			// if(event.button === 0){
				const elem = event.currentTarget
				deleteAllData(elem)
			// }
		}
	)

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
			elem.style.top = (
				Number(document.body.dataset.mousePosY)
				-Number(elem.dataset.mousePosY)
			)+"px"
			elem.style.left = (
				Number(document.body.dataset.mousePosX)
				-Number(elem.dataset.mousePosX)
			)+"px"

			// elem.dataset.mousePosX = String(event.clientX)
			// elem.dataset.mousePosY = String(event.clientY)
		}
	}
	
}
