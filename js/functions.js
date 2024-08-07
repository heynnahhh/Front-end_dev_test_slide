var currentIndex = 0;
var tl = null;
var data = [];

$(document).ready(function() {
	parseData();
    insertItemData();
});  

$(window).load(function () {
	animateSlide();
});

function parseData() {
	data = JSON.parse($('.DataHolder').text());
}

function insertItemData(){

	$('.DisplayContainer').css('width', data.length * 100 + '%');
	
	for (var i = 0; i < data.length; i++) {
		$('.DisplayContainer').append('<div class="Item" style="background-image: url(' + data[i].imgPath + '); width: ' + (1 / data.length * 100) + '%;"></div>');
	}
}

function animateSlide() {
	tl = new TimelineLite();

	setTimeout(animateItem, 3000);
}

function animateItem() {
	if (currentIndex < data.length - 1) {
		
		tl.to(
			'.DisplayContainer', 			// move .DisplayContainer
			1, 								// moving time is 1 second
			{x: "-=" + $(window).width()} 	// move .DisplayContainer to the left by a distance of screen width
		);

		currentIndex++;
		setTimeout(animateItem, 3000);
	}
}