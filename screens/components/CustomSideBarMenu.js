import React,{Component} from 'react';
import {DrawerItems } from 'react-navigation-drawer'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import {Avatar} from 'react-native-elements';
import * as ImagePicker from "expo-image-picker";
export default class CustomSideBarMenu extends Component{
    state={
        userID:firebase.auth().currentUser.email,
        image:'#',
        name:'',
        docID:'',
    }
    selectPicture = async ()=>{
          const{cancelled,uri}=await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          })
          if(!cancelled){
              this.uploadImage(uri,this.state.userID);
              this.setState({
                  image:uri
              })
          }
    }

    uploadImage = async(uri,imageName)=>{
    var response = await fetch(uri);
    var blob = await response.blob();
    var ref = firebase
    .storage()
    .ref()
    .child('user_profile/' + imageName);
    
            return ref.put(blob).then( (response) => {
                    this.fetchImage(imageName);
                });
    
    }

    fetchImage= (imageName)=>{
        var storageRef = firebase
        .storage()
        .ref()
        .child('user_profile/'+ imageName);

            storageRef
            .getDownloadURL()
            .then((URL)=>{
                this.setState({ image:url })
            })
            .catch((error)=>{
                this.setState({image:'#'})
            })
    }
    getUserProfile(){
        db.collection('User').where('emailID','==', this.state.user_id)
        .onSnapshot((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                this.setState({name:doc.data().first_name+''+doc.data().last_name})
            })
        })
    }
    componentDidMount(){
        this.fetchName(this.state.userID);
        this.state.getUserProfile();
    }
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:0.5,alignItems:'center',backgroundColor:'orange'}}>
                    <Avatar rounded source={{
                        uri:this.state.image
                    }} 
                    size={'xlarge'} 
                    onPress={()=>{ this.selectPicture() }} 
                    containerStyle={styles.imageContainer}
                    showEditButton/>
                    <Text style={{fontWeight:'100',fontSize:20,paddingTop:20 }}>{this.state.name} </Text>
                </View>
                <View style={styles.drawerItemsContainer}>
                    <DrawerItems {...this.props}/>
                </View>
               <View style={styles.logoutContainer}>
                   <TouchableOpacity style={styles.logoutButton}
                                     onPress={()=>{
                                         this.props.navigation.navigate('WelcomeScreen')
                                         firebase.auth().signOut()
                    }}>
                            <Icon name='logout' type='antdesign' size={RFValue(20)} iconStyle={{paddingLeft:RFValue(10)}} />
                            <Text style={styles.logOutText}>Logout</Text>
                  </TouchableOpacity>
                   </View> 
            </View>
        )
    }
}
var styles = StyleSheet.create({ 
    container : { flex:1 },
     drawerItemsContainer:{ flex:0.8,  marginTop:50 },
      logOutContainer : { flex:0.2,
         justifyContent:'flex-end',
          paddingBottom:100,
          marginLeft:50,
         },
           logoutButton : { 
               height:60,
              width:200,
              justifyContent:'center',
              alignItems:'center', 
              marginLeft:40,
              borderWidth:1.5,
              borderRadius:50,
              
            },
               logOutText:{ fontSize: RFValue(15),
                 fontWeight:'bold',
                 marginLeft:RFValue(30) 
                } 
            })
