var input = document.getElementById("input");
let count=0;

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {  //checks whether the pressed key is "Enter"
        add();
    }
});


document.querySelectorAll('.check').forEach ((element) => { 
        element.addEventListener("click", () => {
            element.classList.toggle('selected');
            element.parentNode.classList.toggle('lineThrough')
        })
        console.log(element)
    }
)

document.querySelectorAll('.delete').forEach ((element) => { 
    element.addEventListener("click", () => {
        element.parentNode.classList.toggle('despair')
    })
    console.log(element)
}
)

let list=document.querySelector('.list')

function add(){
    if(document.querySelector('#input').value!=''){
        list.innerHTML += `
        <span>
        <label for="" class="row lord" style="gap: 2.5rem;">
        <span class="check"></span>
        <span class="list row">
            ${document.querySelector('#input').value}
        </span>
        <span class="delete"></span>
        </label>
        </span>
        `;
    }
    document.querySelector('#input').value='';
    document.querySelectorAll('.check').forEach ((element) => { 
        element.addEventListener("click", () => {
            element.classList.toggle('selected');
            element.parentNode.classList.toggle('lineThrough')
        })
        console.log(element)
    }
    )

    document.querySelectorAll('.delete').forEach ((element) => { 
        element.addEventListener("click", () => {
            element.parentNode.classList.toggle('despair')
        })
        console.log(element)
    }
    )
}

let mode=document.querySelector('#mode')
mode.addEventListener('click', function(){
    mode.classList.toggle('moon')
    mode.classList.toggle('sun')
    document.querySelector('#bg-image').classList.toggle('dark')
    document.querySelector('#bg-image').classList.toggle('light')
    document.body.classList.toggle('bg-dark')
    document.body.classList.toggle('bg-light')
    document.querySelector('#input').classList.toggle('input-dark')
    document.querySelector('#input').classList.toggle('input-light')
    document.querySelector('.layer2').classList.toggle('layer23-dark')
    document.querySelector('.layer2').classList.toggle('layer23-light')
    document.querySelector('.layer3').classList.toggle('layer23-dark')
    document.querySelector('.layer3').classList.toggle('layer23-light')


})