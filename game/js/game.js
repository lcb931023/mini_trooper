    window.onload = function() {
        
        function preload () {

            //load elbin image
            game.load.image('logo', 'images/elbin.png');

        }
        
        //variable for score
        var score = 0;
        var scoreText;
        var elbin;
        var cursors;

        function create () {
        
        //background color
        game.stage.backgroundColor = '#FFF';

        elbin = this.game.add.sprite(50, game.world.centerY, 'logo');
        elbin.anchor.setTo(0.5, 0.5);
            
        //make elbins face smaller
        elbin.scale.setTo(0.3, 0.3);
            
        //enable physics so elbin can move
        game.physics.enable(elbin, Phaser.Physics.ARCADE);
            
        //Keyboard controls
        cursors = game.input.keyboard.createCursorKeys();

        }
        
        function update() {
            
            if (cursors.right.isDown){
                //  Move to the right
                elbin.body.velocity.x = 150;
            } 
            else {
                //Don't move
                elbin.body.velocity.x = 0;
            }            
                        
        }

};