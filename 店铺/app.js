
console.log(234324)
class Modal {
    constructor() {
        this.domEle = document.createElement('div')
        this.domEle.style.background="rgba(0,0,0,.3)"
        this.domEle.style.position='fixed'
        this.domEle.style.width='100%'
        this.domEle.style.height='100%'
        this.domEle.style.top="0"
        this.domEle.style.left="0"
        this.domEle.style.zIndex="17"
        this.domEle.addEventListener('click',()=>{
            this.close()
        })
    }
    open(){
        document.body.appendChild(this.domEle)
        console.log('modal')
    }
    close(){
        document.body.removeChild(this.domEle)
        this.onClose();
    }
    onClose(){

    }

}
window.onload = function(){
    const modal = new Modal()
    const cart = document.querySelector('#cart')
   
    const expansion = document.querySelector('.cart-expansion')
    cart.addEventListener('click',function(){
    
        cart.style.display="none"
        expansion.classList.add('cart-action')
        modal.onClose = ()=>{
        cart.style.display="flex"
        expansion.classList.remove('cart-action')
        }
        modal.open()

        expansion.classList.add('cart-action')
    })
}