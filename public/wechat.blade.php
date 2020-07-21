<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="x5-orientation"content="portrait">
  <meta name="last-build-time" content="Fri Jul 10 2020 17:27:01 GMT+0800 (GMT+08:00)">
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
  <script src="/lib/jweixin-1.6.0.js"></script> 
  <script src="https://js.fundebug.cn/fundebug.1.5.0.min.js" apikey="7de7de184affb1a29b9a766df87ac3420018a2e870a7cc91278229aaeeaccedb"></script>

  <script>
    //true:微信浏览器   false:h5
      window.userAgent = @if ($env == 'wx') true @else false @endif;
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

    if (window.userAgent&&window.wxConfig) {
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
     window.serviceArea = [{
          value: '扶贫',
          label: '扶贫'
        }, {
          value: '济困',
          label: '济困'
        }, {
          value: '扶老',
          label: '扶老'
        }, {
          value: '救孤',
          label: '救孤'
        }, {
          value: '恤病',
          label: '恤病'
        }, {
          value: '助残',
          label: '助残'
        }, {
          value: '救灾',
          label: '救灾'
        }, {
          value: '助医',
          label: '助医'
        }, {
          value: '助学',
          label: '助学'
        }, {
          value: '环保',
          label: '环保'
        }, {
          value: '公共文化',
          label: '公共文化'
        }, {
          value: '大型赛会',
          label: '大型赛会'
        }, {
          value: '其他服务',
          label: '其他服务'
        }];
  </script>
  <!-- <script>
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?a09aed27d797ec85ef89a5f15c0d32a1";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
  </script> -->
 

</head>

<body>
  <div id="container">
  </div>
  <script charset="utf-8" src="http://map.qq.com/api/js?v=2.exp&key=GT7BZ-UXACR-R2JWZ-WYSXR-DHWJV-VEFAI"></script>
  <script type="text/javascript" src="https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js"></script>
  <script src="/dist/main.188e37ad125c0f2438d5.js"></script>
</body>

</html>
