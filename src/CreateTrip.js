import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import {useTrips} from "./TripsContext";
import uuid from "react-native-uuid";

const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    start: yup.string().required('Start point is required'),
    end: yup.string().required('End point is required'),
});

export const CreateTrip = ({navigation})=>{
    const { setTrips } = useTrips();
    const handleSubmit = (values) => {
        setTrips((prevTrips) => {
                prevTrips.push(
                    {
                        id: uuid.v4(),
                        name: values.name,
                        points: [
                            {
                                id: uuid.v4(),
                                name: values.start,
                                visited: false
                            },
                            {
                                id: uuid.v4(),
                                name: values.end,
                                visited: false
                            },
                        ]
                    }
                )
                return prevTrips;
            }
        )
        navigation.navigate("mainPage",{'paramPropKey': 'paramPropValue'})
    };
    return(
        <Formik
            initialValues={{ name: '', start: '', end: ''}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.container}>
                    <Text style={styles.text}>Name</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                    />
                    {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                    <Text style={styles.text}>Start Point</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={handleChange('start')}
                        onBlur={handleBlur('start')}
                        value={values.start}
                    />
                    {touched.start && errors.start && <Text style={styles.errorText}>{errors.start}</Text>}

                    <Text style={styles.text}>End Point</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={handleChange('end')}
                        onBlur={handleBlur('end')}
                        value={values.end}
                    />
                    {touched.end && errors.end && <Text style={styles.errorText}>{errors.end}</Text>}

                    <Button onPress={handleSubmit} title="Submit" color={"#0e64d1"}  />
                </View>
            )}
        </Formik>
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
    container: {
        padding: 16,
    },
    errorText: {
        color: 'red',
    },
    confirmContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});