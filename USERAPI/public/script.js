const userForm = document.getElementById('userForm');
const userTable = document.getElementById('userTable').querySelector('tbody');

const apiBase = '/users'; // Base URL for API

// Fetch and display all users
async function fetchUsers() {
  const response = await fetch(apiBase);
  const users = await response.json();
  userTable.innerHTML = '';
  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.age}</td>
      <td>${user.address || ''}</td>
      <td>
        <button class="edit" onclick="editUser('${user._id}')">Edit</button>
        <button class="delete" onclick="deleteUser('${user._id}')">Delete</button>
      </td>
    `;
    userTable.appendChild(row);
  });
}

// Add or update user
document.getElementById('userForm').addEventListener('submit', async (event) => {
//userForm.addEventListener('submit', async (event) => {
    event.preventDefault();

  const userId = document.getElementById('userId').value;
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const age = document.getElementById('age').value;
  const address = document.getElementById('address').value;

  const payload = { name, email, age, address };

  if (userId) {
    // Update user
    await fetch(`${apiBase}/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } else {
    // Add new user
    await fetch(apiBase, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }

  userForm.reset();
  fetchUsers();
});

// Populate form for editing a user
async function editUser(id) {
  const response = await fetch(`${apiBase}/${id}`);
  const user = await response.json();

  document.getElementById('userId').value = user._id;
  document.getElementById('name').value = user.name;
  document.getElementById('email').value = user.email;
  document.getElementById('age').value = user.age;
  document.getElementById('address').value = user.address;
}

// Delete a user
async function deleteUser(id) {
  await fetch(`${apiBase}/${id}`, { method: 'DELETE' });
  fetchUsers();
}

// Initial load
fetchUsers();