import React, {useRef, useState, useEffect}  from "react";
import { SafeAreaView, Text, View, TouchableOpacity, Dimensions , Linking, Platform} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { WebView } from 'react-native-webview';

import { LogLevel, OneSignal } from 'react-native-onesignal';
import ReactNativeIdfaAaid, { AdvertisingInfoResponse } from '@sparkfabrik/react-native-idfa-aaid';
import appsFlyer from 'react-native-appsflyer';
import AsyncStorage from '@react-native-async-storage/async-storage';

{/**
получить разрешение на пуши - > 

инициализировать аппсфлаер - > 

получить нейминг от апсфлаера -> 

прикрепить этот нейминг к ссылке в sub_id_1,2,3 в формате «саб1_саб2_саб3»

получить рекламный айди девайса и апсфлаер айди юзера

прикрепить их к ссылке в последующие саб айди

открыть вебвью.
*/}


const WebViewScreen = ({ route }) => {

  const [firstLaunch, setFirstLaunch] = useState(true);
  console.log('firstLaunch==>', firstLaunch)
  const advertasingId = route.params?.advertasingId;
  const [idfa, setIdfa] = useState(advertasingId);
  
  //console.log('time==>', time)
  const refWebview = useRef(null);
  
  //console.log('currentData==>', currentData)
{/**
  useEffect(() => {
    if (idfa === null) {
      ReactNativeIdfaAaid.getAdvertisingInfo()
        .then((res) =>
          !res.isAdTrackingLimited ? setIdfa(res.id) : setIdfa(true),
        ).catch((err) => {
          console.log('err in WV48', err);
          return setIdfa(null);
        });
    };

  }, []);
 
  useEffect(() => {
    //if (idfa && !permissionRequested) {  idfa, permissionRequested
      // Метод для запиту дозволів на push-сповіщення
      OneSignal.Notifications.requestPermission(true).then((res) => {
        console.log('Дозвіл на сповіщення наданий:', res);
      });
      setPermissionRequested(true);
    //}
  }, []);
*/}
  // OneSignal.Notifications.requestPermission(true)
  // OneSignal fallbackToSettings: true

  {/**
 useEffect(() => {
   if (idfa !== null) {
     OneSignal.Notifications.requestPermission(true);
   }
 }, [idfa]);*/}

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
        if (parsedData.idfa === null) {
          setIdfa(idfa)
        } else {
          setIdfa(parsedData.idfa);
        }
        
        //setFirstLaunch(parsedData.firstLaunch);  if (idfa !== null)
      } else {
        
        await OneSignal.Notifications.requestPermission(true);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  {/**
 hasPermission permissionNative 
*/}
  
  //const product = `https://reactnative.dev/docs/animated`; // &apps_id=${uid}
  const product = `https://jewelllbell.space/MMqDZ5P4?ad_id=${idfa}`;
  console.log(' WV product', product)

  //ф-ція для повернення назад
  const goBack = () => {
    if (refWebview && refWebview.current) {
      refWebview?.current?.goBack();
    }
  };

  //ф-ція для оновлення сторінки
  const reloadPage = () => {
    if (refWebview && refWebview.current) {
      refWebview?.current?.reload();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#191d24'}}>
      
      <WebView
        originWhitelist={['*']}
        textZoom={100}
        allowsBackForwardNavigationGestures={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        source={{ uri: product }}
        allowsInlineMediaPlayback={true}
        setSupportMultipleWindows={false}
        mediaPlaybackRequiresUserAction={false}
        allowFileAccess={true}
        javaScriptCanOpenWindowsAutomatically={true}
        style={{ flex: 1, marginBottom: 7 }}
        ref={refWebview}
      />
    
     
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: -10 }}>

        <TouchableOpacity
          style={{ marginLeft: 40 }}
          onPress={goBack}>
          <AntDesign name="left" style={{ color: '#fff', fontSize: 20 }} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginRight: 40, }}
          onPress={reloadPage}>
          <AntDesign name="reload1" style={{ color: '#fff', fontSize: 20 }} />
        </TouchableOpacity>
                
      </View>

    </SafeAreaView>
  );
};


export default WebViewScreen;