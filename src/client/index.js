import { handleSubmit, savePlan } from './js/app'
import { getPlace } from './js/place'
import { getWeather, getForecast } from './js/weather'
import { addWeather, addForecast, addPhotos, addList, clearPage, countDown, headerCreate} from './js/formatter'
import { getImages } from './js/photos'
import { validation, objEqualityCheck } from './js/validations'
import { retreiveTrips } from './js/trip'
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/table.scss'


export {
    handleSubmit,
    savePlan,
    getPlace,
    getWeather,
    getForecast,
    getImages,
    addWeather,
    addForecast,
    addPhotos,
    addList,
    clearPage,
    countDown,
    headerCreate,
    validation,
    objEqualityCheck,
    retreiveTrips
}