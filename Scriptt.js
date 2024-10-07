let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// function speak(text) {
//     if ('speechSynthesis' in window) { // Check if speech synthesis is supported
//         if (text.trim() !== "") { // Ensure the text is not empty or just spaces
//             let text_speak = new SpeechSynthesisUtterance(text);
            
//             // Set rate, pitch, and volume for a more natural sound
//             text_speak.rate = 1;    // Speed of speech (1 is normal)
//             text_speak.pitch = 1;   // Pitch (1 is normal)
//             text_speak.volume = 1;  // Volume (1 is full volume)
            
//             // Set language to Hindi (Indian accent)
//             text_speak.lang = "hi-IN";
            
//             // Speak the text
//             window.speechSynthesis.speak(text_speak);
//         } else {
//             console.warn("Text is empty or invalid.");
//         }
//     } else {
//         console.error("Speech Synthesis is not supported in this browser.");
//     }
// }

function speak(text) {
    if ('speechSynthesis' in window) { // Check if speech synthesis is supported
        if (text.trim() !== "") { // Ensure the text is not empty or just spaces
            let text_speak = new SpeechSynthesisUtterance(text);
            
            text_speak.lang = "hi-IN";
            // Set rate, pitch, and volume for a more natural sound
            text_speak.rate = 1;    // Speed of speech (1 is normal)
            text_speak.pitch = 1;   // Pitch (1 is normal)
            text_speak.volume = 1;  // Volume (1 is full volume)
            
            // Set language to Hindi (Indian accent)
            
            // Speak the text
            window.speechSynthesis.speak(text_speak);
        } else {
            console.warn("Text is empty or invalid.");
        }
    } else {
        console.error("Speech Synthesis is not supported in this browser.");
    }
}




function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    console.log(hours);
    if (hours >= 0 && hours < 12) {
        speak("Good morning sir kya main aapke liye chai bana doon?");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon Gagan");
    } else {
        speak("Good evening Gagan, would you like to go out somewhere?");
    }
}

window.addEventListener('load', () => {
    wishMe();
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello Gagan, I am Shizuka. What can I help you with?");
    } else if (message.includes("who are you")) {
        speak("Hello, I'm Shizuka, your personal assistant, created by Gagan sir. Speed 4 terahertz, memory 1 zigabyte.");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(`The time is ${time}`);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(`Today's date is ${date}`);
    } else if (message.includes("what is my mother's name")) {
        speak("Your mother's name is Mrs. Savita Tiwari.");
    } else if (message.includes("tell me about myself")) {
        speak("Namaste! Aapka naam Gagan Tiwari hai, aur aap ek aise vyakti hain jise naye cheejein seekhna pasand hai, khaaskar jab praudyogikee aur kampyootar ki baat aati hai. Abhi, aap apne Master of Computer Applications (MCA) ki padhaai kar rahe hain.");
    } else if (message.includes("open calculator")) {
        speak("Opening calculator...");
        window.open("Calculator:\\"); // Adjust this to an actual calculator link
    } else if (message.includes("shayari")) {
        speak("Zaroor Gagan! हम को मालूम है जन्नत की हक़ीक़त लेकिन दिल के ख़ुश रखने को 'ग़ालिब' ये ख़याल अच्छा है ");
    } else if (message.includes("open YouTube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/");
    } else {
        let searchQuery = message.replace(/shuzuka|shizuka/gi, "").trim();
        let finalText = `This is what I found on the internet regarding ${searchQuery}`;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
    }
}
