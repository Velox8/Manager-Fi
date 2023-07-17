
const addTransactionBtn = document.querySelector('.add-transaction');
const deleteAll = document.querySelector('.delete-all');
const lightBtn = document.querySelector('.light');
const darkBtn = document.querySelector('.dark');
const addTransactionPanel = document.querySelector('.add-transaction-panel');
const transationPanelCloseBtn = document.querySelector('.cancel');
const transationPanelsaveBtn = document.querySelector('.save');
const transactionPanelName = document.querySelector('#name');
const transactionPanelAmout = document.querySelector('#amount');
const transactionCategory = document.querySelector('#category');
const availableMoney = document.querySelector('.available-money');
const incomeArea = document.querySelector('.income-area');
const expanseArea = document.querySelector('.expenses-area');

let cardID = 0;

const selectedCategory = () => {
  const selectedIndex = transactionCategory.selectedIndex;
  return transactionCategory.options[selectedIndex].text;
};

const openTransationPanel = () => {
  addTransactionPanel.style.display = 'flex';

};

const createIncomeArea = () => {
  const newIncomeArea = document.createElement('div');
  newIncomeArea.classList.add('transaction');
  newIncomeArea.setAttribute('id', `card_${cardID}`);
  newIncomeArea.innerHTML = `
    <p class="transaction-name">${transactionPanelName.value}<i class="fas fa-money-bill-wave"></i> Wypłata</p>
    <p class="transaction-amount">${transactionPanelAmout.value} <button class="delete" onclick="deleteArea(${cardID})"><i class="fas fa-times"></i></button></p>`;
  incomeArea.appendChild(newIncomeArea);

  cardID++;
};

const createExpanseArea = () => {
  const newExpanseArea = document.createElement('div');
  newExpanseArea.classList.add('transaction');
  newExpanseArea.setAttribute('id', `card_${cardID}`);
  newExpanseArea.innerHTML = `
    <p class="transaction-name">${transactionPanelName.value}<i class="fas fa-cart-arrow-down"></i>${selectedCategory()}</p>
    <p class="transaction-amount2">${transactionPanelAmout.value} <button class="delete" onclick="deleteArea(${cardID})"><i class="fas fa-times"></i></button></p>`;
  expanseArea.appendChild(newExpanseArea);

  cardID++;
};

const addIncomeArea = () => {
  if (transactionPanelAmout.value > 0) {
    createIncomeArea();
    addTransactionPanel.style.display = 'none';
  } else if (transactionPanelAmout.value < 0) {
    createExpanseArea();
    addTransactionPanel.style.display = 'none';
  }
  printMoney();
};

const allIncome = () => {
  const transactionAmount = document.querySelectorAll('.transaction-amount');
  let sumIn = 0;
  transactionAmount.forEach(el => {
    const number = parseFloat(el.textContent);
    sumIn += number;
  });
  return sumIn;
};

const allExpanse = () => {
  const transactionAmount2 = document.querySelectorAll('.transaction-amount2');
  let sumEx = 0;
  transactionAmount2.forEach(el => {
    const number = parseFloat(el.textContent);
    sumEx -= number;
  });
  return sumEx;
};

const printMoney = () => {
  const sumIn = allIncome();
  const sumEx = allExpanse();
  const countAll = sumIn - sumEx;
  availableMoney.textContent = countAll.toFixed(2);
};



const deleteArea = (id) => {
  const areaToDelete = document.getElementById(`card_${id}`);

  if (areaToDelete) {
    const parent = areaToDelete.parentNode;
    if (parent === incomeArea || parent === expanseArea) {
      parent.removeChild(areaToDelete);
    }
  }
  printMoney();
};

const closeTransactionPanel = () => {
  addTransactionPanel.style.display = 'none';
};

addTransactionBtn.addEventListener('click', openTransationPanel);
transationPanelCloseBtn.addEventListener('click', closeTransactionPanel);
transationPanelsaveBtn.addEventListener('click', addIncomeArea);
;
