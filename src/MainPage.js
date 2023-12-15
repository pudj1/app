import {ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import * as React from "react";
import {useTrips} from "./TripsContext";
import {useEffect} from "react";
export const MainPage = ({navigation, route})=>{
    const { trips, handleCheck } = useTrips();
        useEffect(() => {
            // do something
        }, [route]);

    return(
        <ScrollView>
            <View>
                {trips.map( (item) => {
                    return(
                    <View key={item.id} >
                        <TouchableWithoutFeedback onPress={()=>navigation.navigate('tripDetailsPage',{id:item.id})}>
                            <View>
                                <Text style={styles.tripName}>
                                    {item.name}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                            <ScrollView scrollEnabled={item.points.length>4} horizontal={true} className={"pointsContainer"}>

                            {item.points.map(
                                (item2, pos) => {
                                    return(
                                        <TouchableWithoutFeedback onPress={() => handleCheck(item.id,item2.id)} key={pos}>
                                            <View style={point(item2.visited)}>
                                                <Text style={{margin:0,fontSize:18}}>
                                                    {item2.name}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        )
                                })}
                        </ScrollView>
                        <View style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            height:2,
                        }}/>
                    </View>
                    )
                })}
                <TouchableWithoutFeedback onPress={
                    () => navigation.navigate('createTripPage')
                }>
                    <View style={{borderStyle:"solid",borderColor:"black", borderWidth:1}}>
                        <View>
                            <Text style={styles.tripName}>
                                Create Trip
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.tripName}>
                                +
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </ScrollView>
    )
}
const point = (visited)=> {
    return({
        height:100,
        width:100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderColor:"black",
        borderWidth:1,
        borderStyle:"solid",
        backgroundColor:visited?"green":"red"
    })
}
const styles = {
    tripName:{
        fontSize: 30,
        textAlign:"center",
    },
    point:{
        height:100,
        width:100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderColor:"black",
        borderWidth:1,
        borderStyle:"solid"
    }
}