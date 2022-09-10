const tabs = document.getElementById('tabs');
const content = document.querySelectorAll('.content');

const changeClass = el => {
    console.log(el);
    for(let i = 0; i < tabs.children.length; i++) {
        tabs.children[i].classList.remove('active');
    }
    el.classList.add('active');
}

console.log(content);

tabs.addEventListener('click', e => {
    const currTab = e.target.dataset.btn;
    changeClass(e.target);
    for(let i = 0; i < content.length; i++) {
        content[i].classList.remove('active');
        if(content[i].dataset.content === currTab) {
            content[i].classList.add('active');
        }
    }
})


const tabsdop = document.getElementById('tabsdop');
const contentdop = document.querySelectorAll('.content-dop');

const changeClassdop = el => {
    console.log(el);
    for(let i = 0; i < tabsdop.children.length; i++) {
        tabsdop.children[i].classList.remove('active');
    }
    el.classList.add('active');
}

console.log(contentdop);

tabsdop.addEventListener('click', e => {
    const currTab = e.target.dataset.btndop;
    changeClassdop(e.target);
    for(let i = 0; i < contentdop.length; i++) {
        contentdop[i].classList.remove('active');
        if(contentdop[i].dataset.contentdop === currTab) {
            contentdop[i].classList.add('active');
        }
    }
})