# Set-up React Native
To setup react native follow the steps on the link below

    https://reactnative.dev/docs/environment-setup
    
    The kitchen app uses ios and MAC
    
    All the other apps use android 9 and Windows
   
  
 # Setup the apps   
Once you have that clone our project and follow the below steps

1.) open andriod studio to the app you want work on for example:C:\Users\Het Patel\Restaurant-Kiosk-Project\front-end\customerApp
Latest BACKEND CODE IS LOCATED AT https://github.com/JFergen/Restaurant-Kiosk-Project/tree/dev/front-end/customerApp/src

1.) To run: unit tests you must cd into in the following directory: 
    
    'Restaurant-Kiosk-Project\front-end\customerApp'

2.) Then run: 

    firebase emulators:exec --only firestore 'npm test'

3.) The file for unit test is located in the following directory: 
     
    'Restaurant-Kiosk-Project\front-end\customerApp\__tests__' 
    
    The file is called 'App-test.js'


1.) open andriod studio to the app you want work on for example: C:\Users\Het Patel\Restaurant-Kiosk-Project\front-end\customerApp
  
    1.1) open your virtual device make sure it is running

2.) open windows power shell as admin

3.) in power shell cd to your directory for the app you want to work on for example: C:\Users\Het Patel\Restaurant-Kiosk-Project\front-end\customerApp
  
    3.1.) npm install
  
    3.2.) npm i @react-native-firebase/firestore
  
    3.3)  npm i react-native-paper
  
    3.4.) npm i react-native-vector-icons
    
    3.5) npm i '@react-native-firebase/functions'
    
    3.6) npm i '@react-native-firebase/firestore'
     
    3.7) npm i '@react-native-firebase/auth'
    
    3.8) npm i react-native-gesture-handler
    
    3.9) npm i 'react-navigation'

    3.10) npm i 'react-navigation-stack'
  
    3.11) npm i '@react-native-community/async-storage'
    
    3.12) npm i 'react-native'

    3.13) npm i 'react'

    3.14) npm i '@react-native-firebase/app'
    
    3.15) npm i '@firebase/testing'

    
    

4.) in andriod studio
 
    4.4.) open android/app/build.gradle
 
    4.5.) in the defultConfig struct add multiDexEnabled true as shown below:

    android {

    ....

        defaultConfig {
            ....
            multiDexEnabled true
        }
  
5.) In power shell cd to your directory for the app you want to work on for example: C:\Users\Het Patel\Restaurant-Kiosk-Project\front-end\customerApp
  
    5.0.) Type the below command
  
    5.1.) npx react-native run-android
  
    5.1.2) if you have a debug error which says failed to generate debug file re-run npx react-native run-android
  
    5.1.3) if you have a debug error then go to android\app\build\generated\res\google-services\debug and delete the debug folder and re-run npx react-native run-android

6.) if all goes well you should see your app on your virtual device and you can add data through the firebase console. Go to database and on the top left select Cloud Firestore

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# Unit Test

We use firebase emulator along with Jest to run our unit test. The results for this test are located in Restaurant-Kiosk-Project folder and is in a file called unitTest.txt

1.) To run: unit tests you must cd into in the following directory: 
    
    'Restaurant-Kiosk-Project\front-end\customerApp'
    
    'Restaurant-Kiosk-Project\front-end\kitchenApp'
    
    'Restaurant-Kiosk-Project\front-end\managerApp'
    
    'Restaurant-Kiosk-Project\front-end\waitstaffApp'
    
    

2.) Then run: 

    firebase emulators:exec --only firestore 'npm test'

3.) The file for unit test is located in the following directory: 
     
    'Restaurant-Kiosk-Project\front-end\customerApp\__tests__'
    
    'Restaurant-Kiosk-Project\front-end\kitchenApp\__tests__'
    
    'Restaurant-Kiosk-Project\front-end\managerApp\__tests__'
    
    'Restaurant-Kiosk-Project\front-end\waitstaffApp\__tests__'
    
    The file is called 'App-test.js'



# Backend Function Usage
## Promises
Every backend function returns a promise. A promise is an object that represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.

To handle a promise: 
```
 updateMenu(item) 
  .then((success) => {
        console.log('Function successful', success);
    })
    .catch((error) => {
        console.log('Function error', error);
    });
```    
    
 ## Function Arguments
 Some functions require the user to pass in an 'item' object. This object should look like this:
 ```
 let item = {
  calories: 750,
  indgredients: ['cheese', 'tomato sauce', 'pepperoni'],
  name: 'Pizza',
  price: 6.99,
  type: 'entree',
  uri: 'image link'
  }
  ```
  
