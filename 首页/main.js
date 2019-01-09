
class MyCarousel {
    constructor(carouselid) {
        this.imgs = document.querySelectorAll(`#${carouselid} img`)
        this.btnGroup = document.querySelector(`#${carouselid} .btn-group`)
        this.btnGroup.innerHTML = ''
        this.btns = []
        this.tempIndex = []
        for (let i = 0; i < this.imgs.length; i++) {
            const btn = document.createElement('span')
            btn.classList.add('btn')
            this.btnGroup.appendChild(btn)
            this.btns.push(btn)    
        }
        this.btns.forEach((ele, index) => {
            ele.addEventListener('click', (event) => {
                if (this.tempIndex.length > 0) {
                    if (this.tempIndex[this.tempIndex.length - 1] !== index) {
                        this.tempIndex.push(index)
                    }
                } else { this.tempIndex.push(index) }
              //  console.log(this.tempIndex)
                if (!this.cs) {
                    if (this.sp) {
                        this.sp.then(() => {
                            this.clickScroll()
                        })
                    } else {
                        this.clickScroll()
                    }
                }
            })
        });
        this.now = 0;
        this.next = 1;
        //console.log(this.imgs)
        this.init();
    }
    init() {
        this.autoScroll()
    }
    changeBtnBg(index) {
        this.now = index
        this.btns.forEach(ele => {
            ele.style.background = 'white'
        });

        this.btns[this.now].style.background = '#0dc19c'
    }
    stopScroll() {
        clearInterval(this.autoScrollCtrl)
    }
    clickScroll() {
        if (this.tempIndex.length === 0) {
            this.cs = false
            this.autoScroll()
            return
        }
        this.cs = true
        this.stopScroll()
        const index = this.tempIndex.shift()
        if(this.now !== index){
            this.scrollAnimate(this.now, index)
        }
        
        this.changeBtnBg(index)

        this.sp.then(() => {
            this.clickScroll()
        })
    }
    autoScroll() {

        this.autoScrollCtrl = setInterval(() => {
            this.next = this.now === this.imgs.length - 1 ? 0 : this.now + 1
            this.scrollAnimate(this.now, this.next)
            this.changeBtnBg(this.next)
        }, 2000)
    }
    animateBase(index, startPosition, distPosition) {
        const ele = this.imgs[index]

        return anime({
            targets: ele,
            left: [startPosition, distPosition],
            duration: 500,

            easing: 'easeInOutQuad'
        }).finished



    }
    scrollAnimate(nowPic, nextPic) {
        if (nowPic === this.imgs.length - 1 && this.next === 0) {
            this.sp = Promise.all([
                this.animateBase(nowPic, 0, '-100%'),
                this.animateBase(nextPic, '100%', 0)
            ])


          //  console.log('l', nowPic, nextPic)
        } else if (nowPic > nextPic) {
            this.sp = Promise.all([
                this.animateBase(nowPic, 0, '100%'),
                this.animateBase(nextPic, '-100%', 0)
            ])


         //   console.log('r', nowPic, nextPic)
        } else {
            this.sp = Promise.all([
                this.animateBase(nowPic, 0, '-100%'),
                this.animateBase(nextPic, '100%', 0)
            ])

        }

    }
}
const cou = new MyCarousel('carousel')

