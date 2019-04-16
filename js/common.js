// 根据分辨率倍数 设置根目录字体的大小
(function (doc) {
  var docEle = doc.documentElement,
      docWidth = docEle.clientWidth >= 750 ? 750: docEle.clientWidth,
      _size = 100 *(docWidth / 375);
        docEle.setAttribute("style","font-size: "+_size+"px !important")
})(document);
window.onresize = function(){
  var docEle = document.documentElement,
       docWidth = docEle.clientWidth >= 750 ? 750: docEle.clientWidth,
      _size = 100 *(docWidth / 375);
      docEle.setAttribute("style","font-size: "+_size+"px !important")
}
var captcha = {};
var ncObj = {};
var phoneCode =  {
  0: ['中国 +86+156', '中国香港 +852+344', '中国台湾 +886+158', '韩国 +82+410', '日本 +81+392', '蒙古 +976+496', '俄罗斯 +7+643', '美国 +1+840', '英国 +44+826', '加拿大 +1+124'],
  A: ['阿富汗 +93+4', '阿尔巴尼亚 +355+8', '阿尔及利亚 +213+12', '美属萨摩亚 +684+16', '安道尔 +376+20', '安哥拉 +244+24', '安圭拉岛 +1264+660', '安提瓜和巴布达 +1268+28', '阿根廷 +54+32', '亚美尼亚 +374+51', '澳大利亚 +61+36', '奥地利 +43+40', '阿塞拜疆 +994+31'],
  B: ['巴哈马 +1242+44', '巴林 +973+48', '孟加拉国 +880+50', '巴巴多斯 +1246+52', '白俄罗斯 +375+112', '比利时 +32+56', '伯利兹 +501+84', '贝宁 +229+204', '百慕大群岛 +1441+60', '玻利维亚 +591+68', '博茨瓦纳 +267+72', '巴西 +55+76', '文莱 +673+96', '保加利亚 +359+100', '布基纳法索 +226+854', '布隆迪 +257+108'],
  C: ['柬埔寨 +855+116', '喀麦隆 +237+120', '加拿大 +1+124', '开曼群岛 +1345+136', '中非共和国 +236+140', '乍得 +235+148', '智利 +56+152', '中国 +86+156', '哥伦比亚 +57+170', '刚果 +242+178', '库克群岛 +682+184', '哥斯达黎加 +506+188', '科特迪瓦 +225+384', '古巴 +53+192', '塞浦路斯 +357+196', '捷克共和国 +420+203'],
  D: ['丹麦 +45+208', '吉布提 +253+262', '多米尼加共和国 +1890+214'],
  E: ['厄瓜多尔 +593+218', '埃及 +20+818', '萨尔瓦多 +503+222', '爱沙尼亚 +372+233', '埃塞俄比亚 +251+231'],
  F: ['斐济群岛 +679+242', '芬兰 +358+246', '法国 +33+250', '法属圭亚那 +594+254', '法属波利尼西亚 +689+258'],
  G: ['加蓬 +241+266', '冈比亚 +220+270', '乔治亚 +995+268', '德国 +49+276', '加纳 +233+288', '直布罗陀 +350+292', '希腊 +30+300', '格林纳达 +1809+308', '关岛 +1671+316', '危地马拉 +502+320', '几内亚 +224+324', '圭亚那 +592+328'],
  H: ['海地 +509+332', '洪都拉斯 +504+340', '中国香港 +852+344', '匈牙利 +36+348'],
  I: ['冰岛 +354+352', '印度 +91+356', '印度尼西亚 +62+360', '伊朗 +98+364', '伊拉克 +964+368', '爱尔兰 +353+372', '以色列 +972+376', '意大利 +39+380'],
  J: ['牙买加 +1876+388', '日本 +81+392', '约旦 +962+400'],
  K: ['哈萨克斯坦 +7+398', '肯尼亚 +254+404', '朝鲜 +850+408', '韩国 +82+410', '科威特 +965+414', '吉尔吉斯斯坦 +331+417'],
  L: ['老挝 +856+418', '拉脱维亚 +371+428', '黎巴嫩 +961+422', '莱索托 +266+426', '利比里亚 +231+430', '利比亚 +218+434', '列支敦士登 +423+438', '立陶宛 +370+440', '卢森堡 +352+442'],
  M: ['中国澳门 +853+446', '马达加斯加 +261+450', '马拉维 +265+454', '马来西亚 +60+458', '马尔代夫 +960+462', '马里 +223+466', '马耳他 +356+470', '马提尼克岛 +596+474', '毛里求斯 +230+480', '墨西哥 +52+484', '摩尔多瓦 +373+498', '摩纳哥 +377+492', '蒙古 +976+496', '蒙特塞拉特 +1664+500', '摩洛哥 +212+504', '莫桑比克 +258+508', '缅甸 +95+104'],
  N: ['纳米比亚 +264+516', '瑙鲁 +674+520', '尼泊尔 +977+524', '荷兰 +31+528', '荷属安的列斯群岛 +599+530', '新西兰 +64+554', '尼加拉瓜 +505+558', '尼日尔 +227+562', '尼日利亚 +234+566', '挪威 +47+578'],
  O: ['阿曼 +968+512'],
  P: ['巴基斯坦 +92+586', '巴拿马 +507+591', '巴布亚新几内亚 +675+598', '巴拉圭 +595+600', '秘鲁 +51+604', '菲律宾 +63+608', '波兰 +48+616', '葡萄牙 +351+620', '波多黎各 +1787+630'],
  Q: ['卡塔尔 +974+634'],
  R: ['留尼汪岛 +262+638', '罗马尼亚 +40+642', '俄罗斯 +7+643'],
  S: ['圣卢西亚 +1758+662', '圣文森特和格林纳丁斯 +1784+670', '萨摩亚 +685+882', '圣马力诺 +378+674', '圣多美和普林西比 +239+678', '沙特阿拉伯 +966+682', '塞内加尔 +221+686', '塞舌尔 +248+690', '塞拉利昂 +232+694', '新加坡 +65+702', '斯洛伐克 +421+703', '斯洛文尼亚 +386+705', '所罗门群岛 +677+90', '索马里 +252+706', '南非 +27+710', '西班牙 +34+724', '斯里兰卡 +94+144', '苏丹 +249+736', '苏里南 +597+740', '斯威士兰 +268+748', '瑞典 +46+752', '瑞士 +41+756', '叙利亚 +963+760'],
  T: ['中国台湾 +886+158', '塔吉克斯坦 +992+762', '坦桑尼亚 +255+834', '泰国 +66+764', '多哥 +228+768', '汤加 +676+776', '特立尼达和多巴哥 +1809+780', '突尼斯 +216+788', '土耳其 +90+792', '土库曼斯坦 +993+795'],
  U: ['乌干达 +256+800', '乌克兰 +380+804', '阿拉伯联合酋长国 +971+784', '英国 +44+826', '美国 +1+840', '乌拉圭 +598+858', '乌兹别克斯坦 +233+860'],
  V: ['委内瑞拉 +58+862', '越南 +84+704'],
  Y: ['也门 +967+887'],
  Z: ['赞比亚 +260+894', '津巴布韦 +263+716'],
};

