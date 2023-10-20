import EventEmitter from "./EventEmitter";

export default class Sizes extends EventEmitter {
  constructor(){
    super();
    // Setup
    // Tie sizes to DOM window size
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    // Account for pixel ratio to standardize rendering
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    // Resize Event Listener
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
      this.trigger('resize');
    })
  }
};