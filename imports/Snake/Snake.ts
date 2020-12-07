import * as Phaser from 'phaser';
import MainScene from './MainScene'


class Snake {

    hostDiv: string;
    gameConfig: Phaser.Types.Core.GameConfig = {
        title: 'Typescript Phaser Snake',
        width: 400,
        height: 400,
        type: Phaser.AUTO,
        parent: 'snake',
        backgroundColor: '#6add5d',
        physics: {
            default: 'arcade',
            arcade: {
                debug: true
            }
        },
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


export {Snake}