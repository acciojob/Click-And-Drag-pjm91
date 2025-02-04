// Your code here.
// JavaScript to handle drag functionality
document.addEventListener('DOMContentLoaded', () => {
    const cubes = document.querySelectorAll('.cube');
    let draggedCube = null;
    let offsetX, offsetY;

    // Add event listener to each cube
    cubes.forEach(cube => {
        cube.addEventListener('mousedown', (e) => {
            // Track the cube being dragged
            draggedCube = cube;

            // Calculate the offset between mouse position and cube position
            offsetX = e.clientX - cube.getBoundingClientRect().left;
            offsetY = e.clientY - cube.getBoundingClientRect().top;

            // Start dragging - add mousemove and mouseup listeners
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    });

    // Handle mouse movement
    function onMouseMove(e) {
        if (draggedCube) {
            // Calculate new position for the cube
            let newLeft = e.clientX - offsetX;
            let newTop = e.clientY - offsetY;

            // Ensure cube stays within the boundaries of the container
            const containerRect = document.querySelector('.container').getBoundingClientRect();
            const cubeRect = draggedCube.getBoundingClientRect();

            // Limit movement to the container's bounds
            if (newLeft < containerRect.left) newLeft = containerRect.left;
            if (newTop < containerRect.top) newTop = containerRect.top;
            if (newLeft + cubeRect.width > containerRect.right) newLeft = containerRect.right - cubeRect.width;
            if (newTop + cubeRect.height > containerRect.bottom) newTop = containerRect.bottom - cubeRect.height;

            // Update the position of the dragged cube
            draggedCube.style.left = `${newLeft - containerRect.left}px`;
            draggedCube.style.top = `${newTop - containerRect.top}px`;
        }
    }

    // Handle mouse up - stop dragging
    function onMouseUp() {
        if (draggedCube) {
            // Stop dragging by removing mousemove and mouseup listeners
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            // Clear the draggedCube variable
            draggedCube = null;
        }
    }
});