var ajaxios = function (optiopn) {

  $.ajax({
    url:  optiopn.ajaxurl,
    data: optiopn.data || '',
     headers: {
       "content-type": 'application/json;charset=utf-8',
       "exchange-token": localStorage.getItem('token') || '',
     },
    type:'post',
    success:function(data){
      optiopn.callback && optiopn.callback(data);
    },
    error:function(){
     optiopn. errCallback && optiopn.errCallback();
    }
  });
}

// 获取极验验证初始化数据
var getTartCaptcha = function () {
  ajaxios({
    ajaxurl: 'common/tartCaptcha',
    data: {},
    callback: function(data){
      if (data.code.toString() == '0') {
        var captchaData = data.data.captcha;
        geetest(captchaData.challenge, captchaData.gt , captchaData.success)
      }
    },
  })
};
// 构件极验验证
var geetest = function( challenge, gt, success ) {
  var $captchaBox = $('.captchaBox');
  if ($captchaBox.length) {
    window.initGeetest({
      gt,
      challenge,
      offline: !success, // 表示用户后台检测极验服务器是否宕机
      new_captcha: true, // 用于宕机时表示是新验证码的宕机
      width: '100%',
    }, (captchaObj) => {
      this.nowState = true;
      captchaObj.appendTo($captchaBox);
      captchaObj.onReady(() => {
       
      });
      captchaObj.onError(() => {});
      captchaObj.onSuccess(() => {
        this.nowState = false;
        const result = captchaObj.getValidate();
        setTimeout(() => {
           captcha.geetest_challenge = result.geetest_challenge;
           captcha.geetest_seccode = result.geetest_seccode;
           captcha.geetest_validate = result.geetest_validate;
           ncObj = Object.assign(captchaObj, { reset: captchaObj.reset }),
          $('.form_captcha').removeClass('form_err');
          $('.getCode').addClass('bule_text');

        }, 300);
      });
    });
  }
};

