document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookingForm');
    const list = document.getElementById('bookingList');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = form['name'].value;
        const phone = form['phone'].value;
        const email = form['email'].value;

        try {
            const response = await axios.post('/product', { name, email, phone });
            if (!response.data.success) {
                throw new Error(response.data.error);
            }

            displayBooking(response.data.booking);
        } catch (error) {
            console.log(error.message);
        }
    });

    async function fetchBooking() {
        try {
            const response = await axios.get('/product');
            const bookings = response.data.booking;

            if (bookings && bookings.length > 0) {
                bookings.forEach(booking => displayBooking(booking));
            } else {
                console.log('Booking not found');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    function displayBooking(booking) {
        const bookingItem = document.createElement('div');
        bookingItem.textContent = `${booking.name}, ${booking.phone}, ${booking.email}`;
        list.appendChild(bookingItem);

        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('data-id', booking.id);
        deleteBtn.textContent = 'Delete';
        list.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', async () => {
            try {
                const response = await axios.delete(`/product/${booking.id}`);
                if (response.data.success) {
                    bookingItem.remove();
                    deleteBtn.remove();
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        });
    }

    fetchBooking();
});
