# https://mcr.microsoft.com/en-us/product/devcontainers/typescript-node/tags
FROM mcr.microsoft.com/devcontainers/typescript-node:0-20

RUN sudo apt-get -y update && sudo apt-get -y install \
    xdg-utils \
    && sudo apt-get clean && sudo rm -rf /var/lib/apt/lists/*
