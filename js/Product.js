window.addEventListener('load',function(){
    var $lis = $('#choice1').find('li');
    var $lis_ = $('#choice2').find('li');
    $lis.click(function(){
        index = $(this).index();
        // console.log(index);
        $(this).addClass("checked").siblings().removeClass('checked');
    })
    $lis_.click(function(){
        index = $(this).index();
        // console.log(index);
        $(this).addClass("checked").siblings().removeClass('checked');
    })

    // + - 
    $(function(){
        var num = 1;
        $('.n_btn_1').on('click',function(){
            num++;
            $('.n_ipt').val(num);
        })
        $('.n_btn_2').on('click',function(){
            num--;
            if(num < 1){
                num = 1;
            }
            $('.n_ipt').val(num);
            
        })
    })

    // 推荐搭配
    $(function(){
        var shopcar = {};
        shopcar.totalprice = $('.Price').text() - 0;
        shopcar.totalnum = $('.sum_ipt').val() - 0;
        shopcar.list = [];
        $('.des_border').find('.team_list').each(function(index,item){
            // console.log(item);
            var p = $(this).find('span').text().slice(1) - 0;
            var checked = $('.checkbox input', this).is(':checked')          
            shopcar.list.push({
                price:p,
                checked:checked
            })    
            // console.log(shopcar);
        })
        // 复选框
        var $check = $('.checkbox input');
        $check.on('click',function(){
            var index = $check.index(this);
            var checked = $(this).is(':checked')
            // console.log(checked);
            shopcar.list[index].checked = checked;
            changedata();
            render_html();
        })
        // input
        $('.sum_ipt').blur(function(){
            changedata();
            render_html();
        })
    // 修改数据
    function changedata(){
        // 处理单个数据
        console.log(shopcar.totalnum);
        // 处理总价，总数量
        shopcar.totalprice = 0;
        shopcar.totalnum = 0;
        $.each(shopcar.list,function(index,item){
            // console.log(item)
            if(this.checked === true){
                shopcar.totalnum = $('.sum_ipt').val() - 0;
                console.log(shopcar.totalnum);
                shopcar.totalprice += item.price * shopcar.totalnum;                
            }
        })
        console.log(shopcar);
    }
    // 数据渲染到页面
    function render_html(){
        $('.Price').text(shopcar.totalprice);
    }
    })
})