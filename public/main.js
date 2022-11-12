var trash = document.getElementsByClassName("fa-trash");
var submit = document.querySelector('.btn')
var edit = document.getElementsByClassName('fa-pen-to-square')
Array.from(edit).forEach(function(element,index) {
      element.addEventListener('click', function(){
        const input = this.parentNode.childNodes[0]
        input.focus()
        input.addEventListener('keyup', editText)       
      });     
});

function editText(e){
  let newText =e.target.value
  let _id =e.target.parentNode.parentNode.getAttribute('id')
    fetch('edit', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        _id,
        newText,
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
}


Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        let _id =this.parentNode.parentNode.getAttribute('id')
        fetch('delete', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
          _id,
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});      
