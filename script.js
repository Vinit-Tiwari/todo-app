var input = document.getElementById("input");
let count=0;

input.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
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