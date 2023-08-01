const CATEGORIES = 'https://api.chucknorris.io/jokes/categories';
let URL = randomUrl = 'https://api.chucknorris.io/jokes/random';

const getRamdomJoke = async () => {
  try {
    document.getElementById('spinner').style.display = 'block';
    const response = await axios.get(URL);
    console.log(response.data);
    document.getElementById('spinner').style.display = 'none';
    updateJoke(response.data.value);
  } catch (error) {
    console.error(error);
  }
}

const getCategories = async () => {
  try {
    const response = await axios.get(CATEGORIES);
    updateCategories(response.data);
  } catch (error) {
    console.error(error);
  }
}

getCategories();

const updateCategories = categories => {
  let select = document.getElementById('filter');
  if (select.hasChildNodes()) {
    removeAllChildNodes(select);
  }
  // Default Select
  let defaultOpt = document.createElement('option');
  defaultOpt.value = 'random';
  defaultOpt.selected = true;
  defaultOpt.textContent = "Random";

  select.appendChild(defaultOpt);
  // Generate other select options
  categories.forEach((element, i) => {
    let opt = document.createElement('option');
    opt.className = "first-letter-uppercase"
    opt.value = element;
    opt.textContent = capitalizeTxt(element);

    select.appendChild(opt);
  });
  changeCategory();
}

// Change Select / category
const changeCategory = () => {
  const select = document.getElementById('filter');
  if (select.hasChildNodes()) {
    const selected = select.options[select.selectedIndex].value;
    document.getElementById('category-name').textContent = capitalizeTxt(selected);
    refreshJoke();
    URL = (selected === 'random') ? randomUrl : `https://api.chucknorris.io/jokes/random?category=${selected}`;
    getRamdomJoke();
  }
}

// next joke button
const nextJoke = evnt => {
  evnt.preventDefault();
  refreshJoke();
  getRamdomJoke();
}

const updateJoke = joke => {
  document.getElementById('joke').textContent = joke;
}

const refreshJoke = () => {
  document.getElementById('joke').textContent = '';
}

// HELPER Functions
const capitalizeTxt = txt => {
  // If you want lowercase the rest txt.slice(1).toLowerCase();
  return txt.charAt(0).toUpperCase() + txt.slice(1);
}

const removeAllChildNodes = parent => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}