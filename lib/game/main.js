ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'impact.font',

	'game.entities.player',
	'game.entities.crate',
	'game.levels.test',
  'game.entities.kill',
  'game.entities.levelchange',

	'plugins.box2d.game'
)
.defines(function(){

MyGame = ig.Box2DGame.extend({

	gravity: 155, // All entities are affected by this

	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	clearColor: '#1b2026',

	init: function() {
		// Bind keys
		ig.input.bind( ig.KEY.A, 'left' );
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.D, 'right' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.SPACE, 'jump' );
		ig.input.bind( ig.KEY.UP_ARROW, 'jump' );
		ig.input.bind( ig.KEY.W, 'jump' );
		ig.input.bind( ig.KEY.ENTER, 'shoot' );
		ig.input.bind( ig.KEY.MOUSE1, 'shoot' );

		if( ig.ua.mobile ) {
			ig.input.bindTouch( '#buttonLeft', 'left' );
			ig.input.bindTouch( '#buttonRight', 'right' );
			ig.input.bindTouch( '#buttonShoot', 'shoot' );
			ig.input.bindTouch( '#buttonJump', 'jump' );
		}

		// Load the LevelTest as required above ('game.level.test')
		this.loadLevel( LevelTest );
	},

	loadLevel: function( data ) {
		this.parent( data );
		for( var i = 0; i < this.backgroundMaps.length; i++ ) {
			this.backgroundMaps[i].preRender = true;
		}
	},

	update: function() {
		// Update all entities and BackgroundMaps
		this.parent();

		// screen follows the player
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) {
			this.screen.x = player.pos.x - ig.system.width/2; // keeps player in the middle of screen all time
			this.screen.y = player.pos.y - ig.system.height/2;
		}
	},

	draw: function() {
		// Draw all entities and BackgroundMaps
		this.parent();

		if( !ig.ua.mobile ) {
			this.font.draw( 'WASD, Arrow Keys, ENTER', 2, 2 ); // directions in top
		}
	}
});


if( ig.ua.iPad ) {
	ig.Sound.enabled = false;
	ig.main('#canvas', MyGame, 60, 240, 160, 2);
}
else if( ig.ua.mobile ) {
	ig.Sound.enabled = false;
	ig.main('#canvas', MyGame, 60, 160, 160, 2);
}
else {
	ig.main('#canvas', MyGame, 60, 320, 240, 2);
}

});
