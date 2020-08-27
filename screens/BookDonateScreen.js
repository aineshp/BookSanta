import  React, {Component} from 'react';
import {View,Text,TextInput,StyleSheet,TouchableOpacity, Alert,Modal,KeyboardAvoidingView,ScrollView,Image} from 'react-native';
import {ListItem} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../Component/MyHeader';

export default class BookDonateScreen extends Component{
    constructor(){
        super()
            this.state={
              userID:firebase.auth().currentUser.email,
                requestedBookList:[],
              
            }
        
        this.requestRef=null
    }
  
    getRequestedBooksList =()=>{
        this.requestRef = db.collection("requested_books")
        .onSnapshot((snapshot)=>{
          var requestedBooksList = snapshot.docs.map((doc) => doc.data());
          this.setState({
            requestedBooksList : requestedBooksList
          });
        })
      }
    
      componentDidMount(){
        this.getRequestedBooksList()
      }
    
      componentWillUnmount(){
        this.requestRef();
      }

    
      keyExtractor = (item, index) => index.toString()
    
      renderItem = ( {item, i} ) =>{
        return (
          <ListItem
            key={i}
            title={item.book_name}
            subtitle={item.reason_to_request}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            leftElement={<Image style={{width:50,height:50}}
                             source={{uri:item.image_link}} />}
            rightElement={
                <TouchableOpacity style={styles.button}
                                   onPress={()=>{
                                     this.props.navigation.navigate("ReceiverDetails",{"details":item})
                                   }}>
                  <Text style={{color:'#ffff'}}>View</Text>
                </TouchableOpacity>
              }
            bottomDivider
          />
        )
      }
    render(){
        return(
            <View style={{flex:1}}>
              <MyHeader title='Donate Books' navigation={this.props.navigate}   />
              <View style={{flex:1}}>
                {this.state.requestedBookList.length === 0?
                (<View style={styles.subContainer}>
                                      <Text style={{fontSize:20}}>
                                        List of all requested books
                                        </Text>
                                        </View>)
                                        :
                (<FlatList keyExtractor={this.keyExtractor}
                          data={this.state.requestedBookList}
                          renderItem={this.state.renderItem} />)
                }
              </View>
                        
            </View>
        )
    }
}
const styles = StyleSheet.create({
   subContainer:{ flex:1,
     fontSize: 20,
      justifyContent:'center',
       alignItems:'center' 
      },
       button:{
          width:100,
           height:30,
            justifyContent:'center',
             alignItems:'center',
              backgroundColor:"#ff5722",
               shadowColor: "#000",
         shadowOffset: {width:0,height:8}
               } 
              })