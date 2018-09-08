/* 
TO DO:
======

1. When the user clicks on the button that says "Move to start", move that <article> element to the beginning of the row
2. When the user clicks on the button that says "Delete", remove that <article> from the page entirely

See https://res.cloudinary.com/bitkoin/video/upload/v1535438914/Untitled.mp4
*/
window.onload = function attachId(){
    let e = document.getElementsByTagName("article");
    for (let i=0; i<e.length; i++){
        e[i].setAttribute("id",i+1)
    }

    remove_green();
}

document.addEventListener("click", function(e){
    parent_id = e.target.parentNode.id;
    action = e.target.innerHTML;

    action_function(parent_id,action);
});

function action_function(id,action){
    switch(action){
        case "Move to start": move_function(id); break;
        case "Delete": delete_function(id); break;
        default: break;
    }

}

function delete_function(id){
    document.getElementById(id).remove();
    let rem_article = document.getElementsByTagName("article");
    if (rem_article.length>1){
        for (const article of rem_article){
            article.style.width="46%";
            remove_green();
        }
    }else{
        rem_article[0].style.width="98%";
    remove_green();
    }
   
}

function move_function(id){
    let newFirstElement = document.getElementById(id);

    let sec_first_child = document.getElementsByTagName("section");
    console.log(sec_first_child[0].childNodes[1]);

    sec_first_child[0].insertBefore(newFirstElement, sec_first_child[0].childNodes[1]);

    remove_green();
}

function remove_green(){
    all_btns = document.getElementsByTagName("button");
    console.log(all_btns);
    for(let i=0; i<all_btns.length; i++){
        if (i == 0){
            all_btns[i].style="display:none";
        }else{
            all_btns[i].style="display:";
        }
    }

    
}

function add_green(){

}




