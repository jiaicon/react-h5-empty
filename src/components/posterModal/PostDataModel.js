import i18next from 'i18next';

export function PostDataModel_Project(projectData, userData) {
    // var tempContentText = `${i18next.t('我发现了')}“${projectData.name}”${i18next.t('这个')}${i18next.t('项目')}，${i18next.t('跟我一起做志愿服务吧')}~`;
    var tempContentText = i18next.t('我发现了"n"这个项目,跟我一起做志愿服务吧', {n: projectData.name});
    let PostDataModel = {
        postImage : getProjectPhoto(projectData),
        avatars : getAvatar(userData),
        username : getUserName(userData),
        contentText :tempContentText,
        url :`${window.location.origin}/project/detail/${projectData.id}`,
        type: 'Project'
    }
    console.log(PostDataModel);
    return PostDataModel;
}

export function PostDataModel_Team(teamData,userData){
    // var tempContentText = `${i18next.t('我发现了')}“${teamData.name}”${i18next.t('这个')}${i18next.t('团队')}，${i18next.t('跟我一起做志愿服务吧')}~`;
  var tempContentText = i18next.t('我发现了"n"这个团队,跟我一起做志愿服务吧', {n: teamData.name});
    let PostDataModel = {
        postImage : getTeamPhoto(teamData),
        avatars : getAvatar(userData),
        username : getUserName(userData),
        contentText :tempContentText,
        url :window.location.href,
        type: 'Team'
    }
    return PostDataModel;
}

export function PostDataModel_SignSuccess(projectData,userData){
    // var tempContentText = `${i18next.t('我参与了')}“${projectData.name}”${i18next.t('这个')}${i18next.t('项目')}，${i18next.t('跟我一起做志愿服务吧')}~`;
    var tempContentText = i18next.t('我发现了"n"这个项目,跟我一起做志愿服务吧', {n: projectData.name});
    let PostDataModel = {
        postImage : getProjectPhoto(projectData),
        avatars : getAvatar(userData),
        username : getUserName(userData),
        contentText :tempContentText,
        url : `${window.location.origin}/project/detail/${projectData.id}`,
        type : 'SignSuccess'
    }
    return PostDataModel;
}


export function PostDataModel_ProjectSign(projectData,userData){
    // var tempContentText = `${i18next.t('我参与了')}“${projectData.name}”${i18next.t('这个')}${i18next.t('项目')},${i18next.t('累计获得')}${projectData.my_reward_time}${i18next.t('个服务时长')},${i18next.t('跟我一起做志愿服务吧')}~`;
    var tempContentText = i18next.t('我参与了"n"这个项目,累计获得x个服务时长,跟我一起做志愿服务吧', { n: projectData.name, x: projectData.my_reward_time });
    let PostDataModel = {
        postImage : getProjectPhoto(projectData),
        avatars : getAvatar(userData),
        username : getUserName(userData),
        contentText :tempContentText,
        url :`${window.location.origin}/project/detail/${projectData.id}`,
        type : 'ProjectSign'
    }
    console.log(PostDataModel);
    return PostDataModel;
}

function getProjectPhoto(projectData) {
    if (projectData.list_photo.length) {
        return projectData.list_photo;
    }
    if (projectData.photo&&Array.isArray(projectData.photo)&&projectData.photo.length) {
        return projectData.photo[0];
    }
    if (window.orgInfo.logo.length) {
        return window.orgInfo.logo;
    }
    return "/images/post_default_image.png";
}

function getAvatar(userData) {
    if (userData && userData.isLogin) {
      return userData.avatars ? userData.avatars : "/images/my/register.png";
    } else {
      return window.orgInfo && window.orgInfo.logo && window.orgInfo.logo.length ? window.orgInfo.logo : "/images/my/register.png";
    }
}

function getUserName(userData){
    if (userData && userData.isLogin) {
        if (userData.real_name) {
            return userData.real_name;
        }else {
            return userData.username;
        }
    }
    else {
        return (window.orgInfo&&window.orgInfo.name&&window.orgInfo.name.length)?window.orgInfo.name:i18next.t('志多星');
    }
}

function getTeamPhoto(teamData){
    console.log(teamData);
    if (teamData.team_photo && teamData.team_photo[0]) return teamData.team_photo[0];
    if (teamData.logo) return teamData.logo;
    if (window.orgInfo.logo) return window.orgInfo.logo;
    return "/images/post_default_image.png";
}
