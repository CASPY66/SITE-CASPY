document.addEventListener('DOMContentLoaded', () => {

  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      document.getElementById(`tab-${tabId}`).classList.add('active');
    });
  });

  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (burgerBtn) {
    burgerBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
  }

  const GITHUB_USERNAME = 'CASPY66';
  const REPO_NAME = 'SITE';

  async function loadProjectsFromAdmin() {
    try {
      const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/content/projects`);
      
      if (!response.ok) return;
      const files = await response.json();

      document.querySelectorAll('.grid').forEach(grid => grid.innerHTML = '');

      for (const file of files) {
        if (file.name.endsWith('.json')) {
          const res = await fetch(file.download_url);
          const project = await res.json();

          const cardHTML = `
            <article class="card">
              <div class="card-image">
                <img src="${project.image || 'https://via.placeholder.com/600x400'}" alt="${project.title}">
              </div>
              <div class="card-content">
                <span class="tag">${project.tag || 'Project'}</span>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                ${project.link ? `<a href="${project.link}" target="_blank" class="card-link">Смотреть проект →</a>` : ''}
              </div>
            </article>
          `;

          const targetTab = document.querySelector(`#tab-${project.category} .grid`);
          if (targetTab) {
            targetTab.insertAdjacentHTML('beforeend', cardHTML);
          }
        }
      }
    } catch (error) {
      console.error('Ошибка загрузки карточек из админки:', error);
    }
  }

  loadProjectsFromAdmin();
});