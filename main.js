var prediction1="";
Webcam.set({
    width:300,
    height:300,
    image_format:'png',
    png_quality:90
});
var camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'"/>';
    });
}
console.log("ml5 version : ",ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/-xzZUZq5H/model.json', modelLoaded);
function modelLoaded(){
    console.log("mode lLoaded");
}
function check(){
    img=document.getElementById("caputre_image");
    classifier.classify(img, gotResult);
}
function speak(){
    var synth=window.SpeechSynthesis;
    var data1="the first prediction is" + prediction1;
    var utter=new SpeechSynthesisUtterance(data1);
    synth.speak(utter);
}
function gotResult(error, results){
    if (error){console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        prediction1=results[0].label;
        speak();
        if (results[0].label=="Amazing"){
            document.getElementById("update_emoji").innerHTML="&#128076";
        }
        if (results[0].label=="Victory"){
            document.getElementById("update_emoji").innerHTML="&#9996";
        }
        if (results[0].label=="Best"){
            document.getElementById("update_emoji").innerHTML="&#128077";
        }
    }
}

