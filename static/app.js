// fetch("data/site_data.json").then(d=>d.json()).then(data=>{
//     console.log(data)
// })

$.ajax({
    type: 'GET',
    url: `data/site_data.json`,
    beforeSend: function(xhr){
       console.log("sending request")
    },

    success: function(msg){
       console.log(msg);
       tdata = document.getElementById('tableData')
       msg.projects.forEach(p=>{
        tr = document.createElement("tr")
           Object.values(p).forEach((v)=>{
               td = document.createElement("td")
               td.innerHTML = v
               tr.appendChild(td)
           })
           tdata.appendChild(tr)
       }

       )

    }
  });