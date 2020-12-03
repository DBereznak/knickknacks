import * as Phaser from 'phaser';

export default class PlayerSnake{

    Scene: Phaser.Scene
    Direction: Phaser.Math.Vector2;
    body = [];


    constructor(scene: Phaser.Scene){
        this.Scene = scene;
        this.Direction = Phaser.Math.Vector2.RIGHT;
        this.body = [];
        this.body.push(this.Scene.add.rectangle(400, 300, 16, 16, 0x19af11).setOrigin(0));
        this.Scene.input.keyboard.on('keydown', e => {
            this.keydown(e);
        })
    }

    keydown(event: KeyboardEvent){
        switch(event.key){
            case "ArrowDown": //Down
            this.Direction = Phaser.Math.Vector2.DOWN;
            console.log(this.Direction);
            break;
            case "ArrowUp": //up
            this.Direction = Phaser.Math.Vector2.UP;
            console.log(this.Direction);
            break;
            case "ArrowRight": //right
            this.Direction = Phaser.Math.Vector2.RIGHT;
            console.log(this.Direction);
            break;
            case "ArrowLeft": //Left
            this.Direction = Phaser.Math.Vector2.LEFT;
            console.log(this.Direction);
            break;
        }
    }
  
}