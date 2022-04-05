/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useEffect,useState} from 'react';

 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   PermissionsAndroid,
   Text,
   useColorScheme,
   View,
   Keyboard,
 } from 'react-native';
 
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 
 // import RNOtpVerify from 'react-native-otp-verify';
 import RNOtpVerify from 'react-native-otp-verify-remastered'
 
 async function requestReadSmsPermission() {
   try {
     await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_SMS, {
       title: '(...)',
       message: "Why you're asking for...",
     });
   } catch (err) {
     console.log('errors' + err);
   }
 }
 
 const App = () => {
   const [OTP, setOTP] = useState("")
   useEffect(() => {
     requestReadSmsPermission();
 
     RNOtpVerify.getHash()
       .then( console.log)
       .catch(console.log);
 
     RNOtpVerify.getOtp()
       .then(p => RNOtpVerify.addListener(otpHandler))
       .catch(p => console.log('Error' + p));
 
     
     
   }, []);
 
   const otpHandler = message => {
    console.log('message ' + message);
    const otp = /(\d{4})/g.exec(message)[1];
    console.log("otp",otp);
    setOTP(otp)
    // RNOtpVerify.removeListener();// if u need to Use for only one time otp get than use this 
    Keyboard.dismiss();
  };
  
   return (
     <SafeAreaView style={{justifyContent: 'center'}}>
       <View style={{width: '100%', height: '100%', justifyContent: 'center'}}>
         <Text
           style={{
             color: 'black',
             fontWeight: 'bold',
             fontSize: 30,
             alignSelf: 'center',
           }}>
           This is Get SMS Project
         </Text>
         <Text
           style={{
             color: 'black',
             alignSelf: 'center',
           }}>
           {OTP}
         </Text>
       </View>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });
 
 export default App;
 