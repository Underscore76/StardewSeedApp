IMAGE_NAME=seed-api

# annoyingly on arm based mac you'll need to run in amd64 mode
# to use the linked DLLs
build:
	docker build -t ${IMAGE_NAME} .

run-it:
	docker run \
		--rm -it \
		-p 8000:8000 \
		--entrypoint /bin/bash \
		${IMAGE_NAME}

run:
	docker run \
		--rm \
		-p 8000:8000 \
		${IMAGE_NAME}