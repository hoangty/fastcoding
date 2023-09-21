import 'picturefill';
import 'smoothscroll-for-websites';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

// js/tsどっちでもこんな感じで読めます
import AnchorLink from './utils/ui/anchor-link';

export default class Main {
  constructor() {
    new AnchorLink();
    new Menu();
    new MvSlider();
    new Modal();
    new Effect();
  }
}
/* eslint-disable */
const MvSlider = () => {
  new Swiper('.mv-slider', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    loop: true,
    effect: 'fade',
    speed: 1000,
    navigation: {
      nextEl: '.mv .swiper-button-next',
      prevEl: '.mv .swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      // renderBullet: (index, className) => {
      renderBullet: function (index, className) {
        return '<span class="' + className + '">0' + (index + 1) + "</span>";
        // return `<span class=${className}>${index + 1}</span>`;
      },
    },
  });
}

const Menu = () => {
  const trigger = document.querySelector('#trigger');
  const wrap = document.querySelector('#header-nav');

  const Open = () => {
    trigger.classList.add('open');
    wrap.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  const Close = () => {
    trigger.classList.remove('open');
    wrap.classList.remove('active');
    document.body.style.overflow = '';
  };

  trigger.addEventListener('click', () => {
    if (!trigger.classList.contains('open')) {
      Open();
    } else {
      Close();
    }
  });
};

const Modal = () => {
  let btn = document.querySelectorAll("[data-modal]");
  let modal = document.querySelector('.img_modal');

  function modalBoxup (btn) {
    let modalId = btn.getAttribute('data-modal');
    let close = modal.querySelectorAll(".close");

    Array.prototype.forEach.call(close, (el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.remove('active')
      }, false);
    })

    btn.addEventListener('click', (el) =>{
      const img = document.createElement('img');
      img.src = modalId;
      img.alt = '';
      if (modal.classList.contains('active')) {
        modal.classList.remove('active');
      } else {
        modal.classList.add('active');
        modal.querySelector('.modal_content').innerHTML = '';
        modal.querySelector('.modal_content').append(img);
      }
    });
  }

  Array.prototype.forEach.call(btn, (el) => {
    modalBoxup(el);
  });
};


const isPartiallyVisible = (el) => {
  let elementBoundary = el.getBoundingClientRect();
  let top = elementBoundary.top;
  let bottom = elementBoundary.bottom;
  let height = elementBoundary.height;
  return ((top + height >= 0) && (height + window.innerHeight >= bottom));
}

const Effect = () => {
  const eles = document.querySelectorAll('.effect');
  const handling = () => {
    eles.forEach((el) => {
      if (isPartiallyVisible(el)) {
        el.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', handling, false);
  handling();
}

const Loadding = () => {
  if (document.getElementById('loading')) {
      document.body.style.overflow = "hidden";
      onReady(function() {
        setVisible('#loading');
      });
    } else {
      setTimeout(function() {
        Effect();
        document.querySelector('header').classList.add('active');
        document.body.style = "";
      }, 300);
    }
}

window.addEventListener('DOMContentLoaded', () => {
  new Main();
});
