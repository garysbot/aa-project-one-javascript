import * as dat from 'lil-gui';

export default class Debug{
  constructor(){
    // Check URL (via Window:location) for "https...#debug" hash
    this.active = window.location.hash === '#debug'

    // If URL has "#hash", display the UI debug GUI
    if (this.active){
      this.ui = new dat.GUI();
    }

  }
}