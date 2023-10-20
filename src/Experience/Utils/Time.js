import EventEmitter from "./EventEmitter.js";

export default class Time extends EventEmitter {
  constructor(){
    super();

    // Setup
    // contains timestamp from when experience starts
    this.start = Date.now();
    // contains the current timestamp and changes on each frame
    this.current = this.start;
    // contains how much time was spent since the start of the experience
    this.elapsed = 0;
    // time spent since prev frame; 16ms is close to the time between two frames
    this.delta = 16;
  }

  tick(){
    // Test
    console.log('tick');

    window.requestAnimationFrame(() => {
      this.tick();
    })
  }

}