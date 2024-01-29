/*ポップアップメニューバー*/
window.addEventListener("scroll", () => {
  const popup = this.document.getElementById("popupHeader");
  const scroll = window.scrollY;
  const windowHeight = window.innerHeight;
  if (scroll > windowHeight) {
    popup.style.display = "flex";
  } else {
    popup.style.display = "none";
  }
});

/*トップイメージスライド*/
$(function () {
  $('.topImage__slide').slick({
    fade: true,
    autoplay: true,
    infinite: true,
    speed: 3000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    adaptiveHeight: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    arrows: false,
  });
});

/*トップイメージスライドSP*/
$(function () {
  $('.topImage__slide--sp').slick({
    fade: true,
    autoplay: true,
    infinite: true,
    speed: 3000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    adaptiveHeight: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    arrows: false,
  });
});

/*タイトル文字フェードイン*/
$(function () {
  $(".topImage__logoTitle").hide().fadeIn(3000);
});

$(function () {
  $(".topImage__logoSubTitle").hide().fadeIn(5000);
});

/*文字フェードイン*/
document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".fadeInContents");
  let fadeInFlags = Array(elements.length).fill(false);

  function handleScroll() {
    elements.forEach((element, index) => {
      if (!fadeInFlags[index]) {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;

        // 画面内に要素が現れたかどうかを判定
        if ((elementTop >= 0 && elementTop <= windowHeight) || (elementBottom >= 0 && elementBottom <= windowHeight)) {
          element.classList.add("--fadeIn");
          fadeInFlags[index] = true; // フェードインが発生したらフラグを設定
        }
      }
    });
  }

  // 初回読み込み時にも実行
  handleScroll();

  // スクロール時にイベントを発火
  window.addEventListener("scroll", handleScroll);
});

/*ワールドスライド*/
$(function () {
  $('.world__slide').slick({
    autoplay: true,
    infinite: true,
    speed: 4000,
    autoplaySpeed: 0,
    slidesToShow: 5,
    adaptiveHeight: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    arrows: false,
    rtl: true,
    cssEase: 'linear',
  });
});

/*ワールドスライドSP*/
$(function () {
  $('.world__slide--sp').slick({
    autoplay: true,
    infinite: true,
    speed: 4000,
    autoplaySpeed: 0,
    slidesToShow: 1,
    adaptiveHeight: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    arrows: false,
    rtl: true,
    cssEase: 'linear',
  });
});

/*ゆっくりスクロール*/
// スクロールアニメーションの関数
const animateScroll = (targetElement) => {
  const start = window.scrollY;
  const target = targetElement.getBoundingClientRect().top + window.scrollY;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
  // スクロールの秒数を指定
  const duration = 1000; // ミリ秒
  // イーズインアウト関数
  const easeInOutQuad = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const animate = () => {
    const currentTime = 'now' in window.performance ? performance.now() : new Date().getTime();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutQuad(progress);

    window.scroll(0, start + easedProgress * (target - start));

    if (elapsed < duration) {
      requestAnimationFrame(animate);
    } else {
      // アニメーションが完了したら、URLを更新する
      window.history.pushState({}, '', `#${targetElement.id}`);
    }
  };

  animate();
};

// ページ内リンクがクリックされたときの処理
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();

    const targetId = anchor.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      animateScroll(targetElement);
    }
  });
});

// popstate イベントが発生したときの処理
window.addEventListener('popstate', () => {
  const targetId = window.location.hash.substring(1);
  const targetElement = document.getElementById(targetId);

  if (targetElement) {
    animateScroll(targetElement);
  }
});