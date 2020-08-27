import React,{Component} from 'react';
import {TextComponent,View,Text,TextInput,TouchableOpacity,StyleSheet} from 'react-native';
import MyHeader from '../Component/MyHeader';
import firebase from 'firebase';
import db from '../config';

export default class SettingsScreen extends Component{
    constructor(){
        super();
        this.state={
            emailID:'',
            firstName:'',
            lastName:'',
            address:'',
            contact:'',
            docID:''
        }
    }
    getUserDetails=()=>{
        
         var email = firebase.auth().currentUser.email;
          db.collection('users').where('email_id','==',email).get() 
          .then(snapshot => { 
              snapshot.forEach(doc => {
                   var data = doc.data() 
                   this.setState({ 
                       emailID : data.email_id,
                        firstName : data.first_name,
                         lastName : data.last_name,
                          address : data.address,
                           contact : data.contact,
                            docID : doc.id 
                        }) 
                    }); 
                }) 
            } 
updateUserDetails=()=>{
     db.collection('users').doc(this.state.docID).update({
          "first_name": this.state.firstName,
           "last_name" : this.state.lastName,
            "address" : this.state.address,
             "contact" : this.state.contact,
             })
              Alert.alert("Profile Updated Successfully") 
            } 
            componentDidMount(){
                 this.getUserDetails()
                 }
render(){
    return(
        <View style={styles.container}>
            <MyHeader title='Settings'
                       navigation={this.props.navigation}/>
          <View style={styles.formContainer}>
              <TextInput style={styles.formTextInput}
                         placeholder={"First Name"}
                        maxLength={10}
                        onChangeText={(text)=>{
                         this.setState({
                             firstName:text
                         })
                        }}
                        value={this.state.firstName}/>
              <TextInput style={styles.formTextInput}
                         placeholder={"Last Name"}
                        maxLength={10}
                        onChangeText={(text)=>{
                         this.setState({
                             lastName:text
                         })
                        }}
                        value={this.state.lastName}/> 
               <TextInput style={styles.formTextInput}
                         placeholder={"Contact"}
                        maxLength={10}
                        keyboardType={'numeric'}
                        onChangeText={(text)=>{
                         this.setState({
                             contact:text
                         })
                        }}
                        value={this.state.contact}/>
                <TextInput style={styles.formTextInput}
                         placeholder={"Address"}
                        multiline={true}
                        onChangeText={(text)=>{
                         this.setState({
                             address:text
                         })
                        }}
                        value={this.state.address}/>                                            
          </View>
          <View>
              <TouchableOpacity style={styles.button}
                                onPress={()=>{
                                    this.updateUserDetails()
                                }}>
                                <Text style={styles.buttonText}> Save </Text>   
                                </TouchableOpacity>
          </View>
        </View>
    )
}
}
const styles = StyleSheet.create({
container:{
flex:1,
},
formContainer:{
justifyContent:'center',
alignItems:'center',
},
formTextInput:{
    height:50,
    width:300,
    borderRadius:10,
    borderWidth:1.5,
    margin:10,
    padding:10,
},
button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:'lightgreen',
    margin:10,
    marginLeft:40,
},
buttonText:{
    color:'blue',
    fontWeight:'200',
    fontSize:20,
},
})