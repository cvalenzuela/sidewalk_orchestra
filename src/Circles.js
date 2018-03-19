class Circles {
  constructor() {
    this.circles = [];
  }

  getAll() {
    return this.circles;
  }

  removeAll() {
    this.circles = [];
  }

  add(trigger) {
    this.circles.push(trigger);
  }
  
  remove(circle) {
    const index = this.circles.map(x => x.id).indexOf(trigger.id);
    this.circles.splice(index, 1);
  }
}

const cirles = new Circles();

export default cirles;