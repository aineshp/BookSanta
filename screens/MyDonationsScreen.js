import React , {Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import {FlatList,ListItem,Icon,Badge} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../Component/MyHeader';
export default class MyDonationsScreen extends Component{
constructor(){
    super()
    this.state={
        allDonations:[],

    }
    this.requestRef=null
} 
 getAllDonations=()=>{
 this.requestRef=db.collection('allDonations').where(donerID=this.state.userID)
 .onSnapshot((snapshot)=>{
     var allDonations=snapshot.docs.map(document=>document.data());
     this.setState({
         allDonations:allDonations
     })
 })

}

sendNotification=(bookdetails,requestStatus)=>{
var requestID=book.details.request_id
var donerID=book.details.doner_id
db.collection('all_notifications').where('request_id','==',requestID)
.where('doner_id','==',donerID)
.get()
.then((snapshot)=>{
    snapshot.forEach((doc)=>{
     var message=''
     if(requestStatus==='bookSent'){
         message=this.state.donerName+' sent you a book'
     }
     else{
         message=this.state.donerName+' has shown interest in donating a book'
     }
     db.collection('all_notifications').doc(doc.id).update({
         'message':message,
         notification_status:'unread',
         date:firebase.firestore.FieldValue.serverTimestamp()
     })
    })
})
}
sendBook=(bookDetails)=>{
     if(bookDetails.request_status === "Book Sent"){ 
         var requestStatus = "Donor Interested" 
         db.collection("all_donations").doc(bookDetails.doc_id).update({
              "request_status" : "Donor Interested" 
            }) 
            this.sendNotification(bookDetails,requestStatus) 
        } 
        else{ 
            var requestStatus = "Book Sent" 
            db.collection("all_donations").doc(bookDetails.doc_id).update({
                 "request_status" : "Book Sent"
                 }) 
                 this.sendNotification(bookDetails,requestStatus)
                 } }

keyExtractor=(item,index)=>index.toString()
renderItem=({item,i})=>(
    <ListItem 
    key={i}
    title={item.book_name}
    subtitle={'Requested By:'+ item.requested_by + '\nStatus:'+ item.request_status }
    leftElement={
    <Icon name="book" type="font-awesome" color ='#696969'/>} 
    titleStyle={{ 
        color: 'black', fontWeight: 'bold'
         }}
 rightElement={ 
         <TouchableOpacity style={styles.button}
                          onPress={()=>{
                              this.sendBook(item)
                          }}>
             <Text style={{color:'#ffff'}} > Send Book </Text>
         </TouchableOpacity>
          }
          bottomDivider
          />      
)


 render(){
     return(
         <View style={{flex:1}} >
             <MyHeader navigation={this.props.navigation}
                       title='My Donations'/>
             <View style={{flex:1}} >
                 {
                     this.state.allDonations.length===0
                     ?(
                         <View style={styles.subtitle} > 
                         <Text style={{fontSize:20}} > List of all book donations</Text>
                         </View>
                     )
                     :(
                         <FlatList keyExtractor={this.keyExtractor}
                                   data={this.state.allDonations}
                                   renderItem={this.renderItem} />
                     )
                 }
             </View>

         </View>
         
     )
 }
}
var styles = StyleSheet.create({
    button:{
         width:100, 
         height:30, 
         justifyContent:'center', 
         alignItems:'center', 
         shadowColor: "#000", 
         shadowOffset: { width: 0, height: 8 }, 
         elevation : 16 }, 
subtitle :{ 
             flex:1,
             fontSize: 20, 
             justifyContent:'center', 
             alignItems:'center'
             }
})