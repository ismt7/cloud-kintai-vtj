#!/bin/bash

set -e

# ========================================
#  Add Custom settings in .bashrc
# ========================================
BASHRC_PATH=/home/node/.bashrc
cat <<EOL >> $BASHRC_PATH

# Custom settings
source /workspaces/garaku-frontend/.devcontainer/.bashrc.custom
EOL

# ========================================
#  Application Package install
# ========================================
make install