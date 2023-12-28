import React, { useState, useEffect } from 'react';
import { View, ImageBackground, ScrollView, Text, TouchableOpacity, Image, Alert } from 'react-native';
import sightsData from './data/sightsData'; // Передбачується, що це шлях до вашого файлу даних

const App = () => {
    const [sights, setSights] = useState(sightsData);
    const [sightsImg, setSightsImg] = useState(sightsData);
    const [shuffledSightsImg, setShuffledSightsImg] = useState([]);

    const [activeButtonIndex, setActiveButtonIndex] = useState(-1);
    const [actImgBtm, setActImgBtm] = useState(-1)
    //console.log('activeButtonIndex==>', activeButtonIndex);
    //console.log('actImgBtm==>', actImgBtm)

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
        setShuffledSightsImg(shuffleArray(sightsImg));
    }, [])
    //const shuffledSightsImg = shuffleArray(sightsImg);

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../sightsOfGermany/accets/bgr.jpeg')}>
                <View style={{ marginTop: 30,marginBottom: 60, flexDirection: 'row', justifyContent: 'space-around' }}>

                    <View style={{ flex: 0.5, alignItems: 'center' }}>
                        <Text style={{ marginLeft: 20, marginBottom: 10, color: 'gold', fontWeight: 'bold', fontSize: 20 }}>Categories: </Text>
                        
                        <ScrollView>
                            
                            {/* Блок кнопок з назвами */}
                            {sights.map((item, index) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setActiveButtonIndex(index);
                                    }}
                                    style={{
                                        marginBottom: 10,
                                        width: 150,
                                        height: 135,
                                        borderWidth: 3,
                                        borderRadius: 15,
                                        backgroundColor: activeButtonIndex === index ? 'green' : 'gold',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 5,
                                        borderColor: activeButtonIndex === index ? 'green' : 'gold',
                                    }}
                                    key={item.id}
                                >
                                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item.topic}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={{ borderWidth: 1, borderColor: 'red' }}></View>

                    <View style={{ flex: 0.5, alignItems: 'center' }}>

                        <Text style={{ marginBottom: 10, color: 'gold', fontWeight: 'bold', fontSize: 20 }}>Photos of sights: </Text>

                        <ScrollView>
              
                            {/* Блок зображень */}
                            {shuffledSightsImg.map((item) => (
                                <TouchableOpacity
                                    onPress={() => { setActImgBtm(item.id) }} // Обробник події натискання на зображення
                                    style={{
                                        marginBottom: 10,
                                        borderWidth: 8,
                                        borderRadius: 15,
                                        borderColor: item.id === actImgBtm && item.id === activeButtonIndex + 1 ? 'green' : 'gold'
                                    }}
                                    key={item.id}
                                >
                                    <Image style={{ width: 150, height: 129, borderRadius: 10 }} source={item.photo} />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

export default App;