// NoticeBoard.js

// Show the write post form
function showWriteForm() {
    document.getElementById('write-post-form').style.display = 'block';
}

// Handle form submission
function submitPost(event) {
    event.preventDefault();
    
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const date = new Date().toISOString().split('T')[0].replace(/-/g, '.');

    const tbody = document.getElementById('board-tbody');
    const newRow = document.createElement('tr');

    const newNum = tbody.children.length + 1;

    newRow.innerHTML = `
        <td>${newNum}</td>
        <th><a href="#!">${title}</a></th>
        <td>${date}</td>
    `;

    tbody.prepend(newRow);

    // Reset form and hide it
    document.getElementById('write-post-form').style.display = 'none';
    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';
}
