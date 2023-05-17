ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity',
	'plugins.box2d.entity'
)
.defines(function(){

EntityPlayer = ig.Box2DEntity.extend({
	size: {x: 8, y:14}, // hitbox size
	offset: {x: 4, y: 2}, // keeps player centered

	type: ig.Entity.TYPE.A,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER, // Collision is already handled by Box2D!

	animSheet: new ig.AnimationSheet( 'media/player.png', 16, 24 ),

	flip: false,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		// Add the animations
		this.addAnim( 'idle', 1, [0] ); // idle anim (0)
		this.addAnim( 'jump', 0.01, [1,2] ); // cycles through the jumping anims (1 & 2)

		if(!ig.global.wm) {
			this.body.SetFixedRotation(true); // stops player from spinnig uncontrolably
		}
	},


	update: function() {
		// move left or right
		if( ig.input.state('left') ) {
			this.body.ApplyForce( new Box2D.Common.Math.b2Vec2(-20,0), this.body.GetPosition() );
			this.flip = true;
		}
		else if( ig.input.state('right') ) {
			this.body.ApplyForce( new Box2D.Common.Math.b2Vec2(20,0), this.body.GetPosition() );
			this.flip = false;
		}

		// jetpack
		if( ig.input.state('jump') ) {
			this.body.ApplyForce( new Box2D.Common.Math.b2Vec2(0,-30), this.body.GetPosition() );
			this.currentAnim = this.anims.jump;
		}
		else {
			this.currentAnim = this.anims.idle;
		}

		// shoot
		if( ig.input.pressed('shoot') ) {
			var x = this.pos.x + (this.flip ? -6 : 6 );
			var y = this.pos.y + 8;
			ig.game.spawnEntity( EntityProjectile, x, y, {flip:this.flip} );
		}

		this.currentAnim.flip.x = this.flip;

		// move!
		this.parent();
	}
});


EntityProjectile = ig.Box2DEntity.extend({
	size: {x: 6, y: 2},

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.B,
	collides: ig.Entity.COLLIDES.NEVER, // Collision is already handled by Box2D!

	animSheet: new ig.AnimationSheet( 'media/projectile.png', 6, 2 ),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );

		this.addAnim( 'idle', 1, [0] );
		this.currentAnim.flip.x = settings.flip;

		var velocity = (settings.flip ? -5 : 5);
		this.body.ApplyImpulse( new Box2D.Common.Math.b2Vec2(velocity,0), this.body.GetPosition() );
	}
});

});

// EntityPlayerGibGun = EntityParticle.extend({
//         lifetime: 2,
//         fadetime: 0.4,
//         size: {
//             x: 8,
//             y: 8
//         },
//         friction: {
//             x: 30,
//             y: 0
//         },
//         vel: {
//             x: 60,
//             y: 50
//         },
//         animSheet: new ig.AnimationSheet('media/sprites/player.png',8,8),
//         init: function(x, y, settings) {
//             this.addAnim('idle', 0.5, [11]);
//             this.parent(x, y, settings);
//             this.currentAnim.flip.y = false;
//         }
//     });