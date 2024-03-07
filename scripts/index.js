
// Setting common constants
const types = "Economy";
const ticketPrice = 550;
const seats = document.getElementsByClassName("busSeat");

// First event listener which triggers after clicking the SEATS
for (const seat of seats) {
    seat.addEventListener("click", function (event) {
        // Get selected seat number
        const seatNumber = event.target.textContent;

        // Check if seat booking limit is reached
        if (getValueById("seat-added") >= 4) {
            alert("You have reached the maximum limit for seat bookings.");
            return;
        }

        // Style the selected seat
        event.target.style.backgroundColor = 'rgba(29, 209, 0, 1)';
        event.target.style.color = "white";

        // Add selected seat to the table
        const seatTableContainer = document.getElementById("selected-seat-list");
        const newRow = createNewTableRow(seatNumber, types, ticketPrice);
        seatTableContainer.innerHTML += newRow;

        // Update elements
        updateSeatsLeft();
        updateSeatsAdded();
        updateInTotalCost(ticketPrice);
        updateGrandTotal();

        // Enable phone number input section for passengers
        if (getValueById("seat-added") > 0) {
            document.getElementById('user-phone-number').removeAttribute('disabled');
        }

        // Enable coupon apply input and button
        if (getValueById("seat-added") == 4) {
            document.getElementById('coupon-code').removeAttribute('disabled');
            document.getElementById('apply-coupon').removeAttribute('disabled');
        }
    });
}


const passengerTelephone = document.getElementById("user-phone-number");
passengerTelephone.addEventListener('keyup', function (elem) {
    // Enable the next button if seats are added and phone number is inputted.
    let available = elem.target.value.length;
    if (getValueById("seat-added") > 0 && available > 0) {
        document.getElementById('next-button').removeAttribute('disabled');
    } else {
        alert('Please Press Positive Integer Only!');
    }
});

//To create table rows.
function createNewTableRow(num, typ, cost) {
    const newRow = "<tr> <td>" + num + "</td> <td>" + typ + "</td> <td>" + cost + "</td> </tr>";
    return newRow;
}

//To get element value by ID
function getValueById(id) {
    const targetID = document.getElementById(id).innerText;
    return parseInt(targetID);
}

function updateSeatsLeft() {
    const defaultLeft = document.getElementById("seats-left").innerText;
    const convertToDefaultLeft = parseInt(defaultLeft);
    document.getElementById("seats-left").innerText = convertToDefaultLeft - 1;
}

function updateSeatsAdded() {
    const defaultSeatCounter = document.getElementById("seat-added").innerText;
    const convertDefaultSeatCount = parseInt(defaultSeatCounter);
    document.getElementById("seat-added").innerText = convertDefaultSeatCount + 1;
}

function updateInTotalCost(price) {
    const previousInTotalCost = document.getElementById("total-cost").innerText;
    const convertedTotalPrice = parseInt(previousInTotalCost);
    const convertedPrice = parseInt(price);
    document.getElementById("total-cost").innerText = convertedTotalPrice + convertedPrice;
}

function updateGrandTotal(elem) {
    const previousInTotalCost = document.getElementById("total-cost").innerText;
    const convertedTotalPrice = parseInt(previousInTotalCost);
    const couponCode = document.getElementById("coupon-code").value;

    if (elem) {
        // Apply discounts based on per coupon codes
        if (couponCode == "NEW15") {
            const discount = convertedTotalPrice * 0.15;
            document.getElementById("grand-price").innerText = convertedTotalPrice - discount;
            document.getElementById('coupon-validation').classList.add('hidden');

            // Display discount information
            const discountInformation = "Discount amount : " + discount + " BDT.";
            const discountPart = document.createElement('p');
            discountPart.innerText = discountInformation;
            document.getElementById('discount-info').appendChild(discountPart);
        }
        else if (couponCode == "Couple 20") {
            const discount = convertedTotalPrice * 0.2;
            document.getElementById("grand-price").innerText = convertedTotalPrice - discount;
            document.getElementById('coupon-validation').classList.add('hidden');

            const discountInformation = "Discount amount : " + discount + " BDT.";
            const discountPart = document.createElement('p');
            discountPart.innerText = discountInformation;
            document.getElementById('discount-info').appendChild(discountPart);
        }

        else {
            alert("INVALID COUPON. Please try again!");
            return;
        }
    }
    else {
        // If no coupon code, display the original total amount.
        document.getElementById("grand-price").innerText = convertedTotalPrice;
    }
}