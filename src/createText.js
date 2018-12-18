$(document.head).append(
	`
		<style>
			.text{
				color:white;
				font-size:28px;
				text-shadow: 
					-1px 0px  red,
					0px  1px  red,
					1px  0px  red,
					0px  -1px red;
				background-color:transparent;
				text-align:center;
				display:inline-block;
				min-height:1em;
				min-width:1em;
				line-height:1em;
				cursor:default !important;
			}
			.text:hover{
				outline:2px solid white;
			}
		</style>
	`
)



function createText(text){
	const textBlock = $(`<div class="text">${text}</div>`)[0]

	// close button
	textBlock.appendChild(createCloseButton(textBlock));
	// move
	setElemMoveFunc(textBlock)
	// click
	textBlock.addEventListener(
		"click", function(event){
			event.stopPropagation();event.preventDefault();
		}
	)

	textBlock.addEventListener(
		'contextmenu',function(event){
			event.stopPropagation();event.preventDefault();
			// 顯示選單
		}
	)

	return(textBlock)
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