#!/bin/sh
# @desc Config variables (common version -- stored in repository)
# @changed 2023.10.06, 17:15

# NOTE: May be overrided by `config-local.sh`
# NOTE: Don't forget to update rules in `publish/.htaccess` and `publish/robots.txt` files if you changed branch from production to demo.

# NOTE: It's possible to incorporate current branch (`DIST_BRANCH`) into the build tag?
DIST_BRANCH="publish" # Production build -> html-app-build

DIST_REPO="git@github.com:lilliputten/sample-auth-app.git"
SRC_TAG_PREFIX="v" # "v" for default tags like "v.X.Y.Z"

PUBLISH_FOLDER="$DIST_BRANCH"
PUBLISH_TAG_ID="$DIST_BRANCH"

# Timezone for timestamps (Europe/Moscow, GMT, etc)
# NOTE: See duplications in 'config.js'
TIMEZONE="Europe/Moscow"
