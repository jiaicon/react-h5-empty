<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="x5-orientation"content="portrait">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  <meta name="last-build-time" content="Thu Jun 21 2018 13:17:29 GMT+0800 (GMT+08:00)">
=======
  <meta name="last-build-time" content="Sat Jun 23 2018 21:32:31 GMT+0800 (GMT+08:00)">
>>>>>>> db0ddbf2c38b7b9176d221ddca9a1a0c0407e587
=======
  <meta name="last-build-time" content="Mon Jun 25 2018 12:29:25 GMT+0800 (CST)">
>>>>>>> 09f1ec861d8d60506fe1a8851ab41e05de4323f2
=======
  <meta name="last-build-time" content="Tue Jun 26 2018 13:53:55 GMT+0800 (GMT+08:00)">
>>>>>>> 8eceaa7d0eb5a8cfb4f273312ad81cdfd2edd3f4
  <!--link rel="apple-touch-icon" href="apple-touch-icon.png"-->
  <script>
    var designWidth = 375;
    var screenWidth = screen.width;
    var scale = screenWidth / designWidth;
    var meta = '<meta name="viewport" content="width=' + designWidth + ", initial-scale=" + scale + ", maximum-scale=" + scale + ", minimum-scale=" + scale + ', user-scalable=no, target-densitydpi=device-dpi, minimal-ui" >';
    document.write(meta);

    // 调试工具，url 中加入 debug 开启
    ;(function () {
        if (!/debug/.test(window.location)) return;
        var src = '/lib/eruda.min.js';
        document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
        document.write('<scr' + 'ipt>eruda.init();</scr' + 'ipt>');
    })();
  </script>
  <script src="/lib/jweixin-1.0.0.js"></script>
  <script>
    // 微信 config，类型可以是 JS Object 或者 JSON 字符串
    window.wxConfig = {!! $jsConfig !!}; // 或者 '{}'


    window.apiHost='{!! $apiHost !!}';

    // server 端下发 token 以及 uniqueKey
    window.token = '{{$token}}';

    //server 下发的uniqueKey
    window.uniqueKey = '{{$uniqueKey}}';

    // server 下发的服务对象,可用于过滤等
    window.serviceTarget = {!! $serviceTarget !!};

    // server 下发的服务类型,可用于过滤等
    window.serviceCategory = {!! $serviceCategory !!};

     // server 下发的服务类型,可用于过滤等
     window.teamCategory = {!! $teamCategory !!};

    // server 下发的个人擅长, 用于用户资料填写
    window.goodAt = {!! $gootAt !!};

    // server 下发的机构信息
    window.orgInfo = {!! $orgInfo !!};

    // server 下发的机构编号
    window.orgCode = '{!! $orgCode !!}';

    if (window.wxConfig) {
      try{
        if (typeof window.wxConfig === 'string') {
          window.wxConfig = JSON.parse(window.wxConfig);
        }
        window.wx.config(wxConfig);
      }
      catch(e) {
        alert(e);
      }
    }

    window.orgInfo && (document.title = window.orgInfo.name);
  </script>
  <script>
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?a09aed27d797ec85ef89a5f15c0d32a1";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
  </script>


</head>

<body>
  <div id="container">
  </div>
  <script charset="utf-8" src="http://map.qq.com/api/js?v=2.exp"></script>
  <script src="/dist/main.032d44ca2c2bc5456160.js"></script>
</body>

</html>
