# _Build First_, Deploy, Build Again

_This repository is part of the **JavaScript Application Design: A Build First Approach** book's code samples_, the full original for the code samples [can be found here](https://github.com/bevacqua/buildfirst). You can [learn more about the book itself here](http://bevacqua.io/buildfirst "JavaScript Application Design: A Build First Approach").

This tutorial is part of the code samples accompanying the book [in _Chapter 4_](https://github.com/bevacqua/buildfirst/tree/master/ch04), about the release flow, deployments, and hosted application monitoring.

Back in [**ch04e05** Heroku Deployments](https://github.com/bevacqua/buildfirst/tree/master/ch04/05_heroku-deployments "Heroku Deployments") we learned how to install, create, configure, and deploy to a environment hosted on the Heroku platform. We've left out a particularly important piece of information though. How are we supposed to get a Grunt build on our Heroku environment?

### Heroku and Grunt Builds

Where is the result of our Grunt build _supposed to go_? Should we _check in_ build results to source control? Should we add a `grunt build` step to our **Procfile**? The answer lies in [Heroku Buildpacks](https://devcenter.heroku.com/articles/buildpacks), as explained [in the book](http://bevacqua.io/buildfirst "JavaScript Application Design: A Build First Approach").

In this case, we will use the [heroku-buildpack-nodejs-grunt](https://github.com/heroku/heroku-buildpack-nodejs "mbuchetics/heroku-buildpack-nodejs-grunt on GitHub"), which helps us run Grunt builds on the Heroku platform. Buildpacks are glorified bundles of shell scripts which Heroku uses to as an interface to compile all sorts of applications.

Mostly, the buildpack lets us keep our Grunt dependencies in `devDependencies` like we've been doing. We wouldn't be able to do this using the default Heroku build pack for Node.js, as it currently runs `npm install --production`, omitting the modules in `devDependencies`. We want to keep them in `devDependencies` because they're not really part of the running application, but merely a part of the build.

### Stepping Through

In this sample I'll just be running a JSHint task for simplicity's sake, but we _could use this same setup to compile Jade templates_, for example, and the files would still live in the environment.

If you don't have an account on Heroku, the Toolbelt, haven't log on or didn't yet upload an RSA key, make sure to check out the previous example, [**ch04e05** Heroku Deployments](https://github.com/bevacqua/buildfirst/tree/master/ch04/05_heroku-deployments "Heroku Deployments"), you'll need to do those things to be able to follow through with this tutorial.

![heroku-auth.png][1]

## Create the Heroku Application

Next up we need to create a Heroku app, using the special buildpack we've been talking about.

```shell
heroku create thing --buildpack https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt.git
```

![heroku-create-buildpack.png][2]

## Deploying stays the same

```shell
git push heroku master
```

![heroku-deploy.png][3]

But suddenly, _**a wild Grunt build appears**_! The `heroku` Grunt task alias will be invoked. In this case, we've aliased it to `['jshint']`. These were taken _before setting options for the linter_, to use the `"node"` profile.

![heroku-jshint.png][4]

Note that if the build fails, **the deployment won't go through**.

That's all that we need to do in order to run Grunt builds on Heroku!

  [1]: http://i.imgur.com/xKEeGDv.png "Authenticating with Heroku CLI"
  [2]: http://i.imgur.com/cxyvlBr.png "Creating an application with a buildpack"
  [3]: http://i.imgur.com/KWABxcp.png "Deploying to Heroku"
  [4]: http://i.imgur.com/6iU2wOq.png "Linting in Heroku"
