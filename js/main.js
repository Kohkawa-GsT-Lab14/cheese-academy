'use strict';
{
// タイトルアニメーション
function GlowAnimeControl() {
	$('.glow-anime').on('inview', function(event, isInView) {
    if (isInView) {
      $(this).addClass('glow');
    // } else {//表示領域から出た時
    //   $(this).removeClass('glow');
    }
  });
}

$(window).on('load', function () {
	var element = $(".glow-anime");
	element.each(function () {
		var text = $(this).text();
		var textbox = "";
		text.split('').forEach(function (t, i) {
			if (t !== " ") {
				if (i < 10) {
					textbox += '<span style="animation-delay: .' + i + 's;">' + t + '</span>';
				} else {
					var n = i / 20;
					textbox += '<span style="animation-delay: ' + n + 's;">' + t + '</span>';
				}
			} else {
				textbox += t;
			}
		});
		$(this).html(textbox);
	});
  GlowAnimeControl();
});


// サブタイトルアニメーション
$('.top_sub-message').on('inview', function(event, isInView) {
  if (isInView) {
    $(this).addClass('fade-up');
  // } else {//表示領域から出た時
  //   $(this).removeClass('fade-up');
  }
});


//ヘッダーの高さ分だけコンテンツを下げる
$(function() {
  var height=$("#header").height();
  $("body").css("margin-top", height - 10);
});


// スクロール監視 ＋ アニメーション表示
function inViewCallback(entries, obs) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add('appear');
    obs.unobserve(entry.target);
  });
}

function onScrollCallback(entries) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      backToTop.classList.add('scrolled');
    } else {
      backToTop.classList.remove('scrolled');
    }
  });
}

const backToTop = document.getElementById('back-to-top');

const inViewObserver = new IntersectionObserver(inViewCallback, {
  threshold: 0.4,
});

document.querySelectorAll('.animate').forEach(el => {
  inViewObserver.observe(el);
});

const onScrollObserver = new IntersectionObserver(onScrollCallback);
onScrollObserver.observe(document.getElementById('target'));

backToTop.addEventListener('click', e => {
  e.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});


// コースカードアニメーションjQuery
function delayScrollAnime() {
	var time = 0.3;//遅延時間を増やす秒数の値
	var value = time;
	$('.course_container').each(function () {
		var parent = this;					//親要素を取得
		var elemPos = $(this).offset().top;//要素の位置まで来たら
		var scroll = $(window).scrollTop();//スクロール値を取得
		var windowHeight = $(window).height();//画面の高さを取得
		var childs = $(this).children();	//子要素を取得
		
		if (scroll >= elemPos - windowHeight && !$(parent).hasClass("play")) {//指定領域内にスクロールが入ったらまた親要素にクラスplayがなければ
			$(childs).each(function () {
				
				if (!$(this).hasClass("fadeUp")) {//アニメーションのクラス名が指定されているかどうかをチェック
					
					$(parent).addClass("play");	//親要素にクラス名playを追加
					$(this).css("animation-delay", value + "s");//アニメーション遅延のCSS animation-delayを追加し
					$(this).addClass("fadeUp");//アニメーションのクラス名を追加
					value = value + time;//delay時間を増加させる
					
					//全ての処理を終わったらplayを外す
					var index = $(childs).index(this);
					if((childs.length-1) == index){
						$(parent).removeClass("play");
					}
				}
			})
		// }else {
		// 	$(childs).removeClass("fadeUp");//アニメーションのクラス名を削除
		// 	value = time;//delay初期値の数値に戻す
		}
	})
}

	$(window).scroll(function (){
		delayScrollAnime();
	});


// スライドショー
new Splide( '.splide', {
  mediaQuery: 'max',
  fixedWidth: '24rem',
  gap: 20,
  type: 'loop',
  arrows: true,
  drag: 'true',
  flickPower: 300,
  pagination: false,

  autoScroll: {
    speed: 1,
    pauseOnHover: false,
    pauseOnFocus: false,
  },
}).mount( window.splide.Extensions );

}

// セレクトボックス初期値の文字色をグレー、選択後に黒、初期値は選択できない設定
// 'use strict'; を付けるとエラーになる？？？
function Color(trigger){
  if( trigger.value == 0 ){
    trigger.style.color = '';
  }else{
    trigger.style.color = 'black';
  }
}
