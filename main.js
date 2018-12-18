$(document.head).append(
	`
		<style>
			body{
				background-color: black;
				color:white;
				min-height:calc(100vh);
				margin:0px;
				// padding-bottom:10px;
			}
			div{

			}
		</style>
	`
)



// 移入圖片功能
dropInFunc(document.body)


// 貼上圖片功能
async function pasteEvent(event){
	const items = event.clipboardData.items
	const elem = event.currentTarget;
	// console.log(event.clipboardData.items)

	for (let i = 0; i < items.length; i++) {
		const item = items[i]

		console.log(item)

		let newElem;

		
		if (item.type.match(/^image\//i)){

			const file = item.getAsFile();
			newElem = createImg(file);
		}

		else if (item.type.match(/^text\//i)) {
			function getStr(item){
				return(
					new Promise(
						function(resolve,reject){
							item.getAsString(
								function(string){resolve(string)}
							)
						}
					)
				)
			}
			const string = await getStr(item);
			// console.log(string);
			newElem = createText(string);
		}

		if(newElem instanceof Element){
			// 移到指定位置
			if(elem.dataset.hasOwnProperty("mousePosX") && elem.dataset.hasOwnProperty("mousePosY")){
				$(newElem).css(
					{
						"position":"absolute",
						"left":elem.dataset.mousePosX+"px",
						"top":elem.dataset.mousePosY+"px",
					}
				)
			}

			document.body.appendChild(newElem);
		}
	}
}

document.body.addEventListener("paste",pasteEvent)
// window.addEventListener("paste",pasteEvent)
// document.addEventListener("paste",pasteEvent)



// resize

// 文字:
// 字大小
// 字顏色(預設白色)
// 字外框顏色 粗細(預設黑 1px)
// 背景顏色(預設透明)
// 對齊(預設置中)



//  將網頁製成圖片(screen shot)

// paste event 得不到資料