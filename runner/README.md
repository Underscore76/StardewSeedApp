# C# Runner

This section defines the runner that will actually do the seed checking.

To get it to work right now, we are building against the actual StardewValley.GameData and MonoGame.Framework dlls because I wanted to dramatically reduce the amount of code burden we have to maintain.

To run this project you'll need to copy those dlls into your own project into the `lib/` folder. You can find them in your Stardew Valley install directory. The lib folder is set up to have contents ignored, but still please ensure you don't commit those dlls in.

To make this work in practice, we'll pull those files out of a private S3 bucket at build time to keep from distributing them.

## Current Progress

- Can query from DynamoDB and update status (pulled table name from SSM, I hate the async nature of this SDK, it colors all functions...)
- Can take a json payload and convert it into the set of checks we need to run
- Can run those checks across a series of requested seeds

## TODO:

- need to be able to look at environment variables (how the job/user id are going to be sent to the ecs:RunTask command)
- need to modify build to pull in the dlls from s3
- need to add bundle checks
- need to update the job ddb requests for actual structure