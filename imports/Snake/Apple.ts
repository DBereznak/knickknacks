import * as Phaser from "phaser"; 

export default class Apple{

    Scene: Phaser.Scene;
    apple: any;
    randomX: number; // board width
    randomY: number; // board height
    constructor(scene: Phaser.Scene){
        this.Scene = scene;
        this.randomX = this.getRandom(800);
        this.randomY = this.getRandom(600);
        this.apple = this.Scene.add.circle(this.randomX, this.randomY, 8, 0xff0505);
    }

    getRandom(max: number){
        return Math.floor(Math.random() * Math.floor(max))
    }
}