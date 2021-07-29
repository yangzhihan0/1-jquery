window.addEventListener('load',function(){
// 获取验证码
    var timer = 0;
    var num = 60;
    $('.tableText').on('click',function(){
        clearInterval(timer);
        timer = setInterval(function(){
            num--;
            $('.tableText').text('('+num+'秒) 重发');
            if(num < 0){
                clearInterval(timer);
                num = 60;
                $('.tableText').text('获取验证码');
            }
        },1000)
    })
    var tableBtn = document.querySelector('.tableBtn');
    tableBtn.addEventListener('click',function(){
    // 验证表单
    // ajax
    var ajax_ = new XMLHttpRequest() || new ActiveXObject('Microsoft.XMLHTTP');
    ajax_.open('post', 'http://127.0.0.1:3001/user', true);
    var data = 'act=reg&user=' + username.value + '&pass=' + pwd.value;
    console.log(data);
    ajax_.send(data);
    ajax_.onreadystatechange = function () {
      if (ajax_.readyState == 4) {
        if (ajax_.status == 200) {
          var res = JSON.parse(ajax_.responseText);
          console.log(res);
          if (res.ok) {
            // window.location.href = './login.html';
            msg.style.display = 'block';
            msg.innerText = res.msg;
            setTimeout(function () {
              window.open('../loadpage.html', '_blank');
            }, 1000);
          } else {
            msg.style.display = 'block';
            msg.innerText = res.msg;
            setTimeout(function () {
              msg.style.display = 'none';
              msg.innerText = '';
            }, 2000);
          }

        }
      }
    }
    })
    
    
})
