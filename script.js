import { menuArray } from "./data.js";

let OrderedItems=[]
let Completebtn = document.getElementById('complete')
let payBtn = document.getElementById('pay-btn')
const Wrapper = document.getElementById('wrapper')
let Form = document.getElementById('form')
let bigWrap =document.getElementById('big-wrap')
function getTheHTML(){
                let Html = []
                menuArray.forEach(
                        function(menu){
                            Html += `
                            <div class="container">
                                
                                <div class="wrapper-content">
                                    <div class="emoji" id="emoji">${menu.emoji}</div>
                                    <div class="text">
                                        <h3 class="name">${menu.name}</h3>
                                        <p class="ingrident">${menu.ingredients}</p>
                                        <h3 class="amount"> $  ${menu.price}</h3>
                                    </div>
                                </div>
                                <div  id="btn" class="btn" data-addmenu="${menu.id}">
                                    <button class="add-btn">+</button>
                                </div>
                                
                            </div>
                    
                        `
                        })
                        return Html
        
}


function getOrderedHTML(){
        let orderHtml=''
        let totalprice = 0
    OrderedItems.forEach(
        function(menu){
           
    orderHtml+=  `
               
            <div class="second-content">
                <div class="Ordered">
                    <h3>${menu.name}</h3>
                    <div data-removemenu="${menu.id}" >
                         <button class="remove-btn" id="remove-btn" data-removemenu="${menu.id}">Remove</button>
                    </div>
                 </div>
                
                <div>
                    <h3>${menu.price}</h3>
                </div>
            </div>
            
    `
    totalprice += menu.price
        }
        
        
    )
    const completeOrderHTML = `
        <h1>Your Order</h1>
        ${orderHtml}
        <div class="total">
                    <h3>Total Price:</h3>
                    <h3>$${totalprice}</h3>
            </div>
             
    `
    return completeOrderHTML
}

//get the orderedItem object and push it into an Ordereditem array
function handleOrderedItems(OrderedId){
    const OrderedObj = menuArray.filter(function(menu){
        return menu.id == OrderedId
    })
    OrderedItems.push(OrderedObj[0]) 
    RenderOrderHTML() 
    Completebtn.style.display='block'
}

//get the removed object and remove it from the Ordered array
  function handleRemovedItems(OrderedId){
      const orderedobjIndex = menuArray.findIndex(function(menu){
          return menu.id == OrderedId
      }) //to get the index of the object being removed
      OrderedItems.splice(orderedobjIndex[0], 1) //then remove it from from there OrderedItems array 
      RenderOrderHTML()
  }
  
document.addEventListener('click',
function(e){
    if(e.target.dataset.addmenu){
        handleOrderedItems(e.target.dataset.addmenu)
        }else if(e.target.dataset.removemenu){
            handleRemovedItems(e.target.dataset.removemenu)
            if(OrderedItems.length == ''){
            bigWrap.style.display='none'
        }
    
}
    })
//show form when complete button is clicked
Completebtn.addEventListener("click", function(){
    document.getElementById('form').style.display='block'
    })
    
 // Display the thank you message  when the pay button is clicked   
Form.addEventListener("submit", function(e){
    e.preventDefault() //will prevent it from refreshing after submiting
    const formData = new FormData(Form)
    const BuyerName = formData.get('buyername')
    Form.style.display = 'none'
   bigWrap.innerHTML=`
   <p class="lastp">Thanks, ${BuyerName.toUpperCase()}! Your order is on the way!</p>
   `
    })
function RenderHTML(){
    document.getElementById('wrapper').innerHTML= getTheHTML()
   }
RenderHTML()

function RenderOrderHTML(){
    document.getElementById('second-wrapper').innerHTML = getOrderedHTML()
}
