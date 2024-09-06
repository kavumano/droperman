document.getElementById('speed-range').addEventListener('input', () => {
    const speed = document.getElementById('speed-range').value;
    document.getElementById('speed-value').textContent = speed + 'x';
    
    // Adjust the playback speed of the audio element
    const audioOutput = document.getElementById('audio-output');
    audioOutput.playbackRate = speed;
});

document.getElementById('speak-button').addEventListener('click', async () => {
    const textInput = document.getElementById('text-input').value;
    const selectedVoice = document.getElementById('voice-select').value;
    const speed = document.getElementById('speed-range').value;

    if (!textInput) {
        alert('Please enter some text.');
        return;
    }

    const apiKey = 'sk_585dd70246643bcc1664941b11d7c7b0a1de449b87ef73b2';
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice}`;

    const button = document.getElementById('speak-button');
    button.classList.add('loading'); // Add loading class

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xi-api-key': apiKey,
            },
            body: JSON.stringify({
                text: textInput,
                speed: parseFloat(speed)
            }),
        });

        if (!response.ok) {
            throw new Error('Something went wrong with the API request.');
        }

        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        const audioOutput = document.getElementById('audio-output');
        audioOutput.src = audioUrl;

        // Set the playback speed to the selected value
        audioOutput.playbackRate = speed;

        audioOutput.play();

    } catch (error) {
        console.error('Error:', error);
        alert('Failed to generate speech. Please try again.');
    } finally {
        button.classList.remove('loading'); // Remove loading class
    }
});