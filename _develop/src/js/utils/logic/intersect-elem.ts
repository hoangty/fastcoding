/*

【pug】
.intersect-elem

add delay
.intersect-elem(data-delay="0.1")



【css（exemple】
.intersect-elem {
  opacity: 0;
  transition: opacity 1s ease-out;
  &.active {
    opacity: 1;
  }
}
*/
export default class IntersectElements {
  constructor() {
    const intersectElements: HTMLElement[] = Array.prototype.slice.call(document.getElementsByClassName('intersect-elem'));
    for (const elem of intersectElements) {
      new IntersectElem(elem);
    }
  }
}

class IntersectElem {
  private node: HTMLElement;
  private io: IntersectionObserver | null = null;

  constructor(node: HTMLElement) {
    this.node = node;
    if (this.node.classList.toString().includes('standby')) {
      return;
    }

    this.node.classList.add('standby');
    this.io = new IntersectionObserver(this.onIntersect, { rootMargin: '-20% 0% -20% 0%' });
    this.io.observe(this.node);
  }
  private onIntersect = (changes: IntersectionObserverEntry[]): void => {
    if (changes[0].isIntersecting) {
      const delay: number = this.node.dataset.delay ? Number(this.node.dataset.delay) : 0;

      setTimeout(() => {
        this.node.classList.add('active');
        this.io?.unobserve(this.node);
        this.io = null;
      }, delay * 1000);
    }
  };
}
