IMAGE_NAME=runner

# annoyingly on arm based mac you'll need to run in amd64 mode
# to use the linked DLLs
build:
	docker build --platform linux/amd64 -t ${IMAGE_NAME} . 

run:
	docker run \
		-v ${HOME}/.aws:/root/.aws \
		--rm -it \
		--entrypoint /bin/bash \
		${IMAGE_NAME}

run-local:
	docker run \
		-v ./:/app \
		-v ${HOME}/.aws:/root/.aws \
		--rm -it \
		--entrypoint /bin/bash \
		${IMAGE_NAME}