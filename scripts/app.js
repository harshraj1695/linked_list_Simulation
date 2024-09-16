let linkedList = [];

function insertNode() {
    const inputValue = document.getElementById('nodeValue').value;
    if (inputValue === "") return alert("Please enter a value");

    linkedList.push(parseInt(inputValue));
    animateInsertNode(inputValue);

    // Clear the input field
    document.getElementById('nodeValue').value = '';
}

function deleteNode() {
    const inputValue = document.getElementById('nodeValue').value;
    if (inputValue === "") return alert("Please enter a value to delete");

    const valueToDelete = parseInt(inputValue);
    const index = linkedList.indexOf(valueToDelete);
    if (index !== -1) {
        animateDeleteNode(index);
        setTimeout(() => {
            linkedList.splice(index, 1);
            updateDisplay();
        }, 500);  // Wait for animation to finish
    } else {
        alert("Value not found in the list");
    }

    // Clear the input field
    document.getElementById('nodeValue').value = '';
}

function animateInsertNode(value) {
    const listContainer = document.getElementById('linked-list');

    // Create a node div
    const nodeElement = document.createElement('div');
    nodeElement.className = 'node entering';
    nodeElement.innerText = value;

    // Append the node to the list container
    listContainer.appendChild(nodeElement);

    // Add an arrow after the previous node
    if (linkedList.length > 1) {
        const arrow = document.createElement('span');
        arrow.className = 'arrow';
        arrow.innerHTML = '&#8594;';
        listContainer.insertBefore(arrow, nodeElement);

        // Animate arrow visibility after inserting the node
        setTimeout(() => {
            arrow.classList.add('visible');
        }, 500);
    }

    // Animate the node to scale up and fade in
    setTimeout(() => {
        nodeElement.classList.remove('entering');
    }, 0);  // Trigger the animation immediately after rendering
}

function animateDeleteNode(index) {
    const nodes = document.querySelectorAll('.node');
    const arrows = document.querySelectorAll('.arrow');

    // Animate node exiting
    nodes[index].classList.add('exiting');

    // Animate arrow removal if there's one after the node
    if (arrows[index]) {
        arrows[index].classList.remove('visible');
    }
}

function updateDisplay() {
    const listContainer = document.getElementById('linked-list');
    listContainer.innerHTML = '';  // Clear the existing linked list

    linkedList.forEach((node, index) => {
        // Create a node div
        const nodeElement = document.createElement('div');
        nodeElement.className = 'node';
        nodeElement.innerText = node;

        // Append the node to the list container
        listContainer.appendChild(nodeElement);

        // Add an arrow after each node except the last
        if (index < linkedList.length - 1) {
            const arrow = document.createElement('span');
            arrow.className = 'arrow visible';
            arrow.innerHTML = '&#8594;';  // Right arrow symbol
            listContainer.appendChild(arrow);
        }
    });
}

function sortList() {
    // Sort the linkedList array
    linkedList.sort((a, b) => a - b);

    // Rebuild and display the sorted linked list
    updateDisplay();
}

// Add event listener for sorting
document.querySelector('button[onclick="sortList()"]').addEventListener('click', sortList);

// Initialize display
updateDisplay();
