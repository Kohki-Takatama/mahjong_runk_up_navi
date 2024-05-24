document.querySelectorAll('[role="tab"]').forEach((tab) => {
  tab.addEventListener('click', (event) => {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach((content) => {
      content.classList.remove('active');
    });

    // Deactivate all tabs
    document.querySelectorAll('[role="tab"]').forEach((tab) => {
      tab.classList.remove('tab-active');
    });

    // Activate clicked tab
    event.currentTarget.classList.add('tab-active');

    // Show corresponding tab content
    const selectedTab = event.currentTarget.getAttribute('for');
    document
      .getElementById(`tab_content_${selectedTab.split('_').pop()}`)
      .classList.add('active');
  });
});