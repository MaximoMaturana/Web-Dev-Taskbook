// Define the available computer components and their options
const components = [
    { id: 1, name: 'CPU', options: [
        { id: 'cpu1', name: 'Intel Core i5', price: 199.99 },
        { id: 'cpu2', name: 'AMD Ryzen 5', price: 249.99 },
        { id: 'cpu3', name: 'Intel Core i7', price: 349.99 }
    ]},
    { id: 2, name: 'GPU', options: [
        { id: 'gpu1', name: 'NVIDIA GTX 1660', price: 299.99 },
        { id: 'gpu2', name: 'AMD RX 5700', price: 399.99 },
        { id: 'gpu3', name: 'NVIDIA RTX 3070', price: 599.99 }
    ]},
    { id: 3, name: 'RAM', options: [
        { id: 'ram1', name: '8GB DDR4', price: 49.99 },
        { id: 'ram2', name: '16GB DDR4', price: 89.99 },
        { id: 'ram3', name: '32GB DDR4', price: 159.99 }
    ]},
    { id: 4, name: 'SSD', options: [
        { id: 'ssd1', name: '256GB NVMe', price: 59.99 },
        { id: 'ssd2', name: '512GB NVMe', price: 99.99 },
        { id: 'ssd3', name: '1TB NVMe', price: 159.99 }
    ]}
];

// This object will hold the user's order details
let order = {};

// Function to update the order when a component or quantity changes
function updateOrder(componentId, optionId, quantity) {
    const component = components.find(c => c.id === componentId);
    const option = component.options.find(o => o.id === optionId);
    
    // If a valid option is selected and quantity is greater than zero, add it to the order
    if (option && quantity > 0) {
        order[componentId] = { ...option, quantity: parseInt(quantity) };
    } else {
        // If quantity is zero or invalid, remove the item from the order
        delete order[componentId];
    }
    
    // Update total cost and summary display
    updateTotal();
    updateOrderSummary();
}

// Function to calculate and display the total cost of the order
function updateTotal() {
    const total = Object.values(order).reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('total').textContent = total.toFixed(2); // Update total display
}

// Function to update the order summary display with current selections
function updateOrderSummary() {
    const orderSummaryElement = document.getElementById('order-summary-list');
    orderSummaryElement.innerHTML = ''; // Clear previous summary
    
    // Loop through each item in the order and create a list entry
    Object.entries(order).forEach(([componentId, item]) => {
        const component = components.find(c => c.id === parseInt(componentId));
        const li = document.createElement('li');
        li.textContent = `${component.name}: ${item.name} - Quantity: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        orderSummaryElement.appendChild(li); // Add to the summary list
    });
}

// Function to render the form for selecting components and quantities
function renderOrderForm() {
    const orderForm = document.getElementById('order-form');
    
    // Loop through each component category to create selection elements
    components.forEach(component => {
        const div = document.createElement('div');
        div.className = 'component-item';
        
        // Create HTML structure for each component selection with quantity input
        div.innerHTML = `
            <label for="${component.id}-select">${component.name}:</label>
            <select id="${component.id}-select" onchange="updateOrder(${component.id}, this.value, document.getElementById('${component.id}-quantity').value)">
                <option value="">Select ${component.name}</option>
                ${component.options.map(option => 
                    `<option value="${option.id}">${option.name} - $${option.price.toFixed(2)}</option>`
                ).join('')}
            </select>
            <label for="${component.id}-quantity">Quantity:</label>
            <input type="number" id="${component.id}-quantity" min="0" value="0" onchange="updateOrder(${component.id}, document.getElementById('${component.id}-select').value, this.value)">
        `;
        
        orderForm.appendChild(div); // Add the component selection to the form
    });
}

// Initialize the app by rendering the form and setting up event listeners
function init() {
    renderOrderForm();
    
    // Event listener for placing an order (optional)
    document.getElementById('place-order').addEventListener('click', () => {
        const orderDetails = Object.entries(order).map(([componentId, item]) => {
            const component = components.find(c => c.id === parseInt(componentId));
            return `${component.name}: ${item.name} - Quantity: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        }).join('\n');
        
        alert(`Order placed!\n\nOrder Details:\n${orderDetails}\n\nTotal: $${document.getElementById('total').textContent}`);
    });
}

// Run the init function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);