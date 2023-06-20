import Header from './components/header/Header';
import WeatherService from './services/weatherService';
import errorGeolocation from './resourses/img/errrorGeolocation.png'
import { useEffect, useState } from 'react';

import { ThemeProvider } from './helper/themeContext';

import "./app.css"
import ThisDay from './components/thisDay/ThisDay';
import ThisDayInfo from './components/thisDayInfo/ThisDayInfo';
import RegionService from './services/regionService';
import CardList from './components/cardList/CardList';
import PopupCard from './components/popupCard/PopupCard';

import LocationService from './services/getGeolocation';

import Spinner from './components/spinner/Spinner';
import ErrorMessage from './components/errorMessage/errorMessage';
import Skeleton from './components/skeleton/Skeleton';

function App() {
	const [setDarkMode] = useState(false);
	const [popup, setPopup] = useState(false);
	const [popupData, setPopupData] = useState(null);
	const [cities, setCities] = useState(null);
	const [dataWeather, setDataWeather] = useState()
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [selectStatus, setSelectStatus] = useState('hide');
	const [currentCountry, setCurrentCountry] = useState();
	const [currentTime, setCurrentTime] = useState();
	const [timezone, setTimezone] = useState();
	const [geolocationError, setGeolocation] = useState(true);
	
	const regionService = new RegionService();
	const weatherService = new WeatherService();	
	const {city, country} = LocationService(null);

	const countryList = [
		{label: 'Россия', value: 'Россия'},
		{label: 'Молдова', value: 'Moldova'},
		{label: 'Румыния', value: 'România'},
		{label: 'США', value: 'United States'},
		{label: 'Италия', value: 'Italia'},
		{label: 'Испания', value: 'España'},
		{label: 'Канада',value: 'Canada'},
		{label: 'Бразилия', value: 'Brasil'},
		{label: 'Китай', value: '中国'},
		{label: 'Германия', value: 'Deutschland'},
		{label: 'Франция', value: 'France'}
	]
	
	useEffect(() => {
		setLoading(true);
		if (city && country)
			onLoadedWeather(city);
		if (city === "error getting")  {
			setLoading(false);
		}
	}, [city, country])
	
	useEffect(() => {
			const interval = setInterval(() => {
				const now = new Date();
				const offsetMilliseconds = now.getTimezoneOffset() * 60000;
				const offsetTimeMilliseconds = now.getTime() + offsetMilliseconds + timezone * 1000;
				const offsetTime = new Date(offsetTimeMilliseconds);
				const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
				const currentTime = offsetTime.toLocaleTimeString('ru-RU', options);
				setCurrentTime(currentTime);
			}, 1000);
		
			return () => clearInterval(interval);
		}, [timezone]);

		useEffect(() => {
			const hidePopup = (event) => {
				if (event.key === 'Escape') {
					setPopup(false);
				}
			}
			document.addEventListener('keydown', hidePopup)
			return () => {
				document.removeEventListener('keydown', hidePopup);
			  };
		}, [])

	const onLoadCityList = (selectOption) => {
		if (selectOption.value !== currentCountry) {
			setCurrentCountry(selectOption.value);
			setSelectStatus('load');
			regionService.getRegions(selectOption.value)
			.then(onLoadingList)
			.catch(onError)
		}
	}
	
	const onLoadingList = data => {
		setSelectStatus("ready");
		transformCityList(data)
	}

	const onError = () => {
		setSelectStatus("error");
	}

	const transformCityList = (data) => {
		const regions = data.map((item) => {
			return {
				label: item,
				value: item
			}
		})
		setCities(regions);
	}
	
	const onLoadedWeather = (cityName) => {
		if (!dataWeather || cityName !== dataWeather.city) {
			setLoading(true);
			setGeolocation(false);
			setError(false);
			weatherService.getWeatherByCity(cityName)
			.then((data) => {
				data = {city: cityName, ...data}
				setDataWeather(data)
				setLoading(false);
				setError(false);
				setTimezone(data.timezone)
			})
			.catch(() => setError(true))
		}
	}

	const openPopup = (data) => {
		setPopup(true);
		setPopupData({city: dataWeather.city, ...data});
	}

	let visibleContent = !loading && !error && dataWeather ? 
    <div className="container">
		<div className="container-main">
			<ThisDay data = {{currentTime, ...dataWeather}}/>
			<ThisDayInfo data = {dataWeather.list[0]}/>
		</div>
	</div>
	: null;
    visibleContent = loading ? <Spinner/> : visibleContent;
    visibleContent = error ? <ErrorMessage/> : visibleContent;
	visibleContent = geolocationError ? 
	<div className='geolocation__error'>
		<img src={errorGeolocation} alt="geo error" />
	</div>
	: visibleContent;


  	return (
		  <ThemeProvider>
				<div className="App">
					<Header 
					toggleDarkMode = {setDarkMode}
					countries={countryList}
					cities={cities}
					onLoadCityList = {onLoadCityList}
					onLoadedWeather = {onLoadedWeather}
					status = {selectStatus}/>

					{popup ? 
					<PopupCard 
					closePopup={() => setPopup(false)}
					popupData = {popupData}/> 
					: null}
					
					{visibleContent}
					
					
					<CardList 
					data = {dataWeather}
					openPopup={openPopup}/>

				</div>
		</ThemeProvider>
	);
}

export default App;
