import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {useTrips} from "./TripsContext";
import React from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import uuid from "react-native-uuid";

export const TripDetails = ({navigation, route})=>{
    const {id} = route.params;
    const { trips, setTrips } = useTrips();
    let [trip,setTrip] = React.useState(trips.find((t) => t.id === id))
    let wrongName = false;
    const handleChange = (change) => {
        console.log(change)
        setTrip((prevTrip=>{return {...prevTrip,name:change}}))
        if(change === ""){
            wrongName = true
        }
    }
    const handleChangeCheckBox = (change,id) => {
        setTrip((prevTrip) => {
            const updatedPoints = prevTrip.points.map(point => {
                if (point.id === id) {
                    return { ...point, visited: !point.visited };
                }
                return point;
            });

            return { ...prevTrip, points: updatedPoints };
        });
        console.log(trip.points.find((t) => t.id === id).visited)
    }
    const handleChangePointName = (change,id) => {
        setTrip((prevTrip) => {
            const updatedPoints = prevTrip.points.map(point => {
                if (point.id === id) {
                    return { ...point, name: change };
                }
                return point;
            });

            return { ...prevTrip, points: updatedPoints };
        });
        console.log(trip.points.find((t) => t.id === id).name)
    }

    const handleCreateNew = (id) => {
        const newPoint = {
            id: uuid.v4(),
            name: "New Point",
            visited: false
        };

        setTrip((prevTrip) => {
            const updatedPoints = prevTrip.points.reduce((acc, point) => {
                acc.push(point);
                if (point.id === id) {
                    acc.push(newPoint);
                }
                return acc;
            }, []);

            return { ...prevTrip, points: updatedPoints };
        });
    }

    const handleDeletePoint = (id) => {
        setTrip((prevTrip) => {
            const updatedPoints = prevTrip.points.filter(point => point.id !== id);
            return { ...prevTrip, points: updatedPoints };
        });
    }
    const handleSubmit = () => {
        setTrips((prevTrip) => {
            return prevTrip.map(item => {
                if (item.id === id) {
                    return trip;
                }
                return item;
            });
        });
        navigation.navigate('mainPage')
    }
    const handleDelete = () => {
        setTrips((prevTrip) => {
            return prevTrip.filter(item => item.id !==id);
        });
        navigation.navigate('mainPage')
    }

    return(
        <ScrollView>
        <View style={styles.container}>
                <Text style={styles.text}>Name</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(change) => handleChange(change)}
                value={trip.name}
            />
            {wrongName?<Text>Name Can`t be empty</Text>:<></>}
            <View>
                {trip.points.map((item, index) =>
                    <View style={styles.pointContainer} key={item.id}>
                        <View style={styles.checkboxContainer}>
                            <BouncyCheckbox style={styles.checkbox} isChecked={item.visited} size={40} onPress={(state)=>handleChangeCheckBox(state,item.id)} />
                        </View>
                        <View style={styles.textContainer}>
                            <TextInput
                                style={styles.textInput2}
                                onChangeText={(change) => handleChangePointName(change,item.id)}
                                value={item.name}
                            />
                        </View>
                        <View style={styles.iconsContainer}>
                            <TouchableWithoutFeedback onPress={()=>handleCreateNew(item.id)}>
                                <View>
                                    <Icon
                                        size={40}
                                        name="plus"
                                        backgroundColor="#3b5998"
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                            {trip.points.length > 2 &&
                            <TouchableWithoutFeedback onPress={()=>handleDeletePoint(item.id)}>
                                <View>
                                    <Icon
                                        size={40}
                                        name="delete"
                                        backgroundColor="#3b5998"
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        }
                        </View>
                    </View>

                )}
            </View>
            <Button onPress={handleSubmit} title="Submit" color={"#0e64d1"}/>
            <View style={{marginBottom:10}}></View>
            <Button onPress={handleDelete} title="Delete" color={"red"}  />
        </View>
            </ScrollView>
    )
}
const styles = StyleSheet.create({
    text:{
        fontSize:25,
        color:"#7c7070"
    },
    textInput:{
        fontSize:20,
        paddingLeft:10,
        height:60,
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"#999999",
        borderRadius:20,
        marginBottom:5
    },
    textInput2:{
        fontSize:20,
        paddingLeft:10,
        marginLeft:0,
        height:40,
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"#999999",
        borderRadius:20,
        marginBottom:5,
    },
    textContainer:{
        fontSize:20,
        height:40,
        width:"70%"
    },
    container: {
        padding: 5,
    },
    errorText: {
        color: 'red',
    },
    confirmContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        width:40,
        marginRight:10
    },
    checkbox: {
        alignSelf: 'center',
        width:40,
    },
    pointContainer:{
        display:"flex",
        flexDirection:"row",
        padding:5
    },
    iconsContainer:{
        display:"flex",
        flexDirection:"row",
        height:40
    }
});