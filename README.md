# Red Badger Blog Template for Squarespace

Minimalistic Red Badger branded template. Universal. Works with and without JavaScript on the client.

## Setup

```
npm install
make start
```

## Issue Tracking

Please log any issues at https://github.com/redbadger/website-honestly/issues prepending `[Blog]` to the issue title.

## Supported post elements

All Squarespace block elements are tested and should work as expected. You will need JS enabled client for some of the interactive elements.

## Deployment

Squarespace provides us with git endpoint. Deployment is happening by pushing current master branch to that endpoint.
You can now deploy to squarespace using BadgerBot. Run `@badgerbot blog` in Slack: #internal-projects. Badgerbot uses the `hello@red-badger.com` squarespace account to deploy.

`@badgerbot blog deploy` to deploy

There is currently no staging environment.
