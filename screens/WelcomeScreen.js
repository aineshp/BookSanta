import  React, {Component} from 'react';
import {View,Text,TextInput,StyleSheet,TouchableOpacity, Alert,Modal,KeyboardAvoidingView,ScrollView} from 'react-native';
import {Icon} from 'react-native-elements';
import {RFValue} from 'react-native-response-fontsize';
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
                               <View>
                                   <Icon type={'materialicon'} name={'cancel'} size={RFValue(40)} 
                                       color='blue' onPress={()=>{
                                           this.setState({ isModalVisible:false })
                                       }} />
                               </View>
                               <TextInput style={styles.formTextInput}
                               label={firstName}
                                           placeholder={"First name"}
                                           maxLength={8}
                                           onChangeText={(text)=>{
                                             this.setState({
                                                 firstName:text
                                             })  
                                           }} />
                               <TextInput style={styles.formTextInput}
                               label={lastName}
                                           placeholder={"Last Name"}
                                           maxLength={8}
                                           onChangeText={(text)=>{
                                               this.setState({
                                                   lastName:text
                                               })
                                           }} />
                               <TextInput style={styles.formTextInput}
                               label={contact}
                                          placeholder={"Contact"} 
                                          maxLength={10} 
                                          keyboardType="numeric"
                                          onChangeText={(text)=>{
                                              this.setState({
                                                  contact:text
                                              })
                                              }} />
                            <TextInput style={styles.formTextInput}
                            label={address}
                                          placeholder={"Address"} 
                                          multiline={true}
                                          onChangeText={(text)=>{
                                              this.setState({
                                                  address:text
                                              })
                                              }} />
                  <TextInput style={styles.formTextInput}
                  lavel={emailID}
                                          placeholder={"EmailID"}  
                                          keyboardType="email-address"                                       
                                          onChangeText={(text)=>{
                                              this.setState({
                                                  emailID:text
                                              })
                                              }} />
                                              <TextInput style={styles.formTextInput}
                                              label={password}
                                          placeholder={"Password"}  
                                          secureTextEntry={true}                                       
                                          onChangeText={(text)=>{
                                              this.setState({
                                                  password:text
                                              })
                                              }} />
                    <TextInput style={styles.formTextInput}
                                          label={confirmPassword}
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
   render() {
    return (
      <View style={styles.container}>
        {this.showModal()}
        <View
          style={{ flex: 0.25}}
        >
        <View style={{flex:0.15}}/>
        <View style={styles.santaView}>
          <Image
          source={require('../assets/santa.png')}
          style={styles.santaImage}
           />
         </View>
        </View>
        <View style={{ flex: 0.45 }}>

          <View style={styles.TextInput}>
          <TextInput
            style={styles.loginBox}
            placeholder="abc@example.com"
            placeholderTextColor="gray"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                emailId: text,
              });
            }}
          />
          <TextInput
            style={[styles.loginBox,{marginTop:RFValue(15)}]}
            secureTextEntry={true}
            placeholder="Enter Password"
            placeholderTextColor="gray"
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />
          </View>
          <View style={{flex:0.5,  alignItems:"center",}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.userLogin(this.state.emailId, this.state.password);  
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({ isModalVisible: true })}
          >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>

          </View>
        </View>

        <View
          style={{ flex: 0.3}}
        >
        <Image
        source={require('../assets/book.png')}
        style={styles.bookImage}
        resizeMode={"stretch"}
         />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightyellow',
  },
  loginBox: {
    width: "80%",
    height: RFValue(50),
    borderWidth: 1.5,
    borderColor: "#ffffff",
    fontSize: RFValue(20),
    paddingLeft: RFValue(10),
  },
  button: {
    width: "80%",
    height: RFValue(50),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(25),
    backgroundColor: 'green',
    shadowColor: "#000",
    marginBottom:RFValue(10),
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText: {
    color: "#32867d",
    fontWeight: "200",
    fontSize: RFValue(20),
  },
  label:{
    fontSize:RFValue(13),
    color:"#717D7E",
    fontWeight:'bold',
    paddingLeft:RFValue(10),
    marginLeft:RFValue(20)
  },
  formInput: {
    width: "90%",
    height: RFValue(45),
    padding: RFValue(10),
    borderWidth:1,
    borderRadius:2,
    borderColor:"grey",
    paddingBottom:RFValue(10),
    marginLeft:RFValue(20),
    marginBottom:RFValue(14)
  },
  registerButton: {
    width: "75%",
    height: RFValue(50),
    marginTop:RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(3),
    backgroundColor: 'green',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: RFValue(10),
  },
  registerButtonText: {
    fontSize: RFValue(23),
    fontWeight: "bold",
    color: "#fff",
  },
  cancelButtonText:{
    fontSize : RFValue(20),
    fontWeight:'bold',
    color: "#32867d",
    marginTop:RFValue(10)
  },
  scrollview:{
    flex: 1,
    backgroundColor: "#fff"
  },
  signupView:{
    flex:0.05,
    justifyContent:'center',
    alignItems:'center'
},
signupText:{
  fontSize:RFValue(20),
  fontWeight:"bold",
  color:"#32867d"
},
santaView:{
  flex:0.85,
  justifyContent:"center",
  alignItems:"center",
  padding:RFValue(10)
},
santaImage:{
  width:"70%",
  height:"100%",
  resizeMode:"stretch"
},
TextInput:{
  flex:0.5,
  alignItems:"center",
  justifyContent:"center"
},
bookImage:{
  width:"100%",
  height:RFValue(220)
}
});