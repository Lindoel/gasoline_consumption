const form_save = window.document.forms.namedItem('form');
const show_data_confirm = window.document.querySelector('.data_confirm');

const table_body = document.querySelector('tbody')

const table = document.querySelector('table')
const button_download = document.querySelector('#button_download')

const control = [];

class Control {
    constructor(daily_expense, weekly_expense, monthly_expense, annual_expense, date) {
        this.daily_expense = daily_expense;
        this.weekly_expense = weekly_expense;
        this.monthly_expense = monthly_expense;
        this.annual_expense = annual_expense;
        this.date = date;
    }
}

button_download.onclick = () => {
    const a = document.createElement('a');

    const html_table = table.outerHTML;
    const type_data = 'data:application/vnd.ms-excel';

    a.href = type_data + ', ' + html_table;
    a.download = 'controle.xls';
    a.click();
}

function claim() {
    const daily_expense = (form_save.km_day.value / form_save.average.value) * form_save.price.value;
    const weekly_expense = daily_expense * form_save.days_week.value;
    const monthly_expense = weekly_expense * 4;
    const annual_expense = weekly_expense * 12;

    control.unshift(new Control(daily_expense, weekly_expense, monthly_expense, annual_expense, get_data()));

    add_obj_menu_table()
    cancel();
    reset_form();
}

function add_obj_menu_table() {
    table_body.innerHTML = ''
    document.querySelector('.actions').innerHTML = ''
    control.forEach((obj, index) => {
        table_body.innerHTML +=
        `<tr>
            <td>R$${obj.daily_expense.toFixed(2)}</td>
            <td>R$${obj.weekly_expense.toFixed(2)}</td>
            <td>R$${obj.monthly_expense.toFixed(2)}</td>
            <td>R$${obj.annual_expense.toFixed(2)}</td>
            <td>${obj.date}</td>
            
        </tr>
        `

        document.querySelector('.actions').innerHTML += 
        `<td>
            <i id="button_edit" onclick="delete_item(${index})" class="fa-solid fa-trash"></i> 
        </td>
        `
    })
}

form_save.addEventListener('submit', data => {
    data.preventDefault()
    modal_confirm_on();
    
    display_data();

})

function delete_item(index) {
    control.splice(index, 1)
    
    add_obj_menu_table()
}

function show_Data() {
    const daily_expense = (form_save.km_day.value / form_save.average.value) * form_save.price.value;
    const weekly_expense = daily_expense * form_save.days_week.value;
    const monthly_expense = weekly_expense * 4;
    const annual_expense = weekly_expense * 12;
    
    return `
    <p>Gasto Diário: R$${daily_expense.toFixed(2)}</p>
    <p>Gasto Semanal: R$${weekly_expense.toFixed(2)}</p>
    <p>Gasto Mensal: R$${monthly_expense.toFixed(2)}</p>
    <p>Gasto Anual: R$${annual_expense.toFixed(2)}</p>
    `
}

function display_data() {
    show_data_confirm.innerHTML = show_Data()
}

function reset_form() {
    form_save.reset()
    form_save.price.focus()
}

function cancel() {
    modal_confirm_off();
    reset_form();
}

function menu_on() {
    if(document.querySelector('.menu_icon').getAttribute('onclick') == 'menu_on()') {
        document.querySelector('.modal_menu').style.display = 'flex';
        document.querySelector('.form').style.display = 'none';
        document.querySelector('.button_edit_icon').style.display = 'block';

        document.querySelector('.menu_icon').setAttribute('onclick', 'menu_off()')
        document.querySelector('.menu_icon').innerHTML = '<h1 class="menu_line_x">X</h1>'

    }
}

function menu_off() {
    document.querySelector('.modal_menu').style.display = 'none';
    document.querySelector('.form').style.display = 'flex';
    document.querySelector('.menu_icon').setAttribute('onclick', 'menu_on()')
    document.querySelector('.button_edit_icon').style.display = 'none';
    document.querySelector('.menu_icon').innerHTML = 
    ` <hr class="menu_line">
    <hr class="menu_line">
    <hr class="menu_line">
    `
}

function modal_confirm_on() {
    document.querySelector('.modal_confirm').style.display = 'block';
    document.querySelector('.form').style.display = 'none';
}

function modal_confirm_off() {
    document.querySelector('.modal_confirm').style.display = 'none';
    document.querySelector('.form').style.display = 'flex';
}

function get_data() {
    const objdata = new Date()
    return date = objdata.toLocaleString()
}