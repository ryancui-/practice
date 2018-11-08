npm run build

docker rmi imtouch-projects
docker build -t imtouch-projects .
docker save imtouch-projects > image.tar

scp image.tar root@101.132.167.184:~
ssh root@101.132.167.184 "/root/deploy-imtouch-projects.sh"

rm -f image.tar
