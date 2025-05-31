document.addEventListener('DOMContentLoaded', function() {
    // Sample data - replace with actual data from your backend
    const documents = [
        {
            id: "REQ001",
            type: "Birth Certificate",
            date: "2025-03-15",
            status: "pending"
        },
        {
            id: "REQ002",
            type: "Marriage Certificate",
            date: "2025-03-14",
            status: "approved"
        }
    ];

    const tableBody = document.getElementById('documentTableBody');
    const searchInput = document.getElementById('searchInput');
    const documentTypeFilter = document.getElementById('documentType');
    const statusFilter = document.getElementById('status');

    function renderDocuments(docs) {
        tableBody.innerHTML = '';
        docs.forEach(doc => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${doc.id}</td>
                <td>${doc.type}</td>
                <td>${formatDate(doc.date)}</td>
                <td><span class="status ${doc.status}">${capitalizeFirst(doc.status)}</span></td>
                <td class="action-buttons">
                    <button class="btn-view" onclick="viewDocument('${doc.id}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    ${doc.status === 'approved' ? `
                        <button class="btn-download" onclick="downloadDocument('${doc.id}')">
                            <i class="fas fa-download"></i> Download
                        </button>
                    ` : ''}
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    function capitalizeFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Initial render
    renderDocuments(documents);

    // Search and filter functionality
    function filterDocuments() {
        const searchTerm = searchInput.value.toLowerCase();
        const typeFilter = documentTypeFilter.value;
        const statFilter = statusFilter.value;

        const filtered = documents.filter(doc => {
            const matchesSearch = doc.type.toLowerCase().includes(searchTerm) ||
                                doc.id.toLowerCase().includes(searchTerm);
            const matchesType = !typeFilter || doc.type.toLowerCase().includes(typeFilter);
            const matchesStatus = !statFilter || doc.status === statFilter;

            return matchesSearch && matchesType && matchesStatus;
        });

        renderDocuments(filtered);
    }

    // Event listeners
    searchInput.addEventListener('input', filterDocuments);
    documentTypeFilter.addEventListener('change', filterDocuments);
    statusFilter.addEventListener('change', filterDocuments);

    // User menu toggle
    const userMenuTrigger = document.getElementById('user-menu-trigger');
    const userMenu = document.getElementById('user-menu');

    userMenuTrigger.addEventListener('click', () => {
        userMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!userMenuTrigger.contains(e.target) && !userMenu.contains(e.target)) {
            userMenu.classList.remove('active');
        }
    });
});

// Document actions
function viewDocument(id) {
    // Implement document viewing functionality
    console.log(`Viewing document ${id}`);
}

function downloadDocument(id) {
    // Implement document download functionality
    console.log(`Downloading document ${id}`);
}