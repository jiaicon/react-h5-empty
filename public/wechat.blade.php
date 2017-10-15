<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="x5-orientation"content="portrait">
  <!--link rel="apple-touch-icon" href="apple-touch-icon.png"-->
  <script>
    var designWidth = 375;
    var screenWidth = screen.width;
    var scale = screenWidth / designWidth;
    var meta = '<meta name="viewport" content="width=' + designWidth + ", initial-scale=" + scale + ", maximum-scale=" + scale + ", minimum-scale=" + scale + ', user-scalable=no, target-densitydpi=device-dpi, minimal-ui" >';
    document.write(meta);
  </script>
  <script src="/lib/jweixin-1.0.0.js"></script>
  <script>
    // 微信 config，类型可以是 JS Object 或者 JSON 字符串
    window.wxConfig = {!! $jsConfig !!}; // 或者 '{}'

    // server 端下发 token 以及 uniqueKey
    window.token = '{{$token}}';

    //server 下发的uniqueKey
    window.uniqueKey = '{{$uniqueKey}}';

    // server 下发的服务对象,可用于过滤等
    window.serviceTarget = {!! $serviceTarget !!};

    // server 下发的服务类型,可用于过滤等
    window.serviceCategory = {!! $serviceCategory !!};

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
</head>

<body>
  <div id="container">
  </div>
  <script charset="utf-8" src="http://map.qq.com/api/js?v=2.exp"></script>
  <script src="/dist/main.600f4188c4e2f3b66cbb.js"></script>
</body>

</html>
