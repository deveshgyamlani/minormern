document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('card-container');
    const searchInput = document.getElementById('searchInput');

    // Function to fetch data from API and display it
    const fetchData = (query = '') => {
        const url = query ? `https://dummyjson.com/products/search?q=${query}` : 'https://dummyjson.com/products';
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayProducts(data.products);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    // Function to display products in the UI
    const displayProducts = (products) => {
        cardContainer.innerHTML = '';

        products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <button class="remove-btn" onclick="removeCard(this)">X</button>
                <img src="${product.thumbnail}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
            `;

            cardContainer.appendChild(card);
        });
    };

    // Function to handle search input
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        fetchData(query);
    });

    // Function to remove a card
    window.removeCard = (button) => {
        const card = button.parentElement;
        card.remove();
    };

    // Initial fetch of data
    fetchData();
});
