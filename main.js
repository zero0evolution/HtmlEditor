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

document.body.addEventListener(
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
)

window.oncontextmenu = ()=>false




document.body.addEventListener(
	"paste",function(event){

		console.log(event.clipboardData.items)

		// for(const item of items) {
			
		// 	if (!item.type.match(/image/)) {continue;}

		// 	const imgBlock = createImg(item);
		// 	document.body.appendChild(imgBlock);
		// }
	},false
)


// paste event 得不到資料

// 右鍵顯示選單:選擇增加圖片或文字

// 文字:
// 移動
// 字大小
// 字顏色(預設白色)
// 字外框顏色 粗細(預設黑 1px)
// 背景顏色(預設透明)
// 對齊(預設置中) 

//  圖片:變更長寬 

//  將網頁製成圖片(screen shot)