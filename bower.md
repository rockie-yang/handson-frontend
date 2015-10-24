bower 
=============

http://bower.io
install
---------
install npm first
> sudo npm install -g bower

usage
------------
# init bower environment on the directory, it will create the bower.json file
# it will ask a bunch of question, just using default
# make sure that, .gitignore file added with two following lines
# bower_components/
# node_modules/
> bower init

# install a latest package
# add -S, it will save the package dependency into bower.json file
> bower intall <package> -S

# of specify package version
> bower install <package>#version -S

# list package paths, so that it can be copied and used in html files
# while some time it does not show up the right path
# then just go to the directory and checkit up
> bower list --paths


> bower uninstall <package>
> bower search <package>

# install or packages specified in bower.json file
# this is usuall done when somebody in the team add new dependencies
# or after new clone from git repository
> bower install
