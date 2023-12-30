import React, {useState, useEffect}  from "react";
import { SafeAreaView,StyleSheet,View, Text, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import ReactNativeIdfaAaid, { AdvertisingInfoResponse } from '@sparkfabrik/react-native-idfa-aaid';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import EuropeHome from "../europeScreens/EuropeHome";
import EuropeDitails from "../europeScreens/EuropeDitails";
import AustriaDitails from "../europeScreens/AustriaDitails";
import AustriaCityDitails from "../europeScreens/AustriaCityDitails";
import Map from "../europeScreens/Map";

const Europe = ({ route }) => {
  //console.log('route==>', route.params.lanch)
  const advertasingId = route.params?.advertasingId;
  const [idfa, setIdfa] = useState(advertasingId);
  //console.log('idfa in Europe==>', idfa);

  const lanch = route.params.lanch;
  //console.log("lanch: ", lanch)
  const [firstLanch, setfirstLanch] = useState(lanch);
  //console.log('firstLanch in Europe==>', firstLanch)
 {/**
  //const advertasingId = route.params?.advertasingId;
  const [idfa, setIdfa] = useState(null);
  useEffect(() => {
   
      ReactNativeIdfaAaid.getAdvertisingInfo()
        .then((res) =>
          !res.isAdTrackingLimited ? setIdfa(res.id) : setIdfa(true),
        )
        .catch((err) => {
          console.log(' in Eur', err);
          return setIdfa(null);
        });
  
  }, []);
  useEffect(() => {
    if (idfa) {
      // Метод для запиту дозволів на push-сповіщення
      OneSignal.Notifications.requestPermission(true);
    }
  }, [idfa]);
 */}
  {/** 
  const [turn, setTurn] = useState('app');

  const advertasingId = route.params?.advertasingId;
  const [idfa, setIdfa] = useState(advertasingId);
  console.log('idfa in Europe screen', idfa)

  useEffect(() => {

    const performIdfaOperations = async () => {
      if (!idfa) {
        const res = await ReactNativeIdfaAaid.getAdvertisingInfo()
          .then((res) =>
            //console.log('RES==>', res),
            !res.isAdTrackingLimited ? setIdfa(res.id) : setIdfa(true),
          ).catch((err) => {
            //Alert.alert('Alert Помилка')
            console.log('App.js idfa помилка', err);
            return setIdfa(null);
          });
      }
    };

    const requestPermission = async () => {
      try {
        if (idfa) {
          const res = await OneSignal.Notifications.requestPermission(true);
          console.log('res==>', res[0]);
          
        }
      } catch (e) {
        console.error("Error=>", e);
      }
    };

    const performOneSignalOperations = async () => {
      try {
        console.log('App.js performOneSignalOperations');
    
        // Remove this method to stop OneSignal Debugging
        OneSignal.Debug.setLogLevel(LogLevel.Verbose);

        // OneSignal Initialization
        const initializePromise = new Promise((resolve) => {
          OneSignal.initialize("e59d3bf9-2fca-48f8-ba4a-3aebf04f8777", {
            // Additional initialization options can be added here
            // ...
            // Add a callback to resolve the promise once initialized
            initialized: resolve
          });
        });
        await initializePromise;

        // Method for listening for notification clicks
        OneSignal.Notifications.addEventListener('click', (event) => {
          console.log('OneSignal: notification clicked:', event);
        });

        // Add Data Tags
        OneSignal.User.addTag("key", "value", (tagsSent) => {
          console.log('Tags Sent:', tagsSent);
        });
      } catch (error) {
        console.error('Помилка під час виконання операцій OneSignal:', error);
        // Обробка помилки, якщо є
      }
    };

    performIdfaOperations();
    requestPermission();
    performOneSignalOperations();
    
  }, [idfa]);

  //useEffect(() => {
  //  setData();
  //}, []);
  
  const setData = async () => {
    try {
      const data = {
        turn,
      }
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem("namingData", jsonData);
      console.log('Дані збережено in Europe AsyncStorage');
    } catch (e) {
      console.log('App.js Помилка збереження даних 190:', e);
    }
  };
*/}
  {/** 
  useEffect(() => {
    if (idfa !== null) {
      OneSignal.Notifications.requestPermission(true)
    }
    
  }, [idfa]);
*/}

{/** */}
  useEffect(() => {
    getData(); // дані завантажені з AsyncStorage
  }, []);

  useEffect(() => {
    setData(); // Запис даних у AsyncStorage при зміні bankName, info або photo
  }, [idfa]);

  const setData = async () => {
    try {
      const data = {
        idfa,
        //firstLaunch: false
      }
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem("userIDFA", jsonData);
      console.log('Дані збережено в AsyncStorage на Europe')
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('userIDFA');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        if (parsedData.idfa === null) {
          setIdfa(idfa)
        } else {
          setIdfa(parsedData.idfa);
        }
        
        //setFirstLaunch(parsedData.firstLaunch);  if (idfa !== null)
      } else {
          // Метод для запиту дозволів на push-сповіщення
          OneSignal.Notifications.requestPermission(true);
        
      } 
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  return (
    <Stack.Navigator >
      <Stack.Screen options={{ headerShown: false }} name="EuropeHome" component={EuropeHome} />
      <Stack.Screen options={{ headerShown: false }} name="EuropeDitails" component={EuropeDitails} />
      <Stack.Screen options={{ headerShown: false }} name="AustriaDetails" component={AustriaDitails} />
      <Stack.Screen options={{ headerShown: false }} name="AustriaCityDetails" component={AustriaCityDitails} />
      <Stack.Screen options={{ headerShown: false }} name="Map" component={Map} />
    </Stack.Navigator>
  );
 
};


export default Europe;

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  btn: {
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 50,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: .8,
    elevation: 9,
    borderColor: '#ccc',
    
  },
  btnText: {
    fontSize: 25,
    color: '#000',
    fontWeight: 'bold'
  
  },

});