// 下拉菜单 select
var selectFun = function (argument) {
  var listHtml = '';
  var isShow = false;
  var curText = '中国 +86';
  Object.keys(phoneCode).forEach((item) => {
    phoneCode[item].forEach(function(vitem){
      var valueArr = vitem.split('+');
      var value = `${valueArr[0]}+${valueArr[1]}`;
      var curClass = value == curText ? 'current' : ''
      var html = '<li class="option '+ curClass +'">'+ value +'</li>'
      listHtml += html;
    });
  });
  $('.select_option').append(listHtml);

  var $selectBox = $('.select_box');
  var animation= function(e){
    var e=e||window.event;
    var dom = $(e.target);
    if(dom.parents('.pub_select').length == 0 && dom[0].className.indexOf('pub_select') < 0){
      isShow = false;
      $selectBox.hide();
    }
  };
  $('.pub_select').click(function() {
    
    if (isShow) {
      isShow = false;
      $selectBox.hide();
    } else {
      isShow = true;
      $selectBox.show();  
    }
    $(document).on('click',animation);
  })
  $(document).on('click', '.option', function(){
    var text = $(this)[0].innerText;
    $('.select_option').find('li').removeClass('current');
    $(this).addClass('current');
    $('.select_input').text(text);
    $('input[name="countryCode"]').val(text.split(' ')[1]);
    isShow = false;
    $selectBox.hide();
  });
};

// 获取验证码
var getCode = function(){
  var fla = true;
  $(document).on('click', '.getCode', function (argument) {
    var $this = $(this);
    var timer = 60;
    var formArr = $('.login_form').serializeArray();
    var obj = {};
    var isArr = true;
    for (var i = 0 ; i < formArr.length; i++) {
      if (obj[formArr[i].name] !== 'smsAuthCode') {
        obj[formArr[i].name] = formArr[i].value;
      }
      if (!formArr[i].value && formArr[i].name == 'mobile') {
        isArr = false;
        const arrName = formArr[i].name;
        $('input[name="mobile"]').parents('.form_infor').addClass('form_err');
      }
    }
    if (!captcha.geetest_challenge) {
      $('.form_captcha').addClass('form_err');
      return false;
    }
    var ObjectData = Object.assign(obj, captcha);

    if (fla && isArr) {
      fla = false;
      ajaxios({
        ajaxurl: 'common/smsValidCode',
        data: JSON.stringify(ObjectData),
        callback: function(data) {
          if (data.code.toString() == '0') {
            $('.getCode').removeClass('bule_text');
            timer--;
            $this.text(timer + '秒后重新获取');
            clearInterval(interval)
            var interval = setInterval(function(){
              timer--;
              $this.text(timer + '秒后重新获取');
              if (timer == 0) {
                ncObj.reset();
                $('.getCode').removeClass('bule_text');
                $this.text('获取验证码');
                fla = true;
                clearInterval(interval);
                return false;
              }
            }, 1000);
          } else if(data.code.toString() == '10003'){
            tips(data.msg, 'error');
            ncObj.reset();
            $('.getCode').removeClass('bule_text');
            $('.form_captcha').addClass('form_err');
            fla = true;
          } else {
            tips(data.msg, 'error');
            ncObj.reset();
            fla = true;
          }
        },
        errCallback: function () {
          fla = true;
        }
      })
    }
  })
}

