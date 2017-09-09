# OVF
The new and improved CI repo for OV Fiets Radar


### Develop branch
Is a mirror from the master. Use for testing live! You may always merge from master into this develop branch. For example if nothing works or things screw up, just merge from master and we're safe. In the develop branch you test if your code works. You should probably only merge feature branches into the develop branch. You can preview this code at [dev.ovfietsradar.nl](http://dev.ovfietsradar.nl). Travis will automatically deploy to here and optionally test it.

**Note:** Once merged, remove the feature branch but remember it's history by adding the --no-ff option.

`git merge --no-ff feature/my-feature-branch-name`


### Master branch
Has to always work. It's the ultimate, working code for use by end users. Before a merge, it needs to be manually and unit tested first in the develop branch. You can use the app at [dev.ovfietsradar.nl](http://dev.ovfietsradar.nl). Travis should automatically deploy here after a push, and can only merge with develop branches.


### Feature branch
New branch per feature, merge when ready to test. 

To create a new feature branch and enter it:

`$ git checkout -b feature/my-feature-branch-name master`
- **checkout:** go to a specific branch
- **-b:** but wait, tell git to create a new branch, it should have a name!
- **my-feature-branch-name:** tell git to give the branch this name. Should be descriptive to the feature you're fixin'
- **master:** tell git to start out the new branch as similar from master
