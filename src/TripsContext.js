// TripsContext.js
import React, { createContext,useEffect, useContext,  } from 'react';
import uuid from 'uuid';
const TripsContext = createContext();
export const TripsProvider = ({ children }) => {
    const [trips, setTrips] = React.useState([
        {id:uuid.v4(),name:"Great Britain",points:[
                {id:uuid.v4(),name:"London",visited:false},
                {id:uuid.v4(),name:"Birmingham",visited:false},
                {id:uuid.v4(),name:"Manchester",visited:false},
                {id:uuid.v4(),name:"Leeds-Bradford",visited:false},
                {id:uuid.v4(),name:"Glasgow",visited:false}
            ]},
        {id:uuid.v4(),name:"USA",points:[
                {id:uuid.v4(),name:"New York",visited:false},
                {id:uuid.v4(),name:"Los Angeles",visited:false},
                {id:uuid.v4(),name:"Chicago",visited:false},
                {id:uuid.v4(),name:"Houston",visited:false},
                {id:uuid.v4(),name:"Phoenix",visited:false}
            ]},
        {id:uuid.v4(),name:"Ukraine",points:[
                {id:uuid.v4(),name:"Kyiv",visited:false},
                {id:uuid.v4(),name:"Kharkiv",visited:false},
                {id:uuid.v4(),name:"Odesa",visited:false},
                {id:uuid.v4(),name:"Dnipro",visited:false},
                {id:uuid.v4(),name:"Zaporizhzhia",visited:false}
            ]},])

    const handleCheck = (id, itemId) => {
        let updatedPoints
        setTrips((prevTrips) => {
            return prevTrips.map((trip) => {
                if (trip.id === id) {
                    updatedPoints = trip.points.map((point) => {
                        if (point.id === itemId) {
                            return {...point, visited: !point.visited};
                        }
                        return point;
                    });
                    return {...trip, points: updatedPoints};
                }
                return trip;
            });
        });
    };

    return (
        <TripsContext.Provider value={{ trips, setTrips, handleCheck}}>
            {children}
        </TripsContext.Provider>
    );
};

export const useTrips = () => {
    const context = useContext(TripsContext);
    if (!context) {
        throw new Error('useTrips must be used within a TripsProvider');
    }
    return context;
};