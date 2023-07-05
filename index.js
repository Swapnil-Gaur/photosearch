//const endpoint="https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=${maxImages}&page=${currentPage}&client_id=${apiKey}";

let currentPage=1;

let maxImages=14;

let apiKey="9JbHAHp3VgsKlUOFCkGz0dMK3rm32n6Kf2QOlwpHrtQ";

const searchbtn=document.getElementById("searchbtn");

searchbtn.onclick=makeSearch;

async function searchunsplash(searchQuery){
    
        const endpoint=`https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=${maxImages}&page=${currentPage}&client_id=${apiKey}`;

        const resp=await fetch(endpoint);//resp is storing the response of the api

        console.log(resp);

        if(!resp.ok){//resp.ok checks whether api is giving porper response or not ok is key
            
            console.log("error occured",resp);
            
            return;
        }
        
        const json=await resp.json();
        
        return json;

}
async function makeSearch(){
  
    const searchQuery=document.getElementById("searchinput").value;
  
    const response= await searchunsplash(searchQuery);
    console.log(response);

    let htmlcontent="";

    response.result.forEach((eachresp) => {
        
        const url=eachresp.urls.small;//it will give small size of the image
        
        const unsplashlink=eachresp.links.html;//it is required becuase if we click on the image it should redirect to it's parent content

        const photographer=eachresp.user.name;

        const photographerlink=eachresp.user.links.html;

        htmlcontent+=`
        <div>
         <a href="${unsplashlink}" target="_blank">
            <div class="result" style="background-image:url(${url});"></div>
         </a>
         <p class="photographer-names" >
            <a href="${photographerlink}" target="_blank">
            Photo by ${photographer}
            </a>
         </p>
        </div>
        `;});

        const imagecontainer=document.getElementById("imagecontainer");

        imagecontainer.innerHTML=htmlcontent;

}