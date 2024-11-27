const ideasList = document.getElementById('ideasList')

async function fetchIdeas () {

    const res = await fetch('http://localhost:3000/ideas')
    const ideas = await res.json()
    ideasList.innerHTML = ideas.map(idea => `
        <li>
            ${idea.title}: ${idea.description}
            <button onclick="editIdea(${idea.id}, '${idea.title}', '${idea.description}')">Edit</button>
            <button onclick="deleteIdea(${idea.id})">Delete</button>
        </li>
    `).join('');

}

fetchIdeas()

document.getElementById('ideaForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    await fetch('http://localhost:3000/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
    });

    fetchIdeas();
});






async function deleteIdea(id) {
    try {
        // Send DELETE request to the backend
        const res = await fetch(`http://localhost:3000/ideas/${id}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            fetchIdeas(); // Refresh the list after successful deletion
        } else {
            console.error('Failed to delete idea:', res.status);
        }
    } catch (error) {
        console.error('Error deleting idea:', error);
    }
}


async function editIdea(id, title, description) {
    const newTitle = prompt('Edit Title:', title);
    const newDescription = prompt('Edit Description:', description);

    if (newTitle && newDescription) {
        await fetch(`http://localhost:3000/ideas/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle, description: newDescription }),
        });
        fetchIdeas();
    }
}

fetchIdeas(); // Initial fetch to populate the list
