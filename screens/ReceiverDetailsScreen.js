import React,{Component} from 'react';
import {Text,StyleSheet,View,TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import {RFValue} from 'react-native-responsive-fontsize';
import db from '../config';
export default class ReceiverDetails extends Component{
    constructor(props){
        super(props)
        this.state={
        userID:firebase.auth().currentUser.email,
        receiverID:this.props.navigation.getParam('details')['user_ID'],
        requestID:this.props.navigation.getParam('details')['request_ID'],
        bookName:this.props.navigation.getParam('details')['book_name'],
        reasonForRequest:this.props.navigation.getParam('details')['reason_to_request'],
        receiverName:'',
        receiverContact:'',
        receiverAddress:'',
        receiverRequestDocID:'',
        }
    }
    getReceiverDetails(){
        db.collection('Users').where('email_ID','==',this.state.receiverID).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    receiverName:doc.data().first_name,
                    receiverContact:doc.data().contact,
                    receiverAddress:doc.data().address,
                 })
            })
        })
    }
    updateBookStatus=()=>{
         db.collection('all_donations').add({
              "book_name" : this.state.bookName,
               "request_id" : this.state.requestID,
                "requested_by" : this.state.recieverName,
                 "donor_id" : this.state.userId,
                  "request_status" : "Donor Interested"
                 })
                 }
    addNotification=()=>{
      var message = this.state.userName+' has shown interest in donating a book'
      db.collection('all_notifications').add({
        'targetted_user_id':this.state.receiverID,
        'donor_id':this.state.userID,
        'request_id':this.state.requestID,
        'book_name':this.state.bookName,
        'date':firebase.firestore.FieldValue.serverTimestamp(),
        'notification_status':'Unread',
        'message':message

      })
    }   
    componentDidMount(){
      this.getReceiverDetails()
      
    }             
    render() {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.1 }}>
            <Header
              leftComponent={
                <Icon
                  name="arrow-left"
                  type="feather"
                  color="#ffffff"
                  onPress={() => this.props.navigation.goBack()}
                />
              }
              centerComponent={{
                text: "Donate Books",
                style: {
                  color: "#ffffff",
                  fontSize: RFValue(20),
                  fontWeight: "bold",
                },
              }}
              backgroundColor="#32867d"
            />
          </View>
          <View style={{ flex: 0.9 }}>
            <View
              style={{
                flex: 0.3,
                flexDirection: "row",
                paddingTop: RFValue(30),
                paddingLeft: RFValue(10),
              }}
            >
              <View style={{ flex: 0.4,}}>
                <Image
                  source={{ uri: this.state.bookImage }}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                  }}
                />
              </View>
              <View
                style={{
                  flex: 0.6,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: RFValue(25),
                    textAlign: "center",
                  }}
                >
                  {this.state.bookName}
                </Text>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: RFValue(15),
                    textAlign: "center",
                    marginTop: RFValue(15),
                  }}
                >
                  {this.state.reason_for_requesting}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 0.7,
                padding: RFValue(20),
              }}
            >
              <View style={{ flex: 0.7 ,justifyContent:'center',alignItems:'center',marginTop:RFValue(50),borderWidth:1,borderColor:'#deeedd',padding:RFValue(10)}}>
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: RFValue(30),
                  }}
                >
                  Reciever Information
                </Text>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: RFValue(20),
                    marginTop: RFValue(30),
                  }}
                >
                  Name : {this.state.recieverName}
                </Text>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: RFValue(20),
                    marginTop: RFValue(30),
                  }}
                >
                  Contact: {this.state.recieverContact}
                </Text>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: RFValue(20),
                    marginTop: RFValue(30),
                  }}
                >
                  Address: {this.state.recieverAddress}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.3,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {this.state.recieverId !== this.state.userId ? (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      this.updateBookStatus();
                      this.addNotification();
                      this.props.navigation.navigate("MyDonations");
                    }}
                  >
                    <Text>I want to Donate</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      );
    }
  }
  
              
              
              const styles = StyleSheet.create({
                container: {
                  flex:1,
                },
                buttonContainer : {
                  flex:0.3,
                  justifyContent:'center',
                  alignItems:'center'
                },
                button:{
                  width:200,
                  height:50,
                  justifyContent:'center',
                  alignItems : 'center',
                  borderRadius: 10,
                  backgroundColor: 'orange',
                  shadowColor: "#000",
                  shadowOffset: {
                     width: 0,
                     height: 8
                   },
                  elevation : 16
                }
              })