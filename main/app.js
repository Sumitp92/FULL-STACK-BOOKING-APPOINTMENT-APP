document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookingForm');
    const list = document.getElementById('bookingList').querySelector('ul');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = form['name'].value;
        const phone = form['phone'].value;
        const email = form['email'].value;

        try {
            const response = await axios.post('/product', { name, email, phone });
            if (response.data && response.data.booking) {
                console.log("Booking added:", response.data.booking);
                displayBooking(response.data.booking); 
                form.reset(); 
            } else {
                console.error("Error: Unable to add booking. Response:", response.data);
            }
        } catch (error) {
            console.error("Error adding booking:", error.message);
        }
    });


    async function fetchBooking() {
        try {
            const response = await axios.get('/product');
            const bookings = response.data.bookings; 

            if (bookings && Array.isArray(bookings)) {
          
                list.innerHTML = '';

                console.log("Fetched bookings:", bookings);
                bookings.forEach(booking => displayBooking(booking));
            } else {
                console.log("No bookings found or unexpected data format.", response.data);
            }
        } catch (error) {
            console.error("Error fetching bookings:", error.message);
        }
    }

    function displayBooking(booking) {
        const bookingItemContainer = document.createElement('li');

       
        if (!booking.name || !booking.phone || !booking.email || !booking.id) {
            console.error("Incomplete booking data:", booking);
            return;
        }

        const bookingText = document.createElement('span');
        bookingText.textContent = `${booking.name}, ${booking.phone}, ${booking.email}`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('data-id', booking.id);
        deleteBtn.textContent = 'Delete';

        bookingItemContainer.appendChild(bookingText);
        bookingItemContainer.appendChild(deleteBtn);
        list.appendChild(bookingItemContainer);

   
        deleteBtn.addEventListener('click', async () => {
            try {
                const response = await axios.delete(`/product/${booking.id}`);
                if (response.data && response.data.success) {
                    console.log("Booking deleted:", booking.id);
                    bookingItemContainer.remove(); // Remove the list item
                } else {
                    console.error("Error: Unable to delete booking. Response:", response.data);
                }
            } catch (error) {
                console.error("Error deleting booking:", error.message);
            }
        });
    }

    fetchBooking();
});
