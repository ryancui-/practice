const default_options = {
  play: false
};

class MyBanner {
  constructor(element, options) {
    this.scroller = element.querySelector('.banner-scroller');
    this.options = Object.assign({}, default_options, options);

    // 记录一下当前展示图片数组下标
    this.banners = element.querySelectorAll('.banner-item');
    this.currentShow = 0;

    // 当前状态：0-静止；1-左滑；2-右滑
    this.status = 0;
    this.animationEndCb = () => {
    };

    this.banners.forEach((b, i) => {
      if (i !== 0) {
        this._setRight(i);
      }
    });

    this.bindEvents();
  }

  bindEvents() {
    let startEvent;
    let endEvent;

    if ('ontouchstart' in document.documentElement) {
      this.scroller.addEventListener('touchstart', e => {
        this.touch = e.touches[0];
      });

      this.scroller.addEventListener('touchend', e => {
        const changed = e.changedTouches[0];
        if (changed.pageX - this.touch.pageX > 50) {
          this.scrollRight();
        } else if (this.touch.pageX - changed.pageX > 50) {
          this.scrollLeft();
        }
      });
    } else {
      this.scroller.addEventListener('mousedown', e => {
        this.touch = {
          offsetX: e.offsetX,
        };
      });

      this.scroller.addEventListener('mouseup', e => {
        if (e.offsetX - this.touch.offsetX > 50) {
          this.scrollRight();
        } else if (this.touch.offsetX - e.offsetX > 50) {
          this.scrollLeft();
        }
      });
    }

    this.scroller.addEventListener('animationend', e => {
      switch (this.status) {
        case 0:
          return;
        case 1:
        case 2:
          this.status = 0;
          this.animationEndCb();
      }
    });

    // 轮播
    if (this.options.play && typeof this.options.play === 'number') {
      setInterval(() => {
        this.scrollLeft();
      }, this.options.play + 300);
    }
  }

  scrollLeft() {
    let nextShow = this.currentShow + 1;
    if (nextShow === this.banners.length) {
      nextShow = 0;
    }

    this.status = 1;
    this.banners[this.currentShow].classList.add('center-to-left');
    this.banners[nextShow].classList.add('right-to-center');
    this.animationEndCb = () => {
      this._setLeft(this.currentShow);
      this._setCenter(nextShow);

      this.banners[this.currentShow].classList.remove('center-to-left');
      this.banners[nextShow].classList.remove('right-to-center');

      this.currentShow = nextShow;
    };
  }

  scrollRight() {
    let nextShow = this.currentShow - 1;
    if (nextShow < 0) {
      nextShow = this.banners.length - 1;
    }

    this.status = 2;
    this.banners[this.currentShow].classList.add('center-to-right');
    this.banners[nextShow].classList.add('left-to-center');
    this.animationEndCb = () => {
      this._setRight(this.currentShow);
      this._setCenter(nextShow);

      this.banners[this.currentShow].classList.remove('center-to-right');
      this.banners[nextShow].classList.remove('left-to-center');

      this.currentShow = nextShow;
    };
  }

  _setLeft(index) {
    this.banners[index].style.transform = 'translateX(-100%)';
  }

  _setCenter(index) {
    this.banners[index].style.transform = 'translateX(0)';
  }

  _setRight(index) {
    this.banners[index].style.transform = 'translateX(100%)';
  }
}

module.exports = MyBanner;
