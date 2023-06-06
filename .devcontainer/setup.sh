#!/bin/bash

set -e

BASE_PATH=/home/node

# ========================================
#  Add Custom settings in .bashrc
# ========================================
BASHRC_PATH=${BASE_PATH}/.bashrc
cat <<EOL >> $BASHRC_PATH

# Custom settings
source /workspaces/garaku-frontend/.devcontainer/.bashrc.custom
EOL

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
#  Application Package install
# ========================================
make setup