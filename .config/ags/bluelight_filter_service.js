/*
*This file is the service for the blue light filter
*/

class BluelightFilterService extends Service {
    static {
      Service.register(
        this,

        {'it-changed': ['string']},
       {'running': ['string', 'rw'],
        'icon': ['string', 'rw']
        }
      )
    }
    #running = Utils.exec('/home/noah/.config/ags/scripts/blue_light_filter.sh')

    #icon_off = 'frappe-crust-moon'
    #icon_on = 'machiato_yellow_moon'

    #icon = ''


    get icon(){
        return this.#icon
    }

    set icon(value){
        this.#icon = value
       
    }

    //on setup of the service it will check if the filter is running and set the icon accordingly
    constructor(){
        super()

        if (this.#running == "on"){
            
            this.#running = "on"
            this.icon = this.#icon_on
        }else{
            
            this.#running = "off"
            this.icon = this.#icon_off
        }
        this.#onChange()
        print('this is the running 1')
        print(this.#running)

    }

    toggle(){
            
        if (this.#running == "on"){
            print('killing wlsunset')
            
            this.#running = "off"
            this.#icon = this.#icon_off
            this.changed('icon')
            Utils.exec('killall wlsunset')

        }else{
            print('starting wlsunset')
            
            this.#running = "on"
            this.icon = this.#icon_on
            this.changed('icon')
            
            Utils.execAsync('wlsunset -l 33.9 -L -89.3 &').then(val => {print("this 2 value is " + val)}).catch(err => {print("this2  error is " + err)})
            
        }

        this.emit('changed')
    }

    #onChange(){

        console.log('this is the running')

        this.emit('changed')
      
        this.notify('icon')

        this.emit('it-changed', this.#icon)
    }
    


}

export default new BluelightFilterService 
