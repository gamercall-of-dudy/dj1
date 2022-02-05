illegal_wepon_song="";
bts_mic_drop_song="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_illegal_wepon = "";
song_bts_mic_drop = "";


function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

posenet=ml5.poseNet(video,modelLoaded);
posenet.on("pose",gotposes);
}

function preload(){
    illegal_wepon_song = loadSound("music2.mp3");
    bts_mic_drop_song = loadSound("music.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song_illegal_wepon = illegal_wepon_song.isPlaying();
    console.log(song_illegal_wepon);

    song_bts_mic_drop = bts_mic_drop_song.isPlaying();
    console.log(song_bts_mic_drop);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        bts_mic_drop_song.start();
        if(song_bts_mic_drop == false){
            bts_mic_drop_song.play();
            document.getElementById("song_id").innerHTML = "Song Name: bts_mic_drop_song";
        }
        
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        bts_mic_drop_song.stop();
        if(song_illegal_wepon == false){
            illegal_wepon_song.play();
            document.getElementById("song_id").innerHTML = "Song Name:illegal_wepon_song ";
        }
        
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}