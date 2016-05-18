var moduleName = 'js-intro',

	selector = '.' + moduleName,
	
	artBoardSelector = selector + '-art-board',//js-intro-art-board
	
	titleSelector = selector + '-title',//js-intro-title
	
	captionSelector = selector + '-caption',//js-intro-caption
	
	itemClassName = moduleName + '-art-board-item', //js-intro-art-board-item
	
	itemSelector = '.' + itemClassName,
	
	$els = $(selector),
	
	imageSize = [50, 50], // width, height
	
	images = [
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/133956/image-01.png',
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/133956/image-02.png',
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/133956/image-03.png',
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/133956/image-04.png',
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/133956/image-05.png',
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/133956/image-06.png',
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/133956/image-07.png',
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/133956/image-08.png',
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/133956/image-09.png'
	],
	
	coords = [
		'n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'
	],
	
	positions = {},
	
	startScale = 5,
	
	gridFragment = '',
	
	latest = 0,
	
	startTimeout,
	
	endTimeout,
	
	bezier = 'cubic-bezier(.17,.5,.83,.5)';

function setStyling() {
	var $el = $(this),
		index = _.random(0, images.length - 1),
		imageUrl = images[index];
	
	var coord = coords[_.random(0, coords.length - 1)],
		position = positions[coord],
		delay = _.random(0, 8) / 10,
		speed = _.random(12, 20) / 10,
		rotate = _.random(-30, 30);
	
	$el.css({
		transform: 'translate(' + position[0] + 'px, ' + position[1] + 'px) scale(' + startScale + ') rotate(' + rotate + 'deg)',
		opacity: 0,
		transition: 'all ' + speed + 's ' + delay + 's ' + bezier,
		backgroundImage: 'url(' + imageUrl + ')',
		zIndex: delay + (speed * 10)
	});
	
	if((delay + speed) > latest) {
		latest = (delay + speed);
	}
}

function fillArtBoard($el) {
	var width = $el.width(),
		height = $el.height(),
		itemsAxis = {
			x: Math.ceil(width / imageSize[0]),
			y: Math.ceil(height / imageSize[1])
		},
		itemsAmount = itemsAxis.x * itemsAxis.y;
	
	function createFragment(i) {
		gridFragment += '<div class="art-board__item ' + itemClassName + '"></div>';
	}
	
	_.times(itemsAmount, createFragment);
	$el.html(gridFragment);
	$(itemSelector).css({
		width: imageSize[0],
		height: imageSize[1]
	});
	
	$(itemSelector).each(setStyling);
	
	// reset width art board
	$el.css({
		width: itemsAxis.x * imageSize[0],
		height: itemsAxis.y * imageSize[1]
	});
	
	startTimeout = setTimeout(function() {
		$(itemSelector).addClass('animate');
	}, 300)
	
	endTimeout = setTimeout(function() {
		$(captionSelector).addClass('animate');
	}, (latest * 1000) - 50);
}

function sizeArtBoard($el, $helper) {
	var $artBoard = $el.find(artBoardSelector),
		$title = $el.find(titleSelector);
	
	$el.css({
		top: $helper.offset().top,
		left: $helper.offset().left,
		width: $helper.width(),
		height: $helper.height()
	});
}

function setup() {
	var $el = $(this),
		$artBoard = $el.find(artBoardSelector), //js-intro-art-board
		$title = $el.find(titleSelector); //js-intro-title
	
	positions = {
		n: [ //北
			$el.width() / 2,
			0 - (imageSize[1] * startScale)
		],
		ne: [ //东北
			$el.width() + (imageSize[1] * startScale),
			0 - (imageSize[1] * startScale)
		],
		e: [ //东
			$el.width() + (imageSize[1] * startScale),
			$el.height() / 2
		],
		se: [ //东南
			$el.width() + (imageSize[1] * startScale),
			$el.height()
		],
		s: [ //南
			$el.width() / 2,
			$el.height()
		],
		sw: [ //西南
			0 - (imageSize[0] * startScale),
			$el.height()
		],
		w: [ //西
			0 - (imageSize[0] * startScale),
			$el.height() / 2
		],
		nw: [ //西北
			0 - (imageSize[0] * startScale),
			0 - (imageSize[1] * startScale)
		]
	}
	
	sizeArtBoard($artBoard, $title);
	fillArtBoard($artBoard);
}

function init() {
	clearTimeout(startTimeout);
	clearTimeout(endTimeout);
	
	$(itemSelector).removeClass('animate'); //js-intro-art-board-item
	$(captionSelector).removeClass('animate'); //js-intro-caption
	
	if($els.length) {
		$els.each(setup);
	}
}

$(window).on('resize', init);

init();