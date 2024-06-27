
document.addEventListener('DOMContentLoaded', () => {
    const addbookModal = document.getElementById('add-book-modal');
    const editbookModal = document.getElementById('edit-book-modal');
    const addBookingBtn = document.getElementById('add-booking-btn');
    const bookingTableBody = document.querySelector('#booking-table tbody');
    const closeButtons = document.querySelectorAll('.close');
    const addbookForm = document.getElementById('add-book-form');
    const editbookForm = document.getElementById('edit-book-form');

    let bookings = [];

    // Load bookings from localStorage on page load
    if (localStorage.getItem('bookings')) {
        bookings = JSON.parse(localStorage.getItem('bookings'));
        renderBookings();
    }

    // Function to render bookings in the table
    function renderBookings() {
        bookingTableBody.innerHTML = '';
        bookings.forEach((booking, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${booking.id}</td>
                <td>${booking.day}</td>
                <td>${booking.ride}</td>
                <td>${booking.reviewer}</td>
                <td>
                    <button class="edit-booking-btn" data-index="${index}">Edit</button>
                    <button class="delete-booking-btn" data-index="${index}">Delete</button>
                </td>
            `;
            bookingTableBody.appendChild(row);
        });

        // Attach event listeners to edit and delete buttons
        document.querySelectorAll('.edit-booking-btn').forEach(button => {
            button.addEventListener('click', handleEditBooking);
        });

        document.querySelectorAll('.delete-booking-btn').forEach(button => {
            button.addEventListener('click', handleDeleteBooking);
        });
    }

    // Function to handle form submission for adding a booking
    addbookForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const newBooking = {
            id: addbookForm.rating.value,
            day: addbookForm.options.value,
            ride: addbookForm['Adventure Ride'].value,
            reviewer: addbookForm.reviewer.value
        };

        bookings.push(newBooking);
        localStorage.setItem('bookings', JSON.stringify(bookings)); // Store bookings in localStorage
        renderBookings();

        addbookModal.style.display = 'none';
        addbookForm.reset();
    });

    // Function to handle form submission for editing a booking
    editbookForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const index = editbookForm.getAttribute('data-index');
        bookings[index] = {
            id: editbookForm.rating.value,
            day: editbookForm.options.value,
            ride: editbookForm['Adventure Ride'].value,
            reviewer: editbookForm.reviewer.value
        };

        localStorage.setItem('bookings', JSON.stringify(bookings)); // Store bookings in localStorage
        renderBookings();

        editbookModal.style.display = 'none';
        editbookForm.reset();
    });

    // Function to handle clicking edit button
    function handleEditBooking(e) {
        const index = e.target.getAttribute('data-index');
        const booking = bookings[index];

        editbookForm.rating.value = booking.id;
        editbookForm.options.value = booking.day;
        editbookForm['Adventure Ride'].value = booking.ride;
        editbookForm.reviewer.value = booking.reviewer;

        editbookForm.setAttribute('data-index', index);

        editbookModal.style.display = 'block';
    }

    // Function to handle clicking delete button
    function handleDeleteBooking(e) {
        const index = e.target.getAttribute('data-index');
        bookings.splice(index, 1);
        localStorage.setItem('bookings', JSON.stringify(bookings)); // Store bookings in localStorage
        renderBookings();
    }

    // Show add booking modal when add booking button is clicked
    addBookingBtn.addEventListener('click', () => {
        addbookModal.style.display = 'block';
    });

    // Close modals when close buttons are clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            addbookModal.style.display = 'none';
            editbookModal.style.display = 'none';
        });
    });

    // Close modals when clicking outside the modals
    window.addEventListener('click', (e) => {
        if (e.target === addbookModal) {
            addbookModal.style.display = 'none';
        }
        if (e.target === editbookModal) {
            editbookModal.style.display = 'none';
        }
    });
});

