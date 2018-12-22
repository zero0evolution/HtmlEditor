$(document.head).append(
	`
		<style>
			.text{
				color:white;
				font-size:28px;
				text-shadow: 
					0px 0px 2px red,0px 0px 2px red,0px 0px 2px red,0px 0px 2px red,0px 0px 2px red,0px 0px 2px red,0px 0px 2px red,0px 0px 2px red;
				background-color:transparent;
				text-align:center;
				display:inline-block;
				min-height:1em;
				min-width:1em;
				line-height:1em;
				cursor:default !important;

				user-select:none;
				-moz-user-select: none;
				-webkit-user-select: none;
			}
			.text:hover{
				outline:2px solid white;
			}
		</style>
	`
)



function createText(text){
	const textBlock = $(`
		<div class="text">
			${text}
		</div>
	`)[0]
	

	// close button
	textBlock.appendChild(createCloseButton(textBlock));
	// move
	setElemMoveFunc(textBlock)
	// click
	textBlock.addEventListener(
		"click", function(event){
			event.stopPropagation();
			event.preventDefault();
		}
	)
	

	textBlock.addEventListener(
		'contextmenu',function(event){
			event.stopPropagation();
			event.preventDefault();
			// 顯示選單
			// 滑鼠位置 event.clientX,event.clientY
			const textBlock = event.currentTarget

			let settingBlock = textBlock.querySelector(".setting")
			if(!(settingBlock instanceof Element)){
				settingBlock = createTextSetting(textBlock)
				textBlock.appendChild(settingBlock)
			}

			settingBlock.style.top = String(event.clientY-textBlock.offsetTop)+"px"
			settingBlock.style.left = String(event.clientX-textBlock.offsetLeft)+"px"
		}
	)

	return(textBlock)
}

$(document.head).append(`
	<style>
		.setting{
			color:white;
			font-size:24px;
			background-color:black;
			text-align:left;
			display:inline-block;
			border:white 1px solid;
			position:absolute !important;
			text-shadow: none;
			white-space:nowrap;
		}
		.setting input,.setting textarea{
			color:white !important;
			background-color:black !important;
			font-size:24px !important;
		}

		.setting textarea {
			resize: none;
		}
	</style>
`)


function createTextSetting(target){
	// 字大小
	// 字顏色(預設白色)
	// 字外框顏色 
	// 字外框大小(預設黑 1px)
	// 背景顏色(預設透明)
	// 對齊(預設置中)
	const settingBlock = $(`
		<div class="setting">
			<div>
				大小
				<input name="fontSize" type="text">
			</div>

			<div>
				顏色
				<input name="color" type="text">
			</div>

			<div>
				背景顏色
				<input name="backgroundColor" type="text">
			</div>

			<div>
				對齊
				<input name="textAlign" type="text">
			</div>

			<div>
				外框設定
				<textarea name="textShadow"></textarea>
			</div>
		</div>
	`)[0]

	settingBlock.addEventListener(
		"mousedown", function(event){
			event.stopPropagation();
			// event.preventDefault();
		}
	)
	settingBlock.addEventListener(
		"mousemove", function(event){
			event.stopPropagation();
			event.preventDefault();
		}
	)
	settingBlock.addEventListener(
		"click", function(event){
			event.stopPropagation();
			event.preventDefault();
		}
	)
	settingBlock.addEventListener(
		"paste",function(event){
			event.stopPropagation();
			// event.preventDefault();
		}
	)


	for(const inputElem of settingBlock.querySelectorAll("input,textarea")){

		const elemStyle = getComputedStyle(target)
		inputElem.value = elemStyle[inputElem.name]

		inputElem.addEventListener(
			"click",(event)=>{
				event.stopPropagation();event.preventDefault();
			}
		)
		inputElem.addEventListener(
			"mousemove",(event)=>{
				event.stopPropagation();event.preventDefault();
			}
		)
		inputElem.addEventListener(
			"change",(event)=>{
				const inputElem = event.currentTarget
				target.style[inputElem.name] = inputElem.value
			}
		)

		if(inputElem.tagName.match(/^textarea$/i)){
			inputElem.resize()
			inputElem.addEventListener(
				"keyup",(event)=>{
					event.currentTarget.resize()
				}
			)
		}
		
	}

	settingBlock.appendChild(createCloseButton(settingBlock))

	return(settingBlock)
}


HTMLTextAreaElement.prototype.resize = function(){
	// console.log(this)
	this.style.height = "1px";
	this.style.height = (35+this.scrollHeight)+"px";
}

function dataTransferItemToStr(file){
	return(
		new Promise(
			function(resolve,reject){
				file.getAsString(
					function(string){
						resolve(string)
					}
				)
			}
		)
	)
}