class RegionService {

    citiesUrl = (countryName) => {
        const query = `[out:json];
          area[name='${countryName}'];
          node[place=city](area);
          out tags;`;

        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
        return url;
      }

    countryUrl = () => {
        const query = `[out:json];
        node["boundary"="administrative"]["admin_level"="2"];
        out tags;`;
        const encodedQuery = encodeURIComponent(query);
        const url = `https://overpass-api.de/api/interpreter?data=${encodedQuery}`;
        return url;
    }

    _getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) throw Error(`Not found, status: ${res.status}`);
        return await res.json();
    }

    _transform = (res) => {
        return res.elements.map((item) => {
            return item.tags['name:ru']
        })
    }

    getRegions = async (countryName) => {
        const res = await this._getResource(this.citiesUrl(countryName));
        return this._transform(res);
    }

    _transofrmCountries = (res) => {
        return res.map((item) => item.name);
    }

    getAllCountries = async () => {
        const res = await this._getResource('https://restcountries.com/v2/all');
        return this._transofrmCountries(res)
    }


}

export default RegionService;