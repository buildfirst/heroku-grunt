# _Build_ with Grunt _First_, then Deploy to Heroku

Back in [**ch04e05** Heroku Deployments](https://github.com/bevacqua/buildfirst/tree/master/ch04/05_heroku-deployments "Heroku Deployments") we learned how to install, create, configure, and deploy to a environment hosted on the Heroku platform. We've left out a particularly important piece of information though.

### Heroku and Grunt Builds

Where is the result of our Grunt build _supposed to go_? Should we check in build results to source control? Should we add a `grunt build` step to our **Procfile**? The answer lies in [Heroku Buildpacks](https://devcenter.heroku.com/articles/buildpacks), as explained in the book.

In this case, we can use the [heroku-buildpack-nodejs-grunt](https://github.com/heroku/heroku-buildpack-nodejs "mbuchetics/heroku-buildpack-nodejs-grunt on GitHub"), which helps us run Grunt builds on the Heroku platform.

Mostly, the buildpack lets us keep our Grunt dependencies in `devDependencies` like we've been doing. We wouldn't be able to do this using the default Heroku build pack for Node.js, as it currently runs `npm install --production`, omitting the modules in `devDependencies`. We want to keep them in `devDependencies` because they're not really part of the running application, but merely a part of the build.

### Stepping Through

In this sample I'll just be running a JSHint task for simplicity's sake, but we _could use this same setup to compile Jade templates_, for example, and the files would still live in the environment.

If you haven't done so in the previous example, [**ch04e05** Heroku Deployments](https://github.com/bevacqua/buildfirst/tree/master/ch04/05_heroku-deployments "Heroku Deployments"), you'll need to install the Heroku CLI and authenticate with it at this point, using `heroku login`.

![heroku-auth.png][1]

Next up we need to create a Heroku app, using the special buildpack we've been talking about.

```shell
heroku create thing --buildpack https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt.git
```

![heroku-create-buildpack.png][2]



  [1]: http://i.imgur.com/xKEeGDv.png "Authenticating with Heroku CLI"
  [2]: http://i.imgur.com/cxyvlBr.png "Creating an application with a buildpack"