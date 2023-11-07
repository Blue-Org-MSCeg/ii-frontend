import React, {useState, useRef} from 'react';
import className,{View,Text, Button} from 'react-native';

const MailValidation = (props) => {
    const rec = props.input;
    const sendDataToParent = () => {
        const dataToSend = "Hello output";
        props.onoutput(dataToSend);
    };
  return (
    <View>
        <Text>Input : {rec}</Text>
        <Button title="Send Data" onPress={sendDataToParent} />
    </View>
    
  );
};


export default MailValidation;