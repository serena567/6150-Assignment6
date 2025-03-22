document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const resultContainer = document.getElementById('result-container');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value;

        if (!query) {
            resultContainer.innerHTML = `<p style="color: red;">Please enter a valid search term.</p>`;
            return;
        }

        fetch(`https://api.artic.edu/api/v1/artworks/search?q=${query}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch artwork data.');
                }
                return response.json();
            })
            .then(data => {
                const artworks = data.data;
                if (artworks.length === 0) {
                    resultContainer.innerHTML = `<p>No artworks found for "${query}".</p>`;
                    return;
                }

                // Clear previous results and render the artwork list
                resultContainer.innerHTML = '<h2>Search Results:</h2>';
                artworks.forEach(artwork => {
                    resultContainer.innerHTML += `
                        <div class="artwork">
                            <p><strong>Title:</strong> ${artwork.title}</p>
                            <p><strong>Artist:</strong> ${artwork.artist_display || 'Unknown'}</p>
                            <p><strong>Place of Origin:</strong> ${artwork.place_of_origin || 'Unknown'}</p>
                        </div>
                        <hr/>
                    `;
                });
            })
            .catch(error => {
                console.error(error);
                resultContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
            });
    });
});
