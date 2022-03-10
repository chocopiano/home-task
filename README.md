## Trying the app!!


Install all dependencies for the app:
```
yarn
```

### Server

To start running the server:
```
yarn server
```

Backend follows the clean architure.

### Frontend

1) Set the size of the plateau and press "SET SIZE".
2) Select the initial position and press "ENTER".
3) Finally insert the instructions and press "ENTER"

If you want to star again, just press "RESTART".

To setup and start the app run:
```
yarn client
```

### Linter

For a better coding experience, I install eslint with airbnb template and I added some extra rules.

To run the linter:
```
yarn run lint
```


## Testing
I add coverage for testing. All the test have 100% of verage.

Run `yarn test:client` to run frontend tests.

Run `yarn test:server` to run backend tests.
