// This is a dialog implemention

const defaultOptions = {
  title: '提示',
  content: '',
  onCancel: () => {
  },
  onConfirm: () => {
  }
};

class MyDialog {
  constructor(options) {
    const mergedOptions = Object.assign({}, defaultOptions, options);

    this.$body = document.getElementsByTagName('body')[0];

    this.title = mergedOptions.title;
    this.content = mergedOptions.content;
    this.onCancel = mergedOptions.onCancel;
    this.onConfirm = mergedOptions.onConfirm;

    this._moving = false;

    this.initDom();
    this.bindEvents();
  }

  initDom() {
    this.$dialog = document.createElement('div');
    this.$dialog.classList.add('dialog');

    this.$title = document.createElement('div');
    this.$title.classList.add('title');
    this.$title.textContent = this.title;

    this.$content = document.createElement('div');
    this.$content.classList.add('content');
    this.$content.textContent = this.content;

    this.$buttons = document.createElement('div');
    this.$buttons.classList.add('buttons');

    this.$cancel = document.createElement('button');
    this.$cancel.classList.add('cancel');
    this.$cancel.textContent = '取消';
    this.$confirm = document.createElement('button');
    this.$confirm.classList.add('confirm');
    this.$confirm.textContent = '确定';

    this.$buttons.appendChild(this.$cancel);
    this.$buttons.appendChild(this.$confirm);

    this.$dialog.appendChild(this.$title);
    this.$dialog.appendChild(this.$content);
    this.$dialog.appendChild(this.$buttons);

    this.$dialog.style.top = '10px';
    this.$dialog.style.left = '10px';

    this.$body.appendChild(this.$dialog);
  }

  destroy() {
    this.$body.removeChild(this.$dialog);
  }

  bindEvents() {
    this.$cancel.addEventListener('click', () => {
      this.onCancel();
      this.destroy();
    });

    this.$confirm.addEventListener('click', () => {
      this.onConfirm();
      this.destroy();
    });

    this.$title.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.$body.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.$title.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  handleMouseDown(e) {
    this._moving = true;
    this.clickPoint = {
      x: e.offsetX,
      y: e.offsetY
    };
  }

  handleMouseUp() {
    this._moving = false;
  }

  handleMouseMove(e) {
    if (this._moving) {
      this.$dialog.style.top = `${e.pageY - this.clickPoint.y}px`;
      this.$dialog.style.left = `${e.pageX - this.clickPoint.x}px`;
    }
  }
}
