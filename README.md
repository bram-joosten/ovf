# ovf
The new and improved CI repo for OV Fiets Radar
===========

Develop branch: is a mirror from the master. Use for testing live! You may always merge from master into this develop branch. For example if nothing works or things screw up, just merge from master and we're safe. In the develop branch you test if your code works. You should probably only merge feature branches into the develop branch. You can preview this code at dev.ovfietsradar.nl. Travis will automatically deploy to here and optionally test it.

Master branch: has to always work. It's the ultimate, working code for use by end users. Before a merge, it needs to be manually and unit tested first in the develop branch. You can use the code at ovfietsradar.nl. Travis should automatically deploy here after a push, and can only merge with develop branches.

Feature branch: new branch per feature.