# PacTrivia Front End

## Instructions to Build

1. Navigate to the project directory:
    ```sh
    cd trivia
    ```

2. Install the necessary dependencies:
    ```sh
    npm install
    ```

3. Start the Expo development server with a clear cache:
    ```sh
    npx expo start --clear
    ```

## Special Note

Our project uses `AnimatedCircularProgress` for the frontend from the `react-native-circular-progress` package. 
There is an open issue with this component that triggers a warning, although it does not affect functionality.

To disable the warning (if encounter one):

1. Go to `node_modules` > `react-native-circular-progress` > `src` > `CircularProgress.js`.
2. Comment out the line `style: PropTypes.object` from the definition of `CircularProgress.propTypes`.

### Example:
```javascript
CircularProgress.propTypes = {
//   style: PropTypes.object,
 ...
};
