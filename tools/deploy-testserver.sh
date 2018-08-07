git stash
git pull
yarn build
scp -r  ./public/wechat.blade.php miller@39.107.251.62:/data/webapp/volunteer/Volunteer_wechat/resources/views/wechat.blade.php
scp -r  ./public/* miller@39.107.251.62:/data/webapp/volunteer/Volunteer_wechat/public/