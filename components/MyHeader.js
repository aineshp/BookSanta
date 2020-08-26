import  React, {Component} from 'react';
import {View,Text,TextInput,StyleSheet,TouchableOpacity} from 'react-native';
import {Header,Icon,Badge } from 'react-native-elements';
const BellIconWithBadge=(props)=>{
    return(
        <View> <Icon name='bell' type='font-awesome' color='#696969'  
        onPress={()=>props.navigation.navigate('Notification')}  />
          <Badge value='1'
                 containerStyle={{position:'absolute',top:'-4',right:'-4'}} />
         </View>
    )
}
const MyHeader = props =>{
    return(
        <Header leftComponent={<Icon name='bars' type='font-awesome' color='#696969' onPress={()=>
        props.navigation.toggleDrawer()}/>}
                 centerComponent={{text:props.title,style:{color:'blue',fontSize:20,fontWeight:'bold'}}}
                 rightComponent={<BellIconWithBadge {...props} />}
                 backgroundColor='lightyellow'   />
                

    )
}
export default MyHeader;
