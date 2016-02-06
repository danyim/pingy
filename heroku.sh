#!/bin/sh
# Only pushes the agent directory to Heroku, which is convenient for multi-app repos like pingy
git subtree push --prefix agent heroku master

# Also worth a shot if the above doesn't work..
# Credit: http://stackoverflow.com/a/15623469/350951
#git push heroku `git subtree split --prefix agent master`:master --force
