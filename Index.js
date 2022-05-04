var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'violet',
    progressColor: 'purple',
    responsive: true,
    barRadius: 3,
    barWidth: 3,
    //cursorColor: 'blue',
    cursorWidth: 3,
    hideScrollbar: true,
    barGap: 1,
    fillParent: true,
});

wavesurfer.load('Samples/Positive.wav');

function playAudio(sampleNum)
{

    var listOfPlayButtons = document.querySelectorAll(".playButton");

    console.log(listOfPlayButtons);

    var playButton = listOfPlayButtons[sampleNum];

    wavesurfer.playPause();

    if(wavesurfer.isPlaying()){
        playButton.textContent = "||";
    }
    else
    {
        playButton.textContent = ">";
    }

}