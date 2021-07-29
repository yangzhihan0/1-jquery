    // var cate_list = document.querySelector('.cate_list');
    // var arr = [];
    // for(var i = 0; i < cate_list.children.length; i++){
    //     cate_list.children[i].index = i;
    //     cate_list.children[i]
    // }
    
    window.addEventListener('load',function(){
    //     var res = [];
    //     var cate_list = document.querySelector('.cate_list');
    //     var lis = cate_list.children;
    //     for(var i = 0; i < lis.length;i++){
    //         res.push(lis[i])
    //     }
    //     console.log(Array.prototype.slice.call(lis));





        // console.log(res);
        // var arr = $('.cate_list li').toArray();
        // console.log(arr);
        // $('#sortPrice').on('click',function(){
        //     arr.sort(function(a, b) {
        //         var price1 = $('.price span', a).text().slice(1)
        //         var price2 = $('.price span', b).text().slice(1)
        //         // var diff = price1 - price2

        //         // return isDesc ? -diff : diff
        //         return price1 - price2
        //     })
        // })




// 1.
        // var $listBox = $('.cate_list')
        // var isDesc = true
        // $('#sortPrice').click(function(){
        //     var list = $('li', $listBox).toArray()
        //     console.log(list);
        //     isDesc = !isDesc
        //     list.sort(function(li1, li2) {
        //         var price1 = $('.price span', li1).text().slice(1)
        //         var price2 = $('.price span', li2).text().slice(1)
        //         var diff = price1 - price2

        //         return isDesc ? -diff : diff
        //     })

        //     $listBox.empty()
        //     $listBox.append(list)

        //     return false;
        // })
// 2.
        var arr = $('.cate_list li').toArray();
        var isDesc = true
        $('#sortPrice').click(function(){
            isDesc = !isDesc
            arr.sort(function(li1, li2) {
                var price1 = $(li1).find('span').text().slice(1)
                var price2 = $(li2).find('span').text().slice(1)
                var diff = price1 - price2

                return isDesc ? -diff : diff
            })
            /* 清除ul中所有内容 */
            $('.cate_list').empty();
            /* 插入排序后的新内容 */
            $('.cate_list').append(arr)

            return false;
        })
    })

