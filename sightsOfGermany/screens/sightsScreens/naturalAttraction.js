import React,{useState, useEffect} from "react";
import { View, Text, TouchableOpacity, ImageBackground, Image, ScrollView, Modal, TextInput } from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { uid } from 'uid';
import AsyncStorage from '@react-native-async-storage/async-storage';


const NaturalAttraction = ({ navigation }) => {
   
    const sights = [
        {
            id: 1,
            photo: require('../../accets/BlackForest.jpeg') ,
        topic: 'Main Natural Attraction of Germany',
        title: 'The Black Forest',
            description: `The Black Forest, known as Schwarzwald in German, is a picturesque region situated in the southwest corner of Germany, primarily in the state of Baden-Württemberg. It is renowned for its stunning natural beauty, dense forests, charming villages, and diverse outdoor recreational opportunities.
Spanning approximately 6,000 square miles (15,000 square kilometers), the Black Forest is characterized by its dense canopy of evergreen trees, including pine, fir, and spruce, which lend the forest its name due to their thick foliage that often blocks out sunlight.`,
            latitude: 48.06951560438687, 
            longitude: 8.405766044975797
        },
        {
            id: 2,
            photo: require('../../accets/SaduMarkessaka.jpeg') ,
        topic: 'Main Natural Attraction of France',
        title: 'Marquessac garden',
            description: `The Marqueyssac Gardens, or Les Jardins de Marqueyssac in French, is a stunning and meticulously landscaped historic garden located in the Dordogne region of France. Perched on a hilltop overlooking the Dordogne Valley near the town of Vézac, these gardens are celebrated for their exquisite beauty, panoramic views, and unique design.
Spanning over 22 hectares (about 54 acres), the Marqueyssac Gardens feature a network of meticulously manicured boxwood hedges, pathways, and terraced gardens. The highlight of the garden is its extensive collection of intricately trimmed boxwood bushes, meticulously shaped into elaborate and artistic designs, forming breathtaking green sculptures.`,
            latitude: 44.825391280392004,
            longitude:  1.164611813921491
        },
    ];

    const [architecturalLandmark, setArchitecturalLandmark] = useState(sights);
    console.log('architecturalLandmark==>', architecturalLandmark);
    const [modalIsVivible, setmodalIsVivible] = useState(false);
    const [selectPhotoInModal, setSelectPhotoInModal] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [newArchitecturalLandmark, setNewArchitecturalLandmark] = useState([]);
    //console.log('newArchitecturalLandmark==>', newArchitecturalLandmark)

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        setData();
    }, [selectPhotoInModal, newArchitecturalLandmark]);

    const setData = async () => {
        try {
            const data = {
                selectPhotoInModal,
                newArchitecturalLandmark
            }
            const jsonData = JSON.stringify(data);
            await AsyncStorage.setItem(`NaturalAttraction`, jsonData);
            console.log('Дані збережено в AsyncStorage')
        } catch (e) {
            console.log('Помилка збереження даних:', e);
        }
    };

    const getData = async () => {
        try {
            const jsonData = await AsyncStorage.getItem(`NaturalAttraction`);
            if (jsonData !== null) {
                const parsedData = JSON.parse(jsonData);
                console.log('parsedData==>', parsedData);
                setSelectPhotoInModal(parsedData.selectPhotoInModal);
                setNewArchitecturalLandmark(parsedData.newArchitecturalLandmark)
            }
        } catch (e) {
            console.log('Помилка отримання даних:', e);
        }
    };

    const toglleModal = () => {
        setmodalIsVivible(!modalIsVivible)
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
                setSelectPhotoInModal(response.assets[0].uri);

            } else {
                console.log('Вибір скасовано');
            }
        });
    };

    const handleAddArhitectorLandmark = () => {
        let newItem = {
            photo: selectPhotoInModal,
            title,
            description,
            id: uid()
        };

        setNewArchitecturalLandmark([...newArchitecturalLandmark, newItem]);
        setTitle('');
        setDescription('');
        setSelectPhotoInModal(null);
        toglleModal();

    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../accets/bgr.jpeg')}
                style={{ flex: 1 }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, position: 'relative' }}>
                    
                    <View style={{ marginHorizontal: 20, paddingTop: 40, paddingHorizontal: 30 }}>
                        <ScrollView>
                            {architecturalLandmark.map((item) => {
                                return (
                                    <TouchableOpacity
                                        style={{ width: '100%', marginBottom: 20, borderWidth: 2, borderColor: 'gold', borderRadius: 10, alignItems: 'center' }}
                                        key={item.id}
                                        onPress={() => {
                                            navigation.navigate("Details", item)
                                        }} >
                                        <Text style={{ color: 'gold', marginVertical: 2, fontWeight: 'bold' }}>{item.title.toUpperCase()}</Text>
                                        <Image
                                            source={item.photo}
                                            style={{ width: 200, height: 200, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}
                                        />
                                    </TouchableOpacity>
                                )
                            })}

                            
                            {newArchitecturalLandmark && newArchitecturalLandmark.map((item) => {
                                return (
                                    <TouchableOpacity
                                        style={{ width: '100%', marginBottom: 20, borderWidth: 2, borderColor: 'gold', borderRadius: 10, alignItems: 'center' }}
                                        key={item.id}
                                        onPress={() => {
                                            navigation.navigate("NewDetails", item)
                                        }} >
                                        <Text style={{ color: 'gold', marginVertical: 2, fontWeight: 'bold' }}>{item.title.toUpperCase()}</Text>
                                        <Image
                                            source={{uri: item.photo}}
                                            style={{ width: 200, height: 200, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}
                                        />
                                    </TouchableOpacity>
                                )
                            })}
                      

                        </ScrollView>
                        
                    </View>

                   
                    
                    {/**Modal */}
                    <Modal
                        animationType="slide"
                        visible={modalIsVivible}
                        transparent={true}>

                        <View style={{ flex: 1, position: 'relative', backgroundColor: '#1e1e1e' }}>

                            <View style={{marginHorizontal: 20, marginTop:40}}>

                                <TextInput
                                    placeholderTextColor='rgba(0, 0, 0, 0.5)'
                                    placeholder="Architectural landmark..."
                                    value={title}
                                    onChangeText={setTitle}
                                    multiline={true}
                                    style={{
                                        shadowOffset: { width: 3, height: 4 },
                                        shadowOpacity: .8,
                                        elevation: 9,
                                        borderColor: 'gold', marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 2, borderRadius: 10, width: 250, height: 40, color: '#000', backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                    }}
                                />
                                
                                <TextInput
                                    placeholderTextColor='rgba(0, 0, 0, 0.5)'
                                    placeholder="Discription..."
                                    value={description}
                                    onChangeText={setDescription}
                                    multiline={true}
                                    style={{
                                        shadowOffset: { width: 3, height: 4 },
                                        shadowOpacity: .8,
                                        elevation: 9,
                                        borderColor: 'gold', marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 2, borderRadius: 10, width: 250, height: 120, color: '#000', backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                    }}
                                />

                                <TouchableOpacity
                                        style={{ width: 250, height: 40, marginBottom: 20, borderWidth: 2, borderColor: 'gold', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                                        onPress={() => {
                                            ImagePicer()
                                        }} >
                                        <Text style={{ color: 'gold', fontSize: 20, fontWeight: 'bold' }}>Select Photo</Text>
                                    </TouchableOpacity>

                                {selectPhotoInModal ? (
                                    <Image source={{ uri: selectPhotoInModal }} style={{marginBottom: 20, width: "100%", height: 200,borderRadius:10 }}/>
                                ) : (
                                        <View></View>
                                )}

                                <TouchableOpacity
                                        style={{ width: '100%', height: 40, marginBottom: 20, borderWidth: 2, borderColor: 'gold', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                                        onPress={() => {
                                            handleAddArhitectorLandmark()
                                        }} >
                                        <Text style={{ color: 'gold', fontSize: 20, fontWeight: 'bold' }}>Add architectural landmark </Text>
                                    </TouchableOpacity>

                            </View>

                            
                            {/**Modal Open */}
                            <TouchableOpacity
                                style={{ position: 'absolute', top: 20, right: 20, }}
                                onPress={() => { toglleModal() }}
                            >
                                <Text style={{ color: 'gold', fontSize: 35 }} >X</Text>
                            </TouchableOpacity>
                        </View>

                    </Modal>
                    

                    {/**Modal Open */}
                    <TouchableOpacity
                        style={{ position: 'absolute', top: 10, right: 10, }}
                        onPress={() => { toglleModal() }}
                    >
                        <Text style={{ color: 'gold', fontSize: 50 }} >+</Text>
                    </TouchableOpacity>

                    {/**Go to home */}
                    <TouchableOpacity
                        style={{ position: 'absolute', bottom: 10, right: 10, width: 50, height: 40, borderWidth: 1, borderRadius: 10, alignItems: 'center', borderColor: 'gold', justifyContent: 'center' }}
                        onPress={() => { navigation.navigate('HomeScreen') }}
                    >
                        <Ionicons name='home' style={{ color: 'gold', fontSize: 30 }} />
                    </TouchableOpacity>
                </View>
                
            </ImageBackground>
            
        </View>
    );
};
export default NaturalAttraction;