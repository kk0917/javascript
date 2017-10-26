// グローバルナビゲーションにおけるモバイル用ナビゲーションメニューのソース生成と、メニューボタンクリック時の動作を実装する
(function() {
  var rwdMenu     = document.getElementById('globalNav');
  var switchPoint = 768;
  var slideSpeed  = 500;

  // ウィンドウの横幅を判別してグローバルナビゲーションのレイアウトを切り替える処理
  window.onload = function () {
    function menuSet() {
      // 現在のウィンドウサイズとブレークポイントの値を比較
      if (window.innerWidth < switchPoint) {
        if (document.getElementById('rwdMenuWrap') === null) {
          // body開始タグ直後にモバイル用ナビゲーションメニューを追加
          var spNav = document.createElement('div');
          spNav.setAttribute('id', 'rwdMenuWrap');
          spNav.innerHTML = "<div id='switchBtnArea'>"
                              + "<a href='javascript:void(0);' id='switchBtn'></a>"
                            + "</div>";
          document.body.insertBefore(spNav, document.body.firstChild);

          // モバイル用ナビゲーションメニューにグローバルナビゲーションのhtml要素を追加
          var menuSource = document.createElement('div');
          menuSource.innerHTML = rwdMenu.innerHTML;
          document.getElementById('rwdMenuWrap').appendChild(menuSource.firstElementChild);

          // 開閉ボタンクリック時のスライド展開アニメーションと、閉じるボタン用スタイル定義のクラス追加
          document.getElementById('switchBtn').addEventListener('click', function () {
            $( "#rwdMenuWrap > ul" ).slideToggle(slideSpeed);
            this.className = this.className === 'btnClose' ? '' : 'btnClose';
          }, false);
        }
      } else {
        var rwdMenuWrap = document.getElementById('rwdMenuWrap');
        if (rwdMenuWrap !== null) {
          rwdMenuWrap.parentNode.removeChild(rwdMenuWrap);
        }
      }
    }

    window.addEventListener("resize", function() {
      menuSet();
    }, false);

    menuSet();
  };
})();

// ページスクロール追従ナビゲーション
(function() {
  // ページ上端からナビゲーションエリアまでの距離をセット
  var setFixed = document.getElementById('globalNav');
  var menuTop  = setFixed.length ? setFixed.top + document.body.scrollTop : false;

  window.addEventListener('load', followingNavigation, false);
  window.addEventListener('scroll', followingNavigation, false);
  window.addEventListener('resize', followingNavigation, false);

  function followingNavigation() {
    // ウィンドウのスクロール値がナビゲーションエリアの上端位置を超えたら、
    if (window.pageYOffset > menuTop) {
      // 画面の左上に位置固定
      setFixed.style.top      = '0';
      setFixed.style.position = 'fixed';
    } else {
      // スクロール値がmenuTopの値以下になったら位置固定を解除
      setFixed.style.top      = 'auto';
      setFixed.style.position = 'static';
    }
  }
})();

// ページトップ
(function() {
  $(function(){
    $('body').append('<a href="javascript:void(0);" id="fixedTop">▲</a>');
    var fixedTop = $('#fixedTop');
    fixedTop.on('click',function(){
      $('html,body').animate({scrollTop:'0'},500);
    });
    $(window).on('load scroll resize',function(){
      var showTop = 100;
      if($(window).scrollTop() >= showTop){
        fixedTop.fadeIn('slow');
      } else if($(window).scrollTop() < showTop){
        fixedTop.fadeOut('slow');
      }
    });
  });
})();