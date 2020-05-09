ssh -i .\aws-resto.pem ubuntu@ec2-13-49-78-61.eu-north-1.compute.amazonaws.com
pm2 stop app
cd /home/ubuntu/chatRestoraunt/order-api || exit
git reset --hard
git pull
rm config/db.js
cp config/db-prod.js config/db.js
npm i
pm2 start app.js
exit