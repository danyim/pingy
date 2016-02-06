# pingy
`pingy` is a couple of Node.js apps that interact with each other in order to broadcast a home computer's ever-changing IP to the internet. This comes in handy when used in unison with Heroku

### Installation
- **Pinger**
  - Place /pinger on a machine with NodeJS
  - Use the [Guvnor](https://github.com/tableflip/guvnor) to run the pinger in the background
- **Agent**
  - Spin up a free Heroku instance and upload the /agent code into there
- Navigate to your Heroku URL and you'll be automatically redirected to your home server!

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
