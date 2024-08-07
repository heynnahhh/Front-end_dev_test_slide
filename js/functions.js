var currentIndex = 0;
var pointer = 0;
var tl = null;
var data = [];

$(document).ready(function() {
	parseData();
    insertInitialItemData();
});  

$(window).load(function () {
	animateSlide();
});

function parseData() {
	data = JSON.parse($('.DataHolder').text());
}

/**
 * Sets initial div.Item that contains the first 2 images in the data array
 * @returns nothing
 */
function insertInitialItemData(){
	$('.DisplayContainer').css('width', 2 * 100 + '%');

	for (var i = pointer; i <= pointer + 1 && i < data.length; i++) {
		$('.DisplayContainer').append('<div class="Item" id=' + i + ' style="background-image: url(' + data[i].imgPath + '); width: ' + (1 / 2 * 100) + '%;"></div>');
	}

	pointer+=2;
}

/**
 * Inserts the next image in the data array as div.Item
 * @returns nothing
 */
function insertNextItemData(){
	if(pointer < data.length){
		$('.DisplayContainer').append('<div class="Item" id=' + pointer + ' style="background-image: url(' + data[pointer].imgPath + '); width: ' + (1 / 2 * 100) + '%;"></div>');
		pointer++;
	}
}

/**
 * Removes the first div.Item inside div.DisplayContainer
 * @returns nothing
 */
function removeFirstItemData(){
	if (currentIndex < data.length - 1) {
		$('div.Item:first').remove();
	}
}

function animateSlide() {
	tl = new TimelineLite();

	setTimeout(animateItem, 3000);
}

function animateItem() {
	if (currentIndex < data.length - 1) {
		tl.fromTo(
			'.DisplayContainer', 						// move .DisplayContainer
			1, 											// moving time is 1 second
			{x: 0},										// starting position of animation
			{x: "-=" + $(window).width()} 				// move .DisplayContainer to the left by a distance of screen width
		)
		.add(insertNextItemData);						//adds callback function to the timeline

		currentIndex++;
		setTimeout(function(){
			removeFirstItemData();						// remove transitioned first div.Item
			animateItem();
		}
		, 3000);
	}
}