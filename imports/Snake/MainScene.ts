import * as Phaser from 'phaser';
import PlayerSnake from './PlayerSnake'
import Apple from "./Apple"

export default class MainScene extends Phaser.Scene{

    player: PlayerSnake
    apple: Apple
    lastMoveTime: number;
    moveInterVal: number;
    score: number;

    constructor(Player: PlayerSnake, Apple: Apple){
        super("MainScene");
        this.player = Player;
        this.apple = Apple;
        this.lastMoveTime = 0;
        this.score = 0;
        this.moveInterVal = 500; //snake velocity
    }



    create(){
        this.player = new PlayerSnake(this);
        this.apple = new Apple(this);
    }
    

    update(time){
       if(time >= this.lastMoveTime  + this.moveInterVal){
        this.lastMoveTime = time;   
        this.move();
       }

       if((this.player.snakeBody[0].y  < 0 || this.player.snakeBody[0].y > 400) ||
       (this.player.snakeBody[0].x  < 0 || this.player.snakeBody[0].x > 400)) {
        this.player.snakeBody[0].y = 16;
        this.player.snakeBody[0].x = 16;
       }

    }

    move(){
        let x = this.player.snakeBody[0].x + this.player.Direction.x * 16;
        let y = this.player.snakeBody[0].y + this.player.Direction.y * 16;  

        if(this.apple.apple.x === x && this.apple.apple.y === y){
           this.player.eatFood();
           this.score++;
           console.log("Score: " + this.score);
           this.apple.newApple();
           this.moveInterVal = this.moveInterVal - 25;
           console.log("Velocity: " + this.moveInterVal);
        }   

        for(let i = this.player.snakeBody.length -1; i > 0; i--){
            this.player.snakeBody[i].x = this.player.snakeBody[i -1].x;
            this.player.snakeBody[i].y = this.player.snakeBody[i -1].y;
        }
        this.player.snakeBody[0].x = x
        this.player.snakeBody[0].y = y;
    }


}
