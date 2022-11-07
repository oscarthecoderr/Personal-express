// var thumbUps = document.getElementsByClassName("fa-thumbs-up");
// var thumbDowns = document.getElementsByClassName("fa-thumbs-down");
var trash = document.getElementsByClassName("fa-trash-o");
var submit = document.querySelector('.btn')
// Array.from(thumbUps).forEach(function(element,index) {
//       element.addEventListener('click', function(){
//         //const name = this.parentNode.parentNode.childNodes[1].innerText
//         const _id = this.parentNode.parentNode.getAttribute('id')
//         fetch('orders', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//              '_id': _id,
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });

// Array.from(thumbDowns).forEach(function(element,index) {
//   element.addEventListener('click', function(){
//     //const name = this.parentNode.parentNode.childNodes[1].innerText
//     const _id = this.parentNode.parentNode.getAttribute('id')
//     fetch('orderss', {
//       method: 'put',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//          '_id': _id,
//       })
//     })
//     .then(response => {
//       if (response.ok) return response.json()
//     })
//     .then(data => {
//       console.log(data)
//       window.location.reload(true)
//     })
//   });
// });

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const playerName = this.parentNode.parentNode.childNodes[1].innerText
        const team = this.parentNode.parentNode.childNodes[3].innerText
        const careerPoints = parseInt(this.parentNode.parentNode.childNodes[5].innerText)
        const careerAssists = parseInt(this.parentNode.parentNode.childNodes[7].innerText)
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'playerName': playerName,
            'team': team,
            'careerPoints':careerPoints,
            'careerAssists': careerAssists,
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});


 
      submit.addEventListener('click', function(){
        const playerName = this.parentNode.parentNode.childNodes[1].innerText
        const team = this.parentNode.parentNode.childNodes[3].innerText
        const careerPoints = parseInt(this.parentNode.parentNode.childNodes[5].innerText)
        const careerAssists = parseInt(this.parentNode.parentNode.childNodes[7].innerText)
        console.log(this.parentNode.parentNode.childNodes)
        fetch('post', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'playerName': playerName,
            'team': team,
            'careerPoints':careerPoints,
            'careerAssists': careerAssists,
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
