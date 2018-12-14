	
function setElemMoveFunc(elem){

	function deleteAllData(elem){
		for(let key in elem.dataset){
			delete(elem.dataset[key])
		}
		elem.style.cursor = "auto"
	}

	// click
	elem.addEventListener(
		"mousedown", function(event){
			event.stopPropagation();event.preventDefault();

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
					
					elem.dataset.mousePosX = String(event.clientX)
					elem.dataset.mousePosY = String(event.clientY)
				
			}
			else{
				deleteAllData(elem)
			}
		}, false
	);

	elem.addEventListener(
		"mouseleave",(event)=>{
			const elem = event.currentTarget
			deleteAllData(elem)
		}
	)

	elem.addEventListener(
		"mouseup",(event)=>{

			// 確認是滑鼠左鍵
			// if(event.button === 0){
				const elem = event.currentTarget
				deleteAllData(elem)
			// }
		}
	)

	elem.addEventListener(
		"mousemove",(event)=>{
			const elem = event.currentTarget
			//確認按鍵有按下
			if(elem.dataset.hasOwnProperty("mouseLeftDownFlag")){

				//停止原來的功能
				event.preventDefault();event.stopPropagation();

				// 依滑鼠移動而移動
				$(elem).css(
					{
						"top":String(elem.offsetTop+event.clientY-Number(elem.dataset.mousePosY))+"px",
						"left":String(elem.offsetLeft+event.clientX-Number(elem.dataset.mousePosX))+"px",
					}
				)

				elem.dataset.mousePosX = String(event.clientX)
				elem.dataset.mousePosY = String(event.clientY)
			}
		}
	)
}
	