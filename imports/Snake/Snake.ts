import * as Phaser from 'phaser';



class Snake {

    hostDiv: string;
    gameConfig: Phaser.Types.Core.GameConfig = {
        title: 'Typescript Phaser Snake',
        width: 800,
        height: 600,
        type: Phaser.AUTO,
        parent: 'snake',
        backgroundColor: '#4e2b7f',
        scene: [MainScene]
       }
       

    constructor(hostdiv: string){
        this.hostDiv = hostdiv;
    }

    createGame(){

        const hostContainer = document.getElementById(this.hostDiv);
        const board = document.createElement('div');
        board.classList.add('snake');
        hostContainer.appendChild(board);
        const snake = new Phaser.Game(this.gameConfig);
    }
}

class MainScene extends Phaser.Scene{
    constructor(){
        super("MainScene")
    }

    create(){}

    update(time){
        console.log("update")
    }
}

export {Snake}