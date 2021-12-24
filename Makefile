start:
		sudo docker run --rm --env-file .env --name myapp -p 4000:4000 myserver
dev:
		sudo docker run --rm -v /home/emil/Desktop/pet/server:/conv22/src/app -v /conv22/src/app/node_modules --rm --env-file .env --name myapp -p 4000:4000 myserver
build:
		sudo docker build . -t myserver
stop:
		sudo docker stop myapp