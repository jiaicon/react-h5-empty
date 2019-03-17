export function PostDataModel_Project(projectData, userData) {
    var tempContentText = `我参与了《${projectData.name}》这个项目，跟我一起做志愿服务吧~`;
    let PostDataModel = {
        postImage : getProjectPhoto(projectData),
        avatars : getAvatar(userData),
        username : getUserName(userData),
        contentText :tempContentText,
        url :window.location.href,
    }
    console.log(PostDataModel);
    return PostDataModel;
}

export function PostDataModel_Team(teamData,userData){
    var tempContentText = `我参与了《${teamData.name}》这个团队，跟我一起做志愿服务吧~`;
    let PostDataModel = {
        postImage : getTeamPhoto(teamData),
        avatars : getAvatar(userData),
        username : getUserName(userData),
        contentText :tempContentText,
        url :window.location.href,
    }
    return PostDataModel;
}

export function PostDataModel_SignSuccess(projectData,userData){
    var tempContentText = `我参与了《${projectData.name}》这个项目，跟我一起做志愿服务吧~`;

    let PostDataModel = {
        postImage : getProjectPhoto(projectData),
        avatars : getAvatar(userData),
        username : getUserName(userData),
        contentText :tempContentText,
        url : `${window.location.host}/project/detail/${projectData.id}`,
    }
    return PostDataModel;
}


export function PostDataModel_ProjectSign(projectData,userData){
    var tempContentText = `我参与了《${projectData.name}》这个项目,累计获得${projectData.my_reward_time}个服务时长,跟我一起做志愿服务吧~`;

    let PostDataModel = {
        postImage : getProjectPhoto(projectData),
        avatars : getAvatar(userData),
        username : getUserName(userData),
        contentText :tempContentText,
        url :`${window.location.host}/project/detail/${projectData.id}`,
    }
    console.log(PostDataModel);
    return PostDataModel;
}

function getProjectPhoto(projectData) {
    return projectData.list_photo.length ? projectData.list_photo : "/images/post_default_image.png";
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
        return (window.orgInfo&&window.orgInfo.name&&window.orgInfo.name.length)?window.orgInfo.name:'志多星';
    }
}

function getTeamPhoto(teamData){
    console.log(teamData);
    if (teamData.team_photo && teamData.team_photo[0]) return teamData.team_photo[0];
    if (teamData.logo) return teamData.logo;
    if (window.orgInfo.logo) return window.orgInfo.logo;
    return "/images/post_default_image.png";
}
