import * as Phaser from 'phaser';
import PlayerSnake from './PlayerSnake'
import Apple from "./Apple"

export default class MainScene extends Phaser.Scene{

    player: PlayerSnake
    apple: Apple
    lastMoveTime: number;
    moveInterVal: number;
    score: number;
    scoreBoard: Phaser.GameObjects.Text;

    constructor(Player: PlayerSnake, Apple: Apple, ScoreBoard: Phaser.GameObjects.Text){
        super("MainScene");
        this.player = Player;
        this.apple = Apple;
        this.lastMoveTime = 0;
        this.score = 0;
        this.scoreBoard = ScoreBoard;
        this.moveInterVal = 500; //snake velocity
    }



    create(){
        this.player = new PlayerSnake(this);
        this.apple = new Apple(this);
        this.scoreBoard = this.add.text(325, 2, 'Score: ' + this.score, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fill: "#fff" });
    }
    

    update(time){
       if(time >= this.lastMoveTime  + this.moveInterVal){
        this.lastMoveTime = time;   
        this.move();
       }

       // death by hitting bounds
       if((this.player.snakeBody[0].y  < 0 || this.player.snakeBody[0].y > 400) ||
       (this.player.snakeBody[0].x  < 0 || this.player.snakeBody[0].x > 400)) {
            this.moveInterVal = 500;
            this.score = 0;
            this.scene.restart();
       }

       // death by eating tail
       let tail = this.player.snakeBody.slice(1);

       if(tail.some(s => s.x === this.player.snakeBody[0].x &&
        s.y === this.player.snakeBody[0].y)){
            this.moveInterVal = 500;
            this.score = 0;
            this.scene.restart();
        }
    }

    move(){
        let x = this.player.snakeBody[0].x + this.player.Direction.x * 16;
        let y = this.player.snakeBody[0].y + this.player.Direction.y * 16;  

        if(this.apple.apple.x === x && this.apple.apple.y === y){
           this.player.eatFood();
           this.score++;
           this.scoreBoard.text = 'Score: ' + this.score;
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
