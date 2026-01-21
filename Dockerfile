FROM ubuntu:latest
LABEL authors="iseaman"

ENTRYPOINT ["top", "-b"]