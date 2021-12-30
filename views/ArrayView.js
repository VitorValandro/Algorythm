class ArrayView {
  constructor(array, size) {
    this.array = array;
    this.canvasSize = size;
    this.canvas = document.createElement('canvas');
    this.canvas.width = size;
    this.canvas.height = size / 2;
  }

  render(element) {
    const ctx = this.canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.fillStyle = "#313C45";
    this.array.forEach((item, index) => {
      console.log(item, index)
      ctx.fillRect(1 * (index * 50), this.canvas.height - item * 5, item, item * 5);
    })

    element.appendChild(this.canvas);
  }
}