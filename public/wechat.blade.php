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
  <meta name="last-build-time" content="Thu Jul 05 2018 10:50:26 GMT+0800 (GMT+08:00)">
=======
  <meta name="last-build-time" content="Mon Jul 02 2018 20:37:31 GMT+0800 (GMT+08:00)">
>>>>>>> 1493fc7e3583cba770e75d98a2e4b2fafaab31a0
=======
  <meta name="last-build-time" content="Wed Jun 06 2018 11:00:59 GMT+0800 (中国标准时间)">
>>>>>>> 9c1b99298bce59797f12c489a2af1c67723dc455
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
<<<<<<< HEAD
<<<<<<< HEAD
  <script src="/dist/main.26cd80d35d8f8e37df1a.js"></script>
=======
  <script src="/dist/main.2f6006f80fcc1a296064.js"></script>
>>>>>>> 1493fc7e3583cba770e75d98a2e4b2fafaab31a0
=======
  <script src="/dist/main.e0608efac85127c572c6.js"></script>
>>>>>>> 9c1b99298bce59797f12c489a2af1c67723dc455
</body>

</html>
