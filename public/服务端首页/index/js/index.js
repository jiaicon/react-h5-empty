(function() {
  // 图片处理
  document.addEventListener(
    "error",
    function(e) {
      var errorUrl = null;

      var elem = e.target;
      var type = $(elem).attr("data-type");

      if (elem.tagName.toLowerCase() == "img") {
        if (type == "1") {
          // 用户默认
          errorUrl = "./images/register.png";
        } else if (type == "2") {
          // 轮播默认
          errorUrl = "./images/default_banner.png";
        } else if (type == "3") {
          errorUrl = "./images/default_avatar.png";
        }
        elem.src = errorUrl;
      }
    },
    true
  );
  // 城市定位
  let initaialCity = getCookie("provinceAndCityName")
    ? JSON.parse(getCookie("provinceAndCityName")).city.replace("市", "")
    : "北京";
  let locationCity = null;

  rightHeader(userInfoData);
  initSwiper(data && data.banner);
  initNews(data && data.news);
  if (window.orgCode == "VolejRejNm") {
    initMent(deleteSanlitunMoudling(window.orgInfo.module_settings));
  } else {
    initMent(window.orgInfo.module_settings);
  }
  initProjectMenu(data && data.sanlitun);
  initProject(data && data.sanlitun, data && data.project);
  share();
  if (!getCookie("provinceAndCityName")) {
    // 获取定位
    getCity(
      (city, str) => {
        if (initaialCity == city.replace("市", "")) {
          return;
        } else {
          console.log("-----", str);
          locationCity = city;
          var r = confirm(`已经成功定位到当前定位城市${city},是否切换？`);
          if (r == true) {
            setCookie("provinceAndCityName", str, 1);
            initaialCity = city;
            requestHomeData();
          }
        }
      },
      () => {
        AlertError("定位失败，请确认同意定位授权");
      }
    );
  }

  // 请求首页数据
  function requestHomeData() {
    const location = getCookie("location")
      ? JSON.parse(getCookie("location"))
      : null;
    const city = getCookie("provinceAndCityName")
      ? JSON.parse(getCookie("provinceAndCityName")).city
      : "北京";
    $.ajax({
      type: "GET",
      url: `${window.apiHost}/api/v1/index`,
      // type of data we are expecting in return:
      dataType: "json",
      timeout: 1000,
      xhrFields: { withCredentials: true },
      traditional: true,
      headers: {
        // 授权 token
        "X-auth-token": window.token || "",
        // 机构代码
        "X-org-code": window.orgCode,
        // 经纬度 经度-纬度
        "X-location": location
          ? `${location.lng}-${location.lat}`
          : "116.314820-40.065560",
        "X-unique-key": window.uniqueKey || "demo",
        "X-city": `${encodeURI(city)}`
      },
      success: function(json) {
        console.log(json);
        if (!json.error_code) {
          const { data } = json;
          initSwiper(data && data.banner);
          initNews(data && data.news);
          if (window.orgCode == "VolejRejNm") {
            initMent(deleteSanlitunMoudling(window.orgInfo.module_settings));
          } else {
            initMent(window.orgInfo.module_settings);
          }
          initProjectMenu(data && data.sanlitun);
          initProject(data && data.sanlitun, data && data.project);
        } else {
          AlertError(`${json.error_code}:${json.error_message}`);
        }
      },
      error: function(xhr, type) {
        console.log(xhr);
        console.log(type);
        // AlertError(`${xhr}`);
      }
    });
  }

  // alert
  function AlertError(str) {
    if (str) {
      $(".page-error")[0].innerHTML = str;
      $(".page-error")
        .css({ opacity: 1, top: "-70px" })
        .animate(
          {
            top: 0
          },
          500,
          "linear",
          () => {
            $(".page-error").animate(
              {
                top: "-70px"
              },
              500,
              "linear",
              () => {
                $(".page-error").css({ opacity: 0, top: "-999px" });
              },
              1000
            );
          }
        );
    }
  }
  // 右上角用户信息显示头像、登录按钮
  function rightHeader(data) {
    if (!data || !data.id) {
      let dom = `<a href='${href}/selectcity'><div class="city-name">北京</div></a><div style="display: flex; width: 280px;"><a href="/homesearch" class="component-search-newbar"><input class="input" placeholder="搜索项目/团队" disabled="" style="margin-left: 35px;"></a><a href='${href}/my/entry'><div class="login-button">登录</div></a></div>`;
      $(".header-bar")[0].innerHTML = dom;
      return;
    } else {
      let dom = `<a href='${href}/selectcity'><div class="city-name">北京</div></a>
            
            <div style="display: flex; flex: 1 1 0%;"><div class="content-boxpadding">
            <a href=='${href}/homesearch' class="component-search-bar dirmargin">
            <input class="input" placeholder="搜索项目/团队" disabled="" style="margin-left: 35px;"></a>
            </div>
              <a href='${href}/my'>
              <img data-type=1 style="width: 28px;height:28px;border-radius:50%; object-fit: cover;"  src=${
                data.avatars
              } />            </div></a></div>`;
      $(".header-bar")[0].innerHTML = dom;
      return;
    }
  }
  // 初始化轮播图
  function initSwiper(data) {
    const orgCode = window.orgCode;
    const token = window.token;
    if (!data || !data.length || typeof data == undefined) {
      $(
        ".swiper-container"
      )[0].innerHTML = `<div class="swiper-container-empty"></div>`;
      return;
    }
    var dom = "";
    $.each(data, function(index, item) {
      let url = "";
      const mode = item.jump_mode;
      if (orgCode == "wMvbmOeYAl" || orgCode == "KGRb41dBLZ") {
        if (mode === 1) {
          if (token == "") {
            url = `${href}/my/entry`;
          } else {
            // 第三方
            url = item.href;
          }
        } else if (mode === 2) {
          // 项目
          url = `${href}/project/detail/${item.jump_id}`;
        } else if (mode === 3) {
          // 团队
          url = `'${href}/team/detail/${item.jump_id}`;
        }
      } else {
        if (mode === 1) {
          url = item.href;
        } else if (mode === 2) {
          // 项目
          url = `${href}/project/detail/${item.jump_id}`;
        } else if (mode === 3) {
          // 团队
          url = `'${href}/team/detail/${item.jump_id}`;
        }
      }
      dom += `<a class="swiper-slide" href=${url}>
                <img data-type=2  src=${
                  item.photo
                } style='width:100%;height:100%; object-fit: cover;' />
            </a>`;
    });
    $(".swiper-wrapper").html(dom);
    let Swipe = new Swiper(".swiper-container", {
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      pagination: {
        el: ".swiper-pagination"
      }
    });
  }
  // 消息公告
  function initNews(data) {
    if (!data || !data.length) {
      return null;
    }
    let dom = "";
    $.each(data, function(index, item) {
      dom += `<div class="swiper-slide">${item.title}</div>`;
    });
    $("#header-notice").html(`
           <a class="notice" href='${href}/notice'>
           <div class="components-announcement-container">
                <div class="swiper-wrapper">
                ${dom}
                </div>
               </div>
            </a>
            `);
    let notice = new Swiper(".components-announcement-container", {
      direction: "vertical",
      autoplay: true
    });
  }
  // menu
  function initMent(data) {
    const DEFAULT_LINK = `${href}/building`;
    const MODULE_LINK = {
      volunteer_project: `${href}/project/list`,
      volunteer_team: `${href}/team/list`,
      reward_history: `${href}/my/duration/applys`,
      help_center: `${href}/my/service`,
      联盟互动: "https://buluo.qq.com/p/barindex.html?bid=334308&from=wechat",
      volunteer_strategy: "http://m.guide.volunteerzhiduoxing.cn",
      1234: "http://sanlitunweb.parkingkj.com/showhtml/sayvillage.html", // volunteer_feedback: `http://${location.host}/tmall`,
      volunteer_feedback: `${href}/shop`,
      volunteer_ensure: `${href}/ensure`,
      good_example: `${href}/sanlitun/starModel`,
      claim_project: `${href}/sanlitun/projectClaim/list`,
      community_interact: `${href}/my/circlevisits`
    };
    if (!data || typeof data == undefined || !data.length) {
      return null;
    }
    let dom = "";
    const newMenus = [];

    data.forEach((menuLine, idx) => {
      newMenus.push([]);
      menuLine.forEach(menu => {
        newMenus[idx].push({
          label: menu["label"],
          key: menu["key"],
          icon: menu["icon"],
          link: MODULE_LINK[menu.key] || DEFAULT_LINK
        });
      });
    });
    $.each(newMenus, function(index, item) {
      dom += `<li>`;
      $.each(item, function(index, menu) {
        dom += `<a href=${menu.link}>
                <img data-type=3 class="menu-icon" src=${menu.icon} 
                style='width:35px;height:35px;object-fit: cover;'
                />
                <span>${menu.settings ? menu.settings.label : menu.label}</span>
              </a>`;
      });
      dom += `</li>`;
    });
    $("#page-body-menu").html(`
            <ul class="component-menus">
            ${dom}
            </ul>
            `);
  }
  // 渲染projectmenu
  function initProjectMenu(data) {
    let dom;
    if (Number(data) == 1) {
      dom = `<div>
                  <div style='width: "100%";height: "10px"'></div>
                  <div class="project-list">
                    <div class="list-header">
                      <div class="main-label">
                        <div class="label-line" />
                        <span>回馈激励</span>
                        <div class="label-line" />
                      </div>
                      <div class="sub-label">Feedback and Incentive</div>
                    </div>
                  </div>
                  <div class="page-home-feedback-show-container">
            <a href='${href}/shop'>
                <img
                data-type=3
                    src="./images/sanlitun/feedback1.jpg"
                    alt="回馈展示"
                />
            </a>
             <a href='${href}/shop'>
                <img
                  data-type=3
                    src="./images/sanlitun/feedback2.jpg"
                    alt="回馈展示"
                />
            </a>
             <a href='${href}/shop'>
                <img
                  data-type=3
                    src="./images/sanlitun/feedback4.png"
                    alt="回馈展示"
                />
            </a>
                  </div >
                <div style='width: "100%"; height: "10px"'/>
                </div >`;
    } else if (Number(data) == 0) {
      dom = `<div class="menus-activity">
                <a href="${href}/project/list/type/1/category/1000/target/1000">
                    <img   data-type=3 src="./images/activities_nearby.png" alt="附近" />
                </a>
                <a href="${href}/project/list/type/0/category/1000/target/1000">
                    <img   data-type=3 src="./images/activities_new.png" alt="最新" />
                </a>
                <a href="${href}/project/list/type/2/category/1000/target/1000">
                    <img    data-type=3 src="./images/activities_hot.png" alt="最热" />
                </a>
                </div>
`;
    }
    $("#page-body-project").html(dom);
  }
  // 底部推荐
  function initProject(sanlitun, data) {
    let isSanlitun = Number(sanlitun);
    let dom = `<div class="project-list">
            <div class="list-header">
                <div class="main-label">
                    <div class="label-line" />
                    <span>${isSanlitun ? "联盟活动" : "精品活动"} </span>
                    <div class="label-line" />
                </div>
                <div class="sub-label">${
                  isSanlitun ? "Alliance Activities" : "Favored Activities"
                }</div>
            </div>
            <div class="line1px" /> 
        `;
    if (data) {
      dom += `<ul class="component-projects">`;
      $.each(data, function(index, project) {
        const { team } = project;
        const volunteer = isVolunteerInsure(project.volunteer_security);
        let classLabel;
        if (project.project_status === 2) {
          classLabel = "project-status-recruit";
        } else if (project.project_status === 3) {
          classLabel = "project-status-full";
        } else if (project.project_status === 4) {
          classLabel = "project-status-progress";
        } else if (project.project_status === 5) {
          classLabel = "project.project_status";
        }
        dom += `
                <li key=${project.id}>
                <div>
                  <a href='${href}/team/detail/${
          project.team.id
        }' class="project-header">
                   <img data-type=3 style='width:30px;height:30px;border-radius:4px;object-fit:cover;' src=${
                     team.logo
                   } />
                    <div class="org-name">${team.name}</div>
                  </a>
                  <a href='${href}/project/detail/${
          project.id
        }' class="project-main">
                 <img data-type=2 class="image" src=${
                   project.list_photo
                 }  style='width:100%;height:200px;border-radius:4px; object-fit: cover;' />
                     <div class="project-name">
                      ${project.name}
                `;
        if (volunteer) {
          dom += ` <div class='project-name-logo'></div>
                    </div>`;
        } else {
          dom += `</div>`;
        }
        dom += `<div class="project-date">
                      活动日期：${parseTimeStringToDateString(
                        project.begin
                      )}-${parseTimeStringToDateString(project.end)}
                    </div><div class='project-status ${classLabel}'></div></a> <div class="project-footer">
                    <div class="project-location"> ${project.county_name} ${
          project.distance > 0 ? parseDistance(project.distance) : null
        }
                    </div>
                    <div class="project-members">
                      <span>
                       ${project.join_people_count}
                      </span>
                        &nbsp;&nbsp;/
                      <span>${project.people_count}</span>
                    </div>
                  </div>
                </div>
              </li>

                `;
      });

      dom += "</ul></div>";
    } else {
      dom += '<div class="projects-empty-tip">目前还没有活动哦</div></div>';
    }

    $("#page-body-project-list").html(dom);
  }

  function getLocation(success, fail, noCache) {
    if (window.dev) {
      setCookie(
        "location",
        JSON.stringify({
          lng: "116.314820",
          lat: "40.065560"
        }),
        1
      );
      success({
        lng: "116.314820",
        lat: "40.065560"
      });
      return;
    }
    let cachedLoc = null;
    if (!cachedLoc) {
      var geolocation = new qq.maps.Geolocation(
        "GT7BZ-UXACR-R2JWZ-WYSXR-DHWJV-VEFAI",
        "myapp"
      );
      var options = { timeout: 8000 };
      geolocation.getLocation(function(position) {
        const lat = position.lat; // 纬度，浮点数，范围为90 ~ -90
        const lng = position.lng; // 经度，浮点数，范围为180 ~ -180
        console.log("获取新位置成功", position);
        setCookie("location", JSON.stringify({ lat, lng }), 1);
        if (success) {
          success({ lat, lng });
        }
      }, options);
    } else if (success) {
      success({
        lat: cachedLoc.lat,
        lng: cachedLoc.lng
      });
    }
  }

  function getCity(success, fail) {
    if (window.dev) {
      const city = "北京市";
      const province = "北京";
      setCookie(
        "provinceAndCityName",
        JSON.stringify({
          city,
          province
        }),
        1
      );

      success(city || "北京", JSON.stringify({ city, province }));
      return;
    }
    getLocation(
      loc => {
        const geocoder = new qq.maps.Geocoder({
          complete: result => {
            if (
              result.detail.addressComponents &&
              result.detail.addressComponents.city
            ) {
              if (!success) {
                console.log(result);
                return;
              }
              const city = result.detail.addressComponents.city;
              const province = result.detail.addressComponents.province;
              success(
                result.detail.addressComponents.city.replace("市", ""),
                JSON.stringify({
                  city,
                  province
                })
              );
            } else if (fail) {
              fail({});
            }
          }
        });
        const coord = new qq.maps.LatLng(loc.lat, loc.lng);
        geocoder.getAddress(coord);
      },
      error => {
        if (fail) {
          fail(error);
        }
      }
    );
  }

  //写cookies（设置作用域）
  function setCookie(name, value, Days) {
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    let hostname = location.hostname.substring(
      location.hostname.indexOf(".") + 1
    ); //设置为一级域名
    document.cookie =
      name +
      "=" +
      escape(value) +
      ";expires=" +
      exp.toGMTString() +
      ";domain=" +
      hostname +
      ";path=/";
  }
  //读取cookies
  function getCookie(name) {
    var arr = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    );
    if (arr != null) return unescape(arr[2]);
    return null;
  }

  // 去除三里屯志愿回馈
  function deleteSanlitunMoudling(data) {
    var newData = data.map(item => {
      return item.filter(ite => {
        return ite["key"] != "volunteer_feedback";
      });
    });
    return newData;
  }
  function isVolunteerInsure(str) {
    if (str.indexOf("志愿者保险") !== -1) {
      return true;
    }
    return false;
  }
  function parseTimeStringToDateString(timeString) {
    const dateString = timeString.split(" ")[0];
    return dateString.replace(/-/g, ".");
  }
  function parseDistance(distance) {
    let parsedDistance = distance / 1000;

    if (parsedDistance < 10) {
      parsedDistance = parsedDistance.toFixed(1);
    } else {
      parsedDistance = parseInt(parsedDistance, 10);
    }

    return `${parsedDistance}km`;
  }
  function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g, ""); //去除HTML tag
    str = str.replace(/[ | ]*\n/g, "\n"); //去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g, "\n"); //去除多余空行
    str = str.replace(/&nbsp;/gi, ""); //去掉&nbsp;
    return str;
  }
  function share(option = {}) {
    if (!window.wx || !window.userAgent) {
      return;
    }
    const orgInfo = window.orgInfo || { name: "志多星", logo: "" };
    const host = `${location.protocol}//${location.hostname}`;
    let shareUrl = location.href;

    if (
      location.pathname === "/" &&
      location.hash.length > 2 &&
      location.hash.indexOf("#/") === 0
    ) {
      shareUrl = `${location.protocol}//${
        location.host
      }/${location.hash.replace(/^#\//g, "")}`;
    }
    const orgCode = window.orgCode;
    let desxName = "文明点亮你我，志愿感动社会";
    if (orgCode == "qM7e5Ba2vp") {
      desxName = "志愿小金人，用爱传温暖！";
    }
    const newOption = {
      title: `${option.title || orgInfo.name}`,
      desc: removeHTMLTag(option.desc || desxName),
      link: shareUrl,
      imgUrl: option.image || orgInfo.logo || `${host}/images/icon.png`,
      success: () => {
        if (option.success) {
          option.success();
        }
      }
    };

    console.log("微信分享设置:", newOption);
    [
      "onMenuShareTimeline",
      "onMenuShareAppMessage",
      "onMenuShareQQ",
      "onMenuShareWeibo",
      "onMenuShareQZone"
    ].forEach(share => wx[share](newOption));
  }
})();
