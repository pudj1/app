import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {CreateTrip} from "./src/CreateTrip";
import {MainPage} from "./src/MainPage";
import {TripDetails} from "./src/TripDetails";
import uuid from "react-native-uuid";
import {createContext} from "react";
import {TripsProvider} from "./src/TripsContext";

const Stack = createNativeStackNavigator();

const App = () =>{
  return(
      <TripsProvider>
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name={"mainPage"}
                          component={MainPage}/>
            <Stack.Screen name={"tripDetailsPage"}
                          component={TripDetails}/>
            <Stack.Screen name={"createTripPage"}
                          component={CreateTrip} />
        </Stack.Navigator>
      </NavigationContainer>
      </TripsProvider>
  )
}
export default App;