document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const resultsArea = document.getElementById('results-area');
    // const searchButton = document.getElementById('search-button'); // Not used for instant search

    // Function to display Word of the Day
    function displayWordOfTheDay() {
        const wotdEnglishWordEl = document.getElementById('wotd-english-word');
        const wotdSinhalaEl = document.getElementById('wotd-sinhala');
        const wotdPhoneticEl = document.getElementById('wotd-phonetic');
        const wotdExampleEnglishEl = document.getElementById('wotd-example-english');
        const wotdExampleSinhalaEl = document.getElementById('wotd-example-sinhala');
        // const wotdAudioBtn = document.getElementById('wotd-audio-btn'); // For future functionality

        if (typeof dictionary !== 'undefined' && Object.keys(dictionary).length > 0) {
            const dictionaryKeys = Object.keys(dictionary);
            // Use day of the month to pick a word, ensuring it changes daily
            // and is consistent for all users on the same day.
            const dayOfMonth = new Date().getDate();
            const wordIndex = (dayOfMonth - 1) % dictionaryKeys.length; // -1 because getDate() is 1-indexed
            const dailyWordKey = dictionaryKeys[wordIndex];
            const wordData = dictionary[dailyWordKey];

            if (wordData) {
                if (wotdEnglishWordEl) wotdEnglishWordEl.textContent = dailyWordKey;
                if (wotdSinhalaEl) wotdSinhalaEl.textContent = wordData.sinhala;
                if (wotdPhoneticEl) wotdPhoneticEl.textContent = wordData.phonetic;
                
                const wotdAudioBtn = document.getElementById('wotd-audio-btn');
                if (wotdAudioBtn) wotdAudioBtn.setAttribute('data-word', dailyWordKey);
                
                if (wotdExampleEnglishEl) wotdExampleEnglishEl.textContent = wordData.example_sentence_english;
                if (wotdExampleSinhalaEl) wotdExampleSinhalaEl.textContent = wordData.example_sentence_sinhala;

                const wotdBookmarkBtn = document.getElementById('wotd-bookmark-btn');
                if (wotdBookmarkBtn) {
                    wotdBookmarkBtn.setAttribute('data-word', dailyWordKey);
                    // Text content will be set by isBookmarked logic later
                }
            } else {
                console.error('Word of the Day data not found for key:', dailyWordKey);
                clearWordOfTheDay();
            }
        } else {
            console.error('Dictionary is not defined or empty for Word of the Day.');
            clearWordOfTheDay();
        }
    }

    function clearWordOfTheDay() {
        const wotdContent = document.getElementById('wotd-content');
        if (wotdContent) {
            wotdContent.innerHTML = '<p>Could not load Word of the Day.</p>';
        }
    }

    // --- Bookmark Functionality ---
    const bookmarkedWordsList = document.getElementById('bookmarked-words-list');

    function getBookmarks() {
        return JSON.parse(localStorage.getItem('bookmarks')) || [];
    }

    function saveBookmarks(bookmarks) {
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    function isBookmarked(word) {
        return getBookmarks().includes(word);
    }

    function addBookmark(word) {
        let bookmarks = getBookmarks();
        if (!bookmarks.includes(word)) {
            bookmarks.push(word);
            saveBookmarks(bookmarks);
            updateBookmarkButton(word, true);
            displayBookmarks(); // Refresh the list
        }
    }

    function removeBookmark(word) {
        let bookmarks = getBookmarks();
        bookmarks = bookmarks.filter(b => b !== word);
        saveBookmarks(bookmarks);
        updateBookmarkButton(word, false);
        displayBookmarks(); // Refresh the list
    }
    
    function updateBookmarkButton(word, isBookmarkedState) {
        // Update search results buttons
        const searchResultButton = resultsArea.querySelector(`.bookmark-btn[data-word="${word}"]`);
        if (searchResultButton) {
            searchResultButton.textContent = isBookmarkedState ? 'Bookmarked' : 'Bookmark';
        }
        // Update WOTD button
        const wotdBookmarkBtn = document.getElementById('wotd-bookmark-btn');
        if (wotdBookmarkBtn && wotdBookmarkBtn.getAttribute('data-word') === word) {
            wotdBookmarkBtn.textContent = isBookmarkedState ? 'Bookmarked' : 'Bookmark';
        }
    }

    function displayBookmarks() {
        if (!bookmarkedWordsList) {
            console.error("Bookmark list area not found for displayBookmarks");
            return;
        }
        bookmarkedWordsList.innerHTML = ''; // Clear previous
        const bookmarks = getBookmarks();

        if (bookmarks.length === 0) {
            bookmarkedWordsList.innerHTML = '<p>[Your bookmarked words will appear here.]</p>';
            return;
        }

        bookmarks.forEach(word => {
            if (dictionary[word]) {
                const wordData = dictionary[word];
                const entryDiv = document.createElement('div');
                entryDiv.classList.add('bookmark-entry'); 
                entryDiv.innerHTML = `
                    <h4>${word}</h4>
                    <p><strong>Sinhala:</strong> ${wordData.sinhala}</p>
                    <p><em>Phonetic: ${wordData.phonetic}</em> <button class="audio-btn" data-word="${word}">Play Audio</button></p>
                    <button class="remove-bookmark-btn" data-word="${word}">Remove Bookmark</button>
                `;
                bookmarkedWordsList.appendChild(entryDiv);
            } else {
                // Handle case where a bookmarked word is no longer in the main dictionary
                // Optionally, remove such orphaned bookmarks
                console.warn(`Bookmarked word "${word}" not found in current dictionary.`);
            }
        });
    }
    // --- End of Bookmark Functionality ---

    // Event listener for search functionality
    if (searchBar && resultsArea) {
        searchBar.addEventListener('input', () => {
            const searchTerm = searchBar.value.trim().toLowerCase();

            if (searchTerm === '') {
                resultsArea.innerHTML = '<h2>Dictionary Results</h2><p>[Placeholder for results]</p>'; // Reset to placeholder
                return;
            }

            // Access the dictionary (assuming dictionary_data.js is loaded and 'dictionary' is global)
            if (typeof dictionary !== 'undefined' && dictionary[searchTerm]) {
                const wordData = dictionary[searchTerm];
                // TODO: Implement in-article ad insertion logic here (e.g., after every 3rd result if multiple results were shown)
                // For now, this displays a single result. If search were to list multiple items,
                // logic to intersperse ads would go before setting innerHTML or by building up the HTML string.
                resultsArea.innerHTML = `
                    <h2>Dictionary Results</h2>
                    <div class="result-entry">
                        <h3>${searchTerm}</h3>
                        <p><strong>Sinhala:</strong> ${wordData.sinhala}</p>
                        <p><strong>Phonetic:</strong> ${wordData.phonetic} <button class="audio-btn" data-word="${searchTerm}">Play Audio</button></p>
                        <p><strong>Example (English):</strong> ${wordData.example_sentence_english}</p>
                        <p><strong>Example (Sinhala):</strong> ${wordData.example_sentence_sinhala}</p>
                        <button class="bookmark-btn" data-word="${searchTerm}">${isBookmarked(searchTerm) ? 'Bookmarked' : 'Bookmark'}</button> 
                    </div>
                `;
            } else {
                resultsArea.innerHTML = `
                    <h2>Dictionary Results</h2>
                    <p>Word not found: "${searchTerm}"</p>
                `;
            }
        });
    } else {
        console.error('Search bar or results area element not found for search functionality!');
    }

    // Call displayWordOfTheDay on page load
    displayWordOfTheDay();

    // Function to generate alphabet buttons
    function generateAlphabetButtons() {
        const alphabetButtonsContainer = document.getElementById('alphabet-buttons');
        const alphabetResultsArea = document.getElementById('alphabet-results-area');
        if (!alphabetButtonsContainer || !alphabetResultsArea) {
            console.error('Alphabet buttons container or results area not found!');
            return;
        }

        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        for (let letter of alphabet) {
            const button = document.createElement('button');
            button.textContent = letter.toUpperCase();
            button.classList.add('alphabet-btn'); // For styling
            button.addEventListener('click', () => {
                displayWordsByLetter(letter, alphabetResultsArea);
            });
            alphabetButtonsContainer.appendChild(button);
        }
    }

    // Function to display words starting with a specific letter
    function displayWordsByLetter(letter, resultsArea) {
        resultsArea.innerHTML = ''; // Clear previous results
        let foundWordsHTML = '';
        let count = 0;

        if (typeof dictionary !== 'undefined' && Object.keys(dictionary).length > 0) {
            for (const word in dictionary) {
                if (word.toLowerCase().startsWith(letter.toLowerCase())) {
                    const wordData = dictionary[word];
                    foundWordsHTML += `
                        <div class="alphabet-result-entry">
                            <h4>${word}</h4>
                            <p><strong>Sinhala:</strong> ${wordData.sinhala}</p>
                            <p><em>Phonetic: ${wordData.phonetic}</em></p>
                        </div>
                    `;
                    count++;
                }
            }
        }

        if (count > 0) {
            resultsArea.innerHTML = foundWordsHTML;
        } else {
            resultsArea.innerHTML = `<p>No words found starting with "${letter.toUpperCase()}".</p>`;
        }
    }

    // Call generateAlphabetButtons on page load
    generateAlphabetButtons();

    // --- Event Listeners for Bookmarking ---

    // Event delegation for bookmark buttons in search results
    resultsArea.addEventListener('click', function(event) {
        if (event.target.classList.contains('bookmark-btn')) {
            const word = event.target.getAttribute('data-word');
            if (word) {
                if (isBookmarked(word)) {
                    removeBookmark(word); // Toggle: if already bookmarked, remove
                } else {
                    addBookmark(word);
                }
            }
        }
        // Also handle audio play from search results, if not handled elsewhere
        if (event.target.classList.contains('audio-btn')) {
             const word = event.target.getAttribute('data-word');
             if (word) {
                console.log("Play audio for search result (not implemented yet):", word);
                // Actual audio play logic would go here
             }
        }
    });

    // Event listener for WOTD bookmark button
    const wotdBookmarkBtn = document.getElementById('wotd-bookmark-btn');
    if (wotdBookmarkBtn) {
        wotdBookmarkBtn.addEventListener('click', function() {
            const word = this.getAttribute('data-word');
            if (word) {
                 if (isBookmarked(word)) {
                    removeBookmark(word); // Toggle
                } else {
                    addBookmark(word);
                }
            }
        });
    }

    // Event delegation for remove bookmark buttons in the bookmarks list
    if (bookmarkedWordsList) {
        bookmarkedWordsList.addEventListener('click', function(event) {
            if (event.target.classList.contains('remove-bookmark-btn')) {
                const word = event.target.getAttribute('data-word');
                if (word) removeBookmark(word);
            }
            // Handle audio play from bookmarks list
            if (event.target.classList.contains('audio-btn')) {
                const word = event.target.getAttribute('data-word');
                if (word) {
                    console.log("Play audio for bookmarked word (not implemented yet):", word);
                    // Actual audio play logic would go here
                }
            }
        });
    }
    
    // Initial display of bookmarks on page load
    displayBookmarks(); 

});
