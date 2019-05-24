# react-router-promises

[![Greenkeeper badge](https://badges.greenkeeper.io/nicholassaunders/react-router-promises.svg)](https://greenkeeper.io/)

Adapts react-router hooks to promises instead of callbacks.

Instead of this:
```
function loadUsersIntoStore(nextState) {
  return new Promise((resolve, reject) => {
    // fetch user listing and add it to the data store
  });
}

function loadUsersOnEnter(nextState, replace, callback) {
  loadUsersIntoStore(nextState).then(callback);
}

function loadUsersOnChange(prevState, nextState, replace, callback) {
  loadUsersIntoStore(nextState).then(callback);
}
```
```
<Route path="/users" component={UserListing} onEnter={loadUsersOnEnter} onChange={loadUsersOnChange} />
```

This library will allow you to do this:
```
import { enter, change } from 'react-router-promises';

function loadUsersIntoStore(nextState) {
  return new Promise((resolve, reject) => {
    // fetch user listing and add it to the data store
  });
}
```
```
<Route path="/users" component={UserListing} onEnter={enter(loadUsersIntoStore)} onChange={change(loadUsersIntoStore)} />
```
