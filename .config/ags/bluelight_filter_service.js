class BluelightFilterService extends Service {
    static {
      Service.register(
        this,
        {'enabled': ['string']}
       // {'string': ['string', 'rw']}
      )
    }
    #running = Utils.exec('ps -x | grep -c wlsunset')

    get running(){
        return this.#running
    }

    constructor(){
        super()

        
    }

    toggle(){
        if (this.#running > 1){
            Utils.exec('killall wlsunset')
            this.#running = 1
        }else{
            Utils.exec('wlsunset -l 33.9 -L -89.3')
        }
    }

    #onChange(){
        this.#running = Utils.exec('ps -x | grep -c wlsunset')
    }

}

