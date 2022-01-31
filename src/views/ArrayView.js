class ArrayView {
  constructor(array, size, element) {
    this.array = array;
    this.canvasSize = size;
    this.canvas = document.createElement('canvas');
    this.canvas.width = size;
    this.canvas.height = size / 2;
    this.element = element;
    this.ctx = this.canvas.getContext('2d');
    this.bars = this.generateVisualArray();
  }

  generateVisualArray() {
    /*
    *   Method to iterate over this.array and populate this.bars with
    *   bars logical objects to help animate algorithm steps.
    */
    const self = this;

    return this.array.reduce((arr, item, index) => {
      let color = "#313C45";
      if (self.bars && self.bars[index].color != color && self.bars[index].color != '#FD413C') {
        color = self.bars[index].color;
      }

      let bar = new Bar(
        1 * (index * 45) + 32.5, // x
        this.canvas.height - (this.canvas.height / 100 * item), // y
        30, // width
        this.canvas.height / 100 * item, // heigth
        item,
        index,
        color
      );
      arr.push(bar);
      return arr;
    }, []);
  }

  async swap(a, b) {
    /*
    *   Method to logical swap in this.array and this.bars and
    *   animation swap in canvas.
    */
    // b > a
    const temp = this.array[a];
    this.array[a] = this.array[b];
    this.array[b] = temp;

    const barLeft = this.bars[a];
    const barRight = this.bars[b];

    /*
    *   saves the current color of barLeft before change it to red.
    *   In `barRight.color = temp_color`, the other receives this color.
    */
    const temp_color = barLeft.color;
    const left_x = barRight.x;

    // changes the color of bars to red during the swapping
    barLeft.color = "#FD413C";
    barRight.color = "#FD413C";

    while (barLeft.x > left_x) {
      // move the bars to each other's position.
      barLeft.x -= 1;
      barRight.x += 1;
      await sleep(10);

      this.render();
    }

    barRight.color = temp_color;

    // resets the this.bars array with the new this.array indexes
    this.bars = this.generateVisualArray();
    this.render();
  }

  render() {
    const ctx = this.canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.bars.forEach(bar => {
      ctx.fillStyle = bar.color;

      ctx.fillRect(
        bar.x,
        bar.y,
        bar.width,
        bar.height
      );

      ctx.fillStyle = 'white';
      ctx.font = "12px Arial";
      ctx.fillText(
        bar.value, // text
        bar.x + 7.5, // x
        this.canvas.height - (this.canvas.height / 100 * bar.value) / 2 // y
      );
    })

    this.element.appendChild(this.canvas);
  }
}

class Bar {
  constructor(x, y, width, height, value, index, color = "#313C45") {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.value = value;
    this.index = index;
    this.color = color;
  }
}