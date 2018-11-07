class MyBanner {
  constructor(element) {
    this.scroller = element.querySelector('.banner-scroller');
    this.banners = [];

    element.querySelectorAll('.banner-item').forEach((banner, index) => {
      const obj = { banner };

      Object.defineProperty(obj, 'x', {
        get() {
          return obj._x;
        },
        set(val) {
          obj._x = val;
          obj.banner.style.transform = `translateX(${val}%)`;
        }
      });

      obj.x = index * 100;
      this.banners.push(obj);
    });

    this.bindEvents();
  }

  bindEvents() {
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
  }

  scrollLeft() {
    let flag = this.banners[this.banners.length - 1].x === 0;
    if (flag) {
      this.banners.slice(0, this.banners.length - 1).forEach((banner, index) => {
        banner.x = (index + 1) * 100;
      });
    }

    setTimeout(() => {
      this.scroller.classList.add('banner-scroller-transition');
      this.banners.forEach(banner => {
        banner.x -= 100;
      });
      setTimeout(() => {
        this.scroller.classList.remove('banner-scroller-transition');
        if (flag) {
          this.banners[this.banners.length - 1].x = (this.banners.length - 1) * 100;
        }
      }, 400);
    }, 100);
  }

  scrollRight() {
    let flag = this.banners[0].x === 0;
    if (flag) {
      this.banners.slice(1).forEach((banner, index) => {
        banner.x = (index + 1 - this.banners.length) * 100;
      });
    }

    setTimeout(() => {
      this.scroller.classList.add('banner-scroller-transition');
      this.banners.forEach(banner => {
        banner.x += 100;
      });
      setTimeout(() => {
        this.scroller.classList.remove('banner-scroller-transition');
        if (flag) {
          this.banners[0].x = -(this.banners.length - 1) * 100;
        }
      }, 400);
    }, 100);
  }
}

module.exports = MyBanner;
