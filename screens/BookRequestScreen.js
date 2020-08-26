import  React, {Component} from 'react';
import {View,Text,TextInput,StyleSheet,TouchableOpacity, Alert,Modal,KeyboardAvoidingView,ScrollView,TouchableHighlight} from 'react-native';
import {GoogleBookSearch} from 'react-native-google-books';
import {RFValue} from 'react-native-response-fontsize';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';
import BookSearch from 'react-native-google-books/BookSearch';
import { FlatList } from 'react-native-gesture-handler';
export default class BookRequestScreen extends Component{
    constructor(){
        super();
        this.state ={ userId : firebase.auth().currentUser.email, 
          BookName:"", 
          ReasonForRequest:"", 
          is_book_request_active : "", 
          requestedBookName: "", 
          book_status:"", 
          requestID:"", 
          userDocID: '', 
          doc_id :'', 
          image_link: '', 
          dataSource:"", 
          showFlatlist: false 
        } }
      
    
      createUniqueId(){
        return Math.random().toString(36).substring(7);
      }
      addRequest= async (BookName,ReasonForRequest)=>{
        var userID = this.state.userID
        var randomRequestID = this.createUniqueId()
        var books=await BookSearch.searchbook(bookName,'AIzaSyAV6CZ9luleYpvAKf5lmeVN6TYnhEhz3OU')
        db.collection('requested_books').add({
            "user_id": userID,
            "book_name":BookName,
            "reason_to_request":ReasonForRequest,
            "request_id"  : randomRequestID,
            "book_status":'requested',
            "date":firebase.firestore.FieldValue.serverTimestamp(),
            "image_link": books.data[0].volumeInfo.imageLinks.smallThumbnail
    
    })
      

    await this.getBookRequest()
    db.collection('User').where('email_id','==','user_id').get()
    .then()
    .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        db.collection('User').doc(doc.id).update({
          is_book_request_active:true
        })
      })
    })
    this.setState({
      bookName:'',
      ReasonForRequest:'',
      requestID:'',

    })
    return Alert.alert("Book Requested Successfully") 
  } 

 getIsBookRequestActive(){
    db.collection('User') 
    .where('email_id','==',this.state.userID) 
    .onSnapshot(querySnapshot => { querySnapshot.forEach(doc => {
       this.setState({ 
         is_book_request_active:doc.data().is_book_request_active, 
         userDocId : doc.id 
        })
       })
       }) }
  

getBookRequest=()=>{
  var bookRequest=db.collection('requested_books').where('user_id','==',this.state.userId)
  .get()
  .then((snapshot)=>{
    snapshot.forEach((doc)=>{
  if(doc.data().book_status!=='received'){
    this.setState({
      requestID:doc.data().request_id,
      requestedBookName:doc.data().book_name,
      book_status:doc.data().book_status,
      doc_id:doc.id
    })
  }
    })
  })
}

async getBooksFromAPI(BookName){
this.setState({
  BookName:book_name,
})
if(BookName.length>2){
  var books= await BookSearch.searchbook(BookName,'AIzaSyAV6CZ9luleYpvAKf5lmeVN6TYnhEhz3OU')
  this.setState({datasource:books.data,
                showFlatList:true})
}
}
componentDidMount(){
  this.getBookRequest(),
  this.getIsBookRequestActive()
}
renderItem=({item,i})=>{
  return(
    <TouchableHighlight style={{ alignItems: "center", backgroundColor: "#DDDDDD", 
    padding: 10, width: '90%', }} 
    activeOpacity={0.6} underlayColor="#DDDDDD" 
    onPress={()=>{
       this.setState({
          showFlatlist:false,
           bookName:item.volumeInfo.title, 
           })} }
            bottomDivider>
      <Text>{item.volumeInfo.title}</Text>
    </TouchableHighlight>
  )
}
    render(){
      if(this.state.is_book_request_active==='true'){
        return(
<View style = {{flex:1,justifyContent:'center'}}> 
<View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',
alignItems:'center',padding:10,margin:10}}> 
<Text>Book Name</Text> 
<Text>{this.state.requestedBookName}</Text> 
</View> 
<View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',
alignItems:'center',padding:10,margin:10}}> 
<Text> Book Status </Text> 
<Text>{this.state.bookStatus}</Text> 
</View>
  </View> ) }
        
      else{
    
        return(
          <View style={{flex:1}}>
          <MyHeader title="Request Book" navigation ={this.props.navigation}/>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <View>
              <TextInput
                style ={styles.formTextInput}
                label={bookName}
                placeholder={"Enter Book Name"}
                onChangeText={(text)=>{
                    this.setState({
                        BookName:text
                    })
                }}
                value={this.state.BookName}
              />
              {this.state.showFlatList ?
              (<FlatList data={this.state.dataSource} 
                renderItem={this.renderItem} 
                enableEmptySections={true} 
                style={{ marginTop: 10 }} 
                keyExtractor={(item, index) => index.toString()}/>)
               :(
               
              
                 <View style={{alignItems:'center'}}>
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                label={reason}
                placeholder={"Why do you need the book"}
                onChangeText ={(text)=>{
                    this.setState({
                        ReasonForRequest:text
                    })
                }}
                value ={this.state.ReasonForRequest}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.addRequest(this.state.BookName,this.state.ReasonForRequest)}}
                >
                <Text>Request</Text>
              </TouchableOpacity>
              </View>
               )
              }
              </View>
            </KeyboardAvoidingView>
        </View>
        )
              }
              
    }
} 
const styles = StyleSheet.create({
keyBoardStyle:{
  width:300,
  height:50,
  alignItems:'center',
  justifyContent:'center',
  borderRadius:15,
  margin:10,
  padding:10,
},
formTextInput:{
  justifyContent:'center',
  alignItems:'center',
  marginTop:190,
  marginLeft:80,
  padding:10,
  width:150,
  height:50,
},
button:{
  marginTop:50,
  marginLeft:90,
  height:50,
  width:100,
  alignItems:'center',
  justifyContent:'center',
  borderRadius:5,
  backgroundColor:'orange',
}
})