// Get the search icon and search bar elements
const searchIcon = document.querySelector('.search-icon');
const searchBar = document.querySelector('.search-bar');

// Add click event listener to the search icon
searchIcon.addEventListener('click', () => {
    searchBar.style.display = searchBar.style.display === 'block' ? 'none' : 'block';
});

//Slider
$(document).ready(function () {
    $('.slider').slick({
        autoplay: false, // Enable autoplay
        dots: true,     // Show navigation dots
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>'
    });
});

//Close Search Bar
const searchInput = document.querySelector('.search-bar input');
const closeBtn = document.querySelector('.close-btn');

closeBtn.addEventListener('click', function () {
    searchInput.value = ''; // Clear the input field
    searchBar.style.display = 'none';
});



