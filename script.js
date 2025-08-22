// ===== Class registry (quản lý class tập trung) =====
const cls = {
  card:      'bg-white p-4 md:p-6 rounded-lg shadow-lg border border-gray-200',
  title:     'word text-xl md:text-2xl font-medium mb-2 text-[#3c6c4c]',
  ipa:       'ipa text-gray-500 text-sm mb-2',
  meaning:   'mb-4',
  meaningP:  'text-gray-700 mb-4',
  exampleEn: 'text-gray-700 font-semibold',
  exampleVi: 'italic text-gray-800',
  cefr:      'text-gray-600 text-xs md:text-sm font-semibold mt-4',
};

// ===== Helpers =====
function addClasses(node, classes) {
  if (!classes) return node;
  node.className = classes; // 1 lần, nhanh hơn add nhiều lần
  return node;
}

function el(tag, classes, text) {
  const node = document.createElement(tag);
  addClasses(node, classes);
  if (text != null) node.textContent = text;
  return node;
}

// ===== Main =====
fetch('data/LouisianaWayHome.json')
  .then(r => r.json())
  .then(displayData)
  .catch(err => console.error('Error loading JSON:', err));

function displayData(data = []) {
  const container = document.getElementById('data-container');
  const totalWords = document.getElementById('total-words');

  totalWords.textContent = `Total Words: ${data.length}`;

  const frag = document.createDocumentFragment();

  data.forEach(item => {
    const card  = el('div', cls.card);
    const title = el('h2', cls.title, item.word ?? '');
    const ipa   = el('p',  cls.ipa,   item.ipa ?? '');

    const meaningWrap = el('div', cls.meaning);
    (item.meaning ?? []).forEach(mean => {
      meaningWrap.appendChild(el('p', cls.meaningP,  mean?.vi ?? ''));
      meaningWrap.appendChild(el('p', cls.exampleEn, mean?.example_en ?? ''));
      meaningWrap.appendChild(el('p', cls.exampleVi, mean?.example_vi ?? ''));
    });

    const cefr = el('p', cls.cefr, `CEFR Level: ${item.cefr_level ?? ''}`);

    card.append(title, ipa, meaningWrap, cefr);
    frag.appendChild(card);
  });

  container.appendChild(frag);
}
