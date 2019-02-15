git stash
git pull
yarn build
scp -r  ./public/wechat.blade.php root@39.107.251.62:/data/webapp/volunteer/Volunteer_wechat/resources/views/wechat.blade.php
scp -r  ./public/* root@39.107.251.62:/data/webapp/volunteer/Volunteer_wechat/public/