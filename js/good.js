/**
 *
 * いいねボタン
 *
 * body部にfontAwesomeとjQueryを読み込み後、
 * <p class="good"><i class="fa fa-thumbs-o-up fa-2x"></i></p>
 * に対してリッチな"いいね"挙動が走る。
 * このjsはheaderではなく、window loadで実行する必要あり。
 *
 * @author akimoto
 */

$(".good").on("click", function(){
    if(!$(this).children().hasClass("fa-blue")){
        var good = $(this).get(0);
        good.style.WebkitTransformOrigin = good.style.transformOrigin = '-10% 50%';
        rect = good.getBoundingClientRect();
        var posx = rect.left + (rect.right  - rect.left) / 2;
        var posy = rect.top  + (rect.bottom - rect.top)  / 2;

        // いいね花火
        const burst = new mojs.Burst({
            left: 0,
            top: 0,
            radius: { 0: 100 },
            count: 10,
            Opacity:10,
            children: {
                shape: 'circle',
                radius: 10,
                fill: ['deeppink', 'cyan', 'yellow'],
                strokeWidth: 5,
                duration: 2500,
                easing: 'circ.inout',
                yoyo: false,
                repeat: 1,
                speed:2
            }
        });
        // いいね移動
        const tween = new mojs.Tween({
            duration : 1500,
            onUpdate: function(progress) {
                if(progress > 0.3) {
                    var elasticOutProgress = mojs.easing.elastic.out(1.45*progress-0.01);
                    good.style.WebkitTransform = good.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1) rotate3d(0,0,0,90deg)';
                }
            }
        });

        // いいね花火発火
        burst
        .tune({ x: posx, y: posy })
        .setSpeed(3)
        .replay();

        // いいね移動発火
        tween
        .replay();

        // クリック後の色変更
        $(this).children().addClass('fa-blue');
    }else{
        // クリック後の色変更
        $(this).children().removeClass('fa-blue');
    }
});
