# sentry.io
Sentry.io website

## Setup
```
$ bundle install
$ npm install -g grunt-cli
$ npm install
```
### Previewing
Starts the Jekyll server on `http://localhost:4000`
`$ grunt jekyll:server`

### Building
Will build the site, putting files in the `dist` directory.
`$ grunt build`

### Deplying
Will build and deploy to gh-pages.
`$ grunt deploy`
