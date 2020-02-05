$(document).ready(() => {
    if (localStorage.table) {
        displayTbl();
    }
})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

let numbersObj = [];

let colorsObj = {
    1: 'red',
    2: 'black',
    3: 'red',
    4: 'black',
    5: 'red',
    6: 'black',
    7: 'red',
    8: 'black',
    9: 'red',
    10: 'black',
    11: 'black',
    12: 'red',
    13: 'black',
    14: 'red',
    15: 'black',
    16: 'red',
    17: 'black',
    18: 'red',
    19: 'red',
    20: 'black',
    21: 'red',
    22: 'black',
    23: 'red',
    24: 'black',
    25: 'red',
    26: 'black',
    27: 'red',
    28: 'black',
    29: 'black',
    30: 'red',
    31: 'black',
    32: 'red',
    33: 'black',
    34: 'red',
    35: 'black',
    36: 'red'
}

$(document).on('click', '.action', function () {
   
    let type = $(this).attr('data-type');
    let val = $(this).attr('data-value');
    let id = $(this).attr('data-id');

    console.log(type)
    console.log(val)
    console.log(id)

    if (val === 'p') {
        numbersObj[id][type] = '<span style="color: green">' + val + '</span>';
        localStorage.table = JSON.stringify(numbersObj);
        displayTbl();        
    } else {
        numbersObj[id][type] = '<span style="color: red">' + val + '</span>';
        localStorage.table = JSON.stringify(numbersObj);
        displayTbl();
    }

});

$('#enter_number').on('click', () => {

    localStorage.table = null;
    numbersObj.length = 0;

    var i = 0;
    while (i <= 500) {
        let randomNum = getRandomInt(1, 37);
        let color = colorsObj[randomNum];
        let newObj = {
            id: i,
            number: randomNum, 
            color,
            br: `<button type="button" class="btn btn-success action" data-type="br" data-value="p" data-id="${i}">P</button>
                <button type="button" class="btn btn-danger action" data-type="br" data-value="m" data-id="${i}">N</button>`,
            oe: `<button type="button" class="btn btn-success action" data-type="oe" data-value="p" data-id="${i}">P</button>
                <button type="button" class="btn btn-danger action" data-type="oe" data-value="m" data-id="${i}">M</button>`,
            hl: `<button type="button" class="btn btn-success action" data-type="hl" data-value="p" data-id="${i}">P</button>
                <button type="button" class="btn btn-danger action" data-type="hl" data-value="m" data-id="${i}">M</button>`,
        }

        numbersObj.push(newObj);
        i++; 

        if (i > 500) {
            localStorage.table = JSON.stringify(numbersObj);
            displayTbl();
            break;
        }
    }
});

function displayTbl () {

    $('tbody').html('');
    
    let fetchedTable = JSON.parse(localStorage.table);
    numbersObj = fetchedTable;

    if (!fetchedTable.length) return;

    fetchedTable.forEach(elem => {
        let row = `<tr data-row="${elem.id}">
                <td class="${ elem.color === 'red' ? 'bg-danger' : ''}">${ elem.color === 'red' ? elem.number : ''}</td>
                <td class="${ elem.color === 'black' ? 'bg-dark' : ''}">${ elem.color === 'black' ? elem.number : ''}</td>
                <td class="br">${elem.br}</td>
                <td class="oe">${elem.oe}</td>
                <td class="hl">${elem.hl}</td>
              </tr>`;
        
        $('tbody').append(row);
    });
}