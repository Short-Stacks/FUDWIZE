# Load Test Users

This branch includes the test user database. To add the test users, just checkout the branch and start the server. It will first remove the included test users if it already exists, and then readd the test users to the mongo database. Then kill the server and switch to a different branch. The mongo database will retain the testusers even if you switch branches.
