document.addEventListener("DOMContentLoaded", function () {

  const form = document.querySelector('.form');
  const textarea = document.querySelector('.form__textarea');
  const listWrapper = document.querySelector('.result__list--wrapper');
  const text = document.querySelector('.text');
  const words = document.querySelector('.words');
  const letters = document.querySelector('.letters');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let val = textarea.value;
    text.textContent = val;
    clearData()

    let filteredString = val.replace(/[^a-zа-яё]/gi, ' ').toLowerCase();
    let stringForCount = filteredString.split(' ').filter(Boolean);
    let lettersForCount = stringForCount.join('');

    if (val) {
      countLettersAndWords(stringForCount);
      count(stringForCount, 20);
      count(lettersForCount, 10);
    }
  });

  function countLettersAndWords(val) {
    words.textContent = val.length;
    letters.textContent = val.join('').length;
  }

  function count(str, amount) {
    let obj = {}
    for (let i of str) {
      if (obj.hasOwnProperty(i)) {
        let k = obj[i];
        obj[i] = ++k;
      } else {
        obj[i] = 1;
      }
    }

    let keys = sortKeysByValue(obj);
    createList(keys, amount)
  }

  let sortKeysByValue = obj => Object.keys(obj).sort((a, b) => obj[b] - obj[a])

  function createList(arr, amount) {
    if (arr.length > amount) arr.length = amount

    let list = document.createElement('ol');
    for (let i of arr) {
      let li = document.createElement('li');
      li.textContent = i;
      list.appendChild(li);
    }

    listWrapper.appendChild(list)
  }

  function clearData() {
    listWrapper.innerHTML = '';
    textarea.value = '';
    words.textContent = 0;
    letters.textContent = 0;
  }

});