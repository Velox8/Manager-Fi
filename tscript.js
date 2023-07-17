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
const deleteBtn = document.querySelectorAll('.delete');
const transactionList = document.querySelector('.transaction-list');

let cardID = 0;

const selectedValue = () => {
	const selectedIndex = transactionCategory.selectedIndex;
	return transactionCategory.options[selectedIndex].value;
};

const openTransationPanel = () => {
	addTransactionPanel.style.display = 'flex';
	selectCategory();
};

const createIncomeArea = () => {
	const newIncomeArea = document.createElement('div');
	newIncomeArea.classList.add('transaction');
	newIncomeArea.setAttribute('id', `card_${cardID}`);
	newIncomeArea.innerHTML = `
        <p class="transaction-name">${transactionPanelName.value}<i class="fas fa-money-bill-wave"></i> Wypłata</p>
        <p class="transaction-amount">${transactionPanelAmout.value} <button class="delete" onclick="deleteArea(${cardID})"><i
        class="fas fa-times"></i></button></p>`;
	incomeArea.appendChild(newIncomeArea);

	cardID++;
};

const createExpanseArea = () => {
	const newExpanseArea = document.createElement('div');
	newExpanseArea.classList.add('transaction');
	newExpanseArea.setAttribute('id', `card_${cardID}`);
	newExpanseArea.innerHTML = `
    <p class="transaction-name">${
			transactionPanelName.value
		}<i class="fas fa-cart-arrow-down"></i>${selectCategory()}</p>
    <p class="transaction-amount2">${
			transactionPanelAmout.value
		} <button class="delete" onclick="deleteArea(${cardID})"><i
    class="fas fa-times"></i></button></p>
    </div>`;
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
	transactionAmount.forEach((el) => {
		const number = parseFloat(el.textContent);
		sumIn += number;
	});

	return sumIn;
};

const allExpanse = () => {
	const transactionAmount2 = document.querySelectorAll('.transaction-amount2');
	let sumEx = 0;
	transactionAmount2.forEach((el) => {
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

const selectCategory = () => {
	return transactionCategory.options[transactionCategory.selectedIndex].text;
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
const removeAll = () => {

   const children = Array.from(incomeArea.children)


   children.forEach(child  => {
    if(child.tagName !== 'H3') {
        incomeArea.removeChild(child)
    }
   })


   const expanseChildren = Array.from(expanseArea.children)

   expanseChildren.forEach(child =>{
    if(child.tagName !== 'H3') {
        expanseArea.removeChild(child)

    }
   })



   availableMoney.textContent = "0.00"
}

addTransactionBtn.addEventListener('click', openTransationPanel);
transationPanelCloseBtn.addEventListener('click', closeTransactionPanel);
transationPanelsaveBtn.addEventListener('click', addIncomeArea);
deleteAll.addEventListener('click', removeAll);
