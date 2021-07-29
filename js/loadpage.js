window.addEventListener('load',function(){
    var tableBtn = document.querySelector('.tableBtn');
    tableBtn.addEventListener('click',function(){
    // 验证表单
    // ajax
    var ajax_ = new XMLHttpRequest() || new ActiveXObject('Microsoft.XMLHTTP');
    ajax_.open('post', 'http://127.0.0.1:3001/user', true);
    var data = 'act=login&user=' + username.value + '&pass=' + pwd.value;
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
            // 存储用户信息
            localStorage.setItem('userinfo', JSON.stringify(res.info));
            setTimeout(function () {
              window.open('../index.html', '_blank');
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