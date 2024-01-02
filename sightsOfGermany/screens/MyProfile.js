// MyProfile
import React, { useState,useEffect } from "react";
import { Image, ImageBackground, KeyboardAvoidingView, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { uid } from 'uid';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const ProfileScreen = ({navigation}) => {

  
  const [avatar, setAvatar] = useState([]);
  const [caver, setCaver] = useState([]);
  const [prevName, setPrevName] = useState('');
  const [name, setName] = useState('');
  //console.log('name==>', name);
  const [isVisible, setIsVisible] = useState(false);
  const [zooName, setZooName] = useState('');
  const [adress, setAdress] = useState('');
  const [discription, setDiscription] = useState('');
  const [selectedData, setSelectedData] = useState('');
  //console.log('selectedData==>', selectedData);
  const [post, setPost] = useState([]);
  //console.log('post==>', post);
  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    setData();
  }, [avatar,caver,name,post])

  const setData = async () => {
    try {
      const data = {
        avatar,
        caver,
        name,
        post,
      }
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem("userData", jsonData);
      console.log('Дані збережено в AsyncStorage')
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('userData');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setAvatar(parsedData.avatar);
        setCaver(parsedData.caver);
        setName(parsedData.name);
        setPost(parsedData.post);
        
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };
  
  const AvatarImagePicer = () => {
    let options = {
      storageOptios: {
        path: 'image',
      }
    };
        
    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        //console.log('response==>', response.assets[0].uri);
        setAvatar(response.assets[0].uri);

      } else {
        console.log('Вибір скасовано');
      }
    });
  };
  
  const CaverImagePicer = () => {
    let options = {
      storageOptios: {
        path: 'image',
      }
    };
        
    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        //console.log('response==>', response.assets[0].uri);
        setCaver(response.assets[0].uri);

      } else {
        console.log('Вибір скасовано');
      }
    });
  };

  const handleAddPostList = () => {
    const newItem = {
      zooName,
      adress,
      discription,
      data: selectedData,
      
    };

    setPost([newItem, ...post]);
    setZooName('');
    setAdress('');
    setDiscription('');
    setSelectedData(null);

    setIsVisible(false);
  };

  const handleCloseModal = () => {
    setIsVisible(false);

    setZooName('');
    setAdress('');
    setDiscription('');
    setSelectedData(null);
  };

    return (
        <View style={{ flex: 1, }}>
            <ImageBackground
                style={{ flex: 1, width: '100%' }}
                source={require('../accets/bgr.jpeg')}
            >
                <View style={{ flex: 1, marginTop: 35, position: 'relative' }}>

                    <ScrollView>
                        <View>

                            {/**CAVER */}
                            <View style={{ width: '100%', }}>
                                {caver.length < 1 ? (
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => { CaverImagePicer() }}
                                            style={{ alignItems: 'center', justifyContent: 'center', height: 250, borderWidth: 1, borderColor: 'gold', borderRadius: 5, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                                        ><Text style={{ color: '#000', fontSize: 25 }}>Tab to add</Text><Text style={{ color: '#000', fontSize: 25 }}>caver</Text></TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => { CaverImagePicer() }}
                                            style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderWidth: 1, borderColor: 'gold', borderRadius: 150, position: 'absolute', right: 10, bottom: -25 }}>
                                            <MaterialIcons name='photo-camera' style={{ fontSize: 40, }} />
                                        </TouchableOpacity>
                                    </View>
              
                                ) : (
                                    <View style={{ position: 'relative' }}>
                                        <Image
                                            source={{ uri: caver }}
                                            style={{ width: '100%', height: 250, borderWidth: 1, borderRadius: 5, borderColor: 'gold', }}
                                        />
                                        <TouchableOpacity
                                            onPress={() => { CaverImagePicer() }}
                                            style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderWidth: 1, borderColor: 'gold', borderRadius: 150, position: 'absolute', right: 10, bottom: -25 }}>
                                            <MaterialIcons name='photo-camera' style={{ fontSize: 40, }} />
                                        </TouchableOpacity>
                  
                                    </View>
              
                                )}
                            </View>
          
                            {/**avatar */}
                            <View style={{ position: 'absolute', left: 10, top: 120 }}>
                                {avatar.length < 1 ? (
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => { AvatarImagePicer() }}
                                            style={{ alignItems: 'center', justifyContent: 'center', width: 180, height: 180, borderWidth: 1, borderColor: 'gold', borderRadius: 150, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                                        ><Text style={{ color: '#000', fontSize: 25 }}>Tab to add</Text><Text style={{ color: '#000', fontSize: 25 }}>photo</Text></TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => { AvatarImagePicer() }}
                                            style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderWidth: 1, borderColor: 'gold', borderRadius: 150, position: 'absolute', right: 30, bottom: -15 }}>
                                            <MaterialIcons name='photo-camera' style={{ fontSize: 30, }} />
                                        </TouchableOpacity>
                                    </View>
              
                                ) : (
                                    <View style={{ position: 'relative' }}>
                                        <Image
                                            source={{ uri: avatar }}
                                            style={{ width: 180, height: 180, borderWidth: 1, borderColor: 'gold', borderRadius: 150, }}
                                        />
                                        <TouchableOpacity
                                            onPress={() => { AvatarImagePicer() }}
                                            style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderWidth: 1, borderColor: 'gold', borderRadius: 150, position: 'absolute', right: 30, bottom: -15 }}>
                                            <MaterialIcons name='photo-camera' style={{ fontSize: 30, }} />
                                        </TouchableOpacity>
                                    </View>
              
                                )}
              
                            </View>

          
                        </View>

                        {/**USER DATA BLOCK */}
                        <View style={{ marginTop: 70, paddingHorizontal: 10, }}>

                            {name === '' ? (
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    <TextInput
                                        placeholderTextColor='rgba(0, 0, 0, 0.5)'
                                        placeholder="Name..."
                                        value={prevName}
                                        onChangeText={setPrevName}
                                        style={{
                                            shadowOffset: { width: 3, height: 4 },
                                            shadowOpacity: .8,
                                            elevation: 9,
                                            marginBottom: 15, marginRight: 10, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderColor: 'gold', color: '#000', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 10, width: 250, height: 40
                                        }}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setName(prevName)}
                                        style={{ marginRight: 10, shadowOffset: { width: 3, height: 4 }, shadowOpacity: 0.8, elevation: 9, height: 40, width: 60, borderWidth: 1, borderColor: 'gold', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 10, alignItems: 'center', justifyContent: 'center', }}>
                                        <Text style={{ fontWeight: 'bold' }}>SAVE</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => setIsVisible(true)}
                                        style={{ shadowOffset: { width: 3, height: 4 }, shadowOpacity: 0.8, elevation: 9, height: 40, width: '100%', borderWidth: 1, borderColor: 'gold', backgroundColor: 'gold', borderRadius: 10, alignItems: 'center', justifyContent: 'center', }}>
                                        <Text style={{ fontWeight: 'bold' }}>+</Text>
                                        <Text style={{ fontWeight: 'bold' }}>history</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 35, color: 'gold', marginBottom: 10 }}>{name}</Text>
                  
                                    <TouchableOpacity
                                        onPress={() => setIsVisible(true)}
                                        style={{ shadowOffset: { width: 3, height: 4 }, shadowOpacity: 0.8, elevation: 9, height: 40, width: '100%', borderWidth: 1, borderColor: 'gold', backgroundColor: 'gold', borderRadius: 10, alignItems: 'center', justifyContent: 'center', }}>
                                        <Text style={{ fontWeight: 'bold' }}>+</Text>
                                        <Text style={{ fontWeight: 'bold' }}>history</Text>
                                    </TouchableOpacity>
                                </View>
              
                            )}
            

                        </View>

                        {/**  HISTIRY BLOCK */}
           

                        <View style={{ flex: 1, paddingTop: 20, paddingHorizontal: 20 }}>

                            {post ? (
                                post.map((item) => {
                                    return (
                                        <View
                                            style={{ borderWidth: 1, borderColor: 'gold', borderRadius: 5, padding: 5, backgroundColor: 'rgba(255, 255, 255, 0.5)', marginBottom: 10 }}
                                            key={uid()}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                {avatar && <Image
                                                    source={{ uri: avatar }}
                                                    style={{ width: 40, height: 40, borderRadius: 50 }} />}
                          
                                                <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 3 }}>{name}</Text>
                                            </View>
                                            <Text>{item.data}</Text>
                                            <Text>{item.zooName}</Text>
                                            <Text>{item.adress}</Text>
                                            <Text>{item.discription}</Text>
                        
                                        </View>
                                    )
                                })
                            ) : (
                                <View></View>
                            )}
                        </View>
           

                    </ScrollView>
          

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isVisible}
                    >
           
                        <View style={{ flex: 1, paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20, position: 'relative', backgroundColor: '#1e1e1e' }}>

                            <ScrollView>

                                <KeyboardAvoidingView>
                  
                                    {/**INPUT BOX */}
                                    <View>
                                        <TextInput
                                            placeholderTextColor='rgba(0, 0, 0, 0.5)'
                                            placeholder="Visited country..."
                                            value={zooName}
                                            onChangeText={setZooName}
                                            style={{
                                                shadowOffset: { width: 3, height: 4 },
                                                shadowOpacity: .8,
                                                elevation: 9,
                                                marginBottom: 15, marginRight: 10, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderColor: 'gold', color: '#000', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 10, width: 250, height: 40
                                            }}
                                        />
              
                                        <TextInput
                                            placeholderTextColor='rgba(0, 0, 0, 0.5)'
                                            placeholder="Attractions..."
                                            value={adress}
                                            onChangeText={setAdress}
                                            style={{
                                                shadowOffset: { width: 3, height: 4 },
                                                shadowOpacity: .8,
                                                elevation: 9,
                                                marginBottom: 15, marginRight: 10, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderColor: 'gold', color: '#000', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 10, width: 250, height: 40
                                            }}
                                        />
              
                                        <TextInput
                                            placeholderTextColor='rgba(0, 0, 0, 0.5)'
                                            placeholder="Discription..."
                                            value={discription}
                                            onChangeText={setDiscription}
                                            multiline={true}
                                            style={{
                                                shadowOffset: { width: 3, height: 4 },
                                                shadowOpacity: .8,
                                                elevation: 9,
                                                marginBottom: 5, marginRight: 10, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderColor: 'gold', color: '#000', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 10, width: 250, height: 120
                                            }}
                                        />
                                    </View>
              
                                    {/**Caledar */}
                                    <Text style={{ fontSize: 30, color: 'gold', marginBottom: 5 }}>When I visited this attractions:</Text>
                                    <Calendar
                                        onDayPress={day => {
                                            setSelectedData(day.dateString);
                                        }}
                                        markedDates={{
                                            [selectedData]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                                        }}
                                    />

                                    {/**BTN SAVE */}
                                    <TouchableOpacity
                                        onPress={() => handleAddPostList()}
                                        style={{ marginRight: 10, marginTop: 10, shadowOffset: { width: 3, height: 4 }, shadowOpacity: 0.8, elevation: 9, height: 40, width: 80, borderWidth: 1, borderColor: 'gold', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 10, alignItems: 'center', justifyContent: 'center', }}>
                                        <Text style={{ fontWeight: 'bold', color: 'gold', fontSize: 17 }}>SAVE</Text>
                                    </TouchableOpacity>

                                    {/**BTN CLOSE MODAL*/}
                                    <TouchableOpacity
                                        onPress={() => handleCloseModal()}
                                        style={{ position: 'absolute', right: -10, top: -10, marginRight: 10, marginTop: 10, shadowOffset: { width: 3, height: 4 }, shadowOpacity: 0.8, elevation: 9, height: 40, width: 40, borderWidth: 1, borderColor: 'gold', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 10, alignItems: 'center', justifyContent: 'center', }}>
                                        <Text style={{ fontWeight: 'bold', color: 'gold', fontSize: 20 }}>X</Text>
                                    </TouchableOpacity>

                                </KeyboardAvoidingView>
                            </ScrollView>
                        </View>
            

                    </Modal>
                  

                    {/**Go to home */}
                    <TouchableOpacity
                        style={{ position: 'absolute', bottom: 10, right: 10, width: 50, height: 40,  borderRadius: 10, alignItems: 'center', borderColor: 'gold', justifyContent: 'center' }}
                        onPress={() => { navigation.navigate('HomeScreen') }}
                    >
                        <Ionicons name='home' style={{ color: 'gold', fontSize: 30 }} />
                    </TouchableOpacity>
          
                </View>
        
            </ImageBackground>
       
        </View>
    );
};



export default ProfileScreen;