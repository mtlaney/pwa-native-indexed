# pwa-native-indexed

## About the application

Base FrontEnd - Angular
Build Wrapper - Ionic

PWA - Angular PWA with Service Workers

Offline - Photos are stored in IndexedDB, and offline key/value and object DB - CRUD operations are stored in LocalStorage, persistent key/value storage

### to run as PWA locally -

cd into branch
`npm install`
`ionic build --prod`
`http-server -p 8080 -c-1 www`

### to run as Android Native on Studio -

cd into desired branch
`npm install`
`ionic build`
`ionic cap add android`
`ionic cap copy`
`ionic cap sync`
`ionic cap open android`
