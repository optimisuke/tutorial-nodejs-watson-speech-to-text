import fs from 'fs';
import SpeechToTextV1 from 'ibm-watson/speech-to-text/v1';
import { IamAuthenticator } from 'ibm-watson/auth';

const speechToText = new SpeechToTextV1({
    authenticator: new IamAuthenticator({
        apikey: process.env.SPEECH_TO_TEXT_APIKEY || '',
    }),
    serviceUrl: process.env.SPEECH_TO_TEXT_SERVICE_URL || '',
});

const recognizeParams = {
    audio: fs.createReadStream('audio-file.flac'),
    contentType: 'audio/flac',
};

speechToText.recognize(recognizeParams)
    .then(speechRecognitionResults => {
        console.log(JSON.stringify(speechRecognitionResults, null, 2));
    })
    .catch(err => {
        console.log('error:', err);
    });