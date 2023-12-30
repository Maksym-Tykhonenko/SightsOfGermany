import 'react-native-gesture-handler';
import React,{useState, useEffect, useRef} from "react";
import {Animated, StyleSheet, View, Text, ActivityIndicator, Alert } from "react-native";


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Europe from "./routs/Europe";
import OtherWorld from "./routs/OtherWorld";
import MyProfile from "./routs/MyProfile";
import WebViewScreen from "./routs/WebView";

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { LogLevel, OneSignal } from 'react-native-onesignal';
import ReactNativeIdfaAaid, { AdvertisingInfoResponse } from '@sparkfabrik/react-native-idfa-aaid';
import appsFlyer from 'react-native-appsflyer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



const App = () => {//
  
  const [turn, setTurn] = useState('loader');
  //console.log('turn==>', turn)
  //const [uid, setUid] = useState(null);
  //const [naming, setNaming] = useState(null);
  const [idfa, setIdfa] = useState(null);
  //console.log('idfa in App==>', idfa)
  const [rout, setRout] = useState(null);
  //console.log('rout', rout);
  const [firstLanch, setFirstLanch] = useState(true);
  console.log('firstLanch in APP==>', firstLanch);
{/**
  useEffect(() => {
      ReactNativeIdfaAaid.getAdvertisingInfo()
        .then((res) =>
          !res.isAdTrackingLimited ? setIdfa(res.id) : setIdfa(true),
          //setTurn('loader')
        )
        .catch((err) => {
          console.log('err in App 55==>', err);
          //setTurn('loader');
          return setIdfa(true);
        });
    
      
  }, []);

  useEffect(() => {
    if (idfa && !permissionRequested) {
      // Метод для запиту дозволів на push-сповіщення
      OneSignal.Notifications.requestPermission(true).then((res) => {
        console.log('Дозвіл на сповіщення наданий:', res);
        setTurn('app')
      });
      setPermissionRequested(true);
    }
  }, [idfa, permissionRequested]);
 */}
  {/***/}
  useEffect(() => {
    if (idfa !== null) {
      setTurn('permition');

      setTimeout(() => {
        setTurn('app');
      }, 1000);
    }
  }, [idfa]);
 
  {/**
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
      }
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem("userIDFA", jsonData);
      console.log('Дані збережено в AsyncStorage на WebViewScreen')
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
        setIdfa(parsedData.idfa);
       
      } else  {
        requestNotificationPermission()
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };
 */ }
  
  const fetchIdfa = () => {
    return new Promise(async (resolve, reject) => {

      try {
        const res = await ReactNativeIdfaAaid.getAdvertisingInfo();
        
        if (!res.isAdTrackingLimited) {
          setIdfa(res.id);
          setFirstLanch(false);
        } else {
          setIdfa(true);
          setFirstLanch(false);
        }
        resolve(); // Виклик resolve() після завершення обробки
      } catch (err) {
        //console.log('Error in fetching IDFA:', err);
        setIdfa(null);
        //reject(err); // Виклик reject() у випадку помилки
      }
    })

  };

{/***/}
  const requestNotificationPermission = () => {
    return new Promise(async (resolve, reject) => {
      if (idfa) {
        try {
          const res = await OneSignal.Notifications.requestPermission(true);
          
          console.log('Дозвіл на пуши:', res);
          setTurn('app');
          resolve();
        } catch (error) {
          console.error('Error while requesting notification permission:', error);
          //reject('помилка в requestNotificationPermission 116', error);
        }
      }
    });
  };
  
  const initializeOneSignal = () => {
    // Remove this method to stop OneSignal Debugging
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    // OneSignal Initialization
    OneSignal.initialize("e59d3bf9-2fca-48f8-ba4a-3aebf04f8777");
    // Method for listening for notification clicks
    OneSignal.Notifications.addEventListener('click', (event) => {
      console.log('OneSignal: notification clicked:', event);
    });
    //Add Data Tags
    OneSignal.User.addTag("key", "value");
  };
  
  ////////////////// лоудер
  const ChangeInView = props => {
    // const fadeAnim = useRef(new Animated.Image(require('../../acets/loader1.jpg'))).current;
    
    const firstAnimImg = useRef(new Animated.Value(1)).current; // Initial value for opacity: 1 to 0
    useEffect(() => {
      Animated.timing(firstAnimImg, {
        toValue: 0,
        duration: 4500,
        useNativeDriver: true,
      }).start();
    }, []);

    const secondAnimImg = useRef(new Animated.Value(0)).current;// Initial value for opacity: 0 to 1
    useEffect(() => {
      Animated.timing(secondAnimImg, {
        toValue: 1,
        duration: 4500,
        useNativeDriver: true,
      }).start();
    }, []);

    const firdAnimImg = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0 to 1
    useEffect(() => {
      setTimeout(() => {
        Animated.timing(firdAnimImg, {
          toValue: 1,
          duration: 4500,
          useNativeDriver: true,
        }).start();
      }, 3500);
{/**  */}
      setTimeout(() => {
        setTurn('app')
        console.log('консоль 121')
      }, 9000);
     
    }, []);
 

    return (
      <View style={{ position: 'relative', flex: 1 }}>
        <Animated.Image
          source={require('./accets/loader/loader_1.png')}// Special animatable View
          style={{
            ...props.style,
            opacity: firstAnimImg,
            //width: 'auto',
            height: '100%'  // Bind opacity to animated value
          }} />
        <Animated.Image
          source={require('./accets/loader/loader_2.png')}// Special animatable View
          style={{
            ...props.style,
            opacity: secondAnimImg,
            //width: '100%',
            height: '100%',
            position: 'absolute'// Bind opacity to animated value
          }} />
        <Animated.Image
          source={require('./accets/loader/loader_3.png')}// Special animatable View
          style={{
            ...props.style,
            opacity: firdAnimImg,
            //width: '100%',
            height: '100%',
            position: 'absolute'// Bind opacity to animated value
          }} />
      </View>
    
    );
  };

  /////////////check
  const checkUrl = async () => {
  //const checkUrl = 'https://reactnative.dev/';
  const checkUrl = 'https://jewelllbell.space/s8m2gj5z';
  const targetData = new Date('2023-12-24 12:00:00'); // дата з якої поч працювати webView 
  const currentData = new Date(); // текущая дата 

  if (currentData.getTime() <= targetData.getTime()) {
    setRout(false);
  } else {
    try {
      const response = await fetch(checkUrl);
      if (response.status === 200) {
        setRout(true);
        // setIsLoading(false)
      } else {
        setRout(false);
        // setIsLoading(false)
      }
    } catch (err) {
      console.log('error 182', err);
      setRout(false);
    }
  }
  };
  checkUrl();
  {/** 
  useEffect(() => {
    //const checkUrl = 'https://reactnative.dev/';
    const checkUrl = 'https://jewelllbell.space/s8m2gj5z';
    const targetData = new Date('2023-12-29 12:00:00');//дата з якої поч працювати webView 
    const currentData = new Date();//текущая дата 

  // if(turn === 'loader')
    if (currentData.getTime() <= targetData.getTime()) {
      setRout(false)
    } else (

      fetch(checkUrl).then(r => {
        if (r.status === 200) {
          setRout(true)
          //setIsLoading(false)
        } else {
          setRout(false)
          //setIsLoading(false)
        }
      }).catch(err => {
        console.log('error', err)
        setRout(false)

      })
    );
  }); */}


    fetchIdfa().then(() => {
      initializeOneSignal();
     
    }).catch((error) => console.error('Error:', error))

///////////////// route app   appsFlyerUID: uid, appsFlyerNaming: naming, 
  const Route = ({ isFatch }) => {
    
    if (isFatch) {
      return (
        <Stack.Navigator >
          <Stack.Screen
            options={{ headerShown: false }}
            name="WebViewScreen"
            component={WebViewScreen} initialParams={{ advertasingId: idfa , lanch: firstLanch}} />
        </Stack.Navigator>
      )
    } return (
      <Tab.Navigator initialRouteName='Europe' screenOptions={{
        tabBarShowLabel: true,
        headerShown: false,
      }}>
      
        <Tab.Screen name="My Profile" component={MyProfile} options={{
          tabBarActiveBackgroundColor: '#36212c',
          tabBarInactiveBackgroundColor: '#8c1633',
          tabBarLabelStyle: { color: '#fff' },
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign name='profile' style={{ color: focused ? '#fff' : '#fff', fontSize: 25 }} />
            )
          }
        }} />
        
        <Tab.Screen initialParams={{ advertasingId: idfa , lanch: firstLanch}} name="Europe" component={Europe}
          options={{
          tabBarActiveBackgroundColor: '#36212c',
          tabBarInactiveBackgroundColor: '#8c1633',
          tabBarLabelStyle: { color: '#fff' },
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome name='euro' style={{ color: focused ? '#fff' : '#fff', fontSize: 25 }} />
            )
          }
        }} />
        <Tab.Screen name="Other World" component={OtherWorld} options={{
          tabBarActiveBackgroundColor: '#36212c',
          tabBarInactiveBackgroundColor: '#8c1633',
          tabBarLabelStyle: { color: '#fff' },
          tabBarIcon: ({ focused }) => {
            return (
              <Fontisto name='world' style={{ color: focused ? '#fff' : '#fff', fontSize: 25 }} />
            )
          }
        }} />
      
      
      </Tab.Navigator>
    )
    
  };

  return (
    <NavigationContainer>

      {turn === 'permition' && <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#551c30' }}>
        <ActivityIndicator size="large" color="#ccc" />
      </View>}
      
      {turn === 'loader' && <ChangeInView
        style={{
          width: '100%',
          //height: 50,
          backgroundColor: 'powderblue',
        }}>
      </ChangeInView>}
      
      {turn === 'app' && <Route isFatch={rout} />}
      
    </NavigationContainer>
  );
};


export default App;

