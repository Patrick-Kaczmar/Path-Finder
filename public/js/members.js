// This file does a GET request to figure out which user is logged in
// and updates the HTML on the page
$.get("/api/user_data").then(function (data) {
  $(".member-name").text(data.email);
});

// $.get("/api/restaurant").then(function (response) {
//   console.log(response);
//   // forEach(data.name)
//   let savedList = $(".savedList").text(response.name);
//   for (let i = 0; i > response.length; i++){
    
//     const saveUrl = document.createElement("a");
//     let website = data.website;
//     saveUrl.textContent = data.name;
//     saveUrl.setAttribute("href", website);
//     const saveLi = document.createElement("li");
//     saveLi.append(saveUrl);
//     savedList.append(saveLi);
//     console.log(saveLi);
//   }
  
// })