// グローバルナビゲーションにおけるモバイル用ナビゲーションメニューのソース生成と、メニューボタンクリック時の動作を実装する
(function() {
  var rwdMenu     = document.getElementById('globalNav');
  var switchPoint = 768;
  var slideSpeed  = 500;
  // var menuSource  = rwdMenu.html();
  var menuSource  = rwdMenu.innerHTML;

  // ウィンドウの横幅を判別してグローバルナビゲーションのレイアウトを切り替える処理
  window.onload = function () {
    function menuSet() {
      // 現在のウィンドウサイズとブレークポイントの値を比較
      if (window.innerWidth < switchPoint) {
        if (!$( "#rwdMenuWrap" ).length) {
          // body開始タグ直後にモバイル用ナビゲーションメニューのベースを追加
          $( "body" ).prepend(
            "<div id='rwdMenuWrap'>"
              + "<div id='switchBtnArea'>"
                + "<a href='javascript:void(0);' id='switchBtn'></a>"
              + "</div>"
            + "</div>");
          // モバイル用ナビゲーションメニューにグローバルナビゲーションのhtml要素を追加
          $( "#rwdMenuWrap" ).append( menuSource );

          var menuList  = $( "#rwdMenuWrap > ul" );
          var switchBtn = $( "#switchBtn" );

          // 開閉ボタンクリック時のスライド展開アニメーションと、閉じるボタン用スタイル定義のクラス追加
          switchBtn.on("click", function() {
            menuList.slideToggle(slideSpeed);
            $( this ).toggleClass( "btnClose" );
          });
        }
      } else {
        $( "#rwdMenuWrap" ).remove();
      }
    }

    $( window ).on("resize", function() {
      menuSet();
    });

    menuSet();
  };
})();

// ページ上端からナビゲーションエリアまでの距離をセット
(function() {
  var setFixed = $( "#globalNav" );
  var menuTop  = setFixed.length ? setFixed.offset().top : false;

  $( window ).on("load scroll resize", function() {
    // スクロール値がナビゲーションエリアの上端位置を超えたら、
    if ($( window ).scrollTop() > menuTop) {
      // 画面の左上に位置固定
      setFixed.css({top:"0", position:"fixed"});
    } else {
      // スクロール値がmenuTopの値以下になったら位置固定を解除
      setFixed.css({top:"auto", position:"static"});
    }
  });
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