class ArrayView {
  constructor(array, size) {
    this.array = array;
    this.canvasSize = size;
    this.canvas = document.createElement('canvas');
    this.canvas.width = size;
    this.canvas.height = size / 2;
    this.ctx = this.canvas.getContext('2d');
    this.bars = array.reduce((arr, item, index) => {
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

  render(element) {
    const ctx = this.canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.fillStyle = "#313C45";
    this.bars.forEach(bar => {
      ctx.fillStyle = "#313C45";

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
  }
}