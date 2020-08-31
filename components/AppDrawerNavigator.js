import React,{Component} from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Icon} from 'react-native-elements';
import CustomSideBarMenu from './CustomSideBarMenu';
import { AppTabNavigator } from './AppTabNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import BookDonateScreen from '../screens/BookDonateScreen';
import MyDonationsScreen from '../screens/MyDonationsScreen';
import MyReceivedBooksScreen from '../screens/MyReceivedBooksScreen';
import NotificationScreen from '../screens/NotificationScreen';

export const AppDrawerNavigator = createDrawerNavigator({
    Home:{
        screen:AppTabNavigator,
        navigationOptions:{
            drawerIcon:<Icon name='home' type='font-awesome' />
        }
    },
    MyDonations:{
        screen:MyDonationsScreen,       
         navigationOptions:{
            drawerIcon:<Icon name='gift' type='font-awesome' />,
            drawerLabel:'My Donations'
        }
    },
    MyReceivedBooks:{
        screen:MyReceivedBooksScreen,
        navigationOptions:{
            drawerIcon:<Icon name='gift' type='font-awesome' />,
            drawerLabel:'My Received Books'
        }
    },
    Notifications:{
        screen:NotificationScreen,
        navigationOptions:{
            drawerIcon:<Icon name='bell' type='font-awesome' />,
            drawerLabel:'Notifications'
        }
    },
    Settings:{
        screen:SettingsScreen,
        navigationOptions:{
            drawerIcon:<Icon name='cog' type='font-awesome' />,
            drawerLabel:'Settings'
        }
    }
},
    {contentComponent:CustomSideBarMenu},
    {initialRouteName:'Home'
})