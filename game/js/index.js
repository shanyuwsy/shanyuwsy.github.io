// Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen

(function(){
	
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.binding();
			this.paused = false;
     	this.guess = null;
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- http://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="http://vignette1.wikia.nocookie.net/evchk/images/4/44/G-icon09_resize.gif"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "nmw",
			img: "http://www.starship-ent.com/files/attach/images/242/361/551/2859912c12084353650f0df56cb84c7d.jpg",
			id: 1,
		},
		{
			name: "jo",
			img: "http://www.starship-ent.com/files/attach/images/242/359/551/1232eb7e32a941150980996730d453b4.jpg",
			id: 2
		},
		{
			name: "ljm",
			img: "http://www.starship-ent.com/files/attach/images/242/357/551/17154aba0ea073a0f1e57a6c08b9b314.jpg",
			id: 3
		},
		{
			name: "shs",
			img: "http://www.starship-ent.com/files/attach/images/242/355/551/868fc06f6dcee75429e2a2d2a4c315b2.jpg",
			id: 4
		}, 
		{
			name: "kdh",
			img: "http://www.starship-ent.com/files/attach/images/242/352/551/42cfead2527c10ddba732334b142ebe7.jpg",
			id: 5
		},
		{
			name: "rapmons",
			img: "https://s3-ap-northeast-1.amazonaws.com/ibighit/ilarge/2.jpg",
			id: 6
		},
		{
			name: "suga",
			img: "https://s3-ap-northeast-1.amazonaws.com/ibighit/ilarge/5.jpg",
			id: 7
		},
		{
			name: "jin",
			img: "https://s3-ap-northeast-1.amazonaws.com/ibighit/ilarge/7.jpg",
			id: 8
		},
		{
			name: "jhope",
			img: "https://s3-ap-northeast-1.amazonaws.com/ibighit/ilarge/9.jpg",
			id: 9
		},
		{
			name: "jimin",
			img: "https://s3-ap-northeast-1.amazonaws.com/ibighit/ilarge/10.jpg",
			id: 10
		},
		{
			name: "v",
			img: "https://s3-ap-northeast-1.amazonaws.com/ibighit/ilarge/12.jpg",
			id: 11
		},
		{
			name: "jungkook",
			img: "https://s3-ap-northeast-1.amazonaws.com/ibighit/ilarge/15.jpg",
			id: 12
		},
	];
    
	Memory.init(cards);


})();