import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';

export default class Experience
{
  constructor(canvas)
  {
    // Testing
    // console.log('Hello heres the experience');
    
    // Global Access
    window.experience = this;

    // Options
    this.canvas = canvas;

    // Setup
    this.sizes = new Sizes();
    this.time = new Time();

    // Resize Event
    this.sizes.on('resize', () => 
    {
      // Test
      // console.log('A resize has occurred');

      this.resize();
    });

    // // Resizing warning test
    // console.log(this.sizes.width);
    // console.log(this.sizes.height);
    // console.log(this.sizes.pixelRatio);


    resize()
    {
      
    }


  }
};
