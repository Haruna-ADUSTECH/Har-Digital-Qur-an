document.addEventListener('DOMContentLoaded', () => {
    const surahList = document.getElementById('surahList');
    const searchInput = document.getElementById('searchInput');
    const surahDetails = document.getElementById('surahDetails');
    const surahName = document.getElementById('surahName');
    const englishDetail = document.getElementById('englishDetail');
    const hausaDetail = document.getElementById('hausaDetail');
    const arabicDetail = document.getElementById('arabicDetail');

    // Load JSON data
    fetch('quran.json')
        .then(response => response.json())
        .then(data => {
            const surahs = data.surahs;

            // Function to render surahs
            function renderSurahs(surahs) {
                surahList.innerHTML = '';
                surahs.forEach(surah => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <div class="surah-name">${surah.name} (${surah.english_name})</div>
                        <div class="surah-details">Number: ${surah.number}, Ayahs: ${surah.ayahs}, Type: ${surah.revelation_type}</div>
                    `;
                    listItem.addEventListener('click', () => showDetails(surah));
                    surahList.appendChild(listItem);
                });
            }

            // Function to show surah details
            function showDetails(surah) {
                surahName.textContent = `${surah.name} (${surah.english_name})`;
                englishDetail.textContent = surah.details.english;
                hausaDetail.textContent = surah.details.hausa;
                arabicDetail.textContent = surah.details.arabic;
                surahDetails.classList.remove('hidden');
            }

            // Render all surahs initially
            renderSurahs(surahs);

            // Filter surahs based on search input
            searchInput.addEventListener('input', (e) => {
                const searchText = e.target.value.toLowerCase();
                const filteredSurahs = surahs.filter(surah =>
                    surah.name.toLowerCase().includes(searchText) ||
                    surah.english_name.toLowerCase().includes(searchText)
                );
                renderSurahs(filteredSurahs);
            });
        })
        .catch(error => console.error('Error loading the JSON data:', error));
});
