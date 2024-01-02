import React,{useState, useEffect} from "react";
import { View, Text, TouchableOpacity, ImageBackground, Image, ScrollView, Modal , TextInput} from "react-native";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView from 'react-native-maps';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { uid } from 'uid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Details = ({ navigation, route }) => {

    const [details, setDetails] = useState(route.params);
    //console.log('details==>', details);
    const { description, latitude, longitude, photo, title, topic } = details;
    const [coast, setCoast] = useState();
    const [selectPhoto, setSelectPhoto] = useState([]);
    console.log('selectPhoto==>', selectPhoto)
    const [visibleGallaryFolder, setVisibleGallaryFolder] = useState(false);


    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        setData();
    }, [selectPhoto, details]);

    const setData = async () => {
        try {
            const data = {
                selectPhoto,
                details,
                coast
            }
            const jsonData = JSON.stringify(data);
            await AsyncStorage.setItem(`Details${title}`, jsonData);
            console.log('Дані збережено в AsyncStorage')
        } catch (e) {
            console.log('Помилка збереження даних:', e);
        }
    };

    const getData = async () => {
        try {
            const jsonData = await AsyncStorage.getItem(`Details${title}`);
            if (jsonData !== null) {
                const parsedData = JSON.parse(jsonData);
                console.log('parsedData==>', parsedData);
                setSelectPhoto(parsedData.selectPhoto);
                setDetails(parsedData.details);
                setCoast(parsedData.coast)
            }
        } catch (e) {
            console.log('Помилка отримання даних:', e);
        }
    };

    function generateRandomNumber() {
        const randomNumber = Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000;
        setCoast(randomNumber);
    };

    const ImagePicer = () => {
        let options = {
            storageOptios: {
                path: 'image',
            }
        };
        
        launchImageLibrary(options, response => {
            if (!response.didCancel) {
                //console.log('response==>', response.assets[0].uri);
                setSelectPhoto([response.assets[0].uri, ...selectPhoto]);

            } else {
                console.log('Вибір скасовано');
            }
        });
    };
    

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../accets/bgr.jpeg')}
                style={{ flex: 1 }}>
                <View style={{ alignItems: 'center', marginTop: 30, marginHorizontal: 20, flex: 1 }}>
                    
                    <ScrollView>
                        <Text style={{ color: 'gold', fontSize: 25, fontWeight: 'bold', marginBottom: 5 }}>{title.toUpperCase()}</Text>
                        <Image
                            source={photo}
                            style={{ width: '100%', height: 250, borderRadius: 10, marginBottom: 10 }} />
                        
                        <View style={{ marginBottom: 10 }}>
                            

                            {!coast ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        generateRandomNumber()
                                    }}
                                    style={{ width: '100%', height: 40, borderWidth: 2, borderColor: 'gold', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <Text
                                        style={{ color: 'gold', fontSize: 20, fontWeight: 'bold' }}>
                                        Calculate the cost</Text>
                                </TouchableOpacity>
                            ) : (
                                <Text style={{ color: 'gold', fontSize: 20, fontWeight: 'bold' }}>Approximately {coast} <FontAwesome name='euro' style={{ color: 'gold', fontSize: 20 }} />  .That's how much it will cost you to visit these places (not including travel tickets).</Text>
                            )}
                            
                        </View>
                        
                        <View style={{}}>
                            <MapView
                                style={{ flex: 1, height: 200, marginBottom: 20, borderRadius: 10 }}
                                initialRegion={{
                                    latitude: latitude,
                                    longitude: longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
                            
                            <TouchableOpacity
                                onPress={() => {
                                    ImagePicer();
                                }}
                                style={{ width: 100, height: 100, borderWidth: 1, borderColor: 'gold', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: 'gold', fontSize: 20 }}>ADD</Text>
                                <Text style={{ color: 'gold', fontSize: 20 }}>PHOTO</Text>
                                <Text style={{ color: 'gold', fontSize: 20 }}>+</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => { setVisibleGallaryFolder(true) }}
                                style={{ width: 100, height: 100, borderWidth: 1, borderColor: 'gold', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <MaterialCommunityIcons name='folder' style={{ color: 'gold', fontSize: 60 }} />
                                <Text style={{ color: 'gold', fontSize: 20 }}>GALLARY</Text>
                                <Text style={{ color: 'gold', fontSize: 10 }}>holds {selectPhoto.length} photos</Text>
                            </TouchableOpacity>
                        </View>
                    
                        <View style={{ flex: 1 }}>
                            
                            <Text style={{ color: 'gold', fontWeight: 'bold', marginBottom: 5, fontSize: 18, }}>This is a {topic}</Text>
                            <Text style={{ color: 'gold', fontSize: 18, }}>{description}</Text>
                        </View>

                       
                        
                    </ScrollView>
                   
                    <Modal
                        animationType="slide"
                        visible={visibleGallaryFolder}
                        transparent={true}
                    >
                        <View style={{ flex: 1, position: 'relative', backgroundColor: '#1e1e1e' }}>

                            <View style={{ marginHorizontal: 20, marginTop: 40 }}>
                                <ScrollView>

                               
                                    <View style={{ marginTop: 60, flexDirection: 'row', flexWrap: 'wrap' }}>

                                        {selectPhoto ? (
                                            selectPhoto.map((photo) => {
                                                return (
                                                    <Image
                                                        key={uid()}
                                                        source={{ uri: photo }}
                                                        style={{ width: 100, height: 100, marginRight: 10, marginBottom: 10, borderRadius: 5 }} />
                                                )
                                            })
                                        ) : (
                                            <View></View>
                                        )}

                                    </View>
                                
                                </ScrollView>
                                

                                <TouchableOpacity
                                    onPress={() => {
                                        setVisibleGallaryFolder(false)
                                    }}
                                    style={{ position: 'absolute', right: 0, width: 40, height: 40, borderWidth: 2, borderColor: 'gold', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                
                                    <Text style={{ color: 'gold', fontSize: 20, fontWeight: 'bold' }}>X</Text>
                                </TouchableOpacity>

                            </View>
                            

                        </View>
                        

                    </Modal>
                   
                    

                    {/**Go back BTN */}
                    <TouchableOpacity
                        style={{ position: 'absolute', bottom: 10, right: 10, width: 50, height: 40, borderWidth: 1, borderRadius: 10, alignItems: 'center', borderColor: 'gold', justifyContent: 'center' }}
                        onPress={() => { navigation.goBack() }}
                    >
                        <FontAwesome5 name='reply' style={{ color: 'gold', fontSize: 30 }} />
                    </TouchableOpacity>
                </View>
                
            </ImageBackground>
            
        </View>
    );
};

export default Details;