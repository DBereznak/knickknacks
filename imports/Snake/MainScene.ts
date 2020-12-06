import * as Phaser from 'phaser';
import PlayerSnake from './PlayerSnake'
import Apple from "./Apple"

export default class MainScene extends Phaser.Scene{

    player: PlayerSnake
    apple: Apple
    physics: Phaser.Physics.Arcade.ArcadePhysics
    lastMoveTime: number;
    moveInterVal: number;

    constructor(Player: PlayerSnake){
        super("MainScene");
        this.player = Player;
        this.lastMoveTime = 0;
        this.moveInterVal = 500;
    }



    create(){
        this.player = new PlayerSnake(this);
        this.apple = new Apple(this);
        this.physics.add.existing(this.player);
        this.physics.add.existing(this.apple);
        console.log(this.player);
    }
    

    update(time){
       
       if(time >= this.lastMoveTime  + this.moveInterVal){
        this.lastMoveTime = time;   
        this.move();
       }
       if((this.player.snakeBody[0].y  < 0 || this.player.snakeBody[0].y > 600) ||
       (this.player.snakeBody[0].x  < 0 || this.player.snakeBody[0].x > 800)) {
        this.player.snakeBody[0].y = 10;
        this.player.snakeBody[0].x = 10;
       }
    }

    move(){
        for(let i = this.player.snakeBody.length -1; i > 0; i--){
            this.player.snakeBody[i].x = this.player.snakeBody[i -1].x;
            this.player.snakeBody[i].y = this.player.snakeBody[i -1].y;
        }
        this.player.snakeBody[0].x += this.player.Direction.x * 16;
        this.player.snakeBody[0].y += this.player.Direction.y * 16;
    }
}
