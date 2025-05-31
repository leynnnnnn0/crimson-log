document.addEventListener('DOMContentLoaded', function() {
    const openNewWindowBtn = document.getElementById('open-new-window');
    const pdfViewer = document.getElementById('pdf-viewer');
    
    // Sample PDF URL - in a real application, this would be dynamically set
    // based on the specific marriage license being viewed
    const pdfUrl = 'documents/marriage_license.pdf';
    
    // Function to load PDF in the viewer
    function loadPDF() {
        // Check if PDF.js is available
        if (window.PDFObject) {
            PDFObject.embed(pdfUrl, "#pdf-viewer");
        } else {
            // Fallback if PDF.js is not available
            pdfViewer.innerHTML = `
                <iframe src="${pdfUrl}" width="100%" height="100%" style="border: none;"></iframe>
            `;
        }
    }
    
    // Try to load the PDF
    try {
        loadPDF();
    } catch (error) {
        console.error('Error loading PDF:', error);
        pdfViewer.innerHTML = `
            <div class="pdf-placeholder">
                <div class="placeholder-text">Unable to load PDF viewer</div>
                <div class="placeholder-subtext">Please try opening in a new window</div>
            </div>
        `;
    }
    
    // Open PDF in new window when button is clicked
    openNewWindowBtn.addEventListener('click', function() {
        window.open(pdfUrl, '_blank');
    });
    
    
    // Add this script to the head to enable PDF viewing
    function loadPDFJSScript() {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdfobject/2.2.8/pdfobject.min.js';
        script.integrity = 'sha512-MoP2OErV7Mtk4VL893VYBFq8yJHWQtqJxTyIAsCVKzILrvHyKQpAwJf9noILczN6psvXUxTr19T5h+ndywCoVw==';
        script.crossOrigin = 'anonymous';
        script.referrerPolicy = 'no-referrer';
        document.head.appendChild(script);
    }
    
    document.getElementById('user-menu-trigger').addEventListener('click', function(e) {
        const menu = document.getElementById('user-menu');
        menu.classList.toggle('active');
        e.stopPropagation();
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function() {
        const menu = document.getElementById('user-menu');
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    });
    
    loadPDFJSScript();
});
