import * as Phaser from 'phaser';
import PlayerSnake from './PlayerSnake'

export default class MainScene extends Phaser.Scene{

    player: PlayerSnake

    constructor(Player: PlayerSnake){
        super("MainScene");
        this.player = Player;
    }

    create(){
        this.player = new PlayerSnake(this);
        console.log(this.player);
    }

    update(time){
       this.player.body[0].x += this.player.Direction.x;
       this.player.body[0].y += this.player.Direction.y;

       if((this.player.body[0].y  < 0 || this.player.body[0].y > 600) ||
       (this.player.body[0].x  < 0 || this.player.body[0].x > 800)) {
        this.player.body[0].y = 10;
        this.player.body[0].x = 10;
       }
    }
}
