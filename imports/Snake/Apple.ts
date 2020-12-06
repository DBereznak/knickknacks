import * as Phaser from "phaser"; 

export default class Apple extends Phaser.GameObjects.GameObject{

    Scene: Phaser.Scene;
    apple: any;
    randomX: number; // in bounds of board width
    randomY: number;
    constructor(scene: Phaser.Scene){
        super(scene, "Scene")
        this.Scene = scene;
        this.randomX = this.getRandom(400);
        this.randomY = this.getRandom(400);
        this.apple = this.Scene.add.circle(this.randomX, this.randomY, 8, 0xff0505).setOrigin(0);
    }

    getRandom(max: number){
        return Math.floor((Math.random() * max) / 16) * 16;
    }

    newApple(){
       this.apple.x = this.getRandom(400);
       this.apple.y = this.getRandom(400);
    }
}