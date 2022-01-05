class ArrayView {
  constructor(array, size) {
    this.array = array;
    this.canvasSize = size;
    this.canvas = document.createElement('canvas');
    this.canvas.width = size;
    this.canvas.height = size / 2;
    this.ctx = this.canvas.getContext('2d');
    this.bars = this.generateVisualArray();
  }

  generateVisualArray() {
    return this.array.reduce((arr, item, index) => {
      let bar = new Bar(
        1 * (index * 45) + 32.5, // x
        this.canvas.height - (this.canvas.height / 100 * item), // y
        30, // width
        this.canvas.height / 100 * item, // heigth
        item,
        index
      );
      arr.push(bar);
      return arr;
    }, []);
  }

  async swap(barLeft, barRight) {
    const left_x = barRight.x;
    barLeft.color = "red";
    barRight.color = "red";
    while (barLeft.x > left_x) {
      barLeft.x -= 1;
      barRight.x += 1;
      await sleep(10);

      this.render(document.getElementById("tempboilerplate"));
    }
    barLeft.color = "#313C45";
    barRight.color = "#313C45";
    this.bars = this.generateVisualArray();
    this.render(document.getElementById("tempboilerplate"));
  }

  render(element) {
    const ctx = this.canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    //ctx.fillStyle = "#313C45";
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

    element.appendChild(this.canvas);
  }
}

class Bar {
  constructor(x, y, width, height, value, index) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.value = value;
    this.index = index;
    this.color = "#313C45";
  }
}