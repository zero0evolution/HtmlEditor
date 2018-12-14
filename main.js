$(document.head).append(
	`
		<style>
			body{
				background-color: black;
				color:white;
				min-height:100vh;
				margin:0px;
			}
			div{
				// display:inline-block;
			}
		</style>
	`
)



/*document.body.addEventListener(
	"mousedown",function(event){
		// console.log(event.clientX,event.clientY)

		if(event.button === 2){

			//停止原來的功能
			event.preventDefault();event.stopPropagation();

			// get mouse position
			const imgDropArea = createImgDropArea()

			$(imgDropArea).css(
				{
					"position":"absolute",
					"left":String(event.clientX)+"px",
					"top":String(event.clientY)+"px",
				}
			)

			document.body.appendChild(imgDropArea)
		}
	}
)*/



// window.oncontextmenu = ()=>false

// 移入圖片功能
dropInFunc(document.body)


// 貼上圖片功能
function pasteEvent(event){
	const items = event.clipboardData.items
	const elem = event.currentTarget;
	// console.log(event.clipboardData.items)

	for (let i = 0; i < items.length; i++) {
		const item = items[i]

		console.log(item)

		if (item.type.match(/^image/i)){
			const file = items[i].getAsFile();

			const imgBlock = createImg(file);

			// 移到指定位置
			if(elem.dataset.hasOwnProperty("mousePosX") && elem.dataset.hasOwnProperty("mousePosY")){
				$(imgBlock).css(
					{
						"position":"absolute",
						"left":elem.dataset.mousePosX+"px",
						"top":elem.dataset.mousePosY+"px",
					}
				)
			}

			document.body.appendChild(imgBlock);
		}
	}
}

document.body.addEventListener("paste",pasteEvent)
// window.addEventListener("paste",pasteEvent)
// document.addEventListener("paste",pasteEvent)

// 記錄滑鼠位置
document.body.addEventListener(
	"mousemove",function(event){
		event.preventDefault();event.stopPropagation();
		document.body.dataset.mousePosX = String(event.clientX)
		document.body.dataset.mousePosY = String(event.clientY)
	}
)

// 圖片:變更長寬

// 文字:
// 移動
// 字大小
// 字顏色(預設白色)
// 字外框顏色 粗細(預設黑 1px)
// 背景顏色(預設透明)
// 對齊(預設置中) 



//  將網頁製成圖片(screen shot)

// paste event 得不到資料