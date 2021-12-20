# angel-back

Angel Back is the backend API for Angel Front App, allowing a user to create a Zoom meeting.

## Requirements

Express framework version > 4.17.2
node version > 17.0.1

### Getting Zoom credentials

Create a [Zoom JWT App](https://marketplace.zoom.us/docs/guides/build/jwt-app), and store in an .env file at the root of this project : 

```
APIKey= 
APISecret=
```

## Launch

````
npm i
node index.js
````
