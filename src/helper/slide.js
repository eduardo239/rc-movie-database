export class SlideStories {
  constructor(id, slide, items, nextButton, prevButton, thumb) {
    this.slide = slide;
    this.items = items.childNodes;
    this.nextButton = nextButton;
    this.prevButton = prevButton;
    this.thumb = thumb;
    this.active = 0;
    this.init();
  }

  activeSlide(index) {
    this.active = index;

    this.items.forEach((item) => item.classList.remove('active'));
    this.items[index].classList.add('active');

    this.thumbItems.forEach((item) => item.classList.remove('active'));
    this.thumbItems[index].classList.add('active');

    this.autoSlide();
  }

  next() {
    if (this.active < this.items.length - 1) {
      this.activeSlide(this.active + 1);
    } else {
      this.activeSlide(0);
    }
  }

  prev() {
    if (this.active > 0) {
      this.activeSlide(this.active - 1);
    } else {
      this.activeSlide(this.items.length - 1);
    }
  }

  addNavigation() {
    const nextButton = this.nextButton;
    const prevButton = this.prevButton;

    nextButton.addEventListener('click', this.next);
    prevButton.addEventListener('click', this.prev);
  }

  addThumbItems() {
    this.items.forEach(() => (this.thumb.innerHTML += '<span></span>'));
    this.thumbItems = Array.from(this.thumb.children);
  }

  autoSlide() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.next, 5000);
  }

  init() {
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    // this.items = this.slide.querySelectorAll('.App-slide--items > *');
    // this.t = this.thumb;
    this.addThumbItems();
    this.activeSlide(0);
    this.addNavigation();
  }
}
