import React,{useState, useEffect} from "react";
import { View, Text, TouchableOpacity, ImageBackground, Image, ScrollView, Modal, TextInput } from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { uid } from 'uid';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ArchitecturalLandmark = ({ navigation }) => {

    const sights = [
        {
            id: 1,
            photo: require('../../accets/BrandenburgGate.jpeg'),
            topic: 'Main Architectural Landmark of Germany',
            title: 'Brandenburg Gate',
            description: `The Brandenburg Gate, known as Brandenburger Tor in German, is an iconic neoclassical monument situated in the heart of Berlin, Germany. It stands as a symbol of unity, peace, and Germany's tumultuous history.
Constructed between 1788 and 1791, the Brandenburg Gate was commissioned by King Frederick William II of Prussia as a grand entrance to the city of Berlin. Designed by architect Carl Gotthard Langhans, the gate consists of twelve Doric columns, forming five passageways, with a chariot and goddess statue atop its central arch.
Throughout history, the gate has witnessed significant events, including Napoleon's triumphal entry into Berlin and the fall of the Berlin Wall. It was once a symbol of division during the Cold War but later became a powerful symbol of German reunification after the wall's collapse in 1989.
Today, the Brandenburg Gate stands as a prominent landmark and a popular tourist attraction in Berlin. It serves as a site for various cultural events, celebrations, and represents a significant historical and architectural symbol of Germany's past and present.`,
            latitude: 52.51628762970854,
            longitude:  13.37773628359619
        },
        {
            id: 2,
            photo: require('../../accets/EiffelTower1.jpeg'),
            topic: 'Main Architectural Landmark of France',
            title: 'THE EIFFEL TOWER',
            description: `The Eiffel Tower, also known as "La Tour Eiffel" in French, is an iconic symbol of France and one of the most recognized landmarks globally. Situated in Paris, it stands as a testament to architectural innovation and has become an enduring symbol of romance and elegance.
Constructed by engineer Gustave Eiffel for the 1889 World's Fair (Exposition Universelle) to commemorate the 100th anniversary of the French Revolution, the tower was initially met with mixed reactions but soon gained popularity for its unique design and engineering brilliance.
Rising to a height of 324 meters (1,063 feet), the Eiffel Tower was the tallest man-made structure in the world until the completion of the Chrysler Building in New York City in 1930. It comprises intricate wrought-iron lattice work and is divided into three accessible levels for visitors.`,
            latitude: 48.858373372566376, 
            longitude: 2.2944894566478955
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
            await AsyncStorage.setItem(`ArchitecturalLandmark`, jsonData);
            console.log('Дані збережено в AsyncStorage')
        } catch (e) {
            console.log('Помилка збереження даних:', e);
        }
    };

    const getData = async () => {
        try {
            const jsonData = await AsyncStorage.getItem(`ArchitecturalLandmark`);
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

export default ArchitecturalLandmark;