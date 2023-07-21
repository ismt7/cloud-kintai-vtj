#!/bin/bash

set -e

BASE_PATH=/home/node

# ========================================
#  Add Custom settings in .config.fish
# ========================================
FISH_CONFIG_PATH=${BASE_PATH}/.config/fish/config.fish
cp .devcontainer/fish/config.fish ${FISH_CONFIG_PATH}

# ========================================
#  Create aws credentials and config files
# ========================================
mkdir ${BASE_PATH}/.aws

AWS_CREDENTIALS=${BASE_PATH}/.aws/credentials
cat <<EOL >> $AWS_CREDENTIALS
[default]
aws_access_key_id=${AWS_ACCESS_KEY_ID}
aws_secret_access_key=${AWS_SECRET_ACCESS_KEY}
EOL

AWS_CONFIG=${BASE_PATH}/.aws/config
cat <<EOL >> $AWS_CONFIG
[profile default]
region=${AWS_DEFAULT_REGION}
output=json
EOL

# ========================================
#  Add aicommits tool
# ========================================
npm install -g aicommits

if [ -n "${AICOMMITS_OPENAI_KEY}" ]; then
  aicommits config set OPENAI_KEY=${AICOMMITS_OPENAI_KEY}
fi

# ========================================
#  Application Package install
# ========================================
make setup

# ========================================
#  Amplify pull
# ========================================

# aws-export.jsファイルがない場合は、amplify pullを実行する
if [ ! -e "src/aws-exports.js" ]; then
  amplify pull --appId d9rnf7q7x9f9e --envName dev --restore -y
fi

# ========================================
#  Git config
# ========================================

# User name
if [ -n "${GIT_USER_NAME}" ]; then
  git config --local user.name "${GIT_USER_NAME}"
fi

# User email
if [ -n "${GIT_USER_EMAIL}" ]; then
  git config --local user.email "${GIT_USER_EMAIL}"
fi

# ========================================
#  Dev environment setup
# ========================================

if [ ! -e ".env" ]; then
  cp .env.example .env
fi

make start