// 注册 登录 表单提交
var submitLogin = function(){
  $(document).on('click', '.login_button', function(){
    var formArr = $('.login_form').serializeArray();
    var objData = {};
    var isArr = true;
    for (var i = 0 ; i < formArr.length; i++) {
      objData[formArr[i].name] = formArr[i].value;
      if (!formArr[i].value && formArr[i].name.indexOf('geetest_') < 0) {
        isArr = false;
        const arrName = formArr[i].name;
        $('input[name='+ arrName +']').parents('.form_infor').addClass('form_err');
      }
    }
    var ObjectData = {
      countryCode: objData.countryCode,
      mobileNumber: objData.mobile,
      smsAuthCode: objData.smsAuthCode,
    }
    if (isArr) {
      ajaxios({
        ajaxurl: 'user/login_in',
        data: JSON.stringify(ObjectData),
        callback: function(data){
          if (data.code.toString() == '0') {
            localStorage.setItem('token', data.data.token);
            window.location.href = 'my.html';
          } else {
            tips(data.msg, 'error');
            $('input[name="smsAuthCode"]').parents('.form_infor').addClass('form_err');  
          }         
        },
        errCallback: function(){
          $('input[name="smsAuthCode"]').parents('.form_infor').addClass('form_err');
        }
      });
    }
  });
};

// input输入事件
var inputf = function(){
  $(document).on('input', '.input_text', function(){
    if($(this).val()) {
      $(this).parents('.form_infor').removeClass('form_err');
    }
    if ($(this).attr('name') == 'leaveComments') {
      var text = $(this).val();
      if (text.length > 200) {
        $(this).val(text.substring(0, 200))
      }
      var num = text.length < 201 ? text.length : 200;
      $('.limit_num').text(num);
    }
  });
  $(document).on('focus', '.input_text', function(){
    if(!$(this).hasClass('form_infor_value')) {
      $(this).parents('.form_infor').addClass('form_infor_value').addClass('form_infor_focus');
    }
  }); 
  $(document).on('blur', '.input_text', function(){
    if(!$(this).val()) {
      $(this).parents('.form_infor').removeClass('form_infor_value');
    }
    $(this).parents('.form_infor').removeClass('form_infor_focus');
  }); 
};

// 获取邀请详情
var getInviteInfo = function() {
  ajaxios({
    ajaxurl: 'user/get_invite_info',
    data: '',
    callback: function(data){
      if (data.code.toString() == '0') {
        $('.totalMouth').text(data.data.totalMouth + ' 人');
        $('.total').text(data.data.total + ' 人');
        if (data.data.list && data.data.list.length) {
          var htmlList = '';
          data.data.list.forEach(function(item){
            var date = item.submitTime.split(' ')[0];
            var dateArr = date.split('-');
            var neewdate  = dateArr[0] + '年' + dateArr[1] + '月' + dateArr[2] + '日';
            var reg = /^(\d{3})\d*(\d{4})$/;
            var mobileNumber = item.mobileNumber.replace(reg,'$1****$2')
            var html = '<li class="span_table">' +
              '<span class="td_name">'+item.userName+'</span>' +
              '<span class="td_number">'+mobileNumber+'</span>' +
              '<span class="td_time">'+neewdate+'</span>' + 
            '</li>';
            htmlList += html;
          });
          $('.invite_info').append(htmlList);
        }
      } else if (data.code.toString() === '10002') {
        window.location.href = 'login.html';
      }
    },
  })
};

