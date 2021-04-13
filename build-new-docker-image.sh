version=$(sh get-next-docker-version.sh)
docker build -t nilsemil/resto-order-api:$version .
docker push nilsemil/resto-order-api:$version
