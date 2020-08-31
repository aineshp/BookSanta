import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import BookDonateScreen from '../screens/BookDonateScreen';
import ReceiverDetails from '../screens/ReceiverDetailsScreen';
export const AppStackNavigator = createStackNavigator({
    BookDonateList:{screen:BookDonateScreen,
                    navigationOptions:{
                        headerShown:false
                    } },
    ReceiverDetails:{screen:ReceiverDetails,
                    navigationOptions:{
                        headerShown:false
                    }},
},
    {initialRouteName:'BookDonateList'}
);