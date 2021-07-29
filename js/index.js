// 导航
$(function(){
    $(".ss_listBg").mouseenter(function(){
        $(this).children(".ss_list_bg").stop(true).slideDown();
    })
    $(".ss_listBg").mouseleave(function(){
        $(this).children(".ss_list_bg").stop(true).slideUp();
    })
})
// <!--左边购物列表导航-->
var leftNav = document.querySelector('.leftNav');
var zj = document.querySelectorAll('.zj')
var ul_ = leftNav.children[0];
for(var i = 0; i < ul_.children.length;i++){
    (function(i){
        ul_.children[i].onmouseenter = function(){
            this.children[1].style.display = 'block';
        }
        ul_.children[i].onmouseleave= function(){
            this.children[1].style.display = 'none';
        }
    })(i)
}
//焦点图轮播
function changeImg(){
    var index =0;
    var stop = false;//开关
    var $imgLi = $('.slide_box').children('li');
    var $numLi = $('.num').children('li');
    $numLi.mouseover(function(){
        stop = true;
        index = $(this).index();
        // console.log(index);
        $imgLi.eq(index).stop(true,true).fadeIn().siblings().fadeOut();
        $(this).addClass("active").siblings().removeClass('active');
    }).mouseout(function(){
        stop =false;
    });
    setInterval(function(){
        if(stop) return;
        index ++;
        if(index>=$imgLi.length){
            index = 0;
        }
        $imgLi.eq(index).stop(true,true).fadeIn().siblings().fadeOut();
        $numLi.eq(index).addClass("active").siblings().removeClass('active');
    },1000);
}
changeImg();
// 轮播图
// window.addEventListener('load',function(){
//     var box  = document.querySelector('.slide_box');
//     var top_slide_wrap = document.querySelector('.top_slide_wrap');
//     var nu = document.querySelector('.num');
//     top_slide_wrap.scrollLeft = top_slide_wrap.offsetWidth; 
//     var timer1  = null;
//     var timer2 = null;
//     var num1 = 1;
//     autoMove();
//     function autoMove(){
//         timer1  = setInterval(function(){
//             num1++;
//             if(num1 >= box.children.length){
//                 num1=1;
//                 top_slide_wrap.scrollLeft = 0;
//             }
//             gogo();
//             change_list();
//         },2000)
//         // autoMove();
//     }
//     // 
//     function gogo() {
//         // 缓缓的动  
//         var step = 0;
//         var maxStep = 20;
//         var start = top_slide_wrap.scrollLeft;
//         var end = top_slide_wrap.offsetWidth * num1;
//         var everyStep = (end - start) / maxStep;

//         timer2 = setInterval(function () {
//             step++;
//             if (step >= maxStep) {
//                 //说明一张图片已经走完了
//                 step = 0;
//                 clearInterval(timer2);
//             }
//             start += everyStep;
//             top_slide_wrap.scrollLeft = start;

//         }, 15)
//     }
//     // 
//     function change_list(){
//         for (var i = 0; i < nu.children.length; i++) {
//             nu.children[i].className = '';
//         }

//         nu.children[num1-1].className = 'active';

//         // nu.children[num1].onclick = function () {
//         //     clearInterval(timer);
//         // }

//         // nu.children[num1].ondblclick = function () {
//         //     autoMove();
//         // }
//     }

// })
// <!--新闻列表-->
$(function(){
    var num = 0;
    var timer = null;
    fn();
    function fn(){
        clearInterval(timer);
        timer = setInterval(function(){
            $('#express').animate({scrollTop : ++num},1);
            if(num == 150){
                num= 0;
            }
        },50)
    }
    
    $('#express').mouseenter(function(){
        clearInterval(timer)
    })
    $('#express').mouseleave(function(){
        fn()
    })
})
// 购物车
$(function(){
    $(".car_t").click(function(){
        $(".last").stop(true,true).slideToggle();
    })
    var shopcar = {};
    shopcar.totalprice = $('.J_totalPrice').text().slice(1) - 0;
    shopcar.totalnum = $('.J_totalCount').text().slice(1,2) - 0;
    shopcar.list = [];
    $('.shop').find('li').each(function(idex,item){
        // console.log(item);
        var n = $(this).find('.J_inputCount').val() - 0;
        var p = $(this).find('.J_smallTotalPrice').text().slice(1) - 0;
        shopcar.list.push({
            num:n,
            price: p / n,
            tprice : p
        })
    })
    // 增加商品
    $('.J_btnAddCount').on('click',function(){
        var index = $(this).parents('li').index();
        // console.log(index);
        var n = ++shopcar.list[index].num;
        changedata(index,n);
        console.log(shopcar);
    })
    // 减少商品
    $(".J_btnDelCount").on("click",function(){
        var index = $(this).parents("li").index();
        // var n = --shopcar.list[index].num;
        var od = shopcar.list[index].num;
        var n = --od;
        if(n <= 0){
            var res = confirm("确定删除吗？");
            if(res){
                 del(index);
                 return;
            }else{
                return;
            }   
        }
           
        changedata(index,n);
        // render_html(index);
        console.log(shopcar);
    })
    // 删除
    function del(index){
        // 删除dom
        // 根据指定父元素进行删除
        $(".shop li").eq(index).remove()
        // 删除数据
        shopcar.list.splice(index,1);
        changedata(-1);
    }
    $(".J_btnDelete").on("click",function(){
        var index = $(this).parents("li").index();
        console.log(index);
        del(index);
    });
    // 修改数据
    function changedata(index,n){
        // 处理单个数据
        if(index > -1){
            var p = shopcar.list[index].price;
            shopcar.list[index].tprice = n*p;
            shopcar.list[index].num = n;
        }
        // 处理总价，总数量
        shopcar.totalnum = 0;
        shopcar.totalprice = 0;
        $.each(shopcar.list,function(index,item){
            // console.log(item);
            shopcar.totalnum += item.num;
            shopcar.totalprice += item.tprice;
        })
        render_html(index);
    }
    // 数据渲染到页面
    function render_html(index){
        // 总数据
        $(".J_totalCount").text('('+shopcar.totalnum+')');
        $('.J_totalPrice').text('￥'+shopcar.totalprice);
        // 单个商品数据
        if(index > -1){       
            $(".shop ul>li").eq(index).find(".J_inputCount").val(shopcar.list[index].num);
            $(".shop ul>li").eq(index).find('.J_smallTotalPrice').text('￥'+shopcar.list[index].tprice);
            $('.shop ul>li').eq(index).find('.J_count').text('共'+shopcar.list[index].num+'件商品')
        }
        if(shopcar.list.length == 0){
            $('.noshop').show();
            $('.shop').hide();
        }else{
            $('.noshop').hide();
            $('.shop').show();
        }
    }
})
    

