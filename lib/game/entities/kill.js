ig.module(
	'game.entities.kill'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityKill = ig.Entity.extend({
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(255, 0, 0, 0.7)',
  _wmScalable: true,

  message: 'You Died!',
  killTimer: null,
  font: new ig.Font( 'media/04b03.font.png' ),

  checkAgainst: ig.Entity.TYPE.BOTH,

  update: function() {},

  check: function( other ) {
    other.kill();
    this.killTimer = new ig.Timer( 2 );
  },

  draw: function() {
    if( this.killTimer && this.killTimer.delta() < 0 ) {
      this.font.draw( this.message, ig.system.width/2, ig.system.height/2 );
    }
  }

});

});