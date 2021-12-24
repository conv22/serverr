start:
		sudo docker run --rm --env-file .env --name myapp -p 4000:4000 myserver
dev:
		sudo docker run --rm -v /home/emil/Desktop/pet/server:/app -v /app/node_modules --rm --env-file .env --name myapp -p 4000:4000 myserver
stop:
		sudo docker stop myapp