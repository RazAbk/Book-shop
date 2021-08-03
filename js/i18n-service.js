var gTrans = {
    id: {
        en: 'id',
        he: 'מזהה'
    },
    'page-title': {
        en: `Welcome to Raz's book shop`,
        he: 'ברוכים הבאים לחנות הספרים של רז'
    },
    title: {
        en: 'title',
        he: 'כותרת'
    },
    price: {
        en: 'price',
        he: 'מחיר'
    },
    'book-cover': {
        en: 'book cover',
        he: 'תמונה'
    },
    actions: {
        en: 'actions',
        he: 'פעולות'
    },
    image: {
        en: 'img url',
        he: 'קישור לתמונה'
    },
    'add-book': {
        en: 'add book',
        he: 'הוסף ספר'
    },
    previous: {
        en: 'previous',
        he: 'הקודם'
    },
    next: {
        en: 'next',
        he: 'הבא',
    },
    update: {
        en: 'update',
        he: 'עדכן'
    },
    read: {
        en: 'read',
        he: 'קרא'
    },
    delete: {
        en: 'delete',
        he: 'מחק'
    },
    cancel: {
        en: 'cancel',
        he: 'בטל'
    },
    'save-changes': {
        en: 'save changes',
        he: 'שמור שינויים'
    },
    'update-book-details': {
        en: 'update book details',
        he: 'עדכן פרטי ספר'
    }
    
}

var gCurrLang = 'en';

function getTrans(transKey) {
    //if key is unknown return 'UNKNOWN'
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN'

    //get from gTrans
    var txt = keyTrans[gCurrLang]

    //If translation not found - use english
    if (!txt) txt = keyTrans['en']

    return txt;
}

function doTrans() {
    // for each el:
    // get the data-trans and use getTrans to replace the innerText 
    var els = document.querySelectorAll('[data-trans]')

    els.forEach(function (el) {
        var txt = getTrans(el.dataset.trans)
        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt)
        } else {
            el.innerText = txt
        }
    })

}

function setLang(lang) {
    gCurrLang = lang;
    _saveLangToStorage();
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    if(gCurrLang === 'he') return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
    if(gCurrLang === 'en') return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function _saveLangToStorage(){
    saveToStorage('lang',gCurrLang);
}