// 提交咨询数据
var seekSubmit = function() {
  $(document).on('click', ".seek_submit", function(){
    var formArr = $('.seek_form').serializeArray();
    var objData = {};
    var isArr = true;
    for (var i = 0 ; i < formArr.length; i++) {
      objData[formArr[i].name] = formArr[i].value;
      if (!formArr[i].value && (formArr[i].name == 'userName' || formArr[i].name == 'mobileNumber')) {
        isArr = false;
        const arrName = formArr[i].name;
        $('input[name='+ arrName +']').parents('.form_infor').addClass('form_err');
      }
    }
    objData.brokerId = GetUrlParam('brokerId')
    if (isArr) {
      ajaxios({
        ajaxurl: 'advisory',
        data: JSON.stringify(objData),
        callback: function(data){
          if (data.code.toString() == '0') {
            var brokerId = GetUrlParam('brokerId');
            window.location.href = brokerId ? 'product_desc.html?brokerId=' + brokerId : 'product_desc.html'
          } else {
            tips(data.msg, 'error');
          }
        },
        errCallback: function(){}
      });
    }
  });
};

// 获取 URL 中的参数
var GetUrlParam = function(paraName) {
  var url = document.location.toString();
  var arrObj = url.split("?");
  if (arrObj.length > 1) {
    var arrPara = arrObj[1].split("&");
    var arr;
    for (var i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split("=");
      if (arr != null && arr[0] == paraName) {
        return arr[1];
      }
    }
  } else {
    return '';  
  }
};

// 跳转至咨询页面
var goSeekPage = function(){
  $(document).on('click', ".go_seek_btn", function(){
    var brokerId = GetUrlParam('brokerId');
     window.location.href = brokerId?  'consultant.html?brokerId=' + brokerId : 'consultant.html';
  })
};

// 获取邀请链接
var invitationLink = function() {
  ajaxios({
    ajaxurl: 'user/get_invite_url',
    data: '',
    callback: function(data){
      if (data.code.toString() == "0") {
        $('.linkUrl').val(data.data.invitationLink);
      } else {
        tips('邀请地址获取失败');
      }
    },
  })
};

var copymsg = function () {
  var input = document.getElementById("linkUrl");//要复制文字的节点
  input.select()
  input.setSelectionRange(0, input.value.length)
  document.execCommand('copy');
  tips('复制成功');
}
// 点击复制邀请链接
var copyUrl = function() {
  $(document).on('click', '.copy_button', function(){
    copymsg();
  })
};

// 退出 切换账号
var logout = function(){
  $(document).on('click', '.logout', function(){
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  })
}

var tips = function (text, type) {
  var classType =  type === 'error' ? ' tips_err' : ''
  var TipsHtml = '<div class="tips'+ classType +'">'+ text +'</div>';
  var t1;
  var t2
  $('.tips').remove();
  $('body').append(TipsHtml);
  clearTimeout(t1);
  t1 = setTimeout(function () {
    $('.tips').addClass('tips-show');
  }, 0);
  clearTimeout(t2);
  t2 = setTimeout(function () {
    $('.tips').removeClass('tips-show');
  }, 5000);
  t1 = ''
  t2 = ''
}


// invitationLink();
// copyUrl();
// goSeekPage();
// seekSubmit();
inputf();  
// submitLogin();
selectFun();
// getCode();
// getInviteInfo();
// getTartCaptcha();

