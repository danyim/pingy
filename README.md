# pingy
`pingy` is a couple of Node.js apps that interact with eachother to broadcast a home computer's ever-changing IP to the internet. It is a poor man's dynamic IP solution. This comes in handy when used in unison with the free tier of Heroku.

### Setting Up
1. **Install the Agent in a Heroku Instance**
  - Clone this repository on your local machine
  - Using the [Heroku Toolbelt](https://toolbelt.heroku.com/), enter your credentials with `heroku login`
  - Create an app `heroku create <your app name>`
  - Run `./heroku.sh` to subtree the branch and only push the `agent` directory to the Heroku deployment
  - Make sure to grab the URL that is listed at the end of Heroku's deployment
2. **Install the Pinger on a machine on your home network**
  - Clone this repository on the home server (or some other machine in your home network)
  - `npm install`
  - `node pinger/server.js`
    - OPTIONAL: Use the [Guvnor](https://github.com/tableflip/guvnor) to run the pinger as a service
3. Navigate to your Heroku URL and you'll be redirected to your home server.

### Concept
#### Pinger (on home machine)
- Sends a GET request to a website (http://canihazip.com/s) to grab the machine's external IP
- Stores the IP. If changed, send a POST to Agent

#### Agent (on Heroku)
- POST endpoint to receive and store pinger's IP
- GET endpoint that will redirect to the IP
- Hosting this on Heroku will give you a gauranteed URL: http://[something].herokuapp.net

### License
MIT License
