
async function loadReviews() {
  try {
    const response = await fetch('data.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Failed to load data.json: ${response.status}`);
    }

    const data = await response.json();
    const container = document.getElementById('reviews-container');
    container.innerHTML = '';

    const biz = data.business;
    const bizInfo = document.createElement('div');
    bizInfo.className = 'panel';
    bizInfo.innerHTML = `
      <strong>${biz.name}</strong>
      <div style="font-size:0.9rem; color:#6b7280">
        ${biz.category} · ${biz.city} · ${biz.price} · ★ ${biz.overall_rating} (${biz.review_count})
      </div>
    `;
    container.appendChild(bizInfo);

    data.reviews.forEach(r => {
      const reviewCard = document.createElement('article');
      reviewCard.className = 'review-card';
      reviewCard.innerHTML = `
        <h4>${escapeHtml(r.reviewer)} 
          <span style="font-size:0.9rem; color:#6b7280">· ${r.rating}★ · ${r.date}</span>
        </h4>
        <div class="review-text">${escapeHtml(r.text)}</div>
      `;
      container.appendChild(reviewCard);
    });

  } catch (err) {
    console.error(err);
    document.getElementById('reviews-container').innerHTML =
      '<p style="color:#b91c1c">Could not load reviews. Check console.</p>';
  }
}

function escapeHtml(str) {
  return (str || '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );
}

document.addEventListener('DOMContentLoaded', loadReviews);
