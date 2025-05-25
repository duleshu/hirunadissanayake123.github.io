const dictionary = {
    "hello": {
        "sinhala": "ආයුබෝවන්",
        "phonetic": "aayubowan",
        "example_sentence_english": "Hello, how are you?",
        "example_sentence_sinhala": "ආයුබෝවන්, කොහොමද ඔයාට?"
    },
    "world": {
        "sinhala": "ලෝකය",
        "phonetic": "lokaya",
        "example_sentence_english": "The world is a beautiful place.",
        "example_sentence_sinhala": "ලෝකය සුන්දර තැනක්."
    },
    "cat": {
        "sinhala": "පූසා",
        "phonetic": "poosaa",
        "example_sentence_english": "The cat is sleeping on the mat.",
        "example_sentence_sinhala": "පූසා පැදුරේ නිදාගෙන ඉන්නවා."
    },
    "dog": {
        "sinhala": "බල්ලා",
        "phonetic": "ballaa",
        "example_sentence_english": "The dog barks loudly.",
        "example_sentence_sinhala": "බල්ලා හයියෙන් බුරනවා."
    },
    "book": {
        "sinhala": "පොත",
        "phonetic": "potha",
        "example_sentence_english": "I am reading an interesting book.",
        "example_sentence_sinhala": "මම රසවත් පොතක් කියවමින් සිටිමි."
    },
    "tree": {
        "sinhala": "ගස",
        "phonetic": "gasa",
        "example_sentence_english": "That tree is very tall.",
        "example_sentence_sinhala": "අර ගස හරිම උසයි."
    },
    "water": {
        "sinhala": "වතුර",
        "phonetic": "wathura",
        "example_sentence_english": "Please give me a glass of water.",
        "example_sentence_sinhala": " කරුණාකර මට වතුර වීදුරුවක් දෙන්න."
    },
    "computer": {
        "sinhala": "පරිගණකය",
        "phonetic": "pariganakaya",
        "example_sentence_english": "My computer is very fast.",
        "example_sentence_sinhala": "මගේ පරිගණකය ඉතා වේගවත්."
    },
    "love": {
        "sinhala": "ආදරය",
        "phonetic": "aadaraya",
        "example_sentence_english": "Love is a beautiful feeling.",
        "example_sentence_sinhala": "ආදරය කියන්නේ සුන්දර හැඟීමක්."
    },
    "friend": {
        "sinhala": "මිතුරා",
        "phonetic": "mithuraa",
        "example_sentence_english": "He is my best friend.",
        "example_sentence_sinhala": "ඔහු මගේ හොඳම මිතුරා."
    }
};

// To make it accessible, we can assign it to the window object if not using modules.
// However, since it's declared with 'const' at the top level of a script,
// it will be globally accessible in non-module scripts loaded in the browser.
// For explicit clarity, one might do:
// if (typeof window !== 'undefined') {
//     window.dictionaryData = dictionary;
// }
