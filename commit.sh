sudo docker login -u 4freek -p N0tF0undm3 && \
sudo docker build . -t localdb:latest
sudo docker tag localdb:latest 4freek/localdb:latest  && \
sudo docker push 4freek/localdb:latest
