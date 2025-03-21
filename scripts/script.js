document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const zipInput = document.getElementById('zip-input');
    const resultContainer = document.getElementById('result-container');

    searchButton.addEventListener('click', () => {
        const zipCode = zipInput.value;

        if (!/^\d{5}$/.test(zipCode)) {
            resultContainer.innerHTML = `<p style="color: red;">Please enter a valid 5-digit zip code.</p>`;
            return;
        }

        fetch(`https://api.zippopotam.us/us/${zipCode}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Invalid zip code or data not found.');
                }
                return response.json();
            })
            .then(data => {
                const place = data.places[0];
                resultContainer.innerHTML = `
                    <h2>Zip Code: ${zipCode}</h2>
                    <p><strong>City:</strong> ${place['place name']}</p>
                    <p><strong>State:</strong> ${place['state']}</p>
                `;
            })
            .catch(error => {
                console.error(error);
                resultContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
            });
    });
});
