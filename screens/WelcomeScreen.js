import  React, {Component} from 'react';
import {View,Text,TextInput,StyleSheet,TouchableOpacity, Alert,Modal,KeyboardAvoidingView,ScrollView} from 'react-native';
import firebase from 'firebase';
import db from '../config';
export default class WelcomeScreen extends Component{
    constructor(){
        super()
            this.state={
                emailID:'',
                password:'',
                isModalVisible:'false',
                firstName:'',
                lastName:'',
                address:'',
                contact:'',
                confirmPassword:''
            }
     
    }
    userSignUp=(emailID,password,confirmPassword)=>{
        if(password!==confirmPassword){
            return Alert.alert('Password Does Not Match\nCheck Your Password')
        }
        else{

        
        firebase.auth().createUserWithEmailAndPassword(emailID,password)
        .then((response)=>{
            db.collection('User').add({
                First_name:this.state.firstName,
                Last_name:this.state.lastName,
                MobileNo:this.state.contact,
                email_id:this.state.emailID,
                Address:this.state.address,
                is_book_request_active:false,
            })
            return Alert.alert('User Added Successfully',
            '',
            [{text:'ok',onPress:()=>this.setState({
                'isModalVisible':false,
            })},
        ]) ;
        })
        .catch(function(error){
            var errorCode = error.code ;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
        })
        db.collection('user').add({
            'First_name':this.state.firstName,
            'Last_name':this.state.lastName,
            'Address':this.state.address,
            'MobileNo':this.state.contact
        })
    }
    }

    userLogin=(emailID,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailID,password)
        .then(()=>{
           this.props.navigation.navigate('DonateBook')
        })
        .catch((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
        })
    }
    showModal=()=>{
        return(
            <Modal animationType="fade"
                   transparent={true}
                   visible={this.state.isModalVisible} >
                       <View style={styles.modalContainer}>
                           <ScrollView style={{width:'100%'}}> 
                           <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                               <Text style={styles.modalTitle}>Registration</Text>
                               <TextInput style={styles.formTextInput}
                                           placeholder={"First name"}
                                           maxLength={8}
                                           onChangeText={(text)=>{
                                             this.setState({
                                                 firstName:text
                                             })  
                                           }} />
                               <TextInput style={styles.formTextInput}
                                           placeholder={"Last Name"}
                                           maxLength={8}
                                           onChangeText={(text)=>{
                                               this.setState({
                                                   lastName:text
                                               })
                                           }} />
                               <TextInput style={styles.formTextInput}
                                          placeholder={"Contact"} 
                                          maxLength={10} 
                                          keyboardType="numeric"
                                          onChangeText={(text)=>{
                                              this.setState({
                                                  contact:text
                                              })
                                              }} />
                            <TextInput style={styles.formTextInput}
                                          placeholder={"Address"} 
                                          multiline={true}
                                          onChangeText={(text)=>{
                                              this.setState({
                                                  address:text
                                              })
                                              }} />
                  <TextInput style={styles.formTextInput}
                                          placeholder={"EmailID"}  
                                          keyboardType="email-address"                                       
                                          onChangeText={(text)=>{
                                              this.setState({
                                                  emailID:text
                                              })
                                              }} />
                                              <TextInput style={styles.formTextInput}
                                          placeholder={"Password"}  
                                          secureTextEntry={true}                                       
                                          onChangeText={(text)=>{
                                              this.setState({
                                                  password:text
                                              })
                                              }} />
                    <TextInput style={styles.formTextInput}
                                          placeholder={"ConfirmPassword"}  
                                          secureTextEntry={true}                                       
                                          onChangeText={(text)=>{
                                              this.setState({
                                                  confirmPassword:text
                                              })
                                              }} />     
                               <View style={styles.modalBackButton} >
                               <TouchableOpacity style={styles.registrationButton}
                                                 onPress={()=>
                                                  this.userSignUp(this.state.emailID,this.state.password,this.state.confirmPassword)
                                                 } >
                                    <Text style={styles.registrationButtonText} > Register </Text>                 
                                   </TouchableOpacity>
                                   </View>            
                                   <View style={styles.modalBackButton} >
                                      <TouchableOpacity style={styles.cancelButton}
                                                        onPress={()=>
                                                        this.setState({
                                                            "isModalVisible":false
                                                        })}>
                                         <Text style={{color:'blue'}}>Cancel</Text>                   
                                        </TouchableOpacity>

                                       </View>                        
                               </KeyboardAvoidingView>
                               </ScrollView>
                       </View>
                   </Modal>
        )
    }        
    render(){
        return(
            <View style={styles.container}>
                <View style={{justifyContent:'center',alignItems:'center'  }}>
                    {this.showModal()}
                </View>
                <View>
                <Text style={styles.Title}> Book Santa</Text>
                
                </View>
                <View>
                    <TextInput style={styles.loginBox} 
                    placeholder="app@example.com" 
                    keyBoardType="email-address"
                    onChangeText={(text)=>{
                        this.setState({
                            emailID:text,
                        })
                    }} />
                    <TextInput style={styles.loginBox}
                    secureTextEntry={true}
                    placeholder="Enter Password"
                    onChangeText={(text)=>{
                        this.setState({
                            password:text,
                        })
                    }} />
                    <TouchableOpacity style={styles.button} 
                                      onPress={()=>{
                                          this.userLogin(this.state.emailID,this.state.password)
                                      }} >
                     <Text style={styles.buttonText} > Login </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                                      onPress={()=>{
                                      this.setState({
                                          isModalVisible:true
                                      })
                                      }}  >
                      <Text style={styles.buttonText}> Sign Up </Text>                    

                    </TouchableOpacity>
                </View>
            </View>
        )
    }
} 
const styles = StyleSheet.create({
    container:{
       flex:1,
       backgroundColor:'lightyellow',
   
    },
    Title:{
        fontSize:25,
        fontWeight:'200',
        paddingBottom:10,
        color:'blue',
        marginTop:150,
        marginLeft:120,
     
    },
    loginBox:{
        width:300,
        height:40,
        borderBottomWidth:1.5,
        borderColor:'black',
        fontSize:20,
        marginLeft:40,
        marginTop:10,
        paddingLeft:10,
        color:'blue',
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
    
    KeyboardAvoidingView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
      modalTitle :{
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        fontSize:30,
        color:'blue',
        marginBottom:50
      },
      modalContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        margin:10,
        padding:10,
        backgroundColor:'lightyellow'
      },
      formTextInput:{
        height:50,
        width:300,
        borderRadius:10,
        borderWidth:1.5,
        margin:10,
        padding:10,
      },
      registrationButton:{
        width:200,
        height:50,
        borderWidth:1.5,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'orange',
        margin:10,
      },
      registrationButtonText:{
        color:'green',
        fontSize:20,
        fontWeight:'bold'
      },
      cancelButton:{
        width:200,
        height:50,
        marginTop:5,
        alignItems:'center',
        justifyContent:'center',
        
       
      },


})