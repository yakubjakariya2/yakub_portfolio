// Tools functionality
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('data/tools.json');
        const data = await response.json();
        initTools(data.tools);
    } catch (error) {
        console.error('Error loading tools data:', error);
    }
});

function initTools(tools) {
    const toolsGrid = document.getElementById('toolsGrid');
    const seeMoreBtn = document.getElementById('seeMoreTools');
    
    let visibleToolsCount = 10;
    
    // Function to render tools
    function renderTools() {
        toolsGrid.innerHTML = '';
        
        tools.forEach((tool, index) => {
            const toolCard = document.createElement('div');
            toolCard.className = `tool-card glass-card p-6 rounded-2xl ${index >= visibleToolsCount ? 'tool-hidden' : ''}`;
            
            toolCard.innerHTML = `
                <div class="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center mb-4">
                    <i class="${tool.icon} text-white text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-2">${tool.title}</h3>
                <p class="text-gray-300 mb-4">
                    ${tool.description}
                </p>
                <div class="flex justify-between items-center">
                    <span class="text-sm text-cyan-400">${tool.tags}</span>
                    <a href="#" class="text-cyan-400 hover:text-cyan-300 transition-colors">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            `;
            
            toolsGrid.appendChild(toolCard);
        });
        
        // Show/hide "See More" button based on visible tools count
        if (visibleToolsCount >= tools.length) {
            seeMoreBtn.style.display = 'none';
        } else {
            seeMoreBtn.style.display = 'inline-block';
        }
    }
    
    // Initial render
    renderTools();
    
    // "See More" button click handler
    seeMoreBtn.addEventListener('click', function() {
        visibleToolsCount += 10;
        renderTools();
    });
}