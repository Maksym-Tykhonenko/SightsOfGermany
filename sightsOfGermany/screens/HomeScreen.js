import React, { useState, useEffect } from 'react';
import { View, ImageBackground, ScrollView, Text, TouchableOpacity, Image, Alert } from 'react-native';
import sightsData from '../data/sightsData'; // Передбачується, що це шлях до вашого файлу даних

import Entypo from 'react-native-vector-icons/Entypo';

const allSights = [
    {
        id: 1,
        name: 'Main Architectural Landmark'
    },
    {
        id: 2,
        name: 'Main Natural Attraction'
    },
    {
        id: 3,
        name: 'Main Opera'
    },
    {
        id: 4,
        name: 'Main Casino',
    },
    {
        id: 5,
        name: 'Main Shopping Center',
    },
    {
        id: 6,
        name: 'Main Road',
    },
    {
        id: 7,
        name: 'Main Circus',
    },
    {
        id: 8,
        name: 'Main Theater',
    },
    {
        id: 9,
        name: 'Main Nightclub',
    },
    {
        id: 10,
        name: 'Main Museum',
    }
]

const HomeScreen = ({navigation}) => {

    const [startMassiv, setStartMassiv] = useState(sightsData);
    const [sights, setSights] = useState(startMassiv);
    //console.log('sights', sights.length)
    const [sightsImg, setSightsImg] = useState(startMassiv);
    //console.log('sightsImg', sightsImg.length)
    const [shuffledSightsImg, setShuffledSightsImg] = useState([]);
    //console.log('length==>', shuffledSightsImg.length)

    const [actButnTitle, setActButnTitle] = useState(-1);
    const [actBtnImg, setActBtnImg] = useState(-1);
    //console.log('==>', actButnTitle, actBtnImg)
   
    const [btnIsVisible, setBtnIsVisible] = useState(false);
    const [quizIsComplited, setQuizIsComplited] = useState(true);

    const goTooAppAfterQuizComplited = () => {
        setBtnIsVisible(false);
        setQuizIsComplited(true);
    };

    useEffect(() => {
        setBtnIsVisible(false)
        if (shuffledSightsImg.length === 0) {
            setBtnIsVisible(true)
        }
    }, [shuffledSightsImg]);

    // Функція для перемішування масиву
    const shuffleArray = (array) => {
        const newArray = [...array]; // Створюємо копію масиву
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Генеруємо випадкове число
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Переставляємо елементи масиву
        }
        return newArray; // Повертаємо перемішаний масив
    };

    // Функція для перемішування масиву sightsImg перед рендерингом
    useEffect(() => {
        setShuffledSightsImg(shuffleArray(sights));
    }, [sights]);

    // Функція для зміни кольору в кнопці з імедж
    const changeColorInImg = (id) => {
        if (id === actBtnImg && id === actButnTitle) {
            return 'green';
        }
        return 'gold'
    };

    {/** */ }
    // Функція для видалення об'єкта за його id
    const removeSightById = (id) => {
        const updatedSights = sights.filter(item => item.id !== id);
        //setStartMassiv(updatedSights)
        setSights(updatedSights);
        setShuffledSightsImg(updatedSights);
        setActButnTitle(-1)
        setActBtnImg(-1)
    };

    // Викликати цю функцію всередині useEffect, щоб видалити елемент з масиву після зміни стану
    useEffect(() => {
        if (actButnTitle !== -1 && actButnTitle === actBtnImg) {
            removeSightById(actButnTitle);
        }
    }, [actButnTitle, actBtnImg]);
 
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                style={{ flex: 1 }}
                source={require('../accets/bgr.jpeg')}>
                
                {quizIsComplited ? (
                    <View style={{ flex: 1, paddingTop: 20 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'gold', fontSize: 25, fontWeight: 'bold' }}>Which sights do you want to visit in France or Germany?</Text>
                        </View>

                        <View style={{flex:1, marginHorizontal: 20, marginTop: 10 }}>

                            <ScrollView>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ArchitecturalLandmark')}
                                    style={{ marginBottom: 10, width: '100%', height: 40, borderWidth: 2, borderColor: 'gold', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                                        
                                >
                                    <Text style={{ color: 'gold', fontWeight: 'bold', fontSize: 17 }}>Main Architectural Landmark</Text>
                                </TouchableOpacity>
                            
                                <TouchableOpacity
                                    style={{ marginBottom: 10, width: '100%', height: 40, borderWidth: 2, borderColor: 'gold', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => navigation.navigate('NaturalAttraction')}
                                >
                                    <Text style={{ color: 'gold', fontWeight: 'bold', fontSize: 17 }}>Main Natural Attraction</Text>
                                </TouchableOpacity>
                            
                                <TouchableOpacity
                                    style={{ marginBottom: 10, width: '100%', height: 40, borderWidth: 2, borderColor: 'gold', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => navigation.navigate('Opera')}
                                >
                                    <Text style={{ color: 'gold', fontWeight: 'bold', fontSize: 17 }}>Main Opera</Text>
                                </TouchableOpacity>
                            
                                <TouchableOpacity
                                    style={{ marginBottom: 10, width: '100%', height: 40, borderWidth: 2, borderColor: 'gold', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => navigation.navigate('Casino')}
                                >
                                    <Text style={{ color: 'gold', fontWeight: 'bold', fontSize: 17 }}>Main Casino</Text>
                                </TouchableOpacity>
                            
                                <TouchableOpacity
                                    style={{ marginBottom: 10, width: '100%', height: 40, borderWidth: 2, borderColor: 'gold', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => navigation.navigate('ShoppingCenter')}
                                >
                                    <Text style={{ color: 'gold', fontWeight: 'bold', fontSize: 17 }}>Main Shopping Center</Text>
                                </TouchableOpacity>
                            
                                <TouchableOpacity
                                    style={{ marginBottom: 10, width: '100%', height: 40, borderWidth: 2, borderColor: 'gold', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => navigation.navigate('Road')}
                                        
                                >
                                    <Text style={{ color: 'gold', fontWeight: 'bold', fontSize: 17 }}>Main Road</Text>
                                </TouchableOpacity>
                            
                                <TouchableOpacity
                                    style={{ marginBottom: 10, width: '100%', height: 40, borderWidth: 2, borderColor: 'gold', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => navigation.navigate('Circus')}
                                >
                                    <Text style={{ color: 'gold', fontWeight: 'bold', fontSize: 17 }}>Main Circus</Text>
                                </TouchableOpacity>
                            
                                <TouchableOpacity
                                    style={{ marginBottom: 10, width: '100%', height: 40, borderWidth: 2, borderColor: 'gold', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => navigation.navigate('Theater')}
                                >
                                    <Text style={{ color: 'gold', fontWeight: 'bold', fontSize: 17 }}>Main Theater</Text>
                                </TouchableOpacity>
                            
                                <TouchableOpacity
                                    style={{ marginBottom: 10, width: '100%', height: 40, borderWidth: 2, borderColor: 'gold', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => navigation.navigate('Nightclub')}
                                >
                                    <Text style={{ color: 'gold', fontWeight: 'bold', fontSize: 17 }}>Main Nightclub</Text>
                                </TouchableOpacity>
                            
                                <TouchableOpacity
                                    style={{ marginBottom: 10, width: '100%', height: 40, borderWidth: 2, borderColor: 'gold', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => navigation.navigate('Museum')}
                                >
                                    <Text style={{ color: 'gold', fontWeight: 'bold', fontSize: 17 }}>Main Museum</Text>
                                </TouchableOpacity>
                            </ScrollView>
                           
                           
                           
                            
                        </View>

                    </View>
                ) : (
                    <View style={{ flex: 1, position: 'relative', marginTop: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-around' }}>

                        {/* Блок кнопок з назвами */}
                        <View style={{ flex: 0.5, alignItems: 'center' }}>
                            <Text style={{ marginLeft: 20, marginBottom: 10, color: 'gold', fontWeight: 'bold', fontSize: 20 }}>Categories: </Text>
                        
                            <ScrollView>
                            
                                {/* Блок кнопок з назвами */}
                                {sights.map((item, index) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setActButnTitle(item.id);
                                        }}
                                        style={{
                                            marginBottom: 10,
                                            width: 150,
                                            height: 135,
                                            borderWidth: 3,
                                            borderRadius: 15,
                                            backgroundColor: actButnTitle === item.id ? 'green' : 'gold',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: 5,
                                            borderColor: actButnTitle === item.id ? 'green' : 'gold',
                                        }}
                                        key={item.id}
                                    >
                                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item.topic}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>

                        {/* Полоска */}
                        <View style={{ borderWidth: 1, borderColor: 'red' }}></View>

                        {/* Блок зображень */}
                        <View style={{ flex: 0.5, alignItems: 'center' }}>

                            <Text style={{ marginBottom: 10, color: 'gold', fontWeight: 'bold', fontSize: 20 }}>Photos of sights: </Text>

                            <ScrollView>
              
                                {/* Блок зображень */}
                                {shuffledSightsImg.map((item) => (
                                    <TouchableOpacity
                                        onPress={() => { setActBtnImg(item.id) }} // Обробник події натискання на зображення
                                        style={{
                                            marginBottom: 10,
                                            borderWidth: 8,
                                            borderRadius: 15,
                                            borderColor: changeColorInImg(item.id)
                                        }}
                                        key={item.id}
                                    >
                                        <Image style={{ width: 150, height: 119, borderRadius: 10 }} source={item.photo} />
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                        </View>
                   
                        {/* Кнопка перехода на Home Screen */}
                        {btnIsVisible && <TouchableOpacity
                            onPress={() => { goTooAppAfterQuizComplited() }}
                            style={{ position: 'absolute', top: '50%', right: 55, alignItems: 'center', justifyContent: 'center', backgroundColor: 'gold', width: 250, height: 80, borderWidth: 2, borderColor: 'gold', borderRadius: 35 }}>
                            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}>Congratulations!!!</Text>
                            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}>Go to app <Entypo name='arrow-bold-right' style={{ fontSize: 20 }} /> </Text>
                        </TouchableOpacity>}
                
                    </View>
                )}
                
            </ImageBackground>
        </View>
    );
};

export default HomeScreen;