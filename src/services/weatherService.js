class WeatherService {

    _getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) throw Error(`Not found, status: ${res.status}`);
        return await res.json();
    }


    _transformRes = (res) => {
        return {
            timezone: res.city.timezone,
            list: res.list.map((item) => {
                const dateTime = new Date(item.dt_txt);
                return {
                    temp: Math.round(item.main.temp - 273.15),
                    feels_like_temp: Math.round(item.main.feels_like - 273.15),
                    nightDeegres: Math.round(item.main.temp_min - 273.15),
                    dayDeegres: Math.round(item.main.temp_max - 273.15),
                    pressure: item.main.pressure,
                    humidity: item.main.humidity,
                    weatherDesc: item.weather[0].main,
                    wind: item.wind,
                    weekDay: dateTime.toLocaleDateString("en-US", { weekday: "long" }),
                    dateDay: dateTime.toLocaleDateString("en-US", { month: "long", day: "numeric" })
                }
            })

        }
    }


    getWeatherByCity = async (cityName) => {
        const res = await this._getResource(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=d3bfbf58a99aee96fb8111a35db3d432`);
        return this._transformRes(res);
    }


}

export default WeatherService;