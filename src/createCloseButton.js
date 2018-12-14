// <!-- create close button -->

$(document.head).append(
	`
		<style>
			.closeButton{
				position: absolute;
				right: 0px;
				top: 0px;
				font-size: 28px;
				line-height: 28px;
				filter: drop-shadow(rgb(0, 0, 0) 0px 0px 1px) drop-shadow(rgb(0, 0, 0) 0px 0px 1px);
				color: rgb(255, 255, 255);
				user-select: none;-moz-user-select: none;
				opacity: 0;
			}
			.closeButton:hover{
				opacity: 1;
			}
		</style>
	`
)

function createCloseButton(target){
	const closeButton = $(`<div class="closeButton">✖</div>`)[0];

	closeButton.addEventListener(
		"click",function(event){
			event.preventDefault();event.stopPropagation();
			target.remove();
		}
	)


	if($(target).css("position").match(/^(?:static|)$/)){
		$(target).css("position","relative")
	}

	return(closeButton)
}