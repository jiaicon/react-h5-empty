git stash
git pull
yarn build
scp -r  ./public/wechat.blade.php miller@60.205.182.2:/data/webapp/volunteer/Volunteer_wechat/resources/views/wechat.blade.php
scp -r  ./public/* miller@60.205.182.2:/data/webapp/volunteer/Volunteer_wechat/public/
