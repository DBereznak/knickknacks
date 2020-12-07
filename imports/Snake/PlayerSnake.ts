import * as Phaser from 'phaser';

export default class PlayerSnake extends Phaser.GameObjects.GameObject{

    Scene: Phaser.Scene;
    Direction: Phaser.Math.Vector2;
    snakeBody = [];


    constructor(scene: Phaser.Scene){
        super(scene, "Scene");
        this.Scene = scene;
        this.Direction = Phaser.Math.Vector2.RIGHT;
        this.snakeBody = [];
        this.snakeBody.push(this.Scene.add.rectangle(0, 0, 16, 16, 0x8c795b).setOrigin(0));
        this.Scene.input.keyboard.on('keydown', e => {
            this.keydown(e);
        })
    }
    eatFood(){
        this.snakeBody.push(this.Scene.add.rectangle(0, 0, 16, 16, 0x8c795b).setOrigin(0));
    }
    keydown(event: KeyboardEvent){
        switch(event.key){
            case "ArrowDown": //Down
                if(this.Direction !==  Phaser.Math.Vector2.UP)
                    this.Direction = Phaser.Math.Vector2.DOWN;
            break;
            case "ArrowUp": //up
                if(this.Direction !==  Phaser.Math.Vector2.DOWN)
                    this.Direction = Phaser.Math.Vector2.UP;
            break;
            case "ArrowRight": //right
                if(this.Direction !==  Phaser.Math.Vector2.LEFT)
                    this.Direction = Phaser.Math.Vector2.RIGHT;
            break;
            case "ArrowLeft": //Left
                if(this.Direction !==  Phaser.Math.Vector2.RIGHT)
                    this.Direction = Phaser.Math.Vector2.LEFT;
            break;
        }
    }
  
}