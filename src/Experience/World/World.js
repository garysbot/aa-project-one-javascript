import Experience from '../Experience';
import Environment from './Environment';


export default class World{
  constructor(){
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources; // !--- Not Created Yet -----
    this.environment = new Environment();
  }

};