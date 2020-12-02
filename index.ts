import './style.scss';
import  {ImageUploader} from "./imports/imageUploader/imageUploader";
import {Snake} from "./imports/Snake/Snake"


const imageUploader = new ImageUploader("main");
const snakeGame = new Snake("main");

imageUploader.createImageUploader();
snakeGame.createGame();
