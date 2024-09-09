IMAGE_NAME=runner

# annoyingly on arm based mac you'll need to run in amd64 mode
# to use the linked DLLs
build:
	docker build --platform linux/amd64 -t ${IMAGE_NAME} . 

run:
	docker run \
		--rm -it \
		--entrypoint /bin/bash \
		${IMAGE_NAME}

run-local:
	docker run \
		--rm -it \
		--entrypoint /bin/bash \
		-v ./:/app \
		${IMAGE_NAME}